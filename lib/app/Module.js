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

                if (!connector) throw new _UnknownConnectorError2.default(key, config.connector, _this3.app.context.connectors);

                if (typeof connector !== 'function') throw new TypeError('Connector must be a function got \'' + (typeof connector === 'undefined' ? 'undefined' : _typeof(connector)) + '\'!');

                return connector(config.options).then(function (c) {
                    return _this3.application.connections[key] = c;
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

                _this5.__filters(app, ['default']);
                _this5.__framework();
                _this5.__viewEngine();

                resource = new _PropertyResource2.default(_this5.application.context.middleware);
                resource = resource.or(new _PropertyResource2.default(_this5.application.context.controllers)).or(new _SchemeResource2.default(new _PropertyResource2.default(_this5.application.context)));

                _this5.__routing('', app, resource);
            });
        }
    }]);

    return Module;
}();

exports.default = Module;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkJBU0tFVCIsIkJPWCIsIk1vZHVsZSIsIm5hbWUiLCJjb25maWciLCJhcHAiLCJwYXJlbnQiLCJjb25maWd1cmF0aW9uIiwiYXBwbGljYXRpb24iLCJ2aWV3RW5naW5lIiwibW9kdWxlcyIsImNvbmZpZ0RpcmVjdG9yeSIsInJlZGlyZWN0aW5nIiwicmVkaXJlY3RVcmwiLCJyZWRpcmVjdFN0YXR1cyIsInJlcSIsInJlcyIsIm5leHQiLCJ3cml0ZUhlYWQiLCJlbmQiLCJ2aWV3Iiwic3VibW9kdWxlIiwicmVzb3VyY2UiLCJzdWJtb2R1bGVzIiwicmVhZCIsImtleXMiLCJNT0RVTEVTIiwicHJldmVudGVkIiwiTU9EVUxFU19QUkVWRU5URUQiLCJhZGQiLCJmb3JFYWNoIiwiZmluZCIsInBhdGgiLCJpbmRleE9mIiwicHJldmVudFJvdXRpbmciLCJfX2luaXQiLCJhdXRvbG9hZHMiLCJhdXRva2V5Iiwia2V5IiwibyIsIkNPTk5FQ1RPUlMiLCJGSUxURVJTIiwiTUlERExFV0FSRSIsIkNPTlRST0xMRVJTIiwicHJlZml4ZWRLZXkiLCJPYmplY3QiLCJjb250ZXh0IiwicmVxdWlyZSIsInBhdGhzIiwiX19hdXRvbG9hZCIsImZhY3RvcnkiLCJWSUVXU19FTkdJTkUiLCJjcmVhdGUiLCJfX3ZpZXdFbmdpbmUiLCJjb25uZWN0b3IiLCJjb25uZWN0aW9ucyIsIkNPTk5FQ1RJT05TIiwiY29ubmVjdG9ycyIsIm1hcCIsIlR5cGVFcnJvciIsIm9wdGlvbnMiLCJ0aGVuIiwiYyIsImNvbmNhdCIsIl9fY29ubmVjdGlvbnMiLCJkZWZhdWx0cyIsImZpbHRlcnMiLCJ1c2UiLCJfcHJlUm91dGluZyIsImZpbHRlciIsImYiLCJhcHBseSIsIl9fZmlsdGVycyIsIm1vdW50UG9pbnQiLCJ1cmwiLCJzdGF0dXMiLCJzdHJpbmciLCJudW1iZXIiLCJqb2luIiwiUHJvbWlzZSIsImFsbCIsIm9uU2VydmljZUxpc3RlbmVyIiwib25Db25uZWN0ZWQiLCJfX2ZyYW1ld29yayIsIm1pZGRsZXdhcmUiLCJvciIsImNvbnRyb2xsZXJzIiwiX19yb3V0aW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLFNBQVMsRUFBZjtBQUNBLElBQU1DLE1BQU0sRUFBWjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztJQWVNQyxNO0FBRUYsb0JBQVlDLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCQyxHQUExQixFQUE4QztBQUFBLFlBQWZDLE1BQWUsdUVBQU4sSUFBTTs7QUFBQTs7QUFFMUMsYUFBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS0ksYUFBTCxHQUFxQkgsTUFBckI7QUFDQSxhQUFLSSxXQUFMLEdBQW1CSCxHQUFuQjtBQUNBLGFBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtHLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxhQUFLQyxPQUFMLEdBQWUsOEJBQW9CLEVBQXBCLENBQWY7QUFDQSxhQUFLQyxlQUFMLEdBQXVCLFNBQXZCO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQixLQUFuQjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxhQUFLQyxjQUFMLEdBQXNCLEdBQXRCO0FBRUg7Ozs7b0NBRVdDLEcsRUFBS0MsRyxFQUFLQyxJLEVBQU07O0FBRXhCLGdCQUFJLEtBQUtMLFdBQVQsRUFBc0I7QUFDbEJJLG9CQUFJRSxTQUFKLENBQWMsS0FBS0osY0FBbkIsRUFBbUMsRUFBRSxZQUFZLEtBQUtELFdBQW5CLEVBQW5DO0FBQ0FHLG9CQUFJRyxHQUFKO0FBQ0E7QUFFSDs7QUFFREY7QUFHSDs7QUFFRDs7Ozs7Ozs7O3VDQU1lRyxJLEVBQU0sQ0FFcEI7O0FBRUQ7Ozs7OztpQ0FHUztBQUFBOztBQUVMLGdCQUFJQyxTQUFK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S3ZELE1BQUwsS0FBZ0IsSUFBakIsR0FDUCxPQUFLRSxXQUFMLENBQWlCeUUsaUJBQWpCLENBQW1DQyxXQUFuQyxDQUErQyxPQUFLMUUsV0FBcEQsQ0FETyxHQUVQLElBRkM7QUFBQSxhQURFLEVBSVBxRCxJQUpPLENBSUYsWUFBTTs7QUFFUCxvQkFBSXZDLFFBQUo7O0FBR0EsdUJBQUtrRCxTQUFMLENBQWVuRSxHQUFmLEVBQW9CLENBQUMsU0FBRCxDQUFwQjtBQUNBLHVCQUFLOEUsV0FBTDtBQUNBLHVCQUFLOUIsWUFBTDs7QUFFQS9CLDJCQUFXLCtCQUFxQixPQUFLZCxXQUFMLENBQWlCc0MsT0FBakIsQ0FBeUJzQyxVQUE5QyxDQUFYO0FBQ0E5RCwyQkFBV0EsU0FBUytELEVBQVQsQ0FBWSwrQkFBcUIsT0FBSzdFLFdBQUwsQ0FBaUJzQyxPQUFqQixDQUF5QndDLFdBQTlDLENBQVosRUFBd0VELEVBQXhFLENBQTJFLDZCQUFtQiwrQkFBcUIsT0FBSzdFLFdBQUwsQ0FBaUJzQyxPQUF0QyxDQUFuQixDQUEzRSxDQUFYOztBQUVBLHVCQUFLeUMsU0FBTCxDQUFlLEVBQWYsRUFBbUJsRixHQUFuQixFQUF3QmlCLFFBQXhCO0FBRUgsYUFsQk0sQ0FBUDtBQW9CSDs7Ozs7O2tCQUlVcEIsTSIsImZpbGUiOiJNb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IHN0YXJ0c3dpdGggZnJvbSAnbG9kYXNoLnN0YXJ0c3dpdGgnO1xuaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi9Db25maWd1cmF0aW9uJztcbmltcG9ydCBDb21wb3NpdGVNb2R1bGUgZnJvbSAnLi9Db21wb3NpdGVNb2R1bGUnO1xuaW1wb3J0IFByb3BlcnR5UmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9Qcm9wZXJ0eVJlc291cmNlJztcbmltcG9ydCBSZXF1aXJlUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9SZXF1aXJlUmVzb3VyY2UnO1xuaW1wb3J0IE1vZHVsZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvTW9kdWxlUmVzb3VyY2UnO1xuaW1wb3J0IFNjaGVtZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvU2NoZW1lUmVzb3VyY2UnO1xuaW1wb3J0IFVua25vd25Db25uZWN0b3JFcnJvciBmcm9tICcuL1Vua25vd25Db25uZWN0b3JFcnJvcic7XG5pbXBvcnQgVW5rbm93bkZpbHRlckVycm9yIGZyb20gJy4vVW5rbm93bkZpbHRlckVycm9yJztcbmltcG9ydCBVbmtub3duTW9kdWxlRXJyb3IgZnJvbSAnLi9Vbmtub3duTW9kdWxlRXJyb3InO1xuXG5jb25zdCBCQVNLRVQgPSB7fTtcbmNvbnN0IEJPWCA9IFtdO1xuXG4vKipcbiAqIE1vZHVsZVxuICogQGFic3RyYWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtDb25maWd1cmF0aW9ufSBjb25maWdcbiAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcFxuICogQHBhcmFtIHtNb2R1bGV9IFtwYXJlbnRdXG4gKlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVcbiAqIEBwcm9wZXJ0eSB7Q29uZmlndXJhdGlvbn0gY29uZmlndXJhdGlvblxuICogQHByb3BlcnR5IHtBcHBsaWNhdGlvbn0gYXBwbGljYXRpb25cbiAqIEBwcm9wZXJ0eSB7TW9kdWxlfSBwYXJlbnRcbiAqIEBwcm9wZXJ0eSB7Q29tcG9zaXRlTW9kdWxlfSBtb2R1bGVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2NvbmZpZ0RpcmVjdG9yeT0nYXBpY29uZiddXG4gKi9cbmNsYXNzIE1vZHVsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjb25maWcsIGFwcCwgcGFyZW50ID0gbnVsbCkge1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IGNvbmZpZztcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbiA9IGFwcDtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMudmlld0VuZ2luZSA9IG51bGw7XG4gICAgICAgIHRoaXMubW9kdWxlcyA9IG5ldyBDb21wb3NpdGVNb2R1bGUoW10pO1xuICAgICAgICB0aGlzLmNvbmZpZ0RpcmVjdG9yeSA9ICdhcGljb25mJztcbiAgICAgICAgdGhpcy5yZWRpcmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlZGlyZWN0VXJsID0gJyc7XG4gICAgICAgIHRoaXMucmVkaXJlY3RTdGF0dXMgPSAzMDI7XG5cbiAgICB9XG5cbiAgICBfcHJlUm91dGluZyhyZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgIGlmICh0aGlzLnJlZGlyZWN0aW5nKSB7XG4gICAgICAgICAgICByZXMud3JpdGVIZWFkKHRoaXMucmVkaXJlY3RTdGF0dXMsIHsgJ0xvY2F0aW9uJzogdGhpcy5yZWRpcmVjdFVybCB9KTtcbiAgICAgICAgICAgIHJlcy5lbmQoKTtcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgbmV4dCgpO1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX3ZpZXdDYWxsYmFjayBwcm92aWRlcyBhIGNhbGxiYWNrIHRoYXQgd2lsbFxuICAgICAqIGhhbmRsZSB2aWV3IGRlY2xhcmF0aW9ucy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmlldyBUaGUgdmlldyB0ZW1wbGF0ZVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIF9fdmlld0NhbGxiYWNrKHZpZXcpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9faW5pdCBpbml0aWFsaXplcyB0aGlzIG1vZHVsZSBhbmQgaXRzIHN1Ym1vZHVsZXNcbiAgICAgKi9cbiAgICBfX2luaXQoKSB7XG5cbiAgICAgICAgdmFyIHN1Ym1vZHVsZTtcbiAgICAgICAgdmFyIHJlc291cmNlID0gbmV3IFNjaGVtZVJlc291cmNlKG5ldyBNb2R1bGVSZXNvdXJjZSh0aGlzKSk7XG5cbiAgICAgICAgdmFyIHN1Ym1vZHVsZXMgPSB0aGlzLmNvbmZpZ3VyYXRpb24uXG4gICAgICAgIHJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuTU9EVUxFUywgQk9YKTtcblxuICAgICAgICB2YXIgcHJldmVudGVkID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5NT0RVTEVTX1BSRVZFTlRFRCwgQk9YKTtcblxuICAgICAgICByZXNvdXJjZS5hZGQoJ3JlcXVpcmUnLCBuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuXG4gICAgICAgIHN1Ym1vZHVsZXMuXG4gICAgICAgIGZvckVhY2gocGF0aCA9PiB7XG5cbiAgICAgICAgICAgIHN1Ym1vZHVsZSA9IHJlc291cmNlLmZpbmQocGF0aCk7XG5cbiAgICAgICAgICAgIGlmICghc3VibW9kdWxlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbmtub3duTW9kdWxlRXJyb3IocGF0aCk7XG5cbiAgICAgICAgICAgIGlmIChwcmV2ZW50ZWQuaW5kZXhPZihzdWJtb2R1bGUubmFtZSkgPiAtMSlcbiAgICAgICAgICAgICAgICBzdWJtb2R1bGUucHJldmVudFJvdXRpbmcoKTtcblxuICAgICAgICAgICAgdGhpcy5tb2R1bGVzLmFkZChzdWJtb2R1bGUpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kdWxlcy5fX2luaXQoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fYXV0b2xvYWQgdGhlIGF1dG9sb2FkYWJsZSBhc3BlY3RzIG9mIHRoZSBzeXN0ZW1cbiAgICAgKi9cbiAgICBfX2F1dG9sb2FkKCkge1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuICAgICAgICB2YXIgYXV0b2xvYWRzO1xuICAgICAgICB2YXIgYXV0b2tleTtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICB2YXIgbyA9IHt9O1xuICAgICAgICBvW3RoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTk5FQ1RPUlNdID0gJ2Nvbm5lY3RvcnMnO1xuICAgICAgICBvW3RoaXMuY29uZmlndXJhdGlvbi5rZXlzLkZJTFRFUlNdID0gJ2ZpbHRlcnMnO1xuICAgICAgICBvW3RoaXMuY29uZmlndXJhdGlvbi5rZXlzLk1JRERMRVdBUkVdID0gJ21pZGRsZXdhcmUnO1xuICAgICAgICBvW3RoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTlRST0xMRVJTXSA9ICdjb250cm9sbGVycyc7XG5cbiAgICAgICAgcmVzb3VyY2UuYWRkKCdyZXF1aXJlJywgbmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcblxuICAgICAgICBbXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5DT05ORUNUT1JTLFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmtleXMuRklMVEVSUyxcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLk1JRERMRVdBUkUsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5DT05UUk9MTEVSU1xuICAgICAgICBdLlxuICAgICAgICBmb3JFYWNoKHByZWZpeGVkS2V5ID0+IHtcblxuICAgICAgICAgICAga2V5ID0gb1twcmVmaXhlZEtleV07XG4gICAgICAgICAgICBhdXRva2V5ID0gYHBvd2VyLmF1dG9sb2FkLiR7a2V5fWA7XG4gICAgICAgICAgICBhdXRvbG9hZHMgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZChhdXRva2V5LCBCQVNLRVQpO1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhdXRvbG9hZHMpLmZvckVhY2gobmFtZSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuYXBwLmNvbnRleHRba2V5XVtuYW1lXSA9IHJlc291cmNlLmZpbmQoYXV0b2xvYWRzW2F1dG9rZXldKSk7XG5cbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5yZXF1aXJlKHRoaXMuY29uZmlndXJhdGlvbi5wYXRoc1trZXldLCB0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHRba2V5XSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9fYXV0b2xvYWQoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fdmlld0VuZ2luZSBjb25maWd1cmVzIHRoZSB2aWV3IGVuZ2luZSBmb3IgdGhpcyBtb2R1bGUuXG4gICAgICogVGhlIHBhcmVudCB2aWV3IGVuZ2luZSBpcyB1c2VkIGlmIG5vbmUgaXMgY29uZmlndXJlZC5cbiAgICAgKi9cbiAgICBfX3ZpZXdFbmdpbmUoKSB7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gbmV3IFNjaGVtZVJlc291cmNlKG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG4gICAgICAgIHZhciBmYWN0b3J5ID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuVklFV1NfRU5HSU5FLCBudWxsKTtcblxuICAgICAgICBpZiAoIWZhY3RvcnkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3RW5naW5lID0gKHRoaXMucGFyZW50KSA/IHRoaXMucGFyZW50LnZpZXdFbmdpbmUgOiBudWxsO1xuXG4gICAgICAgIHRoaXMudmlld0VuZ2luZSA9IGZhY3RvcnkuY3JlYXRlKHRoaXMpO1xuXG4gICAgICAgIHRoaXMubW9kdWxlcy5fX3ZpZXdFbmdpbmUoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fZnJhbWV3b3JrIHBlcmZvcm1zIGZyYW1ld29yayBzcGVjaWZpYyBhY3Rpb25zXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgX19mcmFtZXdvcmsoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX2Nvbm5lY3Rpb25zIGVzdGFibGlzaGVzIHRoZSBjb25uZWN0aW9ucyBkZWNsZWFyZWQgaW4gdGhlIGNvbmZpZyBmaWxlLlxuICAgICAqIEByZXR1cm4ge2FycmF5PFByb21pc2U+fVxuICAgICAqL1xuICAgIF9fY29ubmVjdGlvbnMoKSB7XG5cbiAgICAgICAgdmFyIGNvbmZpZztcbiAgICAgICAgdmFyIGNvbm5lY3RvcjtcbiAgICAgICAgdmFyIGNvbm5lY3Rpb25zID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OTkVDVElPTlMsIEJBU0tFVCk7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBQcm9wZXJ0eVJlc291cmNlKHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5jb25uZWN0b3JzKTtcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29ubmVjdGlvbnMpLlxuICAgICAgICBtYXAoa2V5ID0+IHtcblxuICAgICAgICAgICAgY29uZmlnID0gY29ubmVjdGlvbnNba2V5XTtcbiAgICAgICAgICAgIGNvbm5lY3RvciA9IHJlc291cmNlLmZpbmQoY29uZmlnLmNvbm5lY3Rvcik7XG5cbiAgICAgICAgICAgIGlmICghY29ubmVjdG9yKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbmtub3duQ29ubmVjdG9yRXJyb3Ioa2V5LCBjb25maWcuY29ubmVjdG9yLCB0aGlzLmFwcC5jb250ZXh0LmNvbm5lY3RvcnMpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbm5lY3RvciAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBDb25uZWN0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uIGdvdCAnJHt0eXBlb2YgY29ubmVjdG9yfSchYCk7XG5cbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0b3IoY29uZmlnLm9wdGlvbnMpLnRoZW4oYyA9PiB0aGlzLmFwcGxpY2F0aW9uLmNvbm5lY3Rpb25zW2tleV0gPSBjKTtcblxuICAgICAgICB9KS5jb25jYXQodGhpcy5tb2R1bGVzLl9fY29ubmVjdGlvbnMoKSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX2ZpbHRlcnMgbG9hZHMgdGhlIHByZSByb3V0aW5nIG1pZGRsZXdhcmUuXG4gICAgICovXG4gICAgX19maWx0ZXJzKGFwcCwgZGVmYXVsdHMpIHtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgU2NoZW1lUmVzb3VyY2UoXG4gICAgICAgICAgICBuZXcgUHJvcGVydHlSZXNvdXJjZSh0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHQuZmlsdGVycykpO1xuXG4gICAgICAgIHJlc291cmNlLmFkZCgncmVxdWlyZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG5cbiAgICAgICAgYXBwLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHRoaXMuX3ByZVJvdXRpbmcocmVxLCByZXMsIG5leHQpKTtcblxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5GSUxURVJTLCBkZWZhdWx0cykuXG4gICAgICAgIGZvckVhY2goZiA9PiB7XG5cbiAgICAgICAgICAgIHZhciBmaWx0ZXIgPSByZXNvdXJjZS5maW5kKGYpO1xuXG4gICAgICAgICAgICBpZiAoIWZpbHRlcilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVW5rbm93bkZpbHRlckVycm9yKHRoaXMubmFtZSwgZik7XG5cbiAgICAgICAgICAgIGZpbHRlci5hcHBseShhcHAsIHRoaXMuY29uZmlndXJhdGlvbik7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9fZmlsdGVycyhhcHAsIFsncHVibGljJ10pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19yb3V0aW5nIHNldHMgdXAgdGhlIHJvdXRpbmcgZm9yIHRoaXMgbW9kdWxlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBvaW50IFRoZSBtb3VudCBwb2ludCBvZiB0aGlzIG1vZHVsZSdzIHBhcmVudCdzIHJvdXRlci5cbiAgICAgKiBAcGFyYW0ge0ZyYW1ld29ya0FwcGxpY2F0aW9ufSBhcHBcbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlfSByZXNvdXJjZVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIF9fcm91dGluZyhtb3VudFBvaW50LCBhcHAsIHJlc291cmNlKSB7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlZGlyZWN0IHRoZSByb3V0ZXMgb2YgdGhpcyBtb2R1bGUgdG8gYSB1cmxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtzdGF0dXNdXG4gICAgICovXG4gICAgcmVkaXJlY3QodXJsLCBzdGF0dXMgPSAzMDIpIHtcblxuICAgICAgICBiZW9mKHsgdXJsIH0pLnN0cmluZygpO1xuICAgICAgICBiZW9mKHsgc3RhdHVzIH0pLm51bWJlcigpO1xuXG4gICAgICAgIHRoaXMucmVkaXJlY3RpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlZGlyZWN0VXJsID0gdXJsO1xuICAgICAgICB0aGlzLnJlZGlyZWN0U3RhdHVzID0gc3RhdHVzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc3RvcFJlZGlyZWN0IGRpc2FibGVzIHJlZGlyZWN0aW5nXG4gICAgICovXG4gICAgc3RvcFJlZGlyZWN0KCkge1xuXG4gICAgICAgIHRoaXMucmVkaXJlY3RpbmcgPSBmYWxzZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBhdGggcmV0dXJucyB0aGUgbG9naWNhbCBhcHBsaWNhdGlvbiBwYXRoIGZvciB0aGlzIG1vZHVsZS5cbiAgICAgKiBUaGF0IGlzLCB0aGUgcGF0aCByb3V0ZXMgYXJlIG1vdW50ZWQgdG8gYnkgZGVmYXVsdC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHBhdGgoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnBhcmVudCkgcmV0dXJuICcvJztcbiAgICAgICAgcmV0dXJuIFBhdGguam9pbih0aGlzLnBhcmVudC5wYXRoKCksIHRoaXMubmFtZSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmaW5kIHJldHJpZXZlcyBhIG1vZHVsZSBvciBudWxsIGlmIGl0IGlzIG5vdCBmb3VuZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEByZXR1cm5zIHtNb2R1bGV8bnVsbH1cbiAgICAgKi9cbiAgICBmaW5kKHBhdGgpIHtcblxuICAgICAgICBiZW9mKHsgcGF0aCB9KS5zdHJpbmcoKTtcblxuICAgICAgICBpZiAocGF0aCA9PT0gdGhpcy5wYXRoKCkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAoc3RhcnRzd2l0aChwYXRoLCB0aGlzLnBhdGgoKSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2R1bGVzLmZpbmQocGF0aCk7XG5cbiAgICAgICAgaWYgKHRoaXMucGFyZW50KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmZpbmQocGF0aCk7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb2FkIHRoaXMgbW9kdWxlXG4gICAgICovXG4gICAgbG9hZChhcHApIHtcblxuICAgICAgICB0aGlzLl9faW5pdCgpO1xuICAgICAgICB0aGlzLl9fYXV0b2xvYWQoKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5fX2Nvbm5lY3Rpb25zKCkpLlxuICAgICAgICB0aGVuKCgpID0+ICh0aGlzLnBhcmVudCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbi5vblNlcnZpY2VMaXN0ZW5lci5vbkNvbm5lY3RlZCh0aGlzLmFwcGxpY2F0aW9uKSA6XG4gICAgICAgICAgICBudWxsKS5cbiAgICAgICAgdGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciByZXNvdXJjZTtcblxuXG4gICAgICAgICAgICB0aGlzLl9fZmlsdGVycyhhcHAsIFsnZGVmYXVsdCddKTtcbiAgICAgICAgICAgIHRoaXMuX19mcmFtZXdvcmsoKTtcbiAgICAgICAgICAgIHRoaXMuX192aWV3RW5naW5lKCk7XG5cbiAgICAgICAgICAgIHJlc291cmNlID0gbmV3IFByb3BlcnR5UmVzb3VyY2UodGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0Lm1pZGRsZXdhcmUpO1xuICAgICAgICAgICAgcmVzb3VyY2UgPSByZXNvdXJjZS5vcihuZXcgUHJvcGVydHlSZXNvdXJjZSh0aGlzLmFwcGxpY2F0aW9uLmNvbnRleHQuY29udHJvbGxlcnMpKS5vcihuZXcgU2NoZW1lUmVzb3VyY2UobmV3IFByb3BlcnR5UmVzb3VyY2UodGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0KSkpO1xuXG4gICAgICAgICAgICB0aGlzLl9fcm91dGluZygnJywgYXBwLCByZXNvdXJjZSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kdWxlXG4iXX0=