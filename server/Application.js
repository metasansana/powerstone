var Promise = require('bluebird');
var express = require('express');
var crypto = require('crypto');

var PowerServer = require('./PowerServer');
var MongoDriver = require('./MongoDriver');
var Loader = require('./Loader');
var Builtin = require('./Builtin');


var noop = function () {
};
var noopr = function (resolve) {
	resolve()
};

function get_controller(controllers, path) {
	path = path.split('.');

	if(!controllers[path[0]])
	throw new Error('Unregistered controller '+path[0]+'!');

	if(!controllers[path[0]][path[1]])
		throw new Error('The controller '+path[0]+' has no method '+path[1]+'!');

	return controllers[path[0]][path[1]].bind(controllers[path[0]]);
}

var render = function (view, locals) {

	return function (req, res) {
		res.render(view, locals);
	}

}


/**
 * @typedef {Object} Address
 * @property {String} host
 * @property {Number} port
 */

/**
 * Application
 */
function Application() {

	this.name = 'default';
	this.databases = {};
	this.controllers = {};
	this.models = {};
	this.routes = {};
	this.tasks = {};
	this.config = {
		path: '.',
		address: {
			host: '0.0.0.0',
			port: 3000
		},
		session: {
			name: 'PHPSESSIONID',
		},
		connectMongo: {
			connection: 'default'
		},
		mountPoint: '',
		views: 'views',
		secret: crypto.randomBytes(64).toString('hex')
	};

}

/**
 * configuration
 * @param {Object} config
 * @return {Object}
 */
Application.prototype.configuration = function (config) {

	return config;

};

/**
 * connectDatabases is expected to connect to the database (if any).
 * It is expected to return a promise even if no database is in use.
 * @return {Promise}
 */
Application.prototype.connectDatabases = function (config, state) {

	var self = this;

	if (!config.databases)
		return new Promise(noopr);

	var stack = config.databases.map(function (database) {

		var driver = new MongoDriver();

		return driver.connect(database.url, database.options).
			then(function (connection) {

				state.databases[database.name] = connection;
				return {name: database.name, connection: connection};

			});

	});

	return Promise.all(stack);

};

/**
 * loadModels
 */
Application.prototype.loadModels = function (path, list) {

	return Loader.loadFromDirectory(path, list);

};

/**
 * loadControllers loads the controllers from the provided path.
 * @param {String} ctlPath The path to the main application's directory.
 * @return {Object} A map of controllers for the application.
 */
Application.prototype.loadControllers = function (path, list) {

	list['Builtin'] = Builtin;
	return Loader.loadFromDirectory(path, list);

};

/**
 * loadTasks
 */
Application.prototype.loadTasks = function (path, list) {
	return Loader.loadFromDirectory(path, list);
};

/**
 * session
 * @param {Object} config
 * @param {Object} databases
 */
Application.prototype.session = function (config, databases) {


	var xsession = require('express-session');
	var MongoStore = require('connect-mongo')(xsession);
	
	return xsession({
			store: new MongoStore({mongooseConnection: databases[config.session.connection]}),
			secret: config.secret,
			resave: false,
			name:'PHPSESSIONID',
			saveUninitialized: true
		}
	);

};

/**
 * engine should configure the view engine for express (defaults to nunjucks)
 */
Application.prototype.engine = function (config, app) {

	var nunjucks = require('nunjucks');
	return nunjucks.configure(config.views, {
		autoescape: true,
		express: app
	});

};

/**
 * routes should supply application routes.
 * Routes are expected to be an array of key value objects:
 * [{method:'get', href:'/', 'controller': 'Application', action:'showIndexPage'}];
 *
 * The key part 'get /uri' specifies the method and the endpoint for the route.
 * The value part 'Controller.methodToCall' should resolve to a pre-registered controller
 * and method.
 * @return Array
 */
Application.prototype.getRoutes = function () {

	return [{method: 'get', href: '/', controller: 'Builtin.showWelcomePage'}];

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

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(methodOverride());
	app.use(cookieParser(config.secret));
	app.use(session);
	app.use(csrf());

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
Application.prototype.server = function (app, address) {
	var pwr = new PowerServer(app, address, this);
	return pwr.start();
};


/**
 * run this application.
 * @returns {Promise}
 */
Application.prototype.run = function () {

	var self = this;
	var powerstone = require('../index');

	powerstone.apps[self.name] = self;

	return self.connectDatabases(this.configuration(self.config), self).
		then(function () {
			return self.loadModels(self.config.path + '/models', self.models);
		}).
		then(function () {
			return self.loadControllers(self.config.path + '/controllers', self.controllers);
		}).
		then(function () {
			return self.loadTasks(self.config.path + '/tasks', self.tasks);
		}).
		then(function () {

			var app = self.getApp(self.config, self.session(self.config, self.databases));
			
			app.use(function(req, res, next) {res.cookie('x-csrf-token', req.csrfToken());next();});
			
			var router = self.getRouter();

			self.getRoutes().forEach(function (route) {

				if (route.controller) {

					var args = route.controller.split(',').
						map(function (path) {
							return get_controller(self.controllers, path);
						});

					args.unshift(route.href);

					router[route.method].apply(app, args);

				}

				if (route.view)
					router.get(route.href, render(route.view));
			});

			self.engine(self.config, app);
			app.use(self.config.mountPoint || '/', router);
			return self.server(app, self.config.address);

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
