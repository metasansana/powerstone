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

                if (typeof connector !== 'function') throw new TypeError('Connector must be a function got \'' + typeof connector + '\'!');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vTW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs2QkFBMEIsaUJBQWlCOzs7OytCQUNmLG1CQUFtQjs7Ozt3Q0FDbEIsNkJBQTZCOzs7O3VDQUM5Qiw0QkFBNEI7Ozs7c0NBQzdCLDJCQUEyQjs7OztzQ0FDM0IsMkJBQTJCOzs7O3VCQUNyQyxhQUFhOzs7OytCQUNOLG9CQUFvQjs7OztxQ0FDZiwwQkFBMEI7Ozs7cUNBQzFCLDBCQUEwQjs7Ozt5QkFDdEMsY0FBYzs7Ozs7O3FDQUVHLHlCQUF5Qjs7OztrQ0FDNUIsc0JBQXNCOzs7O2tDQUN0QixzQkFBc0I7Ozs7QUFFckQsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLElBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaUJULE1BQU07QUFFRyxhQUZULE1BQU0sQ0FFSSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUU7OEJBRnRDLE1BQU07O0FBSUosWUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsWUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFDNUIsWUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsWUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDdkIsWUFBSSxDQUFDLE9BQU8sR0FBRyxpQ0FBb0IsRUFBRSxDQUFDLENBQUM7QUFDdkMsWUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7S0FFcEM7Ozs7Ozs7OztpQkFYQyxNQUFNOztlQW1CTSx3QkFBQyxJQUFJLEVBQUUsRUFFcEI7Ozs7Ozs7ZUFLSyxrQkFBRzs7O0FBRUwsZ0JBQUksU0FBUyxDQUFDO0FBQ2QsZ0JBQUksUUFBUSxHQUFHLHdDQUFtQix3Q0FBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFNUQsZ0JBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENB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QUMsQ0FDOUMsSUFBSSxDQUFDLFlBQU07O0FBRVAsdUJBQUssU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDakMsdUJBQUssV0FBVyxFQUFFLENBQUM7QUFDbkIsdUJBQUssU0FBUyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsaUNBQWUsQ0FDbkMsdUNBQXFCLDBDQUFxQixPQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUNuRSx1Q0FBcUIsT0FBSyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQzlDLDJCQUFTLE9BQUssVUFBVSxDQUFDLENBQzVCLENBQUMsQ0FBQyxDQUFDO2FBRVAsQ0FBQyxDQUFDO1NBRU47OztXQTFOQyxNQUFNOzs7cUJBOE5HLE1BQU0iLCJmaWxlIjoiTW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi9Db25maWd1cmF0aW9uJztcbmltcG9ydCBDb21wb3NpdGVNb2R1bGUgZnJvbSAnLi9Db21wb3NpdGVNb2R1bGUnO1xuaW1wb3J0IFByb3BlcnR5UmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9Qcm9wZXJ0eVJlc291cmNlJztcbmltcG9ydCBSZXF1aXJlUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9SZXF1aXJlUmVzb3VyY2UnO1xuaW1wb3J0IE1vZHVsZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvTW9kdWxlUmVzb3VyY2UnO1xuaW1wb3J0IFNjaGVtZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvU2NoZW1lUmVzb3VyY2UnO1xuaW1wb3J0IFBvb2wgZnJvbSAnLi4vbmV0L1Bvb2wnO1xuaW1wb3J0IFJvdXRlQWN0aW9uIGZyb20gJy4vcm91dGUvQnVsa0FjdGlvbic7XG5pbXBvcnQgTWlkZGxld2FyZUFjdGlvbiBmcm9tICcuL3JvdXRlL01pZGRsZXdhcmVBY3Rpb24nO1xuaW1wb3J0IENvbnRyb2xsZXJBY3Rpb24gZnJvbSAnLi9yb3V0ZS9Db250cm9sbGVyQWN0aW9uJztcbmltcG9ydCBWaWV3IGZyb20gJy4vcm91dGUvVmlldyc7XG5pbXBvcnQgQnVsa0FjdGlvbiBmcm9tICcuL3JvdXRlL0J1bGtBY3Rpb24nO1xuaW1wb3J0IFVua25vd25Db25uZWN0b3JFcnJvciBmcm9tICcuL1Vua25vd25Db25uZWN0b3JFcnJvcic7XG5pbXBvcnQgVW5rbm93bkZpbHRlckVycm9yIGZyb20gJy4vVW5rbm93bkZpbHRlckVycm9yJztcbmltcG9ydCBVbmtub3duTW9kdWxlRXJyb3IgZnJvbSAnLi9Vbmtub3duTW9kdWxlRXJyb3InO1xuXG5jb25zdCBCQVNLRVQgPSB7fTtcbmNvbnN0IEJPWCA9IFtdO1xuXG4vKipcbiAqIE1vZHVsZVxuICogQGFic3RyYWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtDb25maWd1cmF0aW9ufSBjb25maWcgXG4gKiBAcGFyYW0ge29iamVjdH0gY29udGV4dCBcbiAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcCBcbiAqXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICogQHByb3BlcnR5IHtDb25maWd1cmF0aW9ufSBjb25maWd1cmF0aW9uXG4gKiBAcHJvcGVydHkge29iamVjdH0gY29udGV4dFxuICogQHByb3BlcnR5IHtBcHBsaWNhdGlvbn0gYXBwbGljYXRpb25cbiAqIEBwcm9wZXJ0eSB7Q29tcG9zaXRlTW9kdWxlfSBtb2R1bGVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2NvbmZpZ0RpcmVjdG9yeT0nYXBpY29uZiddXG4gKi9cbmNsYXNzIE1vZHVsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjb25maWcsIGNvbnRleHQsIGFwcCkge1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IGNvbmZpZztcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbiA9IGFwcDtcbiAgICAgICAgdGhpcy5tb2R1bGVzID0gbmV3IENvbXBvc2l0ZU1vZHVsZShbXSk7XG4gICAgICAgIHRoaXMuY29uZmlnRGlyZWN0b3J5ID0gJ2FwaWNvbmYnO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX192aWV3Q2FsbGJhY2sgcHJvdmlkZXMgYSBjYWxsYmFjayB0aGF0IHdpbGwgXG4gICAgICogaGFuZGxlIHZpZXcgZGVjbGFyYXRpb25zLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3IFRoZSB2aWV3IHRlbXBsYXRlXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgX192aWV3Q2FsbGJhY2sodmlldykge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19pbml0IGluaXRpYWxpemVzIHRoaXMgbW9kdWxlIGFuZCBpdHMgc3VibW9kdWxlc1xuICAgICAqL1xuICAgIF9faW5pdCgpIHtcblxuICAgICAgICB2YXIgc3VibW9kdWxlO1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgU2NoZW1lUmVzb3VyY2UobmV3IE1vZHVsZVJlc291cmNlKHRoaXMpKTtcblxuICAgICAgICB2YXIgc3VibW9kdWxlcyA9IHRoaXMuY29uZmlndXJhdGlvbi5cbiAgICAgICAgcmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5NT0RVTEVTLCBCT1gpO1xuXG4gICAgICAgIHZhciBwcmV2ZW50ZWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZChcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLk1PRFVMRVNfUFJFVkVOVEVELCBCT1gpO1xuXG4gICAgICAgIHJlc291cmNlLmFkZCgncmVxdWlyZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG5cbiAgICAgICAgc3VibW9kdWxlcy5cbiAgICAgICAgZm9yRWFjaChwYXRoID0+IHtcblxuICAgICAgICAgICAgc3VibW9kdWxlID0gcmVzb3VyY2UuZmluZChwYXRoKTtcblxuICAgICAgICAgICAgaWYgKCFzdWJtb2R1bGUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25Nb2R1bGVFcnJvcihwYXRoKTtcblxuICAgICAgICAgICAgaWYgKHByZXZlbnRlZC5pbmRleE9mKHN1Ym1vZHVsZS5uYW1lKSA+IC0xKVxuICAgICAgICAgICAgICAgIHN1Ym1vZHVsZS5wcmV2ZW50Um91dGluZygpO1xuXG4gICAgICAgICAgICB0aGlzLm1vZHVsZXMuYWRkKHN1Ym1vZHVsZSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9faW5pdCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19hdXRvbG9hZCB0aGUgYXV0b2xvYWRhYmxlIGFzcGVjdHMgb2YgdGhlIHN5c3RlbVxuICAgICAqL1xuICAgIF9fYXV0b2xvYWQoKSB7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gbmV3IFNjaGVtZVJlc291cmNlKG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG4gICAgICAgIHZhciBhdXRvbG9hZHM7XG4gICAgICAgIHZhciBhdXRva2V5O1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIHZhciBvID0ge307XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OTkVDVE9SU10gPSAnY29ubmVjdG9ycyc7XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuRklMVEVSU10gPSAnZmlsdGVycyc7XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuTUlERExFV0FSRV0gPSAnbWlkZGxld2FyZSc7XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OVFJPTExFUlNdID0gJ2NvbnRyb2xsZXJzJztcblxuICAgICAgICByZXNvdXJjZS5hZGQoJ3JlcXVpcmUnLCBuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuXG4gICAgICAgIFtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTk5FQ1RPUlMsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5GSUxURVJTLFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmtleXMuTUlERExFV0FSRSxcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTlRST0xMRVJTXG4gICAgICAgIF0uXG4gICAgICAgIGZvckVhY2gocHJlZml4ZWRLZXkgPT4ge1xuXG4gICAgICAgICAgICBrZXkgPSBvW3ByZWZpeGVkS2V5XTtcbiAgICAgICAgICAgIGF1dG9rZXkgPSBgcG93ZXIuYXV0b2xvYWQuJHtrZXl9YDtcbiAgICAgICAgICAgIGF1dG9sb2FkcyA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKGF1dG9rZXksIEJBU0tFVCk7XG5cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF1dG9sb2FkcykuZm9yRWFjaChuYW1lID0+XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0W2tleV1bbmFtZV0gPSByZXNvdXJjZS5maW5kKGF1dG9sb2Fkc1thdXRva2V5XSkpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ucmVxdWlyZSh0aGlzLmNvbmZpZ3VyYXRpb24ucGF0aHNba2V5XSwgdGhpcy5jb250ZXh0W2tleV0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kdWxlcy5fX2F1dG9sb2FkKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX2ZyYW1ld29yayBwZXJmb3JtcyBmcmFtZXdvcmsgc3BlY2lmaWMgYWN0aW9uc1xuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIF9fZnJhbWV3b3JrKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19jb25uZWN0aW9ucyBlc3RhYmxpc2hlcyB0aGUgY29ubmVjdGlvbnMgZGVjbGVhcmVkIGluIHRoZSBjb25maWcgZmlsZS5cbiAgICAgKiBAcmV0dXJuIHthcnJheTxQcm9taXNlPn1cbiAgICAgKi9cbiAgICBfX2Nvbm5lY3Rpb25zKCkge1xuXG4gICAgICAgIHZhciBjb25maWc7XG4gICAgICAgIHZhciBjb25uZWN0b3I7XG4gICAgICAgIHZhciBjb25uZWN0aW9ucyA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTk5FQ1RJT05TLCBCQVNLRVQpO1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgUHJvcGVydHlSZXNvdXJjZSh0aGlzLmNvbnRleHQuY29ubmVjdG9ycyk7XG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGNvbm5lY3Rpb25zKS5cbiAgICAgICAgbWFwKGtleSA9PiB7XG5cbiAgICAgICAgICAgIGNvbmZpZyA9IGNvbm5lY3Rpb25zW2tleV07XG4gICAgICAgICAgICBjb25uZWN0b3IgPSByZXNvdXJjZS5maW5kKGNvbmZpZy5jb25uZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAoIWNvbm5lY3RvcilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVW5rbm93bkNvbm5lY3RvckVycm9yKGtleSwgY29uZmlnLmNvbm5lY3RvciwgdGhpcy5jb250ZXh0LmNvbm5lY3RvcnMpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbm5lY3RvciAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBDb25uZWN0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uIGdvdCAnJHt0eXBlb2YgY29ubmVjdG9yfSchYCk7XG5cbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0b3IoY29uZmlnLm9wdGlvbnMpLnRoZW4oYyA9PiBQb29sW2tleV0gPSBjKTtcblxuICAgICAgICB9KS5jb25jYXQodGhpcy5tb2R1bGVzLl9fY29ubmVjdGlvbnMoKSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX2ZpbHRlcnMgbG9hZHMgdGhlIHByZSByb3V0aW5nIG1pZGRsZXdhcmUuXG4gICAgICovXG4gICAgX19maWx0ZXJzKGFwcCwgZGVmYXVsdHMpIHtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgU2NoZW1lUmVzb3VyY2UoXG4gICAgICAgICAgICBuZXcgUHJvcGVydHlSZXNvdXJjZSh0aGlzLmNvbnRleHQuZmlsdGVycykpO1xuXG4gICAgICAgIHJlc291cmNlLmFkZCgncmVxdWlyZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG4gICAgICAgIGFwcC51c2UodGhpcy5oYW5kbGVSZXF1ZXN0LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkZJTFRFUlMsIGRlZmF1bHRzKS5cbiAgICAgICAgZm9yRWFjaChmID0+IHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlciA9IHJlc291cmNlLmZpbmQoZik7XG5cbiAgICAgICAgICAgIGlmICghZmlsdGVyKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbmtub3duRmlsdGVyRXJyb3IodGhpcy5uYW1lLCBmKTtcblxuICAgICAgICAgICAgZmlsdGVyLmFwcGx5KGFwcCwgdGhpcy5jb25maWd1cmF0aW9uKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX19maWx0ZXJzKGFwcCwgWydwdWJsaWMnXSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX3JvdXRpbmcgc2V0cyB1cCB0aGUgcm91dGluZyBmb3IgdGhpcyBtb2R1bGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcG9pbnQgVGhlIG1vdW50IHBvaW50IG9mIHRoaXMgbW9kdWxlJ3MgcGFyZW50J3Mgcm91dGVyLlxuICAgICAqIEBwYXJhbSB7RnJhbWV3b3JrQXBwbGljYXRpb259IGFwcCBcbiAgICAgKiBAcGFyYW0ge2FycmF5PEFjdGlvbj59IGFjdGlvbnMgXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgX19yb3V0aW5nKG1vdW50UG9pbnQsIGFwcCwgYWN0aW9ucykge1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwcmV2ZW50Um91dGluZyBkaXNhYmxlcyByb3V0aW5nIGZvciB0aGlzIG1vZHVsZS5cbiAgICAgKiBGaWx0ZXJzIHdpbGwgc3RpbGwgYmUgYXBwbGllZCBidXQgdGhlIGNoYWluIHdpbGwgYmUgYmxvY2tlZCB0aGVyZS5cbiAgICAgKi9cbiAgICBwcmV2ZW50Um91dGluZygpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGhhbmRsZVJlcXVlc3QgaXMgY2FsbGVkIGJlZm9yZSBhbnkgb2YgdGhlIHJvdXRlcyBmb3IgdGhpc1xuICAgICAqIG1vZHVsZSBhcmUgYWN0aXZhdGVkLlxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxIFxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlcyBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZXh0IFxuICAgICAqL1xuICAgIGhhbmRsZVJlcXVlc3QocmVxLCByZXMsIG5leHQpIHtcblxuICAgICAgICBuZXh0KCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb2FkIHRoaXMgbW9kdWxlXG4gICAgICovXG4gICAgbG9hZChhcHApIHtcblxuICAgICAgICB0aGlzLl9faW5pdCgpO1xuICAgICAgICB0aGlzLl9fYXV0b2xvYWQoKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5fX2Nvbm5lY3Rpb25zKCkpLlxuICAgICAgICB0aGVuKCgpID0+IHRoaXMuYXBwbGljYXRpb24ub25Db25uZWN0ZWQoUG9vbCkpLlxuICAgICAgICB0aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5fX2ZpbHRlcnMoYXBwLCBbJ2RlZmF1bHQnXSk7XG4gICAgICAgICAgICB0aGlzLl9fZnJhbWV3b3JrKCk7XG4gICAgICAgICAgICB0aGlzLl9fcm91dGluZygnJywgYXBwLCBuZXcgQnVsa0FjdGlvbihbXG4gICAgICAgICAgICAgICAgbmV3IE1pZGRsZXdhcmVBY3Rpb24obmV3IFByb3BlcnR5UmVzb3VyY2UodGhpcy5jb250ZXh0Lm1pZGRsZXdhcmUpKSxcbiAgICAgICAgICAgICAgICBuZXcgQ29udHJvbGxlckFjdGlvbih0aGlzLmNvbnRleHQuY29udHJvbGxlcnMpLFxuICAgICAgICAgICAgICAgIG5ldyBWaWV3KHRoaXMudmlld0VuZ2luZSlcbiAgICAgICAgICAgIF0pKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2R1bGVcbiJdfQ==