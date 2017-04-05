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
                connector = require.main.require(config.connector).default;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkJBU0tFVCIsIkJPWCIsIk1vZHVsZSIsIm5hbWUiLCJjb25maWciLCJhcHAiLCJwYXJlbnQiLCJjb25maWd1cmF0aW9uIiwiYXBwbGljYXRpb24iLCJ2aWV3RW5naW5lIiwibW9kdWxlcyIsImNvbmZpZ0RpcmVjdG9yeSIsInJlZGlyZWN0aW5nIiwicmVkaXJlY3RVcmwiLCJyZWRpcmVjdFN0YXR1cyIsInJlcSIsInJlcyIsIm5leHQiLCJ3cml0ZUhlYWQiLCJlbmQiLCJ2aWV3Iiwic3VibW9kdWxlIiwicmVzb3VyY2UiLCJzdWJtb2R1bGVzIiwicmVhZCIsImtleXMiLCJNT0RVTEVTIiwicHJldmVudGVkIiwiTU9EVUxFU19QUkVWRU5URUQiLCJhZGQiLCJmb3JFYWNoIiwiZmluZCIsInBhdGgiLCJpbmRleE9mIiwicHJldmVudFJvdXRpbmciLCJfX2luaXQiLCJhdXRvbG9hZHMiLCJhdXRva2V5Iiwia2V5IiwibyIsIkZJTFRFUlMiLCJNSURETEVXQVJFIiwiQ09OVFJPTExFUlMiLCJwcmVmaXhlZEtleSIsIk9iamVjdCIsImNvbnRleHQiLCJyZXF1aXJlIiwicGF0aHMiLCJfX2F1dG9sb2FkIiwiZmFjdG9yeSIsIlZJRVdTX0VOR0lORSIsImNyZWF0ZSIsIl9fdmlld0VuZ2luZSIsImNvbm5lY3RvciIsImNvbm5lY3Rpb25zIiwiQ09OTkVDVElPTlMiLCJtYXAiLCJtYWluIiwiZGVmYXVsdCIsIlR5cGVFcnJvciIsIm9wdGlvbnMiLCJ0aGVuIiwiYyIsImNvbmNhdCIsIl9fY29ubmVjdGlvbnMiLCJkZWZhdWx0cyIsImZpbHRlcnMiLCJmaWx0ZXIiLCJmIiwiYXBwbHkiLCJfX2ZpbHRlcnMiLCJtb3VudFBvaW50IiwidXJsIiwic3RhdHVzIiwic3RyaW5nIiwibnVtYmVyIiwiam9pbiIsImlzQ2hpbGQiLCJQcm9taXNlIiwiYWxsIiwib25TZXJ2aWNlTGlzdGVuZXIiLCJvbkNvbm5lY3RlZCIsImNvbm5lY3QiLCJzY2hlbWUiLCJfX2ZyYW1ld29yayIsInJvb3QiLCJtaWRkbGV3YXJlIiwib3IiLCJjb250cm9sbGVycyIsIl9fcm91dGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLEVBQWY7QUFDQSxJQUFNQyxNQUFNLEVBQVo7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlTUMsTTtBQUVGLG9CQUFZQyxJQUFaLEVBQWtCQyxNQUFsQixFQUEwQkMsR0FBMUIsRUFBOEM7QUFBQSxZQUFmQyxNQUFlLHVFQUFOLElBQU07O0FBQUE7O0FBRTFDLGFBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtJLGFBQUwsR0FBcUJILE1BQXJCO0FBQ0EsYUFBS0ksV0FBTCxHQUFtQkgsR0FBbkI7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLRyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsYUFBS0MsT0FBTCxHQUFlLDhCQUFvQixFQUFwQixDQUFmO0FBQ0EsYUFBS0MsZUFBTCxHQUF1QixTQUF2QjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsYUFBS0MsY0FBTCxHQUFzQixHQUF0QjtBQUVIOzs7O21DQUVVQyxHLEVBQUtDLEcsRUFBS0MsSSxFQUFNOztBQUV2QixnQkFBSSxLQUFLTCxXQUFULEVBQXNCO0FBQ2xCSSxvQkFBSUUsU0FBSixDQUFjLEtBQUtKLGNBQW5CLEVBQW1DLEVBQUUsWUFBWSxLQUFLRCxXQUFuQixFQUFuQztBQUNBRyxvQkFBSUcsR0FBSjtBQUNBO0FBRUg7O0FBRURGO0FBR0g7O0FBRUQ7Ozs7Ozs7Ozt1Q0FNZUcsSSxFQUFNLENBRXBCOztBQUVEOzs7Ozs7aUNBR1M7QUFBQTs7QUFFTCxnQkFB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aEMsWUFBTDs7QUFFQStCLHVCQUFPdEQsR0FBUCxDQUFXLFFBQVgsRUFBcUIsOEJBQW9CLE9BQUt0QixhQUFMLENBQW1Cd0MsS0FBbkIsQ0FBeUJzQyxJQUE3QyxDQUFyQjs7QUFFQS9ELDJCQUFXLCtCQUFxQixPQUFLZCxXQUFMLENBQWlCcUMsT0FBakIsQ0FBeUJ5QyxVQUE5QyxDQUFYO0FBQ0FoRSwyQkFBV0EsU0FBU2lFLEVBQVQsQ0FBWSwrQkFBcUIsT0FBSy9FLFdBQUwsQ0FBaUJxQyxPQUFqQixDQUF5QjJDLFdBQTlDLENBQVosRUFDWEQsRUFEVyxDQUNSSixNQURRLENBQVg7O0FBR0EsdUJBQUtNLFNBQUwsQ0FBZSxFQUFmLEVBQW1CcEYsR0FBbkIsRUFBd0JpQixRQUF4QjtBQUVILGFBbkJNLENBQVA7QUFxQkg7Ozs7OztrQkFJVXBCLE0iLCJmaWxlIjoiTW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCBzdGFydHN3aXRoIGZyb20gJ2xvZGFzaC5zdGFydHN3aXRoJztcbmltcG9ydCBDb25maWd1cmF0aW9uIGZyb20gJy4vQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgQ29tcG9zaXRlTW9kdWxlIGZyb20gJy4vQ29tcG9zaXRlTW9kdWxlJztcbmltcG9ydCBQcm9wZXJ0eVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvUHJvcGVydHlSZXNvdXJjZSc7XG5pbXBvcnQgUmVxdWlyZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvUmVxdWlyZVJlc291cmNlJztcbmltcG9ydCBNb2R1bGVSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL01vZHVsZVJlc291cmNlJztcbmltcG9ydCBTY2hlbWVSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1NjaGVtZVJlc291cmNlJztcbmltcG9ydCBVbmtub3duQ29ubmVjdG9yRXJyb3IgZnJvbSAnLi9Vbmtub3duQ29ubmVjdG9yRXJyb3InO1xuaW1wb3J0IFVua25vd25GaWx0ZXJFcnJvciBmcm9tICcuL1Vua25vd25GaWx0ZXJFcnJvcic7XG5pbXBvcnQgVW5rbm93bk1vZHVsZUVycm9yIGZyb20gJy4vVW5rbm93bk1vZHVsZUVycm9yJztcblxuY29uc3QgQkFTS0VUID0ge307XG5jb25zdCBCT1ggPSBbXTtcblxuLyoqXG4gKiBNb2R1bGVcbiAqIEBhYnN0cmFjdFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Q29uZmlndXJhdGlvbn0gY29uZmlnXG4gKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBcbiAqIEBwYXJhbSB7TW9kdWxlfSBbcGFyZW50XVxuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkge0NvbmZpZ3VyYXRpb259IGNvbmZpZ3VyYXRpb25cbiAqIEBwcm9wZXJ0eSB7QXBwbGljYXRpb259IGFwcGxpY2F0aW9uXG4gKiBAcHJvcGVydHkge01vZHVsZX0gcGFyZW50XG4gKiBAcHJvcGVydHkge0NvbXBvc2l0ZU1vZHVsZX0gbW9kdWxlc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtjb25maWdEaXJlY3Rvcnk9J2FwaWNvbmYnXVxuICovXG5jbGFzcyBNb2R1bGUge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgY29uZmlnLCBhcHAsIHBhcmVudCA9IG51bGwpIHtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBjb25maWc7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb24gPSBhcHA7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLnZpZXdFbmdpbmUgPSBudWxsO1xuICAgICAgICB0aGlzLm1vZHVsZXMgPSBuZXcgQ29tcG9zaXRlTW9kdWxlKFtdKTtcbiAgICAgICAgdGhpcy5jb25maWdEaXJlY3RvcnkgPSAnYXBpY29uZic7XG4gICAgICAgIHRoaXMucmVkaXJlY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWRpcmVjdFVybCA9ICcnO1xuICAgICAgICB0aGlzLnJlZGlyZWN0U3RhdHVzID0gMzAyO1xuXG4gICAgfVxuXG4gICAgcHJlUm91dGluZyhyZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgIGlmICh0aGlzLnJlZGlyZWN0aW5nKSB7XG4gICAgICAgICAgICByZXMud3JpdGVIZWFkKHRoaXMucmVkaXJlY3RTdGF0dXMsIHsgJ0xvY2F0aW9uJzogdGhpcy5yZWRpcmVjdFVybCB9KTtcbiAgICAgICAgICAgIHJlcy5lbmQoKTtcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgbmV4dCgpO1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX3ZpZXdDYWxsYmFjayBwcm92aWRlcyBhIGNhbGxiYWNrIHRoYXQgd2lsbFxuICAgICAqIGhhbmRsZSB2aWV3IGRlY2xhcmF0aW9ucy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmlldyBUaGUgdmlldyB0ZW1wbGF0ZVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIF9fdmlld0NhbGxiYWNrKHZpZXcpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9faW5pdCBpbml0aWFsaXplcyB0aGlzIG1vZHVsZSBhbmQgaXRzIHN1Ym1vZHVsZXNcbiAgICAgKi9cbiAgICBfX2luaXQoKSB7XG5cbiAgICAgICAgdmFyIHN1Ym1vZHVsZTtcbiAgICAgICAgdmFyIHJlc291cmNlID0gbmV3IFNjaGVtZVJlc291cmNlKG5ldyBNb2R1bGVSZXNvdXJjZSh0aGlzKSk7XG5cbiAgICAgICAgdmFyIHN1Ym1vZHVsZXMgPSB0aGlzLmNvbmZpZ3VyYXRpb24uXG4gICAgICAgIHJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuTU9EVUxFUywgQk9YKTtcblxuICAgICAgICB2YXIgcHJldmVudGVkID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5NT0RVTEVTX1BSRVZFTlRFRCwgQk9YKTtcblxuICAgICAgICByZXNvdXJjZS5hZGQoJ3JlcXVpcmUnLCBuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuXG4gICAgICAgIHN1Ym1vZHVsZXMuXG4gICAgICAgIGZvckVhY2gocGF0aCA9PiB7XG5cbiAgICAgICAgICAgIHN1Ym1vZHVsZSA9IHJlc291cmNlLmZpbmQocGF0aCk7XG5cbiAgICAgICAgICAgIGlmICghc3VibW9kdWxlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbmtub3duTW9kdWxlRXJyb3IocGF0aCk7XG5cbiAgICAgICAgICAgIGlmIChwcmV2ZW50ZWQuaW5kZXhPZihzdWJtb2R1bGUubmFtZSkgPiAtMSlcbiAgICAgICAgICAgICAgICBzdWJtb2R1bGUucHJldmVudFJvdXRpbmcoKTtcblxuICAgICAgICAgICAgdGhpcy5tb2R1bGVzLmFkZChzdWJtb2R1bGUpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kdWxlcy5fX2luaXQoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fYXV0b2xvYWQgdGhlIGF1dG9sb2FkYWJsZSBhc3BlY3RzIG9mIHRoZSBzeXN0ZW1cbiAgICAgKi9cbiAgICBfX2F1dG9sb2FkKCkge1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuICAgICAgICB2YXIgYXV0b2xvYWRzO1xuICAgICAgICB2YXIgYXV0b2tleTtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICB2YXIgbyA9IHt9O1xuICAgICAgICBvW3RoaXMuY29uZmlndXJhdGlvbi5rZXlzLkZJTFRFUlNdID0gJ2ZpbHRlcnMnO1xuICAgICAgICBvW3RoaXMuY29uZmlndXJhdGlvbi5rZXlzLk1JRERMRVdBUkVdID0gJ21pZGRsZXdhcmUnO1xuICAgICAgICBvW3RoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTlRST0xMRVJTXSA9ICdjb250cm9sbGVycyc7XG5cbiAgICAgICAgcmVzb3VyY2UuYWRkKCdyZXF1aXJlJywgbmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcblxuICAgICAgICBbXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5GSUxURVJTLFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmtleXMuTUlERExFV0FSRSxcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTlRST0xMRVJTXG4gICAgICAgIF0uXG4gICAgICAgIGZvckVhY2gocHJlZml4ZWRLZXkgPT4ge1xuXG4gICAgICAgICAgICBrZXkgPSBvW3ByZWZpeGVkS2V5XTtcbiAgICAgICAgICAgIGF1dG9rZXkgPSBgcG93ZXIuYXV0b2xvYWQuJHtrZXl9YDtcbiAgICAgICAgICAgIGF1dG9sb2FkcyA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKGF1dG9rZXksIEJBU0tFVCk7XG5cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF1dG9sb2FkcykuZm9yRWFjaChuYW1lID0+XG4gICAgICAgICAgICAgICAgdGhpcy5hcHAuY29udGV4dFtrZXldW25hbWVdID0gcmVzb3VyY2UuZmluZChhdXRvbG9hZHNbYXV0b2tleV0pKTtcblxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnJlcXVpcmUodGhpcy5jb25maWd1cmF0aW9uLnBhdGhzW2tleV0sIHRoaXMuYXBwbGljYXRpb24uY29udGV4dFtrZXldKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX19hdXRvbG9hZCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX192aWV3RW5naW5lIGNvbmZpZ3VyZXMgdGhlIHZpZXcgZW5naW5lIGZvciB0aGlzIG1vZHVsZS5cbiAgICAgKiBUaGUgcGFyZW50IHZpZXcgZW5naW5lIGlzIHVzZWQgaWYgbm9uZSBpcyBjb25maWd1cmVkLlxuICAgICAqL1xuICAgIF9fdmlld0VuZ2luZSgpIHtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgU2NoZW1lUmVzb3VyY2UobmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcbiAgICAgICAgdmFyIGZhY3RvcnkgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5WSUVXU19FTkdJTkUsIG51bGwpO1xuXG4gICAgICAgIGlmICghZmFjdG9yeSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXdFbmdpbmUgPSAodGhpcy5wYXJlbnQpID8gdGhpcy5wYXJlbnQudmlld0VuZ2luZSA6IG51bGw7XG5cbiAgICAgICAgdGhpcy52aWV3RW5naW5lID0gZmFjdG9yeS5jcmVhdGUodGhpcyk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9fdmlld0VuZ2luZSgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19mcmFtZXdvcmsgcGVyZm9ybXMgZnJhbWV3b3JrIHNwZWNpZmljIGFjdGlvbnNcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBfX2ZyYW1ld29yaygpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fY29ubmVjdGlvbnMgZXN0YWJsaXNoZXMgdGhlIGNvbm5lY3Rpb25zIGRlY2xlYXJlZCBpbiB0aGUgY29uZmlnIGZpbGUuXG4gICAgICogQHJldHVybiB7YXJyYXk8UHJvbWlzZT59XG4gICAgICovXG4gICAgX19jb25uZWN0aW9ucygpIHtcblxuICAgICAgICB2YXIgY29uZmlnO1xuICAgICAgICB2YXIgY29ubmVjdG9yO1xuICAgICAgICB2YXIgY29ubmVjdGlvbnMgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5DT05ORUNUSU9OUywgQkFTS0VUKTtcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29ubmVjdGlvbnMpLlxuICAgICAgICBtYXAoa2V5ID0+IHtcblxuICAgICAgICAgICAgY29uZmlnID0gY29ubmVjdGlvbnNba2V5XTtcbiAgICAgICAgICAgIGNvbm5lY3RvciA9IHJlcXVpcmUubWFpbi5yZXF1aXJlKGNvbmZpZy5jb25uZWN0b3IpLmRlZmF1bHQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29ubmVjdG9yICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYENvbm5lY3RvciBtdXN0IGJlIGEgZnVuY3Rpb24gZ290ICcke3R5cGVvZiBjb25uZWN0b3J9JyFgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rvcihjb25maWcub3B0aW9ucykudGhlbihjID0+IHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5jb25uZWN0aW9uc1trZXldID0gYyk7XG5cbiAgICAgICAgfSkuY29uY2F0KHRoaXMubW9kdWxlcy5fX2Nvbm5lY3Rpb25zKCkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19maWx0ZXJzIGxvYWRzIHRoZSBwcmUgcm91dGluZyBtaWRkbGV3YXJlLlxuICAgICAqL1xuICAgIF9fZmlsdGVycyhhcHAsIGRlZmF1bHRzKSB7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gbmV3IFNjaGVtZVJlc291cmNlKFxuICAgICAgICAgICAgbmV3IFByb3BlcnR5UmVzb3VyY2UodGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0LmZpbHRlcnMpKTtcblxuICAgICAgICByZXNvdXJjZS5hZGQoJ3JlcXVpcmUnLCBuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkZJTFRFUlMsIGRlZmF1bHRzKS5cbiAgICAgICAgZm9yRWFjaChmID0+IHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlciA9IHJlc291cmNlLmZpbmQoZik7XG5cbiAgICAgICAgICAgIGlmICghZmlsdGVyKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbmtub3duRmlsdGVyRXJyb3IodGhpcy5uYW1lLCBmKTtcblxuICAgICAgICAgICAgZmlsdGVyLmFwcGx5KGFwcCwgdGhpcy5jb25maWd1cmF0aW9uKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX19maWx0ZXJzKGFwcCwgWydwdWJsaWMnXSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX3JvdXRpbmcgc2V0cyB1cCB0aGUgcm91dGluZyBmb3IgdGhpcyBtb2R1bGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcG9pbnQgVGhlIG1vdW50IHBvaW50IG9mIHRoaXMgbW9kdWxlJ3MgcGFyZW50J3Mgcm91dGVyLlxuICAgICAqIEBwYXJhbSB7RnJhbWV3b3JrQXBwbGljYXRpb259IGFwcFxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2V9IHJlc291cmNlXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgX19yb3V0aW5nKG1vdW50UG9pbnQsIGFwcCwgcmVzb3VyY2UpIHtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVkaXJlY3QgdGhlIHJvdXRlcyBvZiB0aGlzIG1vZHVsZSB0byBhIHVybFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3N0YXR1c11cbiAgICAgKi9cbiAgICByZWRpcmVjdCh1cmwsIHN0YXR1cyA9IDMwMikge1xuXG4gICAgICAgIGJlb2YoeyB1cmwgfSkuc3RyaW5nKCk7XG4gICAgICAgIGJlb2YoeyBzdGF0dXMgfSkubnVtYmVyKCk7XG5cbiAgICAgICAgdGhpcy5yZWRpcmVjdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMucmVkaXJlY3RVcmwgPSB1cmw7XG4gICAgICAgIHRoaXMucmVkaXJlY3RTdGF0dXMgPSBzdGF0dXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdG9wUmVkaXJlY3RpbmcgZGlzYWJsZXMgcmVkaXJlY3RpbmdcbiAgICAgKi9cbiAgICBzdG9wUmVkaXJlY3RpbmcoKSB7XG5cbiAgICAgICAgdGhpcy5yZWRpcmVjdGluZyA9IGZhbHNlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGF0aCByZXR1cm5zIHRoZSBsb2dpY2FsIGFwcGxpY2F0aW9uIHBhdGggZm9yIHRoaXMgbW9kdWxlLlxuICAgICAqIFRoYXQgaXMsIHRoZSBwYXRoIHJvdXRlcyBhcmUgbW91bnRlZCB0byBieSBkZWZhdWx0LlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcGF0aCgpIHtcblxuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm4gJy8nO1xuICAgICAgICByZXR1cm4gUGF0aC5qb2luKHRoaXMucGFyZW50LnBhdGgoKSwgdGhpcy5uYW1lKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGlzQ2hpbGQgY2hlY2tzIGlmIGEgcGF0aCBpcyBhIGNoaWxkIG1vZHVsZSBvZiB0aGlzIG1vZHVsZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICovXG4gICAgaXNDaGlsZChwYXRoKSB7XG5cbiAgICAgICAgcmV0dXJuIHN0YXJ0c3dpdGgocGF0aCwgdGhpcy5wYXRoKCkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZmluZCByZXRyaWV2ZXMgYSBtb2R1bGUgb3IgbnVsbCBpZiBpdCBpcyBub3QgZm91bmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcmV0dXJucyB7TW9kdWxlfG51bGx9XG4gICAgICovXG4gICAgZmluZChwYXRoKSB7XG5cbiAgICAgICAgYmVvZih7IHBhdGggfSkuc3RyaW5nKCk7XG5cbiAgICAgICAgaWYgKHBhdGggPT09IHRoaXMucGF0aCgpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNDaGlsZChwYXRoKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZHVsZXMuZmluZChwYXRoKTtcblxuICAgICAgICBpZiAodGhpcy5wYXJlbnQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZmluZChwYXRoKTtcblxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbm5lY3RcbiAgICAgKi9cbiAgICBjb25uZWN0KCkge1xuXG4gICAgICAgIHRoaXMuX19pbml0KCk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuX19jb25uZWN0aW9ucygpKS5cbiAgICAgICAgdGhlbigoKSA9PiAodGhpcy5wYXJlbnQgPT09IG51bGwpID9cbiAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb24ub25TZXJ2aWNlTGlzdGVuZXIub25Db25uZWN0ZWQodGhpcy5hcHBsaWNhdGlvbikgOlxuICAgICAgICAgICAgbnVsbCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb2FkIHRoaXMgbW9kdWxlXG4gICAgICovXG4gICAgbG9hZChhcHApIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0KCkuXG4gICAgICAgIHRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgcmVzb3VyY2U7XG4gICAgICAgICAgICB2YXIgc2NoZW1lID0gbmV3IFNjaGVtZVJlc291cmNlKG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG5cbiAgICAgICAgICAgIHRoaXMuX19hdXRvbG9hZCgpO1xuICAgICAgICAgICAgdGhpcy5fX2ZpbHRlcnMoYXBwLCBbJ2RlZmF1bHQnXSk7XG4gICAgICAgICAgICB0aGlzLl9fZnJhbWV3b3JrKCk7XG4gICAgICAgICAgICB0aGlzLl9fdmlld0VuZ2luZSgpO1xuXG4gICAgICAgICAgICBzY2hlbWUuYWRkKCdtb2R1bGUnLCBuZXcgUmVxdWlyZVJlc291cmNlKHRoaXMuY29uZmlndXJhdGlvbi5wYXRocy5yb290KSk7XG5cbiAgICAgICAgICAgIHJlc291cmNlID0gbmV3IFByb3BlcnR5UmVzb3VyY2UodGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0Lm1pZGRsZXdhcmUpO1xuICAgICAgICAgICAgcmVzb3VyY2UgPSByZXNvdXJjZS5vcihuZXcgUHJvcGVydHlSZXNvdXJjZSh0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHQuY29udHJvbGxlcnMpKS5cbiAgICAgICAgICAgIG9yKHNjaGVtZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX19yb3V0aW5nKCcnLCBhcHAsIHJlc291cmNlKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2R1bGVcbiJdfQ==