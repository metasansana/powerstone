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
        key: '_preRouting',
        value: function _preRouting(req, res, next) {

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

            app.use(function (req, res, next) {
                return _this4._preRouting(req, res, next);
            });

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
         * find retrieves a module or null if it is not found.
         * @param {string} path
         * @returns {Module|null}
         */

    }, {
        key: 'find',
        value: function find(path) {

            (0, _beof2.default)({ path: path }).string();

            if (path === this.path()) return this;

            if ((0, _lodash2.default)(path, this.path())) return this.modules.find(path);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkJBU0tFVCIsIkJPWCIsIk1vZHVsZSIsIm5hbWUiLCJjb25maWciLCJhcHAiLCJwYXJlbnQiLCJjb25maWd1cmF0aW9uIiwiYXBwbGljYXRpb24iLCJ2aWV3RW5naW5lIiwibW9kdWxlcyIsImNvbmZpZ0RpcmVjdG9yeSIsInJlZGlyZWN0aW5nIiwicmVkaXJlY3RVcmwiLCJyZWRpcmVjdFN0YXR1cyIsInJlcSIsInJlcyIsIm5leHQiLCJ3cml0ZUhlYWQiLCJlbmQiLCJ2aWV3Iiwic3VibW9kdWxlIiwicmVzb3VyY2UiLCJzdWJtb2R1bGVzIiwicmVhZCIsImtleXMiLCJNT0RVTEVTIiwicHJldmVudGVkIiwiTU9EVUxFU19QUkVWRU5URUQiLCJhZGQiLCJmb3JFYWNoIiwiZmluZCIsInBhdGgiLCJpbmRleE9mIiwicHJldmVudFJvdXRpbmciLCJfX2luaXQiLCJhdXRvbG9hZHMiLCJhdXRva2V5Iiwia2V5IiwibyIsIkNPTk5FQ1RPUlMiLCJGSUxURVJTIiwiTUlERExFV0FSRSIsIkNPTlRST0xMRVJTIiwicHJlZml4ZWRLZXkiLCJPYmplY3QiLCJjb250ZXh0IiwicmVxdWlyZSIsInBhdGhzIiwiX19hdXRvbG9hZCIsImZhY3RvcnkiLCJWSUVXU19FTkdJTkUiLCJjcmVhdGUiLCJfX3ZpZXdFbmdpbmUiLCJjb25uZWN0b3IiLCJjb25uZWN0aW9ucyIsIkNPTk5FQ1RJT05TIiwiY29ubmVjdG9ycyIsIm1hcCIsIlR5cGVFcnJvciIsIm9wdGlvbnMiLCJ0aGVuIiwiYyIsImNvbmNhdCIsIl9fY29ubmVjdGlvbnMiLCJkZWZhdWx0cyIsImZpbHRlcnMiLCJ1c2UiLCJfcHJlUm91dGluZyIsImZpbHRlciIsImYiLCJhcHBseSIsIl9fZmlsdGVycyIsIm1vdW50UG9pbnQiLCJ1cmwiLCJzdGF0dXMiLCJzdHJpbmciLCJudW1iZXIiLCJqb2luIiwiUHJvbWlzZSIsImFsbCIsIm9uU2VydmljZUxpc3RlbmVyIiwib25Db25uZWN0ZWQiLCJzY2hlbWUiLCJfX2ZyYW1ld29yayIsInJvb3QiLCJtaWRkbGV3YXJlIiwib3IiLCJjb250cm9sbGVycyIsIl9fcm91dGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLEVBQWY7QUFDQSxJQUFNQyxNQUFNLEVBQVo7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlTUMsTTtBQUVGLG9CQUFZQyxJQUFaLEVBQWtCQyxNQUFsQixFQUEwQkMsR0FBMUIsRUFBOEM7QUFBQSxZQUFmQyxNQUFlLHVFQUFOLElBQU07O0FBQUE7O0FBRTFDLGFBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtJLGFBQUwsR0FBcUJILE1BQXJCO0FBQ0EsYUFBS0ksV0FBTCxHQUFtQkgsR0FBbkI7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLRyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsYUFBS0MsT0FBTCxHQUFlLDhCQUFvQixFQUFwQixDQUFmO0FBQ0EsYUFBS0MsZUFBTCxHQUF1QixTQUF2QjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsYUFBS0MsY0FBTCxHQUFzQixHQUF0QjtBQUVIOzs7O29DQUVXQyxHLEVBQUtDLEcsRUFBS0MsSSxFQUFNOztBQUV4QixnQkFBSSxLQUFLTCxXQUFULEVBQXNCO0FBQ2xCSSxvQkFBSUUsU0FBSixDQUFjLEtBQUtKLGNBQW5CLEVBQW1DLEVBQUUsWUFBWSxLQUFLRCxXQUFuQixFQUFuQztBQUNBRyxvQkFBSUcsR0FBSjtBQUNBO0FBRUg7O0FBRURGO0FBR0g7O0FBRUQ7Ozs7Ozs7Ozt1Q0FNZUcsSSxFQUFNLENBRXBCOztBQUVEOzs7Ozs7aUNBR1M7QUFBQTs7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RUFDUEgsSUFETyxDQUNGO0FBQUEsdUJBQU8sT0FBS3ZELE1BQUwsS0FBZ0IsSUFBakIsR0FDUCxPQUFLRSxXQUFMLENBQWlCeUUsaUJBQWpCLENBQW1DQyxXQUFuQyxDQUErQyxPQUFLMUUsV0FBcEQsQ0FETyxHQUVQLElBRkM7QUFBQSxhQURFLEVBSVBxRCxJQUpPLENBSUYsWUFBTTs7QUFFUCxvQkFBSXZDLFFBQUo7QUFDQSxvQkFBSTZELFNBQVMsNkJBQW1CLCtCQUFuQixDQUFiOztBQUVBLHVCQUFLWCxTQUFMLENBQWVuRSxHQUFmLEVBQW9CLENBQUMsU0FBRCxDQUFwQjtBQUNBLHVCQUFLK0UsV0FBTDtBQUNBLHVCQUFLL0IsWUFBTDs7QUFFQThCLHVCQUFPdEQsR0FBUCxDQUFXLFFBQVgsRUFBcUIsOEJBQW9CLE9BQUt0QixhQUFMLENBQW1CeUMsS0FBbkIsQ0FBeUJxQyxJQUE3QyxDQUFyQjs7QUFFQS9ELDJCQUFXLCtCQUFxQixPQUFLZCxXQUFMLENBQWlCc0MsT0FBakIsQ0FBeUJ3QyxVQUE5QyxDQUFYO0FBQ0FoRSwyQkFBV0EsU0FBU2lFLEVBQVQsQ0FBWSwrQkFBcUIsT0FBSy9FLFdBQUwsQ0FBaUJzQyxPQUFqQixDQUF5QjBDLFdBQTlDLENBQVosRUFDWEQsRUFEVyxDQUNSSixNQURRLENBQVg7O0FBR0EsdUJBQUtNLFNBQUwsQ0FBZSxFQUFmLEVBQW1CcEYsR0FBbkIsRUFBd0JpQixRQUF4QjtBQUVILGFBckJNLENBQVA7QUF1Qkg7Ozs7OztrQkFJVXBCLE0iLCJmaWxlIjoiTW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCBzdGFydHN3aXRoIGZyb20gJ2xvZGFzaC5zdGFydHN3aXRoJztcbmltcG9ydCBDb25maWd1cmF0aW9uIGZyb20gJy4vQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgQ29tcG9zaXRlTW9kdWxlIGZyb20gJy4vQ29tcG9zaXRlTW9kdWxlJztcbmltcG9ydCBQcm9wZXJ0eVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvUHJvcGVydHlSZXNvdXJjZSc7XG5pbXBvcnQgUmVxdWlyZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvUmVxdWlyZVJlc291cmNlJztcbmltcG9ydCBNb2R1bGVSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL01vZHVsZVJlc291cmNlJztcbmltcG9ydCBTY2hlbWVSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1NjaGVtZVJlc291cmNlJztcbmltcG9ydCBVbmtub3duQ29ubmVjdG9yRXJyb3IgZnJvbSAnLi9Vbmtub3duQ29ubmVjdG9yRXJyb3InO1xuaW1wb3J0IFVua25vd25GaWx0ZXJFcnJvciBmcm9tICcuL1Vua25vd25GaWx0ZXJFcnJvcic7XG5pbXBvcnQgVW5rbm93bk1vZHVsZUVycm9yIGZyb20gJy4vVW5rbm93bk1vZHVsZUVycm9yJztcblxuY29uc3QgQkFTS0VUID0ge307XG5jb25zdCBCT1ggPSBbXTtcblxuLyoqXG4gKiBNb2R1bGVcbiAqIEBhYnN0cmFjdFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Q29uZmlndXJhdGlvbn0gY29uZmlnXG4gKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBcbiAqIEBwYXJhbSB7TW9kdWxlfSBbcGFyZW50XVxuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkge0NvbmZpZ3VyYXRpb259IGNvbmZpZ3VyYXRpb25cbiAqIEBwcm9wZXJ0eSB7QXBwbGljYXRpb259IGFwcGxpY2F0aW9uXG4gKiBAcHJvcGVydHkge01vZHVsZX0gcGFyZW50XG4gKiBAcHJvcGVydHkge0NvbXBvc2l0ZU1vZHVsZX0gbW9kdWxlc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtjb25maWdEaXJlY3Rvcnk9J2FwaWNvbmYnXVxuICovXG5jbGFzcyBNb2R1bGUge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgY29uZmlnLCBhcHAsIHBhcmVudCA9IG51bGwpIHtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBjb25maWc7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb24gPSBhcHA7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLnZpZXdFbmdpbmUgPSBudWxsO1xuICAgICAgICB0aGlzLm1vZHVsZXMgPSBuZXcgQ29tcG9zaXRlTW9kdWxlKFtdKTtcbiAgICAgICAgdGhpcy5jb25maWdEaXJlY3RvcnkgPSAnYXBpY29uZic7XG4gICAgICAgIHRoaXMucmVkaXJlY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWRpcmVjdFVybCA9ICcnO1xuICAgICAgICB0aGlzLnJlZGlyZWN0U3RhdHVzID0gMzAyO1xuXG4gICAgfVxuXG4gICAgX3ByZVJvdXRpbmcocmVxLCByZXMsIG5leHQpIHtcblxuICAgICAgICBpZiAodGhpcy5yZWRpcmVjdGluZykge1xuICAgICAgICAgICAgcmVzLndyaXRlSGVhZCh0aGlzLnJlZGlyZWN0U3RhdHVzLCB7ICdMb2NhdGlvbic6IHRoaXMucmVkaXJlY3RVcmwgfSk7XG4gICAgICAgICAgICByZXMuZW5kKCk7XG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIG5leHQoKTtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX192aWV3Q2FsbGJhY2sgcHJvdmlkZXMgYSBjYWxsYmFjayB0aGF0IHdpbGxcbiAgICAgKiBoYW5kbGUgdmlldyBkZWNsYXJhdGlvbnMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZpZXcgVGhlIHZpZXcgdGVtcGxhdGVcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBfX3ZpZXdDYWxsYmFjayh2aWV3KSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX2luaXQgaW5pdGlhbGl6ZXMgdGhpcyBtb2R1bGUgYW5kIGl0cyBzdWJtb2R1bGVzXG4gICAgICovXG4gICAgX19pbml0KCkge1xuXG4gICAgICAgIHZhciBzdWJtb2R1bGU7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgTW9kdWxlUmVzb3VyY2UodGhpcykpO1xuXG4gICAgICAgIHZhciBzdWJtb2R1bGVzID0gdGhpcy5jb25maWd1cmF0aW9uLlxuICAgICAgICByZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLk1PRFVMRVMsIEJPWCk7XG5cbiAgICAgICAgdmFyIHByZXZlbnRlZCA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmtleXMuTU9EVUxFU19QUkVWRU5URUQsIEJPWCk7XG5cbiAgICAgICAgcmVzb3VyY2UuYWRkKCdyZXF1aXJlJywgbmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcblxuICAgICAgICBzdWJtb2R1bGVzLlxuICAgICAgICBmb3JFYWNoKHBhdGggPT4ge1xuXG4gICAgICAgICAgICBzdWJtb2R1bGUgPSByZXNvdXJjZS5maW5kKHBhdGgpO1xuXG4gICAgICAgICAgICBpZiAoIXN1Ym1vZHVsZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVW5rbm93bk1vZHVsZUVycm9yKHBhdGgpO1xuXG4gICAgICAgICAgICBpZiAocHJldmVudGVkLmluZGV4T2Yoc3VibW9kdWxlLm5hbWUpID4gLTEpXG4gICAgICAgICAgICAgICAgc3VibW9kdWxlLnByZXZlbnRSb3V0aW5nKCk7XG5cbiAgICAgICAgICAgIHRoaXMubW9kdWxlcy5hZGQoc3VibW9kdWxlKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX19pbml0KCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX2F1dG9sb2FkIHRoZSBhdXRvbG9hZGFibGUgYXNwZWN0cyBvZiB0aGUgc3lzdGVtXG4gICAgICovXG4gICAgX19hdXRvbG9hZCgpIHtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgU2NoZW1lUmVzb3VyY2UobmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcbiAgICAgICAgdmFyIGF1dG9sb2FkcztcbiAgICAgICAgdmFyIGF1dG9rZXk7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgdmFyIG8gPSB7fTtcbiAgICAgICAgb1t0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5DT05ORUNUT1JTXSA9ICdjb25uZWN0b3JzJztcbiAgICAgICAgb1t0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5GSUxURVJTXSA9ICdmaWx0ZXJzJztcbiAgICAgICAgb1t0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5NSURETEVXQVJFXSA9ICdtaWRkbGV3YXJlJztcbiAgICAgICAgb1t0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5DT05UUk9MTEVSU10gPSAnY29udHJvbGxlcnMnO1xuXG4gICAgICAgIHJlc291cmNlLmFkZCgncmVxdWlyZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG5cbiAgICAgICAgW1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OTkVDVE9SUyxcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkZJTFRFUlMsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5NSURETEVXQVJFLFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OVFJPTExFUlNcbiAgICAgICAgXS5cbiAgICAgICAgZm9yRWFjaChwcmVmaXhlZEtleSA9PiB7XG5cbiAgICAgICAgICAgIGtleSA9IG9bcHJlZml4ZWRLZXldO1xuICAgICAgICAgICAgYXV0b2tleSA9IGBwb3dlci5hdXRvbG9hZC4ke2tleX1gO1xuICAgICAgICAgICAgYXV0b2xvYWRzID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQoYXV0b2tleSwgQkFTS0VUKTtcblxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXV0b2xvYWRzKS5mb3JFYWNoKG5hbWUgPT5cbiAgICAgICAgICAgICAgICB0aGlzLmFwcC5jb250ZXh0W2tleV1bbmFtZV0gPSByZXNvdXJjZS5maW5kKGF1dG9sb2Fkc1thdXRva2V5XSkpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ucmVxdWlyZSh0aGlzLmNvbmZpZ3VyYXRpb24ucGF0aHNba2V5XSwgdGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0W2tleV0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kdWxlcy5fX2F1dG9sb2FkKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX3ZpZXdFbmdpbmUgY29uZmlndXJlcyB0aGUgdmlldyBlbmdpbmUgZm9yIHRoaXMgbW9kdWxlLlxuICAgICAqIFRoZSBwYXJlbnQgdmlldyBlbmdpbmUgaXMgdXNlZCBpZiBub25lIGlzIGNvbmZpZ3VyZWQuXG4gICAgICovXG4gICAgX192aWV3RW5naW5lKCkge1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuICAgICAgICB2YXIgZmFjdG9yeSA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLlZJRVdTX0VOR0lORSwgbnVsbCk7XG5cbiAgICAgICAgaWYgKCFmYWN0b3J5KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlld0VuZ2luZSA9ICh0aGlzLnBhcmVudCkgPyB0aGlzLnBhcmVudC52aWV3RW5naW5lIDogbnVsbDtcblxuICAgICAgICB0aGlzLnZpZXdFbmdpbmUgPSBmYWN0b3J5LmNyZWF0ZSh0aGlzKTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX192aWV3RW5naW5lKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX2ZyYW1ld29yayBwZXJmb3JtcyBmcmFtZXdvcmsgc3BlY2lmaWMgYWN0aW9uc1xuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIF9fZnJhbWV3b3JrKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19jb25uZWN0aW9ucyBlc3RhYmxpc2hlcyB0aGUgY29ubmVjdGlvbnMgZGVjbGVhcmVkIGluIHRoZSBjb25maWcgZmlsZS5cbiAgICAgKiBAcmV0dXJuIHthcnJheTxQcm9taXNlPn1cbiAgICAgKi9cbiAgICBfX2Nvbm5lY3Rpb25zKCkge1xuXG4gICAgICAgIHZhciBjb25maWc7XG4gICAgICAgIHZhciBjb25uZWN0b3I7XG4gICAgICAgIHZhciBjb25uZWN0aW9ucyA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTk5FQ1RJT05TLCBCQVNLRVQpO1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgUHJvcGVydHlSZXNvdXJjZSh0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHQuY29ubmVjdG9ycyk7XG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGNvbm5lY3Rpb25zKS5cbiAgICAgICAgbWFwKGtleSA9PiB7XG5cbiAgICAgICAgICAgIGNvbmZpZyA9IGNvbm5lY3Rpb25zW2tleV07XG4gICAgICAgICAgICBjb25uZWN0b3IgPSByZXNvdXJjZS5maW5kKGNvbmZpZy5jb25uZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAoIWNvbm5lY3RvcilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVW5rbm93bkNvbm5lY3RvckVycm9yKGtleSwgY29uZmlnLmNvbm5lY3RvcixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0LmNvbm5lY3RvcnMpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbm5lY3RvciAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBDb25uZWN0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uIGdvdCAnJHt0eXBlb2YgY29ubmVjdG9yfSchYCk7XG5cbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0b3IoY29uZmlnLm9wdGlvbnMpLnRoZW4oYyA9PiB0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHQuY29ubmVjdGlvbnNba2V5XSA9IGMpO1xuXG4gICAgICAgIH0pLmNvbmNhdCh0aGlzLm1vZHVsZXMuX19jb25uZWN0aW9ucygpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fZmlsdGVycyBsb2FkcyB0aGUgcHJlIHJvdXRpbmcgbWlkZGxld2FyZS5cbiAgICAgKi9cbiAgICBfX2ZpbHRlcnMoYXBwLCBkZWZhdWx0cykge1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShcbiAgICAgICAgICAgIG5ldyBQcm9wZXJ0eVJlc291cmNlKHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5maWx0ZXJzKSk7XG5cbiAgICAgICAgcmVzb3VyY2UuYWRkKCdyZXF1aXJlJywgbmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcblxuICAgICAgICBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4gdGhpcy5fcHJlUm91dGluZyhyZXEsIHJlcywgbmV4dCkpO1xuXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkZJTFRFUlMsIGRlZmF1bHRzKS5cbiAgICAgICAgZm9yRWFjaChmID0+IHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlciA9IHJlc291cmNlLmZpbmQoZik7XG5cbiAgICAgICAgICAgIGlmICghZmlsdGVyKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbmtub3duRmlsdGVyRXJyb3IodGhpcy5uYW1lLCBmKTtcblxuICAgICAgICAgICAgZmlsdGVyLmFwcGx5KGFwcCwgdGhpcy5jb25maWd1cmF0aW9uKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX19maWx0ZXJzKGFwcCwgWydwdWJsaWMnXSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX3JvdXRpbmcgc2V0cyB1cCB0aGUgcm91dGluZyBmb3IgdGhpcyBtb2R1bGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcG9pbnQgVGhlIG1vdW50IHBvaW50IG9mIHRoaXMgbW9kdWxlJ3MgcGFyZW50J3Mgcm91dGVyLlxuICAgICAqIEBwYXJhbSB7RnJhbWV3b3JrQXBwbGljYXRpb259IGFwcFxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2V9IHJlc291cmNlXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgX19yb3V0aW5nKG1vdW50UG9pbnQsIGFwcCwgcmVzb3VyY2UpIHtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVkaXJlY3QgdGhlIHJvdXRlcyBvZiB0aGlzIG1vZHVsZSB0byBhIHVybFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3N0YXR1c11cbiAgICAgKi9cbiAgICByZWRpcmVjdCh1cmwsIHN0YXR1cyA9IDMwMikge1xuXG4gICAgICAgIGJlb2YoeyB1cmwgfSkuc3RyaW5nKCk7XG4gICAgICAgIGJlb2YoeyBzdGF0dXMgfSkubnVtYmVyKCk7XG5cbiAgICAgICAgdGhpcy5yZWRpcmVjdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMucmVkaXJlY3RVcmwgPSB1cmw7XG4gICAgICAgIHRoaXMucmVkaXJlY3RTdGF0dXMgPSBzdGF0dXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdG9wUmVkaXJlY3QgZGlzYWJsZXMgcmVkaXJlY3RpbmdcbiAgICAgKi9cbiAgICBzdG9wUmVkaXJlY3QoKSB7XG5cbiAgICAgICAgdGhpcy5yZWRpcmVjdGluZyA9IGZhbHNlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGF0aCByZXR1cm5zIHRoZSBsb2dpY2FsIGFwcGxpY2F0aW9uIHBhdGggZm9yIHRoaXMgbW9kdWxlLlxuICAgICAqIFRoYXQgaXMsIHRoZSBwYXRoIHJvdXRlcyBhcmUgbW91bnRlZCB0byBieSBkZWZhdWx0LlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcGF0aCgpIHtcblxuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm4gJy8nO1xuICAgICAgICByZXR1cm4gUGF0aC5qb2luKHRoaXMucGFyZW50LnBhdGgoKSwgdGhpcy5uYW1lKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGZpbmQgcmV0cmlldmVzIGEgbW9kdWxlIG9yIG51bGwgaWYgaXQgaXMgbm90IGZvdW5kLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHJldHVybnMge01vZHVsZXxudWxsfVxuICAgICAqL1xuICAgIGZpbmQocGF0aCkge1xuXG4gICAgICAgIGJlb2YoeyBwYXRoIH0pLnN0cmluZygpO1xuXG4gICAgICAgIGlmIChwYXRoID09PSB0aGlzLnBhdGgoKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChzdGFydHN3aXRoKHBhdGgsIHRoaXMucGF0aCgpKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZHVsZXMuZmluZChwYXRoKTtcblxuICAgICAgICBpZiAodGhpcy5wYXJlbnQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZmluZChwYXRoKTtcblxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvYWQgdGhpcyBtb2R1bGVcbiAgICAgKi9cbiAgICBsb2FkKGFwcCkge1xuXG4gICAgICAgIHRoaXMuX19pbml0KCk7XG4gICAgICAgIHRoaXMuX19hdXRvbG9hZCgpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLl9fY29ubmVjdGlvbnMoKSkuXG4gICAgICAgIHRoZW4oKCkgPT4gKHRoaXMucGFyZW50ID09PSBudWxsKSA/XG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLm9uU2VydmljZUxpc3RlbmVyLm9uQ29ubmVjdGVkKHRoaXMuYXBwbGljYXRpb24pIDpcbiAgICAgICAgICAgIG51bGwpLlxuICAgICAgICB0aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdmFyIHJlc291cmNlO1xuICAgICAgICAgICAgdmFyIHNjaGVtZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuXG4gICAgICAgICAgICB0aGlzLl9fZmlsdGVycyhhcHAsIFsnZGVmYXVsdCddKTtcbiAgICAgICAgICAgIHRoaXMuX19mcmFtZXdvcmsoKTtcbiAgICAgICAgICAgIHRoaXMuX192aWV3RW5naW5lKCk7XG5cbiAgICAgICAgICAgIHNjaGVtZS5hZGQoJ21vZHVsZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UodGhpcy5jb25maWd1cmF0aW9uLnBhdGhzLnJvb3QpKTtcblxuICAgICAgICAgICAgcmVzb3VyY2UgPSBuZXcgUHJvcGVydHlSZXNvdXJjZSh0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHQubWlkZGxld2FyZSk7XG4gICAgICAgICAgICByZXNvdXJjZSA9IHJlc291cmNlLm9yKG5ldyBQcm9wZXJ0eVJlc291cmNlKHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5jb250cm9sbGVycykpLlxuICAgICAgICAgICAgb3Ioc2NoZW1lKTtcblxuICAgICAgICAgICAgdGhpcy5fX3JvdXRpbmcoJycsIGFwcCwgcmVzb3VyY2UpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vZHVsZVxuIl19