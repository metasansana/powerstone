'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _CompositeModule = require('./CompositeModule');

var _CompositeModule2 = _interopRequireDefault(_CompositeModule);

var _PropertyDelegate = require('./PropertyDelegate');

var _PropertyDelegate2 = _interopRequireDefault(_PropertyDelegate);

var _RequireDelegate = require('./RequireDelegate');

var _RequireDelegate2 = _interopRequireDefault(_RequireDelegate);

var _SmartResourceDelegate = require('./SmartResourceDelegate');

var _SmartResourceDelegate2 = _interopRequireDefault(_SmartResourceDelegate);

var _netPool = require('../net/Pool');

var _netPool2 = _interopRequireDefault(_netPool);

var _Configuration = require('./Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

var _routeBulkAction = require('../route/BulkAction');

var _routeBulkAction2 = _interopRequireDefault(_routeBulkAction);

var _routeMiddlewareAction = require('../route/MiddlewareAction');

var _routeMiddlewareAction2 = _interopRequireDefault(_routeMiddlewareAction);

var _routeControllerAction = require('../route/ControllerAction');

var _routeControllerAction2 = _interopRequireDefault(_routeControllerAction);

var _routeViewAction = require('../route/ViewAction');

var _routeViewAction2 = _interopRequireDefault(_routeViewAction);

var _routeBulkAction3 = _interopRequireDefault(_routeBulkAction);

/**
 * Module
 * @abstract
 * @param {string} name
 * @param {Configuration} config 
 * @param {object} context 
 * @param {Application} app 
 *
 * @property {string} name
 * @property {Configuration} configuration
 * @property {object} context
 * @property {Application} application
 * @property {CompositeModule} submodules
 */

var Module = (function () {
    function Module(name, config, context, app) {
        _classCallCheck(this, Module);

        this.name = name;
        this.configuration = config;
        this.context = context;
        this.application = app;
        this.submodules = new _CompositeModule2['default']([]);
    }

    /**
     * __submodule is called to create a submodule for this module.
     * @param {Resource} resource 
     * @param {Application} app 
     * @abstract
     * @returns {Module}
     */

    _createClass(Module, [{
        key: '__submodule',
        value: function __submodule(resource, app) {}

        /**
         * __viewCallback provides a callback that will 
         * handle view declarations.
         * @param {string} view The view template
         * @abstract
         */
    }, {
        key: '__viewCallback',
        value: function __viewCallback(view) {}

        /**
         * __init initializes this module and its submodules
         */
    }, {
        key: '__init',
        value: function __init() {
            var _this = this;

            var module;
            var resource;
            var submodules = this.configuration.read(_Configuration2['default'].keys.MODULES, {});
            var delegate = new _SmartResourceDelegate2['default'](new _RequireDelegate2['default'](this.configuration.paths.modules));

            delegate.add('require', new _RequireDelegate2['default']());

            Object.keys(submodules).forEach(function (path) {

                resource = delegate.resolve(path);
                module = _this.__submodule(resource, _this.application);

                if (submodules[path] === false) module.preventActions();

                _this.submodules.add(module);
            });

            this.submodules.__init();
        }

        /**
         * __autoload the autoloadable aspects of the system
         */
    }, {
        key: '__autoload',
        value: function __autoload() {
            var _this2 = this;

            var autos = this.configuration.read(_Configuration2['default'].keys.AUTOS, {});
            var delegate = new _SmartResourceDelegate2['default'](new _RequireDelegate2['default']());

            delegate.add('require', new _RequireDelegate2['default']());

            ['connectors', 'filters', 'middleware', 'controllers'].forEach(function (key) {

                if (autos.hasOwnProperty(key)) Object.keys(autos[key]).forEach(function (name) {
                    return _this2.context[key][name] = delegate.lookup(autos[key][name]).module;
                });

                _this2.configuration.require(_this2.configuration.paths[key], _this2.context[key]);
            });

            this.submodules.__autoload();
        }

        /**
         * __framework performs framework specific actions
         * @abstract
         */
    }, {
        key: '__framework',
        value: function __framework() {}

        /**
         * __connections establishes the connections decleared in the config file.
         * @return {array<Promise>}
         */
    }, {
        key: '__connections',
        value: function __connections() {

            var config;
            var connector;
            var connections = this.configuration.read(_Configuration2['default'].keys.CONNECTIONS, {});
            var delegate = new _PropertyDelegate2['default']('connector', this.context.connectors);

            return Object.keys(connections).map(function (key) {

                config = connections[key];
                connector = delegate.lookup(config.connector).module;
                return connector(config.options).then(function (c) {
                    return _netPool2['default'][key] = c;
                });
            }).concat(this.submodules.__connections());
        }

        /**
         * __filters loads the pre routing middleware.
         */
    }, {
        key: '__filters',
        value: function __filters(app, defaults) {
            var _this3 = this;

            var wares = this.configuration.read(_Configuration2['default'].keys.FILTERS, defaults);
            var delegate = new _SmartResourceDelegate2['default'](new _PropertyDelegate2['default']('filter', this.context.filters));

            delegate.add('require', new _RequireDelegate2['default']());
            wares.forEach(function (m) {
                return delegate.lookup(m).module.filter(app, _this3.configuration);
            });

            this.submodules.__filters(app, []);
        }

        /**
         * __routing sets up the routing for this module
         * @param {string} point The mount point of this module's parent's router.
         * @param {FrameworkApplication} app 
         * @param {array<Action>} actions 
         * @abstract
         */
    }, {
        key: '__routing',
        value: function __routing(mountPoint, app, actions) {}

        /**
         * handleRoute is called before any of the routes for this
         * module are activated.
         * @param {Request} req 
         * @param {Response} res 
         * @param {function} next 
         */
    }, {
        key: 'handleRoute',
        value: function handleRoute(req, res, next) {

            next();
        }

        /**
         * load this module
         */
    }, {
        key: 'load',
        value: function load(app) {
            var _this4 = this;

            this.__init();
            this.__autoload();

            return Promise.all(this.__connections()).then(function () {
                return _this4.application.onConnected(_netPool2['default']);
            }).then(function () {

                _this4.__filters(app, ['default']);
                _this4.__framework();
                _this4.__routing('', app, new _routeBulkAction3['default']([new _routeMiddlewareAction2['default'](new _PropertyDelegate2['default']('middleware', _this4.context.middleware)), new _routeControllerAction2['default'](_this4.context.controllers), new _routeViewAction2['default'](_this4.__viewCallback)]));
            });
        }
    }]);

    return Module;
})();

exports['default'] = Module;
module.exports = exports['default'];
//# sourceMappingURL=Module.js.map