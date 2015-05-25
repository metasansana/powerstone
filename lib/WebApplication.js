var Promise = require('bluebird');
var express = require('express');
var crypto = require('crypto');
var nunjucks = require('nunjucks');


var Application = require('./Application');
var PowerServer = require('./PowerServer');
var Builtin = require('./Builtin');
var WebAppRoutingFramework = require('./WebAppRoutingFramework');
var WebAppFramework = require('./WebAppFramework');
var StringConversion = require('./StringConversion');


/**
 * @typedef {Object} Address
 * @property {String} host
 * @property {Number} port
 */
/**
 * Application
 * @param {String} path
 */
function WebApplication() {

    Application.apply(this, arguments);

}
WebApplication.prototype = Object.create(Application.prototype);
WebApplication.prototype.constructor = WebApplication;

/**
 * _defaultConfig
 */
WebApplication.prototype._defaultConfig = function () {

    var defaultSecret = process.env.SECRET || crypto.randomBytes(64).toString('hex');
    return {
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

};

/**
 * @return {express.engine}
 */
WebApplication.prototype.getAppViewEngine = function (path, app) {

    return nunjucks.configure(path, {
        autoescape: true,
        express: app
    });

};

/**
 * run this application.
 * @returns {Promise}
 */
WebApplication.prototype.run = function () {

    var self = this;

    //If the session config describes a store we use it to configure a connection.
    if (self.config.session)
        if (self.config.session.store)
            self.connections.create('session',
                self.config.session.store.type, self.config.session.store.options);

    return Application.prototype.run.call(this).
        then(function () {

            var app = express();
            var routingFramework = new WebAppRoutingFramework(express.Router(), new StringConversion());
            var appFramework = new WebAppFramework(app, self.config);
            var conf = self.config;

            conf.views = conf.views || 'views';
            conf.views = self.path + '/' + conf.views;
            conf.public = conf.public || 'public';

            appFramework.
                usePublic(self.path).
                useMethodOverride().
                useBodyParser().
                useCookieParser().
                useSessions(self.connections).
                useCSRF();

            self.routes.forEach(function (route) {
                routingFramework.configureMiddleWare(route, self.middleware);
                routingFramework.configureQueries(route, self.queries);
                routingFramework.configureControllers(route, self.controllers);
                routingFramework.configureViews(route);
            });

            self.getAppViewEngine(conf.views, app);
            app.use('/', routingFramework.toRouter());
            app.use(Builtin.send404Page);

            var server = new PowerServer(app, conf.address, self);
            return server.start();


        });
};

/**
 * shutdown
 */
WebApplication.prototype.shutdown = function () {

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
WebApplication.prototype.databaseConnected = function () {
};

/** Interface implementations */

/**
 * httpServerCreated
 */
WebApplication.prototype.httpServerCreated = function () {
};
/**
 * httpServerClosed
 */
WebApplication.prototype.httpServerClosed = function () {
};

module.exports = WebApplication;
