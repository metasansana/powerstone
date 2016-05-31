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
         * __framework performs framework specific actions
         * @abstract
         */
    }, {
        key: '__framework',
        value: function __framework() {}

        /**
         * __connectors loads the known connectors so that they can
         * be used when opening connections.
         */
    }, {
        key: '__connectors',
        value: function __connectors() {
            var _this2 = this;

            var connectors = this.configuration.read(_Configuration2['default'].keys.CONNECTORS, {});
            var delegate = new _SmartResourceDelegate2['default'](new _RequireDelegate2['default'](this.configuration.paths.connectors));

            delegate.add('require', new _RequireDelegate2['default']());

            Object.keys(connectors).forEach(function (key) {
                return _this2.context.connectors[key] = delegate.lookup(connectors[key]).module;
            });
        }

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
            var delegate = new _SmartResourceDelegate2['default'](new _PropertyDelegate2['default'](this.context.connectors));

            return Object.keys(connections).map(function (key) {

                config = connections[key];
                connector = delegate.lookup(config.connector).module;
                return connector(config.options).then(function (c) {
                    return _netPool2['default'][key] = c;
                });
            }).concat(this.submodules.__connections());
        }

        /**
         * __middleware loads the pre routing middleware.
         */
    }, {
        key: '__middleware',
        value: function __middleware() {
            var _this3 = this;

            var wares = this.configuration.read(_Configuration2['default'].keys.MIDDLEWARE, {});
            var delegate = new _SmartResourceDelegate2['default']('require', new _RequireDelegate2['default'](this.configuration.paths.middleware));

            delegate.add('require', new _RequireDelegate2['default']());

            if (Array.isArray(wares)) wares.forEach(function (m) {

                var resource = delegate.lookup(m);

                if (typeof resource.module !== 'function') throw new TypeError('Middleware must be a function, got ', typeof resource.module, '!');

                resource.module.apply(_this3);
            });

            this.submodules.__middleware();
        }

        /**
         * __routing sets up the routing for this module
         * @param {string} point The mount point of this module's parent's router.
         * @param {Router} parent The router of this module's parent.
         */
    }, {
        key: '__routing',
        value: function __routing(mountPoint, parent) {
            var _this4 = this;

            var path = this.configuration.readOrDefault(_Configuration2['default'].keys.PATH, '/' + this.name);
            var routes = this.configuration.readOrDefault(_Configuration2['default'].keys.ROUTES, {});

            Object.keys(routes).forEach(function (route) {
                return _this4.router.add(route);
            });
            this.submodules.__routing(point + '/' + path, this.router);
            parent.use(path, this.router);
        }

        /**
         * load this module
         */
    }, {
        key: 'load',
        value: function load() {
            var _this5 = this;

            this.__init();
            this.__connectors();
            this.__framework();

            return Promise.all(this.__connections()).then(function () {
                return _this5.application.onConnected(_netPool2['default']);
            }).then(function () {

                _this5.__middleware();
            });
        }
    }]);

    return Module;
})();

exports['default'] = Module;
module.exports = exports['default'];
//# sourceMappingURL=Module.js.map