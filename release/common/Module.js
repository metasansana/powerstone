'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Configuration = require('./Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

var _CompositeModule = require('./CompositeModule');

var _CompositeModule2 = _interopRequireDefault(_CompositeModule);

var _resourcePropertyResource = require('./resource/PropertyResource');

var _resourcePropertyResource2 = _interopRequireDefault(_resourcePropertyResource);

var _resourceRequireResource = require('./resource/RequireResource');

var _resourceRequireResource2 = _interopRequireDefault(_resourceRequireResource);

var _resourceModuleResource = require('./resource/ModuleResource');

var _resourceModuleResource2 = _interopRequireDefault(_resourceModuleResource);

var _resourceSchemeResource = require('./resource/SchemeResource');

var _resourceSchemeResource2 = _interopRequireDefault(_resourceSchemeResource);

var _netPool = require('../net/Pool');

var _netPool2 = _interopRequireDefault(_netPool);

var _routeBulkAction = require('./route/BulkAction');

var _routeBulkAction2 = _interopRequireDefault(_routeBulkAction);

var _routeMiddlewareAction = require('./route/MiddlewareAction');

var _routeMiddlewareAction2 = _interopRequireDefault(_routeMiddlewareAction);

var _routeControllerAction = require('./route/ControllerAction');

var _routeControllerAction2 = _interopRequireDefault(_routeControllerAction);

var _routeView = require('./route/View');

var _routeView2 = _interopRequireDefault(_routeView);

var _routeBulkAction3 = _interopRequireDefault(_routeBulkAction);

var _UnknownConnectorError = require('./UnknownConnectorError');

var _UnknownConnectorError2 = _interopRequireDefault(_UnknownConnectorError);

var _UnknownFilterError = require('./UnknownFilterError');

var _UnknownFilterError2 = _interopRequireDefault(_UnknownFilterError);

var _UnknownModuleError = require('./UnknownModuleError');

var _UnknownModuleError2 = _interopRequireDefault(_UnknownModuleError);

var BASKET = {};
var BOX = [];

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
 * @property {CompositeModule} modules
 * @property {string} [configDirectory='apiconf']
 */

var Module = (function () {
    function Module(name, config, context, app) {
        _classCallCheck(this, Module);

        this.name = name;
        this.configuration = config;
        this.context = context;
        this.application = app;
        this.modules = new _CompositeModule2['default']([]);
        this.configDirectory = 'apiconf';
    }

    /**
     * __viewCallback provides a callback that will 
     * handle view declarations.
     * @param {string} view The view template
     * @abstract
     */

    _createClass(Module, [{
        key: '__viewCallback',
        value: function __viewCallback(view) {}

        /**
         * __init initializes this module and its submodules
         */
    }, {
        key: '__init',
        value: function __init() {
            var _this = this;

            var submodule;
            var resource = new _resourceSchemeResource2['default'](new _resourceModuleResource2['default'](this));

            var submodules = this.configuration.read(this.configuration.keys.MODULES, BOX);

            var prevented = this.configuration.read(this.configuration.keys.MODULES_PREVENTED, BOX);

            resource.add('require', new _resourceRequireResource2['default']());

            submodules.forEach(function (path) {

                submodule = resource.find(path);

                if (!submodule) throw new _UnknownModuleError2['default'](path);

                if (prevented.indexOf(submodule.name) > -1) submodule.preventRouting();

                _this.modules.add(submodule);
            });

            this.modules.__init();
        }

        /**
         * __autoload the autoloadable aspects of the system
         */
    }, {
        key: '__autoload',
        value: function __autoload() {
            var _this2 = this;

            var resource = new _resourceSchemeResource2['default'](new _resourceRequireResource2['default']());
            var autoloads;
            var autokey;
            var key;

            var o = {};
            o[this.configuration.keys.CONNECTORS] = 'connectors';
            o[this.configuration.keys.FILTERS] = 'filters';
            o[this.configuration.keys.MIDDLEWARE] = 'middleware';
            o[this.configuration.keys.CONTROLLERS] = 'controllers';

            resource.add('require', new _resourceRequireResource2['default']());

            [this.configuration.keys.CONNECTORS, this.configuration.keys.FILTERS, this.configuration.keys.MIDDLEWARE, this.configuration.keys.CONTROLLERS].forEach(function (prefixedKey) {

                key = o[prefixedKey];
                autokey = 'power.autoload.' + key;
                autoloads = _this2.configuration.read(autokey, BASKET);

                Object.keys(autoloads).forEach(function (name) {
                    return _this2.context[key][name] = resource.find(autoloads[autokey]);
                });

                _this2.configuration.require(_this2.configuration.paths[key], _this2.context[key]);
            });

            this.modules.__autoload();
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
            var _this3 = this;

            var config;
            var connector;
            var connections = this.configuration.read(this.configuration.keys.CONNECTIONS, BASKET);
            var resource = new _resourcePropertyResource2['default'](this.context.connectors);

            return Object.keys(connections).map(function (key) {

                config = connections[key];
                connector = resource.find(config.connector);

                if (!connector) throw new _UnknownConnectorError2['default'](key, config.connector, _this3.context.connectors);

                return connector(config.options).then(function (c) {
                    return _netPool2['default'][key] = c;
                });
            }).concat(this.modules.__connections());
        }

        /**
         * __filters loads the pre routing middleware.
         */
    }, {
        key: '__filters',
        value: function __filters(app, defaults) {
            var _this4 = this;

            var resource = new _resourceSchemeResource2['default'](new _resourcePropertyResource2['default'](this.context.filters));

            resource.add('require', new _resourceRequireResource2['default']());
            app.use(this.handleRequest.bind(this));

            this.configuration.read(this.configuration.keys.FILTERS, defaults).forEach(function (f) {

                var filter = resource.find(f);

                if (!filter) throw new _UnknownFilterError2['default'](_this4.name, f);

                filter.apply(app, _this4.configuration);
            });

            this.modules.__filters(app, ['public']);
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
         * preventRouting disables routing for this module.
         * Filters will still be applied but the chain will be blocked there.
         */
    }, {
        key: 'preventRouting',
        value: function preventRouting() {}

        /**
         * handleRequest is called before any of the routes for this
         * module are activated.
         * @param {Request} req 
         * @param {Response} res 
         * @param {function} next 
         */
    }, {
        key: 'handleRequest',
        value: function handleRequest(req, res, next) {

            next();
        }

        /**
         * load this module
         */
    }, {
        key: 'load',
        value: function load(app) {
            var _this5 = this;

            this.__init();
            this.__autoload();

            return Promise.all(this.__connections()).then(function () {
                return _this5.application.onConnected(_netPool2['default']);
            }).then(function () {

                _this5.__filters(app, ['default']);
                _this5.__framework();
                _this5.__routing('', app, new _routeBulkAction3['default']([new _routeMiddlewareAction2['default'](new _resourcePropertyResource2['default'](_this5.context.middleware)), new _routeControllerAction2['default'](_this5.context.controllers), new _routeView2['default'](_this5.viewEngine)]));
            });
        }
    }]);

    return Module;
})();

exports['default'] = Module;
module.exports = exports['default'];
//# sourceMappingURL=Module.js.map