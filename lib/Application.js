var Promise = require('bluebird');
var express = require('express');
var crypto = require('crypto');
var merge = require('deep-extend');
var xsession = require('express-session');

var PowerServer = require('./PowerServer');
var Loader = require('./Loader');
var Builtin = require('./Builtin');
var Connections = require('./connections/Connections');
var TaskRunner = require('./TaskRunner');


var noop = function () {
};
var noopr = function (resolve) {
    resolve()
};

function get_controller(controllers, path) {
    path = path.split('.');

    if (!controllers[path[0]])
        throw new Error('Unregistered controller ' + path[0] + '!');

    if (!controllers[path[0]][path[1]])
        throw new Error('The controller ' + path[0] + ' has no method ' + path[1] + '!');

    return controllers[path[0]][path[1]].bind(controllers[path[0]]);
}

function get_middleware(wares, path) {

    return path.split(',').map(function(hit) {
        if(!wares.hasOwnProperty(hit))
        throw new Error('Unregistered middleware: '+hit+'!');
        return wares[hit];
    })
}

var render = function (view, locals) {

    return function (req, res) {
        res.render(view, locals);
    }

}

var defaultSecret = process.env.SECRET || crypto.randomBytes(64).toString('hex');

var defaults = {
    address: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000
    },
    session: {
        name: 'PHPSESSIONID',
        secret: defaultSecret,
        resave: false,
        saveUninitialized: true
    },
    csrf: {
        enabled: true
    },
    secret: defaultSecret
};


/**
 * @typedef {Object} Address
 * @property {String} host
 * @property {Number} port
 */
/**
 * Application
 * @param {String} path
 */
function Application(path) {

    this.name = 'default';
    this.path = path;
    this.controllers = {};
    this.models = {};
    this.routes = {};
    this.tasks = {};
    this.middleware = {};
    this.loader = new Loader(path);
    this.connections = new Connections();

}

/**
 * engine should configure the view engine for express (defaults to nunjucks)
 */
Application.prototype.engine = function (path, app) {

    var nunjucks = require('nunjucks');
    return nunjucks.configure(path, {
        autoescape: true,
        express: app
    });

};

/**
 * getApp
 * @return {express.Application}
 */
Application.prototype.getApp = function (config, session) {

    var app = express();

    var cookieParser = require('cookie-parser');
    var methodOverride = require('method-override');
    var bodyParser = require('body-parser');
    var csrf = require('csurf');
    var self = this; //@TODO keep functions as pure as possible

    Array.isArray(config.public) &&
    config.public.forEach(
        function(folder){
           app.use(express.static(self.path+'/'+folder));
        });

    (typeof config.public === 'string') &&
    app.use(express.static(self.path+'/'+config.public));

    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser(config.secret));
    app.use(session);
    //app.use(csrf());

    return app;

};

/**
 * getRouter
 */
Application.prototype.getRouter = function () {

    return express.Router();
};

/**
 * server is responsible for starting the server.
 * @param {express.Application} app
 * @param {Address} address
 * @returns {Promise} Should be the result of PowerServer#start()
 */
Application.prototype.startServer = function (app, address) {
    var pwr = new PowerServer(app, address, this);
    return pwr.start();
};

/**
 * getTarget should be overwritten to provide models for queries.
 */
Application.prototype.getTarget = function (target) {
    throw new Error('getTarget() must be overwritten before a target can be provided. Target: ' + target + '.');
};

/**
 * run this application.
 * @returns {Promise}
 */
Application.prototype.run = function () {

    var self = this;
    var conf = merge(defaults, this.loader.loadConfFile('config'));


    conf.views = conf.views ||  'views';
    conf.views = self.path+'/'+conf.views;
    conf.public = conf.public || 'public';

    conf.connections &&
    conf.connections.map(function (con) {
        return self.connections.create(con.name, con.type, con.options);
    });

    conf.session && conf.session.store &&
    self.connections.create('session', conf.session.store.type, conf.session.store.options);


    return self.connections.open().
        then(function () {
            return self.loader.loadMap('models').
                then(function (models) {
                    self.models = models;
                });
        }).
        then(function () {
            return self.loader.loadMap('controllers', {Builtin: Builtin}).
                then(function (controllers) {
                    self.controllers = controllers;
                });
        }).
        then(function () {
            return self.loader.loadMap('tasks').
                then(function (tasks) {
                    self.tasks = tasks;
                    return TaskRunner.run();
                });
        }).
        then(function () {
            return self.loader.loadMap('queries').
                then(function (queries) {
                    self.queries = queries;
                });
        }).
        then(function () {
            return self.loader.loadMap('middleware').
                then(function (middleware) {
                    self.middleware = middleware;
                });
        }).
        then(function () {

            if (self.connections.hasName('session'))
                conf.session.store = self.connections.getByName('session').store;

            var app = self.getApp(conf, xsession(conf.session));
            var router = self.getRouter();

            conf.csrf.enabled && app.use(Builtin.sendCSRFToken);

            self.loader.loadConfFile('routes', []).
                forEach(function (route) {

                    if(route.middleware) {

                        var midArgs = get_middleware(self.middleware, route.middleware);
                        midArgs.unshift(route.href);

                        router[route.method].apply(router, midArgs);
                    }

                    if (route.query) {

                        if (!self.queries.hasOwnProperty(route.query.script))
                            throw new Error('The script ' + route.query.script + ' was not found!');

                        router[route.method](route.href, function (req, res, next) {
                            self.queries[route.query.script](self.getTarget(route.query.target),
                                route.query.props,req, res, next);
                        });
                    }

                    if (route.controller) {

                        var args = route.controller.split(',').
                            map(function (path) {
                                return get_controller(self.controllers, path);
                            });

                        args.unshift(route.href);

                        router[route.method].apply(router, args);

                    }

                    if (route.view)
                        router.get(route.href, render(route.view));
                });


            self.engine(conf.views, app);
            app.use('/', router);
            app.use(Builtin.send404Page);

            return self.startServer(app, conf.address).
                then(function (server) {
                    self.server = server;
                    return server;
                });

        });
};

/**
 * shutdown
 */
Application.prototype.shutdown = function () {

    var self = this;

    return new Promise(function (resolve, reject) {

        self.server.shutdown().
            then(function () {

                for (var key in self.databases)
                    if (self.databases.hasOwnProperty(key)) {
                        self.databases[key].close(function () {
                            resolve();
                        })
                    }


            }).
            catch(function (err) {

                reject(err);
                return err;

            });

    });


};
/**
 * databaseConnected is called when a database has been connected to.
 * @param {String} name The name given to the database definition
 * @param {Object} conn The database connection
 */
Application.prototype.databaseConnected = function (name, conn) {
};

/** Interface implementations */

/**
 * httpServerCreated
 */
Application.prototype.httpServerCreated = noop;

/**
 * httpServerClosed
 */
Application.prototype.httpServerClosed = noop;

module.exports = Application;
