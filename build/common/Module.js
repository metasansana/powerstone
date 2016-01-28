'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _CompositeModule = require('./CompositeModule');

var _CompositeModule2 = _interopRequireDefault(_CompositeModule);

var _routingFeatureFactory = require('../routing/FeatureFactory');

var _routingFeatureFactory2 = _interopRequireDefault(_routingFeatureFactory);

var _routingRestifyQ = require('../routing/RestifyQ');

var _routingRestifyQ2 = _interopRequireDefault(_routingRestifyQ);

var _routingExpressQ = require('../routing/ExpressQ');

var _routingExpressQ2 = _interopRequireDefault(_routingExpressQ);

var _util = require('../util');

var util = _interopRequireWildcard(_util);

var _properties = require('./properties');

/**
 * Module
 * @param {string} fqn The name of the module prefixed with its parent modules 
 * @param {string} path 
 * @param {Configuration} config 
 * @param {Loader} loader 
 * @param {Application} app 
 */

var Module = (function () {
    function Module(fqn, path, config, loader, app) {
        _classCallCheck(this, Module);

        this.fqn = fqn;
        this.path = path;
        this.configuration = config;
        this.loader = loader;
        this.application = app;
        this.submodules = new _CompositeModule2['default']([]);
    }

    /**
     * name provides the name of this module
     *  @return {string}
     */

    _createClass(Module, [{
        key: 'name',
        value: function name() {
            return this.fqn ? this.fqn.split('.').pop() : '';
        }

        /**
         * modules loads all the submodules for this module into memory.
         * @param {object} mods 
         */
    }, {
        key: 'modules',
        value: function modules(mods) {
            var _this = this;

            var name;
            var path;
            var loader;
            var config;
            var fqn;
            var m;

            this.submodules = new _CompositeModule2['default'](this.configuration.readWithDefaults(_properties.paths.MODULES, []).map(function (path) {

                loader = _this.application.getLoader(_this.loader.join(_properties.paths.MODULES + '/' + path));
                config = loader.getConfiguration();
                name = loader.basename();
                fqn = _this.fqn ? _this.fqn + '.' + name : name;
                path = _this.path + '/' + name;

                m = new Module(fqn, path, config, loader, _this.application);
                mods[name] = m;
                return m;
            }));

            this.submodules.modules(mods);
        }

        /**
         * framework loads the files from the framework
         * folder so that they are available in later steps
         * @param {object} connectors
         * @param {object} pipes 
         * @param {object} events 
         */
    }, {
        key: 'framework',
        value: function framework(connectors, pipes, events) {
            var _this2 = this;

            this.loader.require(_properties.paths.CONNECTORS, connectors);
            this.loader.require(_properties.paths.PIPES, pipes);

            Object.keys(this.loader.require(_properties.paths.EVENTS, events)).forEach(function (event) {
                return _this2.application.on(event, _this2.application.framework.events[event]);
            });

            this.submodules.framework(connectors, pipes, events);
        }

        /**
         * expressFramework loads the pieces for the express framework
         * @param {object} middleware
         * @param {object} engines 
         */
    }, {
        key: 'expressFramework',
        value: function expressFramework(middleware, engines) {

            this.loader.require(_properties.paths.WEB_PLUGINS, middleware);
            this.loader.require(_properties.paths.WEB_ENGINES, engines);
            this.submodules.expressFramework(middleware, engines);
        }

        /**
         * restifyFramework loads the pieces for the restify framework
         */
    }, {
        key: 'restifyFramework',
        value: function restifyFramework(plugins) {
            this.loader.require(_properties.paths.API_PLUGINS, plugins);
            this.submodules.restifyFramework(plugins);
        }

        /**
         * connections opens the connections defined in the module's config file.
         * @param {object} types A list of available connection types
         * @param {object} conns Opened connections will be referenced here
         * @return {array<Promise>}
         */
    }, {
        key: 'connections',
        value: function connections(types, conns) {
            var _this3 = this;

            var type;
            var cfgs = this.configuration.readWithDefaults(_properties.configs.CONNECTIONS, {});
            var cfg;

            return Object.keys(cfgs).map(function (key) {
                cfg = cfgs[key];
                type = types[cfg.connector];
                if (!type) throw new Error('Unknown connector \'' + cfg.connector + '\' ' + ('specified in ' + _this3.configuration.path));

                return new Promise(function (yes, no) {
                    return type(cfg.options, yes, no);
                }).then(function (con) {
                    return conns[key] = con;
                });
            }).concat(this.submodules.connections(types, conns));
        }

        /**
         * userland loads the userland code into memory
         * @param {object} controllers 
         * @param {object} models
         * @param {object} middleware 
         */
    }, {
        key: 'userland',
        value: function userland(controllers, models, middleware) {

            var prefix = this.name() ? this.configuration.readWithDefaults('prefix', this.fqn) : '';

            this.loader.require('controllers', controllers, prefix);
            this.loader.require('models', models, prefix);
            this.loader.require('middleware', middleware, prefix);

            this.submodules.userland(controllers, models, middleware);
        }

        /**
         * express configures the express framework
         * @param {express.Application} app
         * @param {express} express 
         * @param {array} mware Default middleware to apply if non specified
         */
    }, {
        key: 'express',
        value: function express(app, _express, mware) {
            var _this4 = this;

            var isMain = this.name() === '';
            var isApp = !this.configuration.read(_properties.configs.USE_WEB_ROUTER) || isMain;
            var target = isApp ? _express() : _express.Router();
            var router;
            var path = this.configuration.readWithDefaults(_properties.configs.PATH, '/' + this.name());
            var engine = this.configuration.readWithDefaults(_properties.configs.WEB_ENGINE, null);
            var engineSetup = this.application.framework.express.engines[engine];
            var features;
            var routes;
            var q;

            this.application.interpolate(this.application.framework.express.middleware, this.configuration.readWithDefaults(_properties.configs.WEB_PLUGINS, mware)).forEach(function (m) {
                return m(target, _this4);
            });

            if (isMain) this.application.emit(this.application.events.ROUTING, target, this);

            if (isApp) {
                if (engine && !engineSetup) {
                    throw new Error('The view engine \'' + engine + '\' was not found!');
                } else if (engine) {

                    if (typeof engineSetup !== 'function') throw new Error('Invalid configure script found for view engine \'' + engine + '\'!' + ('The script must export a function, found typeof \'' + typeof engine + '\'.'));

                    engineSetup(target, this);
                }
            }

            features = _routingFeatureFactory2['default'].web(this.application);

            routes = this.loader.load(_properties.paths.WEB_ROUTES, {
                web: {}
            });

            Object.keys(routes).forEach(function (path) {
                q = new _routingExpressQ2['default'](path, target);
                Object.keys(routes[path]).forEach(function (method) {
                    return features.install(method, path, routes[path][method], q);
                });
                q.flush();
            });

            if (isMain) {
                app.use(target);
            } else if (path) {
                app.use(path, target);
            }

            this.submodules.express(isApp ? target : app, _express, isApp ? ['public'] : []);
        }

        /**
         * restify
         * @param {restify.Server} server
         * @param {array} plugins 
         * @param {string} path 
         */
    }, {
        key: 'restify',
        value: function restify(server, plugins) {
            var _this5 = this;

            var features;
            var routes;
            var q;
            var path = this.configuration.readWithDefaults(_properties.configs.PATH, this.path);

            this.application.interpolate(this.application.framework.restify.plugins, this.configuration.readWithDefaults(_properties.configs.API_PLUGINS, plugins)).forEach(function (p) {
                return p(server, _this5.application, _this5);
            });

            features = _routingFeatureFactory2['default'].api(this.application);
            routes = this.loader.load(_properties.paths.API_ROUTES, {
                api: {}
            });

            Object.keys(routes).forEach(function (route) {
                q = new _routingRestifyQ2['default'](path + route, server);
                Object.keys(routes[route]).forEach(function (method) {
                    return features.install(method, path + route, routes[route][method], q);
                });
                q.flush();
            });

            this.submodules.restify(server, []);
        }
    }]);

    return Module;
})();

exports['default'] = Module;
module.exports = exports['default'];
//# sourceMappingURL=Module.js.map