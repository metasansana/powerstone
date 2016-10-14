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
         * stopRedirect disables redirecting
         */

    }, {
        key: 'stopRedirect',
        value: function stopRedirect() {

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
         * load this module
         */

    }, {
        key: 'load',
        value: function load(app) {
            var _this5 = this;

            this.__init();
            this.__autoload();

            return Promise.all(this.__connections()).then(function () {
                return _this5.parent === null ? _this5.application.onServiceListener.onConnected(_this5.application) : null;
            }).then(function () {

                var resource;
                var scheme = new _SchemeResource2.default(new _RequireResource2.default());

                _this5.__filters(app, ['default']);
                _this5.__framework();
                _this5.__viewEngine();

                scheme.add('module', new _RequireResource2.default(_this5.configuration.paths.root));

                resource = new _PropertyResource2.default(_this5.application.context.middleware);
                resource = resource.or(new _PropertyResource2.default(_this5.application.context.controllers)).or(scheme);

                _this5.__routing('', app, resource);
            });
        }
    }]);

    return Module;
}();

exports.default = Module;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkJBU0tFVCIsIkJPWCIsIk1vZHVsZSIsIm5hbWUiLCJjb25maWciLCJhcHAiLCJwYXJlbnQiLCJjb25maWd1cmF0aW9uIiwiYXBwbGljYXRpb24iLCJ2aWV3RW5naW5lIiwibW9kdWxlcyIsImNvbmZpZ0RpcmVjdG9yeSIsInJlZGlyZWN0aW5nIiwicmVkaXJlY3RVcmwiLCJyZWRpcmVjdFN0YXR1cyIsInJlcSIsInJlcyIsIm5leHQiLCJ3cml0ZUhlYWQiLCJlbmQiLCJ2aWV3Iiwic3VibW9kdWxlIiwicmVzb3VyY2UiLCJzdWJtb2R1bGVzIiwicmVhZCIsImtleXMiLCJNT0RVTEVTIiwicHJldmVudGVkIiwiTU9EVUxFU19QUkVWRU5URUQiLCJhZGQiLCJmb3JFYWNoIiwiZmluZCIsInBhdGgiLCJpbmRleE9mIiwicHJldmVudFJvdXRpbmciLCJfX2luaXQiLCJhdXRvbG9hZHMiLCJhdXRva2V5Iiwia2V5IiwibyIsIkNPTk5FQ1RPUlMiLCJGSUxURVJTIiwiTUlERExFV0FSRSIsIkNPTlRST0xMRVJTIiwicHJlZml4ZWRLZXkiLCJPYmplY3QiLCJjb250ZXh0IiwicmVxdWlyZSIsInBhdGhzIiwiX19hdXRvbG9hZCIsImZhY3RvcnkiLCJWSUVXU19FTkdJTkUiLCJjcmVhdGUiLCJfX3ZpZXdFbmdpbmUiLCJjb25uZWN0b3IiLCJjb25uZWN0aW9ucyIsIkNPTk5FQ1RJT05TIiwiY29ubmVjdG9ycyIsIm1hcCIsIlR5cGVFcnJvciIsIm9wdGlvbnMiLCJ0aGVuIiwiYyIsImNvbmNhdCIsIl9fY29ubmVjdGlvbnMiLCJkZWZhdWx0cyIsImZpbHRlcnMiLCJmaWx0ZXIiLCJmIiwiYXBwbHkiLCJfX2ZpbHRlcnMiLCJtb3VudFBvaW50IiwidXJsIiwic3RhdHVzIiwic3RyaW5nIiwibnVtYmVyIiwiam9pbiIsImlzQ2hpbGQiLCJQcm9taXNlIiwiYWxsIiwib25TZXJ2aWNlTGlzdGVuZXIiLCJvbkNvbm5lY3RlZCIsInNjaGVtZSIsIl9fZnJhbWV3b3JrIiwicm9vdCIsIm1pZGRsZXdhcmUiLCJvciIsImNvbnRyb2xsZXJzIiwiX19yb3V0aW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLFNBQVMsRUFBZjtBQUNBLElBQU1DLE1BQU0sRUFBWjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztJQWVNQyxNO0FBRUYsb0JBQVlDLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCQyxHQUExQixFQUE4QztBQUFBLFlBQWZDLE1BQWUsdUVBQU4sSUFBTTs7QUFBQTs7QUFFMUMsYUFBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS0ksYUFBTCxHQUFxQkgsTUFBckI7QUFDQSxhQUFLSSxXQUFMLEdBQW1CSCxHQUFuQjtBQUNBLGFBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtHLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxhQUFLQyxPQUFMLEdBQWUsOEJBQW9CLEVBQXBCLENBQWY7QUFDQSxhQUFLQyxlQUFMLEdBQXVCLFNBQXZCO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQixLQUFuQjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxhQUFLQyxjQUFMLEdBQXNCLEdBQXRCO0FBRUg7Ozs7bUNBRVVDLEcsRUFBS0MsRyxFQUFLQyxJLEVBQU07O0FBRXZCLGdCQUFJLEtBQUtMLFdBQVQsRUFBc0I7QUFDbEJJLG9CQUFJRSxTQUFKLENBQWMsS0FBS0osY0FBbkIsRUFBbUMsRUFBRSxZQUFZLEtBQUtELFdBQW5CLEVBQW5DO0FBQ0FHLG9CQUFJRyxHQUFKO0FBQ0E7QUFFSDs7QUFFREY7QUFHSDs7QUFFRDs7Ozs7Ozs7O3VDQU1lRyxJLEVBQU0sQ0FFcEI7O0FBRUQ7Ozs7OztpQ0FHUztBQUFBOztBQUVMLGdCQUFJ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QWpCLENBQW1DQyxXQUFuQyxDQUErQyxPQUFLekUsV0FBcEQsQ0FETyxHQUVQLElBRkM7QUFBQSxhQURFLEVBSVBxRCxJQUpPLENBSUYsWUFBTTs7QUFFUCxvQkFBSXZDLFFBQUo7QUFDQSxvQkFBSTRELFNBQVMsNkJBQW1CLCtCQUFuQixDQUFiOztBQUVBLHVCQUFLWixTQUFMLENBQWVqRSxHQUFmLEVBQW9CLENBQUMsU0FBRCxDQUFwQjtBQUNBLHVCQUFLOEUsV0FBTDtBQUNBLHVCQUFLOUIsWUFBTDs7QUFFQTZCLHVCQUFPckQsR0FBUCxDQUFXLFFBQVgsRUFBcUIsOEJBQW9CLE9BQUt0QixhQUFMLENBQW1CeUMsS0FBbkIsQ0FBeUJvQyxJQUE3QyxDQUFyQjs7QUFFQTlELDJCQUFXLCtCQUFxQixPQUFLZCxXQUFMLENBQWlCc0MsT0FBakIsQ0FBeUJ1QyxVQUE5QyxDQUFYO0FBQ0EvRCwyQkFBV0EsU0FBU2dFLEVBQVQsQ0FBWSwrQkFBcUIsT0FBSzlFLFdBQUwsQ0FBaUJzQyxPQUFqQixDQUF5QnlDLFdBQTlDLENBQVosRUFDWEQsRUFEVyxDQUNSSixNQURRLENBQVg7O0FBR0EsdUJBQUtNLFNBQUwsQ0FBZSxFQUFmLEVBQW1CbkYsR0FBbkIsRUFBd0JpQixRQUF4QjtBQUVILGFBckJNLENBQVA7QUF1Qkg7Ozs7OztrQkFJVXBCLE0iLCJmaWxlIjoiTW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCBzdGFydHN3aXRoIGZyb20gJ2xvZGFzaC5zdGFydHN3aXRoJztcbmltcG9ydCBDb25maWd1cmF0aW9uIGZyb20gJy4vQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgQ29tcG9zaXRlTW9kdWxlIGZyb20gJy4vQ29tcG9zaXRlTW9kdWxlJztcbmltcG9ydCBQcm9wZXJ0eVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvUHJvcGVydHlSZXNvdXJjZSc7XG5pbXBvcnQgUmVxdWlyZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvUmVxdWlyZVJlc291cmNlJztcbmltcG9ydCBNb2R1bGVSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL01vZHVsZVJlc291cmNlJztcbmltcG9ydCBTY2hlbWVSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1NjaGVtZVJlc291cmNlJztcbmltcG9ydCBVbmtub3duQ29ubmVjdG9yRXJyb3IgZnJvbSAnLi9Vbmtub3duQ29ubmVjdG9yRXJyb3InO1xuaW1wb3J0IFVua25vd25GaWx0ZXJFcnJvciBmcm9tICcuL1Vua25vd25GaWx0ZXJFcnJvcic7XG5pbXBvcnQgVW5rbm93bk1vZHVsZUVycm9yIGZyb20gJy4vVW5rbm93bk1vZHVsZUVycm9yJztcblxuY29uc3QgQkFTS0VUID0ge307XG5jb25zdCBCT1ggPSBbXTtcblxuLyoqXG4gKiBNb2R1bGVcbiAqIEBhYnN0cmFjdFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Q29uZmlndXJhdGlvbn0gY29uZmlnXG4gKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBcbiAqIEBwYXJhbSB7TW9kdWxlfSBbcGFyZW50XVxuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkge0NvbmZpZ3VyYXRpb259IGNvbmZpZ3VyYXRpb25cbiAqIEBwcm9wZXJ0eSB7QXBwbGljYXRpb259IGFwcGxpY2F0aW9uXG4gKiBAcHJvcGVydHkge01vZHVsZX0gcGFyZW50XG4gKiBAcHJvcGVydHkge0NvbXBvc2l0ZU1vZHVsZX0gbW9kdWxlc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtjb25maWdEaXJlY3Rvcnk9J2FwaWNvbmYnXVxuICovXG5jbGFzcyBNb2R1bGUge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgY29uZmlnLCBhcHAsIHBhcmVudCA9IG51bGwpIHtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBjb25maWc7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb24gPSBhcHA7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLnZpZXdFbmdpbmUgPSBudWxsO1xuICAgICAgICB0aGlzLm1vZHVsZXMgPSBuZXcgQ29tcG9zaXRlTW9kdWxlKFtdKTtcbiAgICAgICAgdGhpcy5jb25maWdEaXJlY3RvcnkgPSAnYXBpY29uZic7XG4gICAgICAgIHRoaXMucmVkaXJlY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWRpcmVjdFVybCA9ICcnO1xuICAgICAgICB0aGlzLnJlZGlyZWN0U3RhdHVzID0gMzAyO1xuXG4gICAgfVxuXG4gICAgcHJlUm91dGluZyhyZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgIGlmICh0aGlzLnJlZGlyZWN0aW5nKSB7XG4gICAgICAgICAgICByZXMud3JpdGVIZWFkKHRoaXMucmVkaXJlY3RTdGF0dXMsIHsgJ0xvY2F0aW9uJzogdGhpcy5yZWRpcmVjdFVybCB9KTtcbiAgICAgICAgICAgIHJlcy5lbmQoKTtcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgbmV4dCgpO1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX3ZpZXdDYWxsYmFjayBwcm92aWRlcyBhIGNhbGxiYWNrIHRoYXQgd2lsbFxuICAgICAqIGhhbmRsZSB2aWV3IGRlY2xhcmF0aW9ucy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmlldyBUaGUgdmlldyB0ZW1wbGF0ZVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIF9fdmlld0NhbGxiYWNrKHZpZXcpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9faW5pdCBpbml0aWFsaXplcyB0aGlzIG1vZHVsZSBhbmQgaXRzIHN1Ym1vZHVsZXNcbiAgICAgKi9cbiAgICBfX2luaXQoKSB7XG5cbiAgICAgICAgdmFyIHN1Ym1vZHVsZTtcbiAgICAgICAgdmFyIHJlc291cmNlID0gbmV3IFNjaGVtZVJlc291cmNlKG5ldyBNb2R1bGVSZXNvdXJjZSh0aGlzKSk7XG5cbiAgICAgICAgdmFyIHN1Ym1vZHVsZXMgPSB0aGlzLmNvbmZpZ3VyYXRpb24uXG4gICAgICAgIHJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuTU9EVUxFUywgQk9YKTtcblxuICAgICAgICB2YXIgcHJldmVudGVkID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5NT0RVTEVTX1BSRVZFTlRFRCwgQk9YKTtcblxuICAgICAgICByZXNvdXJjZS5hZGQoJ3JlcXVpcmUnLCBuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuXG4gICAgICAgIHN1Ym1vZHVsZXMuXG4gICAgICAgIGZvckVhY2gocGF0aCA9PiB7XG5cbiAgICAgICAgICAgIHN1Ym1vZHVsZSA9IHJlc291cmNlLmZpbmQocGF0aCk7XG5cbiAgICAgICAgICAgIGlmICghc3VibW9kdWxlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbmtub3duTW9kdWxlRXJyb3IocGF0aCk7XG5cbiAgICAgICAgICAgIGlmIChwcmV2ZW50ZWQuaW5kZXhPZihzdWJtb2R1bGUubmFtZSkgPiAtMSlcbiAgICAgICAgICAgICAgICBzdWJtb2R1bGUucHJldmVudFJvdXRpbmcoKTtcblxuICAgICAgICAgICAgdGhpcy5tb2R1bGVzLmFkZChzdWJtb2R1bGUpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kdWxlcy5fX2luaXQoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fYXV0b2xvYWQgdGhlIGF1dG9sb2FkYWJsZSBhc3BlY3RzIG9mIHRoZSBzeXN0ZW1cbiAgICAgKi9cbiAgICBfX2F1dG9sb2FkKCkge1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuICAgICAgICB2YXIgYXV0b2xvYWRzO1xuICAgICAgICB2YXIgYXV0b2tleTtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICB2YXIgbyA9IHt9O1xuICAgICAgICBvW3RoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTk5FQ1RPUlNdID0gJ2Nvbm5lY3RvcnMnO1xuICAgICAgICBvW3RoaXMuY29uZmlndXJhdGlvbi5rZXlzLkZJTFRFUlNdID0gJ2ZpbHRlcnMnO1xuICAgICAgICBvW3RoaXMuY29uZmlndXJhdGlvbi5rZXlzLk1JRERMRVdBUkVdID0gJ21pZGRsZXdhcmUnO1xuICAgICAgICBvW3RoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTlRST0xMRVJTXSA9ICdjb250cm9sbGVycyc7XG5cbiAgICAgICAgcmVzb3VyY2UuYWRkKCdyZXF1aXJlJywgbmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcblxuICAgICAgICBbXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5DT05ORUNUT1JTLFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmtleXMuRklMVEVSUyxcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLk1JRERMRVdBUkUsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5DT05UUk9MTEVSU1xuICAgICAgICBdLlxuICAgICAgICBmb3JFYWNoKHByZWZpeGVkS2V5ID0+IHtcblxuICAgICAgICAgICAga2V5ID0gb1twcmVmaXhlZEtleV07XG4gICAgICAgICAgICBhdXRva2V5ID0gYHBvd2VyLmF1dG9sb2FkLiR7a2V5fWA7XG4gICAgICAgICAgICBhdXRvbG9hZHMgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZChhdXRva2V5LCBCQVNLRVQpO1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhdXRvbG9hZHMpLmZvckVhY2gobmFtZSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuYXBwLmNvbnRleHRba2V5XVtuYW1lXSA9IHJlc291cmNlLmZpbmQoYXV0b2xvYWRzW2F1dG9rZXldKSk7XG5cbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5yZXF1aXJlKHRoaXMuY29uZmlndXJhdGlvbi5wYXRoc1trZXldLCB0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHRba2V5XSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9fYXV0b2xvYWQoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fdmlld0VuZ2luZSBjb25maWd1cmVzIHRoZSB2aWV3IGVuZ2luZSBmb3IgdGhpcyBtb2R1bGUuXG4gICAgICogVGhlIHBhcmVudCB2aWV3IGVuZ2luZSBpcyB1c2VkIGlmIG5vbmUgaXMgY29uZmlndXJlZC5cbiAgICAgKi9cbiAgICBfX3ZpZXdFbmdpbmUoKSB7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gbmV3IFNjaGVtZVJlc291cmNlKG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG4gICAgICAgIHZhciBmYWN0b3J5ID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuVklFV1NfRU5HSU5FLCBudWxsKTtcblxuICAgICAgICBpZiAoIWZhY3RvcnkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3RW5naW5lID0gKHRoaXMucGFyZW50KSA/IHRoaXMucGFyZW50LnZpZXdFbmdpbmUgOiBudWxsO1xuXG4gICAgICAgIHRoaXMudmlld0VuZ2luZSA9IGZhY3RvcnkuY3JlYXRlKHRoaXMpO1xuXG4gICAgICAgIHRoaXMubW9kdWxlcy5fX3ZpZXdFbmdpbmUoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fZnJhbWV3b3JrIHBlcmZvcm1zIGZyYW1ld29yayBzcGVjaWZpYyBhY3Rpb25zXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgX19mcmFtZXdvcmsoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX2Nvbm5lY3Rpb25zIGVzdGFibGlzaGVzIHRoZSBjb25uZWN0aW9ucyBkZWNsZWFyZWQgaW4gdGhlIGNvbmZpZyBmaWxlLlxuICAgICAqIEByZXR1cm4ge2FycmF5PFByb21pc2U+fVxuICAgICAqL1xuICAgIF9fY29ubmVjdGlvbnMoKSB7XG5cbiAgICAgICAgdmFyIGNvbmZpZztcbiAgICAgICAgdmFyIGNvbm5lY3RvcjtcbiAgICAgICAgdmFyIGNvbm5lY3Rpb25zID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OTkVDVElPTlMsIEJBU0tFVCk7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBQcm9wZXJ0eVJlc291cmNlKHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5jb25uZWN0b3JzKTtcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29ubmVjdGlvbnMpLlxuICAgICAgICBtYXAoa2V5ID0+IHtcblxuICAgICAgICAgICAgY29uZmlnID0gY29ubmVjdGlvbnNba2V5XTtcbiAgICAgICAgICAgIGNvbm5lY3RvciA9IHJlc291cmNlLmZpbmQoY29uZmlnLmNvbm5lY3Rvcik7XG5cbiAgICAgICAgICAgIGlmICghY29ubmVjdG9yKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbmtub3duQ29ubmVjdG9yRXJyb3Ioa2V5LCBjb25maWcuY29ubmVjdG9yLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHQuY29ubmVjdG9ycyk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29ubmVjdG9yICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYENvbm5lY3RvciBtdXN0IGJlIGEgZnVuY3Rpb24gZ290ICcke3R5cGVvZiBjb25uZWN0b3J9JyFgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rvcihjb25maWcub3B0aW9ucykudGhlbihjID0+IHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5jb25uZWN0aW9uc1trZXldID0gYyk7XG5cbiAgICAgICAgfSkuY29uY2F0KHRoaXMubW9kdWxlcy5fX2Nvbm5lY3Rpb25zKCkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19maWx0ZXJzIGxvYWRzIHRoZSBwcmUgcm91dGluZyBtaWRkbGV3YXJlLlxuICAgICAqL1xuICAgIF9fZmlsdGVycyhhcHAsIGRlZmF1bHRzKSB7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gbmV3IFNjaGVtZVJlc291cmNlKFxuICAgICAgICAgICAgbmV3IFByb3BlcnR5UmVzb3VyY2UodGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0LmZpbHRlcnMpKTtcblxuICAgICAgICByZXNvdXJjZS5hZGQoJ3JlcXVpcmUnLCBuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkZJTFRFUlMsIGRlZmF1bHRzKS5cbiAgICAgICAgZm9yRWFjaChmID0+IHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlciA9IHJlc291cmNlLmZpbmQoZik7XG5cbiAgICAgICAgICAgIGlmICghZmlsdGVyKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbmtub3duRmlsdGVyRXJyb3IodGhpcy5uYW1lLCBmKTtcblxuICAgICAgICAgICAgZmlsdGVyLmFwcGx5KGFwcCwgdGhpcy5jb25maWd1cmF0aW9uKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX19maWx0ZXJzKGFwcCwgWydwdWJsaWMnXSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX3JvdXRpbmcgc2V0cyB1cCB0aGUgcm91dGluZyBmb3IgdGhpcyBtb2R1bGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcG9pbnQgVGhlIG1vdW50IHBvaW50IG9mIHRoaXMgbW9kdWxlJ3MgcGFyZW50J3Mgcm91dGVyLlxuICAgICAqIEBwYXJhbSB7RnJhbWV3b3JrQXBwbGljYXRpb259IGFwcFxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2V9IHJlc291cmNlXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgX19yb3V0aW5nKG1vdW50UG9pbnQsIGFwcCwgcmVzb3VyY2UpIHtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVkaXJlY3QgdGhlIHJvdXRlcyBvZiB0aGlzIG1vZHVsZSB0byBhIHVybFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3N0YXR1c11cbiAgICAgKi9cbiAgICByZWRpcmVjdCh1cmwsIHN0YXR1cyA9IDMwMikge1xuXG4gICAgICAgIGJlb2YoeyB1cmwgfSkuc3RyaW5nKCk7XG4gICAgICAgIGJlb2YoeyBzdGF0dXMgfSkubnVtYmVyKCk7XG5cbiAgICAgICAgdGhpcy5yZWRpcmVjdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMucmVkaXJlY3RVcmwgPSB1cmw7XG4gICAgICAgIHRoaXMucmVkaXJlY3RTdGF0dXMgPSBzdGF0dXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdG9wUmVkaXJlY3QgZGlzYWJsZXMgcmVkaXJlY3RpbmdcbiAgICAgKi9cbiAgICBzdG9wUmVkaXJlY3QoKSB7XG5cbiAgICAgICAgdGhpcy5yZWRpcmVjdGluZyA9IGZhbHNlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGF0aCByZXR1cm5zIHRoZSBsb2dpY2FsIGFwcGxpY2F0aW9uIHBhdGggZm9yIHRoaXMgbW9kdWxlLlxuICAgICAqIFRoYXQgaXMsIHRoZSBwYXRoIHJvdXRlcyBhcmUgbW91bnRlZCB0byBieSBkZWZhdWx0LlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcGF0aCgpIHtcblxuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm4gJy8nO1xuICAgICAgICByZXR1cm4gUGF0aC5qb2luKHRoaXMucGFyZW50LnBhdGgoKSwgdGhpcy5uYW1lKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGlzQ2hpbGQgY2hlY2tzIGlmIGEgcGF0aCBpcyBhIGNoaWxkIG1vZHVsZSBvZiB0aGlzIG1vZHVsZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICovXG4gICAgaXNDaGlsZChwYXRoKSB7XG5cbiAgICAgICAgcmV0dXJuIHN0YXJ0c3dpdGgocGF0aCwgdGhpcy5wYXRoKCkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZmluZCByZXRyaWV2ZXMgYSBtb2R1bGUgb3IgbnVsbCBpZiBpdCBpcyBub3QgZm91bmQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcmV0dXJucyB7TW9kdWxlfG51bGx9XG4gICAgICovXG4gICAgZmluZChwYXRoKSB7XG5cbiAgICAgICAgYmVvZih7IHBhdGggfSkuc3RyaW5nKCk7XG5cbiAgICAgICAgaWYgKHBhdGggPT09IHRoaXMucGF0aCgpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNDaGlsZChwYXRoKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZHVsZXMuZmluZChwYXRoKTtcblxuICAgICAgICBpZiAodGhpcy5wYXJlbnQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZmluZChwYXRoKTtcblxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvYWQgdGhpcyBtb2R1bGVcbiAgICAgKi9cbiAgICBsb2FkKGFwcCkge1xuXG4gICAgICAgIHRoaXMuX19pbml0KCk7XG4gICAgICAgIHRoaXMuX19hdXRvbG9hZCgpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLl9fY29ubmVjdGlvbnMoKSkuXG4gICAgICAgIHRoZW4oKCkgPT4gKHRoaXMucGFyZW50ID09PSBudWxsKSA/XG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLm9uU2VydmljZUxpc3RlbmVyLm9uQ29ubmVjdGVkKHRoaXMuYXBwbGljYXRpb24pIDpcbiAgICAgICAgICAgIG51bGwpLlxuICAgICAgICB0aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdmFyIHJlc291cmNlO1xuICAgICAgICAgICAgdmFyIHNjaGVtZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuXG4gICAgICAgICAgICB0aGlzLl9fZmlsdGVycyhhcHAsIFsnZGVmYXVsdCddKTtcbiAgICAgICAgICAgIHRoaXMuX19mcmFtZXdvcmsoKTtcbiAgICAgICAgICAgIHRoaXMuX192aWV3RW5naW5lKCk7XG5cbiAgICAgICAgICAgIHNjaGVtZS5hZGQoJ21vZHVsZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UodGhpcy5jb25maWd1cmF0aW9uLnBhdGhzLnJvb3QpKTtcblxuICAgICAgICAgICAgcmVzb3VyY2UgPSBuZXcgUHJvcGVydHlSZXNvdXJjZSh0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHQubWlkZGxld2FyZSk7XG4gICAgICAgICAgICByZXNvdXJjZSA9IHJlc291cmNlLm9yKG5ldyBQcm9wZXJ0eVJlc291cmNlKHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5jb250cm9sbGVycykpLlxuICAgICAgICAgICAgb3Ioc2NoZW1lKTtcblxuICAgICAgICAgICAgdGhpcy5fX3JvdXRpbmcoJycsIGFwcCwgcmVzb3VyY2UpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vZHVsZVxuIl19