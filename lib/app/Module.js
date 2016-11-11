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
            o[this.configuration.keys.CONNECTORS] = 'connectors';
            o[this.configuration.keys.FILTERS] = 'filters';
            o[this.configuration.keys.MIDDLEWARE] = 'middleware';
            o[this.configuration.keys.CONTROLLERS] = 'controllers';

            resource.add('require', new _RequireResource2.default());

            [this.configuration.keys.CONNECTORS, this.configuration.keys.FILTERS, this.configuration.keys.MIDDLEWARE, this.configuration.keys.CONTROLLERS].forEach(function (prefixedKey) {

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
            var resource = new _PropertyResource2.default(this.application.context.connectors);

            return Object.keys(connections).map(function (key) {

                config = connections[key];
                connector = resource.find(config.connector);

                if (!connector) throw new _UnknownConnectorError2.default(key, config.connector, _this3.application.context.connectors);

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
            this.__autoload();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkJBU0tFVCIsIkJPWCIsIk1vZHVsZSIsIm5hbWUiLCJjb25maWciLCJhcHAiLCJwYXJlbnQiLCJjb25maWd1cmF0aW9uIiwiYXBwbGljYXRpb24iLCJ2aWV3RW5naW5lIiwibW9kdWxlcyIsImNvbmZpZ0RpcmVjdG9yeSIsInJlZGlyZWN0aW5nIiwicmVkaXJlY3RVcmwiLCJyZWRpcmVjdFN0YXR1cyIsInJlcSIsInJlcyIsIm5leHQiLCJ3cml0ZUhlYWQiLCJlbmQiLCJ2aWV3Iiwic3VibW9kdWxlIiwicmVzb3VyY2UiLCJzdWJtb2R1bGVzIiwicmVhZCIsImtleXMiLCJNT0RVTEVTIiwicHJldmVudGVkIiwiTU9EVUxFU19QUkVWRU5URUQiLCJhZGQiLCJmb3JFYWNoIiwiZmluZCIsInBhdGgiLCJpbmRleE9mIiwicHJldmVudFJvdXRpbmciLCJfX2luaXQiLCJhdXRvbG9hZHMiLCJhdXRva2V5Iiwia2V5IiwibyIsIkNPTk5FQ1RPUlMiLCJGSUxURVJTIiwiTUlERExFV0FSRSIsIkNPTlRST0xMRVJTIiwicHJlZml4ZWRLZXkiLCJPYmplY3QiLCJjb250ZXh0IiwicmVxdWlyZSIsInBhdGhzIiwiX19hdXRvbG9hZCIsImZhY3RvcnkiLCJWSUVXU19FTkdJTkUiLCJjcmVhdGUiLCJfX3ZpZXdFbmdpbmUiLCJjb25uZWN0b3IiLCJjb25uZWN0aW9ucyIsIkNPTk5FQ1RJT05TIiwiY29ubmVjdG9ycyIsIm1hcCIsIlR5cGVFcnJvciIsIm9wdGlvbnMiLCJ0aGVuIiwiYyIsImNvbmNhdCIsIl9fY29ubmVjdGlvbnMiLCJkZWZhdWx0cyIsImZpbHRlcnMiLCJmaWx0ZXIiLCJmIiwiYXBwbHkiLCJfX2ZpbHRlcnMiLCJtb3VudFBvaW50IiwidXJsIiwic3RhdHVzIiwic3RyaW5nIiwibnVtYmVyIiwiam9pbiIsImlzQ2hpbGQiLCJQcm9taXNlIiwiYWxsIiwib25TZXJ2aWNlTGlzdGVuZXIiLCJvbkNvbm5lY3RlZCIsImNvbm5lY3QiLCJzY2hlbWUiLCJfX2ZyYW1ld29yayIsInJvb3QiLCJtaWRkbGV3YXJlIiwib3IiLCJjb250cm9sbGVycyIsIl9fcm91dGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLEVBQWY7QUFDQSxJQUFNQyxNQUFNLEVBQVo7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlTUMsTTtBQUVGLG9CQUFZQyxJQUFaLEVBQWtCQyxNQUFsQixFQUEwQkMsR0FBMUIsRUFBOEM7QUFBQSxZQUFmQyxNQUFlLHVFQUFOLElBQU07O0FBQUE7O0FBRTFDLGFBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtJLGFBQUwsR0FBcUJILE1BQXJCO0FBQ0EsYUFBS0ksV0FBTCxHQUFtQkgsR0FBbkI7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLRyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsYUFBS0MsT0FBTCxHQUFlLDhCQUFvQixFQUFwQixDQUFmO0FBQ0EsYUFBS0MsZUFBTCxHQUF1QixTQUF2QjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsYUFBS0MsY0FBTCxHQUFzQixHQUF0QjtBQUVIOzs7O21DQUVVQyxHLEVBQUtDLEcsRUFBS0MsSSxFQUFNOztBQUV2QixnQkFBSSxLQUFLTCxXQUFULEVBQXNCO0FBQ2xCSSxvQkFBSUUsU0FBSixDQUFjLEtBQUtKLGNBQW5CLEVBQW1DLEVBQUUsWUFBWSxLQUFLRCxXQUFuQixFQUFuQztBQUNBRyxvQkFBSUcsR0FBSjtBQUNBO0FBRUg7O0FBRURGO0FBR0g7O0FBRUQ7Ozs7Ozs7Ozt1Q0FNZUcsSSxFQUFNLENBRXBCOztBQUVEOzs7Ozs7aUNBR1M7QUFBQTs7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QUFqQixDQUFtQ0MsV0FBbkMsQ0FBK0MsT0FBS3pFLFdBQXBELENBRE8sR0FFUCxJQUZDO0FBQUEsYUFERSxDQUFQO0FBS0g7O0FBRUQ7Ozs7Ozs2QkFHS0gsRyxFQUFLO0FBQUE7O0FBRWIsbUJBQWEsS0FBSzZFLE9BQUwsR0FDTnJCLElBRE0sQ0FDRCxZQUFNOztBQUVQLG9CQUFJdkMsUUFBSjtBQUNBLG9CQUFJNkQsU0FBUyw2QkFBbUIsK0JBQW5CLENBQWI7O0FBRUEsdUJBQUtiLFNBQUwsQ0FBZWpFLEdBQWYsRUFBb0IsQ0FBQyxTQUFELENBQXBCO0FBQ0EsdUJBQUsrRSxXQUFMO0FBQ0EsdUJBQUsvQixZQUFMOztBQUVBOEIsdUJBQU90RCxHQUFQLENBQVcsUUFBWCxFQUFxQiw4QkFBb0IsT0FBS3RCLGFBQUwsQ0FBbUJ5QyxLQUFuQixDQUF5QnFDLElBQTdDLENBQXJCOztBQUVBL0QsMkJBQVcsK0JBQXFCLE9BQUtkLFdBQUwsQ0FBaUJzQyxPQUFqQixDQUF5QndDLFVBQTlDLENBQVg7QUFDQWhFLDJCQUFXQSxTQUFTaUUsRUFBVCxDQUFZLCtCQUFxQixPQUFLL0UsV0FBTCxDQUFpQnNDLE9BQWpCLENBQXlCMEMsV0FBOUMsQ0FBWixFQUNYRCxFQURXLENBQ1JKLE1BRFEsQ0FBWDs7QUFHQSx1QkFBS00sU0FBTCxDQUFlLEVBQWYsRUFBbUJwRixHQUFuQixFQUF3QmlCLFFBQXhCO0FBRUgsYUFsQkssQ0FBYjtBQW9CSTs7Ozs7O2tCQUlVcEIsTSIsImZpbGUiOiJNb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IHN0YXJ0c3dpdGggZnJvbSAnbG9kYXNoLnN0YXJ0c3dpdGgnO1xuaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi9Db25maWd1cmF0aW9uJztcbmltcG9ydCBDb21wb3NpdGVNb2R1bGUgZnJvbSAnLi9Db21wb3NpdGVNb2R1bGUnO1xuaW1wb3J0IFByb3BlcnR5UmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9Qcm9wZXJ0eVJlc291cmNlJztcbmltcG9ydCBSZXF1aXJlUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9SZXF1aXJlUmVzb3VyY2UnO1xuaW1wb3J0IE1vZHVsZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvTW9kdWxlUmVzb3VyY2UnO1xuaW1wb3J0IFNjaGVtZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvU2NoZW1lUmVzb3VyY2UnO1xuaW1wb3J0IFVua25vd25Db25uZWN0b3JFcnJvciBmcm9tICcuL1Vua25vd25Db25uZWN0b3JFcnJvcic7XG5pbXBvcnQgVW5rbm93bkZpbHRlckVycm9yIGZyb20gJy4vVW5rbm93bkZpbHRlckVycm9yJztcbmltcG9ydCBVbmtub3duTW9kdWxlRXJyb3IgZnJvbSAnLi9Vbmtub3duTW9kdWxlRXJyb3InO1xuXG5jb25zdCBCQVNLRVQgPSB7fTtcbmNvbnN0IEJPWCA9IFtdO1xuXG4vKipcbiAqIE1vZHVsZVxuICogQGFic3RyYWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtDb25maWd1cmF0aW9ufSBjb25maWdcbiAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcFxuICogQHBhcmFtIHtNb2R1bGV9IFtwYXJlbnRdXG4gKlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7Q29uZmlndXJhdGlvbn0gY29uZmlndXJhdGlvblxuICogQHByb3BlcnR5IHtBcHBsaWNhdGlvbn0gYXBwbGljYXRpb25cbiAqIEBwcm9wZXJ0eSB7TW9kdWxlfSBwYXJlbnRcbiAqIEBwcm9wZXJ0eSB7Q29tcG9zaXRlTW9kdWxlfSBtb2R1bGVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2NvbmZpZ0RpcmVjdG9yeT0nYXBpY29uZiddXG4gKi9cbmNsYXNzIE1vZHVsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjb25maWcsIGFwcCwgcGFyZW50ID0gbnVsbCkge1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IGNvbmZpZztcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbiA9IGFwcDtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMudmlld0VuZ2luZSA9IG51bGw7XG4gICAgICAgIHRoaXMubW9kdWxlcyA9IG5ldyBDb21wb3NpdGVNb2R1bGUoW10pO1xuICAgICAgICB0aGlzLmNvbmZpZ0RpcmVjdG9yeSA9ICdhcGljb25mJztcbiAgICAgICAgdGhpcy5yZWRpcmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlZGlyZWN0VXJsID0gJyc7XG4gICAgICAgIHRoaXMucmVkaXJlY3RTdGF0dXMgPSAzMDI7XG5cbiAgICB9XG5cbiAgICBwcmVSb3V0aW5nKHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgICAgICAgaWYgKHRoaXMucmVkaXJlY3RpbmcpIHtcbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQodGhpcy5yZWRpcmVjdFN0YXR1cywgeyAnTG9jYXRpb24nOiB0aGlzLnJlZGlyZWN0VXJsIH0pO1xuICAgICAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICBuZXh0KCk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fdmlld0NhbGxiYWNrIHByb3ZpZGVzIGEgY2FsbGJhY2sgdGhhdCB3aWxsXG4gICAgICogaGFuZGxlIHZpZXcgZGVjbGFyYXRpb25zLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3IFRoZSB2aWV3IHRlbXBsYXRlXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgX192aWV3Q2FsbGJhY2sodmlldykge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19pbml0IGluaXRpYWxpemVzIHRoaXMgbW9kdWxlIGFuZCBpdHMgc3VibW9kdWxlc1xuICAgICAqL1xuICAgIF9faW5pdCgpIHtcblxuICAgICAgICB2YXIgc3VibW9kdWxlO1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgU2NoZW1lUmVzb3VyY2UobmV3IE1vZHVsZVJlc291cmNlKHRoaXMpKTtcblxuICAgICAgICB2YXIgc3VibW9kdWxlcyA9IHRoaXMuY29uZmlndXJhdGlvbi5cbiAgICAgICAgcmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5NT0RVTEVTLCBCT1gpO1xuXG4gICAgICAgIHZhciBwcmV2ZW50ZWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZChcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLk1PRFVMRVNfUFJFVkVOVEVELCBCT1gpO1xuXG4gICAgICAgIHJlc291cmNlLmFkZCgncmVxdWlyZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG5cbiAgICAgICAgc3VibW9kdWxlcy5cbiAgICAgICAgZm9yRWFjaChwYXRoID0+IHtcblxuICAgICAgICAgICAgc3VibW9kdWxlID0gcmVzb3VyY2UuZmluZChwYXRoKTtcblxuICAgICAgICAgICAgaWYgKCFzdWJtb2R1bGUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25Nb2R1bGVFcnJvcihwYXRoKTtcblxuICAgICAgICAgICAgaWYgKHByZXZlbnRlZC5pbmRleE9mKHN1Ym1vZHVsZS5uYW1lKSA+IC0xKVxuICAgICAgICAgICAgICAgIHN1Ym1vZHVsZS5wcmV2ZW50Um91dGluZygpO1xuXG4gICAgICAgICAgICB0aGlzLm1vZHVsZXMuYWRkKHN1Ym1vZHVsZSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9faW5pdCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19hdXRvbG9hZCB0aGUgYXV0b2xvYWRhYmxlIGFzcGVjdHMgb2YgdGhlIHN5c3RlbVxuICAgICAqL1xuICAgIF9fYXV0b2xvYWQoKSB7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gbmV3IFNjaGVtZVJlc291cmNlKG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG4gICAgICAgIHZhciBhdXRvbG9hZHM7XG4gICAgICAgIHZhciBhdXRva2V5O1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIHZhciBvID0ge307XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OTkVDVE9SU10gPSAnY29ubmVjdG9ycyc7XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuRklMVEVSU10gPSAnZmlsdGVycyc7XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuTUlERExFV0FSRV0gPSAnbWlkZGxld2FyZSc7XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OVFJPTExFUlNdID0gJ2NvbnRyb2xsZXJzJztcblxuICAgICAgICByZXNvdXJjZS5hZGQoJ3JlcXVpcmUnLCBuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuXG4gICAgICAgIFtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTk5FQ1RPUlMsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5GSUxURVJTLFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmtleXMuTUlERExFV0FSRSxcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTlRST0xMRVJTXG4gICAgICAgIF0uXG4gICAgICAgIGZvckVhY2gocHJlZml4ZWRLZXkgPT4ge1xuXG4gICAgICAgICAgICBrZXkgPSBvW3ByZWZpeGVkS2V5XTtcbiAgICAgICAgICAgIGF1dG9rZXkgPSBgcG93ZXIuYXV0b2xvYWQuJHtrZXl9YDtcbiAgICAgICAgICAgIGF1dG9sb2FkcyA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKGF1dG9rZXksIEJBU0tFVCk7XG5cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF1dG9sb2FkcykuZm9yRWFjaChuYW1lID0+XG4gICAgICAgICAgICAgICAgdGhpcy5hcHAuY29udGV4dFtrZXldW25hbWVdID0gcmVzb3VyY2UuZmluZChhdXRvbG9hZHNbYXV0b2tleV0pKTtcblxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnJlcXVpcmUodGhpcy5jb25maWd1cmF0aW9uLnBhdGhzW2tleV0sIHRoaXMuYXBwbGljYXRpb24uY29udGV4dFtrZXldKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX19hdXRvbG9hZCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX192aWV3RW5naW5lIGNvbmZpZ3VyZXMgdGhlIHZpZXcgZW5naW5lIGZvciB0aGlzIG1vZHVsZS5cbiAgICAgKiBUaGUgcGFyZW50IHZpZXcgZW5naW5lIGlzIHVzZWQgaWYgbm9uZSBpcyBjb25maWd1cmVkLlxuICAgICAqL1xuICAgIF9fdmlld0VuZ2luZSgpIHtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgU2NoZW1lUmVzb3VyY2UobmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcbiAgICAgICAgdmFyIGZhY3RvcnkgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5WSUVXU19FTkdJTkUsIG51bGwpO1xuXG4gICAgICAgIGlmICghZmFjdG9yeSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXdFbmdpbmUgPSAodGhpcy5wYXJlbnQpID8gdGhpcy5wYXJlbnQudmlld0VuZ2luZSA6IG51bGw7XG5cbiAgICAgICAgdGhpcy52aWV3RW5naW5lID0gZmFjdG9yeS5jcmVhdGUodGhpcyk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9fdmlld0VuZ2luZSgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19mcmFtZXdvcmsgcGVyZm9ybXMgZnJhbWV3b3JrIHNwZWNpZmljIGFjdGlvbnNcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBfX2ZyYW1ld29yaygpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fY29ubmVjdGlvbnMgZXN0YWJsaXNoZXMgdGhlIGNvbm5lY3Rpb25zIGRlY2xlYXJlZCBpbiB0aGUgY29uZmlnIGZpbGUuXG4gICAgICogQHJldHVybiB7YXJyYXk8UHJvbWlzZT59XG4gICAgICovXG4gICAgX19jb25uZWN0aW9ucygpIHtcblxuICAgICAgICB2YXIgY29uZmlnO1xuICAgICAgICB2YXIgY29ubmVjdG9yO1xuICAgICAgICB2YXIgY29ubmVjdGlvbnMgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5DT05ORUNUSU9OUywgQkFTS0VUKTtcbiAgICAgICAgdmFyIHJlc291cmNlID0gbmV3IFByb3BlcnR5UmVzb3VyY2UodGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0LmNvbm5lY3RvcnMpO1xuXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb25uZWN0aW9ucykuXG4gICAgICAgIG1hcChrZXkgPT4ge1xuXG4gICAgICAgICAgICBjb25maWcgPSBjb25uZWN0aW9uc1trZXldO1xuICAgICAgICAgICAgY29ubmVjdG9yID0gcmVzb3VyY2UuZmluZChjb25maWcuY29ubmVjdG9yKTtcblxuICAgICAgICAgICAgaWYgKCFjb25uZWN0b3IpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25Db25uZWN0b3JFcnJvcihrZXksIGNvbmZpZy5jb25uZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5jb25uZWN0b3JzKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25uZWN0b3IgIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQ29ubmVjdG9yIG11c3QgYmUgYSBmdW5jdGlvbiBnb3QgJyR7dHlwZW9mIGNvbm5lY3Rvcn0nIWApO1xuXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdG9yKGNvbmZpZy5vcHRpb25zKS50aGVuKGMgPT4gdGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0LmNvbm5lY3Rpb25zW2tleV0gPSBjKTtcblxuICAgICAgICB9KS5jb25jYXQodGhpcy5tb2R1bGVzLl9fY29ubmVjdGlvbnMoKSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX2ZpbHRlcnMgbG9hZHMgdGhlIHByZSByb3V0aW5nIG1pZGRsZXdhcmUuXG4gICAgICovXG4gICAgX19maWx0ZXJzKGFwcCwgZGVmYXVsdHMpIHtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgU2NoZW1lUmVzb3VyY2UoXG4gICAgICAgICAgICBuZXcgUHJvcGVydHlSZXNvdXJjZSh0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHQuZmlsdGVycykpO1xuXG4gICAgICAgIHJlc291cmNlLmFkZCgncmVxdWlyZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG5cbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuRklMVEVSUywgZGVmYXVsdHMpLlxuICAgICAgICBmb3JFYWNoKGYgPT4ge1xuXG4gICAgICAgICAgICB2YXIgZmlsdGVyID0gcmVzb3VyY2UuZmluZChmKTtcblxuICAgICAgICAgICAgaWYgKCFmaWx0ZXIpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25GaWx0ZXJFcnJvcih0aGlzLm5hbWUsIGYpO1xuXG4gICAgICAgICAgICBmaWx0ZXIuYXBwbHkoYXBwLCB0aGlzLmNvbmZpZ3VyYXRpb24pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kdWxlcy5fX2ZpbHRlcnMoYXBwLCBbJ3B1YmxpYyddKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fcm91dGluZyBzZXRzIHVwIHRoZSByb3V0aW5nIGZvciB0aGlzIG1vZHVsZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwb2ludCBUaGUgbW91bnQgcG9pbnQgb2YgdGhpcyBtb2R1bGUncyBwYXJlbnQncyByb3V0ZXIuXG4gICAgICogQHBhcmFtIHtGcmFtZXdvcmtBcHBsaWNhdGlvbn0gYXBwXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZX0gcmVzb3VyY2VcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBfX3JvdXRpbmcobW91bnRQb2ludCwgYXBwLCByZXNvdXJjZSkge1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZWRpcmVjdCB0aGUgcm91dGVzIG9mIHRoaXMgbW9kdWxlIHRvIGEgdXJsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhdHVzXVxuICAgICAqL1xuICAgIHJlZGlyZWN0KHVybCwgc3RhdHVzID0gMzAyKSB7XG5cbiAgICAgICAgYmVvZih7IHVybCB9KS5zdHJpbmcoKTtcbiAgICAgICAgYmVvZih7IHN0YXR1cyB9KS5udW1iZXIoKTtcblxuICAgICAgICB0aGlzLnJlZGlyZWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWRpcmVjdFVybCA9IHVybDtcbiAgICAgICAgdGhpcy5yZWRpcmVjdFN0YXR1cyA9IHN0YXR1cztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHN0b3BSZWRpcmVjdGluZyBkaXNhYmxlcyByZWRpcmVjdGluZ1xuICAgICAqL1xuICAgIHN0b3BSZWRpcmVjdGluZygpIHtcblxuICAgICAgICB0aGlzLnJlZGlyZWN0aW5nID0gZmFsc2U7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwYXRoIHJldHVybnMgdGhlIGxvZ2ljYWwgYXBwbGljYXRpb24gcGF0aCBmb3IgdGhpcyBtb2R1bGUuXG4gICAgICogVGhhdCBpcywgdGhlIHBhdGggcm91dGVzIGFyZSBtb3VudGVkIHRvIGJ5IGRlZmF1bHQuXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwYXRoKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybiAnLyc7XG4gICAgICAgIHJldHVybiBQYXRoLmpvaW4odGhpcy5wYXJlbnQucGF0aCgpLCB0aGlzLm5hbWUpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaXNDaGlsZCBjaGVja3MgaWYgYSBwYXRoIGlzIGEgY2hpbGQgbW9kdWxlIG9mIHRoaXMgbW9kdWxlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKi9cbiAgICBpc0NoaWxkKHBhdGgpIHtcblxuICAgICAgICByZXR1cm4gc3RhcnRzd2l0aChwYXRoLCB0aGlzLnBhdGgoKSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmaW5kIHJldHJpZXZlcyBhIG1vZHVsZSBvciBudWxsIGlmIGl0IGlzIG5vdCBmb3VuZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEByZXR1cm5zIHtNb2R1bGV8bnVsbH1cbiAgICAgKi9cbiAgICBmaW5kKHBhdGgpIHtcblxuICAgICAgICBiZW9mKHsgcGF0aCB9KS5zdHJpbmcoKTtcblxuICAgICAgICBpZiAocGF0aCA9PT0gdGhpcy5wYXRoKCkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAodGhpcy5pc0NoaWxkKHBhdGgpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kdWxlcy5maW5kKHBhdGgpO1xuXG4gICAgICAgIGlmICh0aGlzLnBhcmVudClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5maW5kKHBhdGgpO1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29ubmVjdFxuICAgICAqL1xuICAgIGNvbm5lY3QoKSB7XG5cbiAgICAgICAgdGhpcy5fX2luaXQoKTtcbiAgICAgICAgdGhpcy5fX2F1dG9sb2FkKCk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuX19jb25uZWN0aW9ucygpKS5cbiAgICAgICAgdGhlbigoKSA9PiAodGhpcy5wYXJlbnQgPT09IG51bGwpID9cbiAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb24ub25TZXJ2aWNlTGlzdGVuZXIub25Db25uZWN0ZWQodGhpcy5hcHBsaWNhdGlvbikgOlxuICAgICAgICAgICAgbnVsbCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb2FkIHRoaXMgbW9kdWxlXG4gICAgICovXG4gICAgbG9hZChhcHApIHtcblxuIHJldHVybiAgICAgICB0aGlzLmNvbm5lY3QoKS5cbiAgICAgICAgdGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciByZXNvdXJjZTtcbiAgICAgICAgICAgIHZhciBzY2hlbWUgPSBuZXcgU2NoZW1lUmVzb3VyY2UobmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcblxuICAgICAgICAgICAgdGhpcy5fX2ZpbHRlcnMoYXBwLCBbJ2RlZmF1bHQnXSk7XG4gICAgICAgICAgICB0aGlzLl9fZnJhbWV3b3JrKCk7XG4gICAgICAgICAgICB0aGlzLl9fdmlld0VuZ2luZSgpO1xuXG4gICAgICAgICAgICBzY2hlbWUuYWRkKCdtb2R1bGUnLCBuZXcgUmVxdWlyZVJlc291cmNlKHRoaXMuY29uZmlndXJhdGlvbi5wYXRocy5yb290KSk7XG5cbiAgICAgICAgICAgIHJlc291cmNlID0gbmV3IFByb3BlcnR5UmVzb3VyY2UodGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0Lm1pZGRsZXdhcmUpO1xuICAgICAgICAgICAgcmVzb3VyY2UgPSByZXNvdXJjZS5vcihuZXcgUHJvcGVydHlSZXNvdXJjZSh0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHQuY29udHJvbGxlcnMpKS5cbiAgICAgICAgICAgIG9yKHNjaGVtZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX19yb3V0aW5nKCcnLCBhcHAsIHJlc291cmNlKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2R1bGVcbiJdfQ==