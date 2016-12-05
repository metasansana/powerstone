'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _lodash = require('lodash.startswith');

var _lodash2 = _interopRequireDefault(_lodash);

var _Configuration = require('./Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

var _CompositeModule = require('./CompositeModule');

var _CompositeModule2 = _interopRequireDefault(_CompositeModule);

var _PropertyResource = require('./resource/PropertyResource');

var _PropertyResource2 = _interopRequireDefault(_PropertyResource);

var _RequireResource = require('./resource/RequireResource');

var _RequireResource2 = _interopRequireDefault(_RequireResource);

var _ModuleResource = require('./resource/ModuleResource');

var _ModuleResource2 = _interopRequireDefault(_ModuleResource);

var _SchemeResource = require('./resource/SchemeResource');

var _SchemeResource2 = _interopRequireDefault(_SchemeResource);

var _UnknownConnectorError = require('./UnknownConnectorError');

var _UnknownConnectorError2 = _interopRequireDefault(_UnknownConnectorError);

var _UnknownFilterError = require('./UnknownFilterError');

var _UnknownFilterError2 = _interopRequireDefault(_UnknownFilterError);

var _UnknownModuleError = require('./UnknownModuleError');

var _UnknownModuleError2 = _interopRequireDefault(_UnknownModuleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BASKET = {};
var BOX = [];

/**
 * Module
 * @abstract
 * @param {string} name
 * @param {Configuration} config
 * @param {Application} app
 * @param {Module} [parent]
 *
 * @property {string} name
 * @property {Configuration} configuration
 * @property {Application} application
 * @property {Module} parent
 * @property {CompositeModule} modules
 * @property {string} [configDirectory='apiconf']
 */

var Module = function () {
    function Module(name, config, app) {
        var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        _classCallCheck(this, Module);

        this.name = name;
        this.configuration = config;
        this.application = app;
        this.parent = parent;
        this.viewEngine = null;
        this.modules = new _CompositeModule2.default([]);
        this.configDirectory = 'apiconf';
        this.redirecting = false;
        this.redirectUrl = '';
        this.redirectStatus = 302;
    }

    _createClass(Module, [{
        key: 'preRouting',
        value: function preRouting(req, res, next) {

            if (this.redirecting) {
                res.writeHead(this.redirectStatus, { 'Location': this.redirectUrl });
                res.end();
                return;
            }

            next();
        }

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

            var submodule;
            var resource = new _SchemeResource2.default(new _ModuleResource2.default(this));

            var submodules = this.configuration.read(this.configuration.keys.MODULES, BOX);

            var prevented = this.configuration.read(this.configuration.keys.MODULES_PREVENTED, BOX);

            resource.add('require', new _RequireResource2.default());

            submodules.forEach(function (path) {

                submodule = resource.find(path);

                if (!submodule) throw new _UnknownModuleError2.default(path);

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

            var resource = new _SchemeResource2.default(new _RequireResource2.default());
            var autoloads;
            var autokey;
            var key;

            var o = {};
            o[this.configuration.keys.FILTERS] = 'filters';
            o[this.configuration.keys.MIDDLEWARE] = 'middleware';
            o[this.configuration.keys.CONTROLLERS] = 'controllers';

            resource.add('require', new _RequireResource2.default());

            [this.configuration.keys.FILTERS, this.configuration.keys.MIDDLEWARE, this.configuration.keys.CONTROLLERS].forEach(function (prefixedKey) {

                key = o[prefixedKey];
                autokey = 'power.autoload.' + key;
                autoloads = _this2.configuration.read(autokey, BASKET);

                Object.keys(autoloads).forEach(function (name) {
                    return _this2.app.context[key][name] = resource.find(autoloads[autokey]);
                });

                _this2.configuration.require(_this2.configuration.paths[key], _this2.application.context[key]);
            });

            this.modules.__autoload();
        }

        /**
         * __viewEngine configures the view engine for this module.
         * The parent view engine is used if none is configured.
         */

    }, {
        key: '__viewEngine',
        value: function __viewEngine() {

            var resource = new _SchemeResource2.default(new _RequireResource2.default());
            var factory = this.configuration.read(this.configuration.keys.VIEWS_ENGINE, null);

            if (!factory) return this.viewEngine = this.parent ? this.parent.viewEngine : null;

            this.viewEngine = factory.create(this);

            this.modules.__viewEngine();
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

            return Object.keys(connections).map(function (key) {

                config = connections[key];
                connector = require(config.connector).default;

                if (typeof connector !== 'function') throw new TypeError('Connector must be a function got \'' + (typeof connector === 'undefined' ? 'undefined' : _typeof(connector)) + '\'!');

                return connector(config.options).then(function (c) {
                    return _this3.application.context.connections[key] = c;
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

            var resource = new _SchemeResource2.default(new _PropertyResource2.default(this.application.context.filters));

            resource.add('require', new _RequireResource2.default());

            this.configuration.read(this.configuration.keys.FILTERS, defaults).forEach(function (f) {

                var filter = resource.find(f);

                if (!filter) throw new _UnknownFilterError2.default(_this4.name, f);

                filter.apply(app, _this4.configuration);
            });

            this.modules.__filters(app, ['public']);
        }

        /**
         * __routing sets up the routing for this module
         * @param {string} point The mount point of this module's parent's router.
         * @param {FrameworkApplication} app
         * @param {Resource} resource
         * @abstract
         */

    }, {
        key: '__routing',
        value: function __routing(mountPoint, app, resource) {}

        /**
         * redirect the routes of this module to a url
         * @param {string} url
         * @param {number} [status]
         */

    }, {
        key: 'redirect',
        value: function redirect(url) {
            var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 302;


            (0, _beof2.default)({ url: url }).string();
            (0, _beof2.default)({ status: status }).number();

            this.redirecting = true;
            this.redirectUrl = url;
            this.redirectStatus = status;
        }

        /**
         * stopRedirecting disables redirecting
         */

    }, {
        key: 'stopRedirecting',
        value: function stopRedirecting() {

            this.redirecting = false;
        }

        /**
         * path returns the logical application path for this module.
         * That is, the path routes are mounted to by default.
         * @returns {string}
         */

    }, {
        key: 'path',
        value: function path() {

            if (!this.parent) return '/';
            return _path2.default.join(this.parent.path(), this.name);
        }

        /**
         * isChild checks if a path is a child module of this module
         * @param {string} path
         */

    }, {
        key: 'isChild',
        value: function isChild(path) {

            return (0, _lodash2.default)(path, this.path());
        }

        /**
         * find retrieves a module or null if it is not found.
         * @param {string} path
         * @returns {Module|null}
         */

    }, {
        key: 'find',
        value: function find(path) {

            (0, _beof2.default)({ path: path }).string();

            if (path === this.path()) return this;

            if (this.isChild(path)) return this.modules.find(path);

            if (this.parent) return this.parent.find(path);

            return null;
        }

        /**
         * connect
         */

    }, {
        key: 'connect',
        value: function connect() {
            var _this5 = this;

            this.__init();

            return Promise.all(this.__connections()).then(function () {
                return _this5.parent === null ? _this5.application.onServiceListener.onConnected(_this5.application) : null;
            });
        }

        /**
         * load this module
         */

    }, {
        key: 'load',
        value: function load(app) {
            var _this6 = this;

            return this.connect().then(function () {

                var resource;
                var scheme = new _SchemeResource2.default(new _RequireResource2.default());

                _this6.__autoload();
                _this6.__filters(app, ['default']);
                _this6.__framework();
                _this6.__viewEngine();

                scheme.add('module', new _RequireResource2.default(_this6.configuration.paths.root));

                resource = new _PropertyResource2.default(_this6.application.context.middleware);
                resource = resource.or(new _PropertyResource2.default(_this6.application.context.controllers)).or(scheme);

                _this6.__routing('', app, resource);
            });
        }
    }]);

    return Module;
}();

exports.default = Module;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkJBU0tFVCIsIkJPWCIsIk1vZHVsZSIsIm5hbWUiLCJjb25maWciLCJhcHAiLCJwYXJlbnQiLCJjb25maWd1cmF0aW9uIiwiYXBwbGljYXRpb24iLCJ2aWV3RW5naW5lIiwibW9kdWxlcyIsImNvbmZpZ0RpcmVjdG9yeSIsInJlZGlyZWN0aW5nIiwicmVkaXJlY3RVcmwiLCJyZWRpcmVjdFN0YXR1cyIsInJlcSIsInJlcyIsIm5leHQiLCJ3cml0ZUhlYWQiLCJlbmQiLCJ2aWV3Iiwic3VibW9kdWxlIiwicmVzb3VyY2UiLCJzdWJtb2R1bGVzIiwicmVhZCIsImtleXMiLCJNT0RVTEVTIiwicHJldmVudGVkIiwiTU9EVUxFU19QUkVWRU5URUQiLCJhZGQiLCJmb3JFYWNoIiwiZmluZCIsInBhdGgiLCJpbmRleE9mIiwicHJldmVudFJvdXRpbmciLCJfX2luaXQiLCJhdXRvbG9hZHMiLCJhdXRva2V5Iiwia2V5IiwibyIsIkZJTFRFUlMiLCJNSURETEVXQVJFIiwiQ09OVFJPTExFUlMiLCJwcmVmaXhlZEtleSIsIk9iamVjdCIsImNvbnRleHQiLCJyZXF1aXJlIiwicGF0aHMiLCJfX2F1dG9sb2FkIiwiZmFjdG9yeSIsIlZJRVdTX0VOR0lORSIsImNyZWF0ZSIsIl9fdmlld0VuZ2luZSIsImNvbm5lY3RvciIsImNvbm5lY3Rpb25zIiwiQ09OTkVDVElPTlMiLCJtYXAiLCJkZWZhdWx0IiwiVHlwZUVycm9yIiwib3B0aW9ucyIsInRoZW4iLCJjIiwiY29uY2F0IiwiX19jb25uZWN0aW9ucyIsImRlZmF1bHRzIiwiZmlsdGVycyIsImZpbHRlciIsImYiLCJhcHBseSIsIl9fZmlsdGVycyIsIm1vdW50UG9pbnQiLCJ1cmwiLCJzdGF0dXMiLCJzdHJpbmciLCJudW1iZXIiLCJqb2luIiwiaXNDaGlsZCIsIlByb21pc2UiLCJhbGwiLCJvblNlcnZpY2VMaXN0ZW5lciIsIm9uQ29ubmVjdGVkIiwiY29ubmVjdCIsInNjaGVtZSIsIl9fZnJhbWV3b3JrIiwicm9vdCIsIm1pZGRsZXdhcmUiLCJvciIsImNvbnRyb2xsZXJzIiwiX19yb3V0aW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLFNBQVMsRUFBZjtBQUNBLElBQU1DLE1BQU0sRUFBWjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztJQWVNQyxNO0FBRUYsb0JBQVlDLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCQyxHQUExQixFQUE4QztBQUFBLFlBQWZDLE1BQWUsdUVBQU4sSUFBTTs7QUFBQTs7QUFFMUMsYUFBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS0ksYUFBTCxHQUFxQkgsTUFBckI7QUFDQSxhQUFLSSxXQUFMLEdBQW1CSCxHQUFuQjtBQUNBLGFBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtHLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxhQUFLQyxPQUFMLEdBQWUsOEJBQW9CLEVBQXBCLENBQWY7QUFDQSxhQUFLQyxlQUFMLEdBQXVCLFNBQXZCO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQixLQUFuQjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxhQUFLQyxjQUFMLEdBQXNCLEdBQXRCO0FBRUg7Ozs7bUNBRVVDLEcsRUFBS0MsRyxFQUFLQyxJLEVBQU07O0FBRXZCLGdCQUFJLEtBQUtMLFdBQVQsRUFBc0I7QUFDbEJJLG9CQUFJRSxTQUFKLENBQWMsS0FBS0osY0FBbkIsRUFBbUMsRUFBRSxZQUFZLEtBQUtELFdBQW5CLEVBQW5DO0FBQ0FHLG9CQUFJRyxHQUFKO0FBQ0E7QUFFSDs7QUFFREY7QUFHSDs7QUFFRDs7Ozs7Ozs7O3VDQU1lRyxJLEVBQU0sQ0FFcEI7O0FBRUQ7Ozs7OztpQ0FHUztBQUFBOztBQUVMLGdCQUFJQyxTQUFK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QVcsUUFBWCxFQUFxQiw4QkFBb0IsT0FBS3RCLGFBQUwsQ0FBbUJ3QyxLQUFuQixDQUF5QnFDLElBQTdDLENBQXJCOztBQUVBOUQsMkJBQVcsK0JBQXFCLE9BQUtkLFdBQUwsQ0FBaUJxQyxPQUFqQixDQUF5QndDLFVBQTlDLENBQVg7QUFDQS9ELDJCQUFXQSxTQUFTZ0UsRUFBVCxDQUFZLCtCQUFxQixPQUFLOUUsV0FBTCxDQUFpQnFDLE9BQWpCLENBQXlCMEMsV0FBOUMsQ0FBWixFQUNYRCxFQURXLENBQ1JKLE1BRFEsQ0FBWDs7QUFHQSx1QkFBS00sU0FBTCxDQUFlLEVBQWYsRUFBbUJuRixHQUFuQixFQUF3QmlCLFFBQXhCO0FBRUgsYUFuQk0sQ0FBUDtBQXFCSDs7Ozs7O2tCQUlVcEIsTSIsImZpbGUiOiJNb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IHN0YXJ0c3dpdGggZnJvbSAnbG9kYXNoLnN0YXJ0c3dpdGgnO1xuaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi9Db25maWd1cmF0aW9uJztcbmltcG9ydCBDb21wb3NpdGVNb2R1bGUgZnJvbSAnLi9Db21wb3NpdGVNb2R1bGUnO1xuaW1wb3J0IFByb3BlcnR5UmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9Qcm9wZXJ0eVJlc291cmNlJztcbmltcG9ydCBSZXF1aXJlUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9SZXF1aXJlUmVzb3VyY2UnO1xuaW1wb3J0IE1vZHVsZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvTW9kdWxlUmVzb3VyY2UnO1xuaW1wb3J0IFNjaGVtZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvU2NoZW1lUmVzb3VyY2UnO1xuaW1wb3J0IFVua25vd25Db25uZWN0b3JFcnJvciBmcm9tICcuL1Vua25vd25Db25uZWN0b3JFcnJvcic7XG5pbXBvcnQgVW5rbm93bkZpbHRlckVycm9yIGZyb20gJy4vVW5rbm93bkZpbHRlckVycm9yJztcbmltcG9ydCBVbmtub3duTW9kdWxlRXJyb3IgZnJvbSAnLi9Vbmtub3duTW9kdWxlRXJyb3InO1xuXG5jb25zdCBCQVNLRVQgPSB7fTtcbmNvbnN0IEJPWCA9IFtdO1xuXG4vKipcbiAqIE1vZHVsZVxuICogQGFic3RyYWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtDb25maWd1cmF0aW9ufSBjb25maWdcbiAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcFxuICogQHBhcmFtIHtNb2R1bGV9IFtwYXJlbnRdXG4gKlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7Q29uZmlndXJhdGlvbn0gY29uZmlndXJhdGlvblxuICogQHByb3BlcnR5IHtBcHBsaWNhdGlvbn0gYXBwbGljYXRpb25cbiAqIEBwcm9wZXJ0eSB7TW9kdWxlfSBwYXJlbnRcbiAqIEBwcm9wZXJ0eSB7Q29tcG9zaXRlTW9kdWxlfSBtb2R1bGVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2NvbmZpZ0RpcmVjdG9yeT0nYXBpY29uZiddXG4gKi9cbmNsYXNzIE1vZHVsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjb25maWcsIGFwcCwgcGFyZW50ID0gbnVsbCkge1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IGNvbmZpZztcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbiA9IGFwcDtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMudmlld0VuZ2luZSA9IG51bGw7XG4gICAgICAgIHRoaXMubW9kdWxlcyA9IG5ldyBDb21wb3NpdGVNb2R1bGUoW10pO1xuICAgICAgICB0aGlzLmNvbmZpZ0RpcmVjdG9yeSA9ICdhcGljb25mJztcbiAgICAgICAgdGhpcy5yZWRpcmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlZGlyZWN0VXJsID0gJyc7XG4gICAgICAgIHRoaXMucmVkaXJlY3RTdGF0dXMgPSAzMDI7XG5cbiAgICB9XG5cbiAgICBwcmVSb3V0aW5nKHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgICAgICAgaWYgKHRoaXMucmVkaXJlY3RpbmcpIHtcbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQodGhpcy5yZWRpcmVjdFN0YXR1cywgeyAnTG9jYXRpb24nOiB0aGlzLnJlZGlyZWN0VXJsIH0pO1xuICAgICAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICBuZXh0KCk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fdmlld0NhbGxiYWNrIHByb3ZpZGVzIGEgY2FsbGJhY2sgdGhhdCB3aWxsXG4gICAgICogaGFuZGxlIHZpZXcgZGVjbGFyYXRpb25zLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3IFRoZSB2aWV3IHRlbXBsYXRlXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgX192aWV3Q2FsbGJhY2sodmlldykge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19pbml0IGluaXRpYWxpemVzIHRoaXMgbW9kdWxlIGFuZCBpdHMgc3VibW9kdWxlc1xuICAgICAqL1xuICAgIF9faW5pdCgpIHtcblxuICAgICAgICB2YXIgc3VibW9kdWxlO1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgU2NoZW1lUmVzb3VyY2UobmV3IE1vZHVsZVJlc291cmNlKHRoaXMpKTtcblxuICAgICAgICB2YXIgc3VibW9kdWxlcyA9IHRoaXMuY29uZmlndXJhdGlvbi5cbiAgICAgICAgcmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5NT0RVTEVTLCBCT1gpO1xuXG4gICAgICAgIHZhciBwcmV2ZW50ZWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZChcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLk1PRFVMRVNfUFJFVkVOVEVELCBCT1gpO1xuXG4gICAgICAgIHJlc291cmNlLmFkZCgncmVxdWlyZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG5cbiAgICAgICAgc3VibW9kdWxlcy5cbiAgICAgICAgZm9yRWFjaChwYXRoID0+IHtcblxuICAgICAgICAgICAgc3VibW9kdWxlID0gcmVzb3VyY2UuZmluZChwYXRoKTtcblxuICAgICAgICAgICAgaWYgKCFzdWJtb2R1bGUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25Nb2R1bGVFcnJvcihwYXRoKTtcblxuICAgICAgICAgICAgaWYgKHByZXZlbnRlZC5pbmRleE9mKHN1Ym1vZHVsZS5uYW1lKSA+IC0xKVxuICAgICAgICAgICAgICAgIHN1Ym1vZHVsZS5wcmV2ZW50Um91dGluZygpO1xuXG4gICAgICAgICAgICB0aGlzLm1vZHVsZXMuYWRkKHN1Ym1vZHVsZSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9faW5pdCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19hdXRvbG9hZCB0aGUgYXV0b2xvYWRhYmxlIGFzcGVjdHMgb2YgdGhlIHN5c3RlbVxuICAgICAqL1xuICAgIF9fYXV0b2xvYWQoKSB7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gbmV3IFNjaGVtZVJlc291cmNlKG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG4gICAgICAgIHZhciBhdXRvbG9hZHM7XG4gICAgICAgIHZhciBhdXRva2V5O1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIHZhciBvID0ge307XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuRklMVEVSU10gPSAnZmlsdGVycyc7XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuTUlERExFV0FSRV0gPSAnbWlkZGxld2FyZSc7XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OVFJPTExFUlNdID0gJ2NvbnRyb2xsZXJzJztcblxuICAgICAgICByZXNvdXJjZS5hZGQoJ3JlcXVpcmUnLCBuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuXG4gICAgICAgIFtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkZJTFRFUlMsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5NSURETEVXQVJFLFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OVFJPTExFUlNcbiAgICAgICAgXS5cbiAgICAgICAgZm9yRWFjaChwcmVmaXhlZEtleSA9PiB7XG5cbiAgICAgICAgICAgIGtleSA9IG9bcHJlZml4ZWRLZXldO1xuICAgICAgICAgICAgYXV0b2tleSA9IGBwb3dlci5hdXRvbG9hZC4ke2tleX1gO1xuICAgICAgICAgICAgYXV0b2xvYWRzID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQoYXV0b2tleSwgQkFTS0VUKTtcblxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXV0b2xvYWRzKS5mb3JFYWNoKG5hbWUgPT5cbiAgICAgICAgICAgICAgICB0aGlzLmFwcC5jb250ZXh0W2tleV1bbmFtZV0gPSByZXNvdXJjZS5maW5kKGF1dG9sb2Fkc1thdXRva2V5XSkpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ucmVxdWlyZSh0aGlzLmNvbmZpZ3VyYXRpb24ucGF0aHNba2V5XSwgdGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0W2tleV0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kdWxlcy5fX2F1dG9sb2FkKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX3ZpZXdFbmdpbmUgY29uZmlndXJlcyB0aGUgdmlldyBlbmdpbmUgZm9yIHRoaXMgbW9kdWxlLlxuICAgICAqIFRoZSBwYXJlbnQgdmlldyBlbmdpbmUgaXMgdXNlZCBpZiBub25lIGlzIGNvbmZpZ3VyZWQuXG4gICAgICovXG4gICAgX192aWV3RW5naW5lKCkge1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuICAgICAgICB2YXIgZmFjdG9yeSA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLlZJRVdTX0VOR0lORSwgbnVsbCk7XG5cbiAgICAgICAgaWYgKCFmYWN0b3J5KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlld0VuZ2luZSA9ICh0aGlzLnBhcmVudCkgPyB0aGlzLnBhcmVudC52aWV3RW5naW5lIDogbnVsbDtcblxuICAgICAgICB0aGlzLnZpZXdFbmdpbmUgPSBmYWN0b3J5LmNyZWF0ZSh0aGlzKTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX192aWV3RW5naW5lKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX2ZyYW1ld29yayBwZXJmb3JtcyBmcmFtZXdvcmsgc3BlY2lmaWMgYWN0aW9uc1xuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIF9fZnJhbWV3b3JrKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19jb25uZWN0aW9ucyBlc3RhYmxpc2hlcyB0aGUgY29ubmVjdGlvbnMgZGVjbGVhcmVkIGluIHRoZSBjb25maWcgZmlsZS5cbiAgICAgKiBAcmV0dXJuIHthcnJheTxQcm9taXNlPn1cbiAgICAgKi9cbiAgICBfX2Nvbm5lY3Rpb25zKCkge1xuXG4gICAgICAgIHZhciBjb25maWc7XG4gICAgICAgIHZhciBjb25uZWN0b3I7XG4gICAgICAgIHZhciBjb25uZWN0aW9ucyA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTk5FQ1RJT05TLCBCQVNLRVQpO1xuXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb25uZWN0aW9ucykuXG4gICAgICAgIG1hcChrZXkgPT4ge1xuXG4gICAgICAgICAgICBjb25maWcgPSBjb25uZWN0aW9uc1trZXldO1xuICAgICAgICAgICAgY29ubmVjdG9yID0gcmVxdWlyZShjb25maWcuY29ubmVjdG9yKS5kZWZhdWx0O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbm5lY3RvciAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBDb25uZWN0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uIGdvdCAnJHt0eXBlb2YgY29ubmVjdG9yfSchYCk7XG5cbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0b3IoY29uZmlnLm9wdGlvbnMpLnRoZW4oYyA9PiB0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHQuY29ubmVjdGlvbnNba2V5XSA9IGMpO1xuXG4gICAgICAgIH0pLmNvbmNhdCh0aGlzLm1vZHVsZXMuX19jb25uZWN0aW9ucygpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fZmlsdGVycyBsb2FkcyB0aGUgcHJlIHJvdXRpbmcgbWlkZGxld2FyZS5cbiAgICAgKi9cbiAgICBfX2ZpbHRlcnMoYXBwLCBkZWZhdWx0cykge1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShcbiAgICAgICAgICAgIG5ldyBQcm9wZXJ0eVJlc291cmNlKHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5maWx0ZXJzKSk7XG5cbiAgICAgICAgcmVzb3VyY2UuYWRkKCdyZXF1aXJlJywgbmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcblxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5GSUxURVJTLCBkZWZhdWx0cykuXG4gICAgICAgIGZvckVhY2goZiA9PiB7XG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXIgPSByZXNvdXJjZS5maW5kKGYpO1xuXG4gICAgICAgICAgICBpZiAoIWZpbHRlcilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVW5rbm93bkZpbHRlckVycm9yKHRoaXMubmFtZSwgZik7XG5cbiAgICAgICAgICAgIGZpbHRlci5hcHBseShhcHAsIHRoaXMuY29uZmlndXJhdGlvbik7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9fZmlsdGVycyhhcHAsIFsncHVibGljJ10pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19yb3V0aW5nIHNldHMgdXAgdGhlIHJvdXRpbmcgZm9yIHRoaXMgbW9kdWxlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBvaW50IFRoZSBtb3VudCBwb2ludCBvZiB0aGlzIG1vZHVsZSdzIHBhcmVudCdzIHJvdXRlci5cbiAgICAgKiBAcGFyYW0ge0ZyYW1ld29ya0FwcGxpY2F0aW9ufSBhcHBcbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlfSByZXNvdXJjZVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIF9fcm91dGluZyhtb3VudFBvaW50LCBhcHAsIHJlc291cmNlKSB7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlZGlyZWN0IHRoZSByb3V0ZXMgb2YgdGhpcyBtb2R1bGUgdG8gYSB1cmxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtzdGF0dXNdXG4gICAgICovXG4gICAgcmVkaXJlY3QodXJsLCBzdGF0dXMgPSAzMDIpIHtcblxuICAgICAgICBiZW9mKHsgdXJsIH0pLnN0cmluZygpO1xuICAgICAgICBiZW9mKHsgc3RhdHVzIH0pLm51bWJlcigpO1xuXG4gICAgICAgIHRoaXMucmVkaXJlY3RpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlZGlyZWN0VXJsID0gdXJsO1xuICAgICAgICB0aGlzLnJlZGlyZWN0U3RhdHVzID0gc3RhdHVzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc3RvcFJlZGlyZWN0aW5nIGRpc2FibGVzIHJlZGlyZWN0aW5nXG4gICAgICovXG4gICAgc3RvcFJlZGlyZWN0aW5nKCkge1xuXG4gICAgICAgIHRoaXMucmVkaXJlY3RpbmcgPSBmYWxzZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBhdGggcmV0dXJucyB0aGUgbG9naWNhbCBhcHBsaWNhdGlvbiBwYXRoIGZvciB0aGlzIG1vZHVsZS5cbiAgICAgKiBUaGF0IGlzLCB0aGUgcGF0aCByb3V0ZXMgYXJlIG1vdW50ZWQgdG8gYnkgZGVmYXVsdC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHBhdGgoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnBhcmVudCkgcmV0dXJuICcvJztcbiAgICAgICAgcmV0dXJuIFBhdGguam9pbih0aGlzLnBhcmVudC5wYXRoKCksIHRoaXMubmFtZSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpc0NoaWxkIGNoZWNrcyBpZiBhIHBhdGggaXMgYSBjaGlsZCBtb2R1bGUgb2YgdGhpcyBtb2R1bGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqL1xuICAgIGlzQ2hpbGQocGF0aCkge1xuXG4gICAgICAgIHJldHVybiBzdGFydHN3aXRoKHBhdGgsIHRoaXMucGF0aCgpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGZpbmQgcmV0cmlldmVzIGEgbW9kdWxlIG9yIG51bGwgaWYgaXQgaXMgbm90IGZvdW5kLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHJldHVybnMge01vZHVsZXxudWxsfVxuICAgICAqL1xuICAgIGZpbmQocGF0aCkge1xuXG4gICAgICAgIGJlb2YoeyBwYXRoIH0pLnN0cmluZygpO1xuXG4gICAgICAgIGlmIChwYXRoID09PSB0aGlzLnBhdGgoKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmICh0aGlzLmlzQ2hpbGQocGF0aCkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2R1bGVzLmZpbmQocGF0aCk7XG5cbiAgICAgICAgaWYgKHRoaXMucGFyZW50KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmZpbmQocGF0aCk7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb25uZWN0XG4gICAgICovXG4gICAgY29ubmVjdCgpIHtcblxuICAgICAgICB0aGlzLl9faW5pdCgpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLl9fY29ubmVjdGlvbnMoKSkuXG4gICAgICAgIHRoZW4oKCkgPT4gKHRoaXMucGFyZW50ID09PSBudWxsKSA/XG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLm9uU2VydmljZUxpc3RlbmVyLm9uQ29ubmVjdGVkKHRoaXMuYXBwbGljYXRpb24pIDpcbiAgICAgICAgICAgIG51bGwpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9hZCB0aGlzIG1vZHVsZVxuICAgICAqL1xuICAgIGxvYWQoYXBwKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdCgpLlxuICAgICAgICB0aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdmFyIHJlc291cmNlO1xuICAgICAgICAgICAgdmFyIHNjaGVtZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuXG4gICAgICAgICAgICB0aGlzLl9fYXV0b2xvYWQoKTtcbiAgICAgICAgICAgIHRoaXMuX19maWx0ZXJzKGFwcCwgWydkZWZhdWx0J10pO1xuICAgICAgICAgICAgdGhpcy5fX2ZyYW1ld29yaygpO1xuICAgICAgICAgICAgdGhpcy5fX3ZpZXdFbmdpbmUoKTtcblxuICAgICAgICAgICAgc2NoZW1lLmFkZCgnbW9kdWxlJywgbmV3IFJlcXVpcmVSZXNvdXJjZSh0aGlzLmNvbmZpZ3VyYXRpb24ucGF0aHMucm9vdCkpO1xuXG4gICAgICAgICAgICByZXNvdXJjZSA9IG5ldyBQcm9wZXJ0eVJlc291cmNlKHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5taWRkbGV3YXJlKTtcbiAgICAgICAgICAgIHJlc291cmNlID0gcmVzb3VyY2Uub3IobmV3IFByb3BlcnR5UmVzb3VyY2UodGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0LmNvbnRyb2xsZXJzKSkuXG4gICAgICAgICAgICBvcihzY2hlbWUpO1xuXG4gICAgICAgICAgICB0aGlzLl9fcm91dGluZygnJywgYXBwLCByZXNvdXJjZSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kdWxlXG4iXX0=