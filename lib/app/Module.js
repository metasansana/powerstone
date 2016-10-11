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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkJBU0tFVCIsIkJPWCIsIk1vZHVsZSIsIm5hbWUiLCJjb25maWciLCJhcHAiLCJwYXJlbnQiLCJjb25maWd1cmF0aW9uIiwiYXBwbGljYXRpb24iLCJ2aWV3RW5naW5lIiwibW9kdWxlcyIsImNvbmZpZ0RpcmVjdG9yeSIsInJlZGlyZWN0aW5nIiwicmVkaXJlY3RVcmwiLCJyZWRpcmVjdFN0YXR1cyIsInJlcSIsInJlcyIsIm5leHQiLCJ3cml0ZUhlYWQiLCJlbmQiLCJ2aWV3Iiwic3VibW9kdWxlIiwicmVzb3VyY2UiLCJzdWJtb2R1bGVzIiwicmVhZCIsImtleXMiLCJNT0RVTEVTIiwicHJldmVudGVkIiwiTU9EVUxFU19QUkVWRU5URUQiLCJhZGQiLCJmb3JFYWNoIiwiZmluZCIsInBhdGgiLCJpbmRleE9mIiwicHJldmVudFJvdXRpbmciLCJfX2luaXQiLCJhdXRvbG9hZHMiLCJhdXRva2V5Iiwia2V5IiwibyIsIkNPTk5FQ1RPUlMiLCJGSUxURVJTIiwiTUlERExFV0FSRSIsIkNPTlRST0xMRVJTIiwicHJlZml4ZWRLZXkiLCJPYmplY3QiLCJjb250ZXh0IiwicmVxdWlyZSIsInBhdGhzIiwiX19hdXRvbG9hZCIsImZhY3RvcnkiLCJWSUVXU19FTkdJTkUiLCJjcmVhdGUiLCJfX3ZpZXdFbmdpbmUiLCJjb25uZWN0b3IiLCJjb25uZWN0aW9ucyIsIkNPTk5FQ1RJT05TIiwiY29ubmVjdG9ycyIsIm1hcCIsIlR5cGVFcnJvciIsIm9wdGlvbnMiLCJ0aGVuIiwiYyIsImNvbmNhdCIsIl9fY29ubmVjdGlvbnMiLCJkZWZhdWx0cyIsImZpbHRlcnMiLCJ1c2UiLCJfcHJlUm91dGluZyIsImZpbHRlciIsImYiLCJhcHBseSIsIl9fZmlsdGVycyIsIm1vdW50UG9pbnQiLCJ1cmwiLCJzdGF0dXMiLCJzdHJpbmciLCJudW1iZXIiLCJqb2luIiwiUHJvbWlzZSIsImFsbCIsIm9uU2VydmljZUxpc3RlbmVyIiwib25Db25uZWN0ZWQiLCJzY2hlbWUiLCJfX2ZyYW1ld29yayIsInJvb3QiLCJtaWRkbGV3YXJlIiwib3IiLCJjb250cm9sbGVycyIsIl9fcm91dGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLEVBQWY7QUFDQSxJQUFNQyxNQUFNLEVBQVo7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlTUMsTTtBQUVGLG9CQUFZQyxJQUFaLEVBQWtCQyxNQUFsQixFQUEwQkMsR0FBMUIsRUFBOEM7QUFBQSxZQUFmQyxNQUFlLHVFQUFOLElBQU07O0FBQUE7O0FBRTFDLGFBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtJLGFBQUwsR0FBcUJILE1BQXJCO0FBQ0EsYUFBS0ksV0FBTCxHQUFtQkgsR0FBbkI7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLRyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsYUFBS0MsT0FBTCxHQUFlLDhCQUFvQixFQUFwQixDQUFmO0FBQ0EsYUFBS0MsZUFBTCxHQUF1QixTQUF2QjtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsYUFBS0MsY0FBTCxHQUFzQixHQUF0QjtBQUVIOzs7O29DQUVXQyxHLEVBQUtDLEcsRUFBS0MsSSxFQUFNOztBQUV4QixnQkFBSSxLQUFLTCxXQUFULEVBQXNCO0FBQ2xCSSxvQkFBSUUsU0FBSixDQUFjLEtBQUtKLGNBQW5CLEVBQW1DLEVBQUUsWUFBWSxLQUFLRCxXQUFuQixFQUFuQztBQUNBRyxvQkFBSUcsR0FBSjtBQUNBO0FBRUg7O0FBRURGO0FBR0g7O0FBRUQ7Ozs7Ozs7Ozt1Q0FNZUcsSSxFQUFNLENBRXBCOztBQUVEOzs7Ozs7aUNBR1M7QUFBQTs7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RjtBQUFBLHVCQUFPLE9BQUt2RCxNQUFMLEtBQWdCLElBQWpCLEdBQ1AsT0FBS0UsV0FBTCxDQUFpQnlFLGlCQUFqQixDQUFtQ0MsV0FBbkMsQ0FBK0MsT0FBSzFFLFdBQXBELENBRE8sR0FFUCxJQUZDO0FBQUEsYUFERSxFQUlQcUQsSUFKTyxDQUlGLFlBQU07O0FBRVAsb0JBQUl2QyxRQUFKO0FBQ0Esb0JBQUk2RCxTQUFTLDZCQUFtQiwrQkFBbkIsQ0FBYjs7QUFFQSx1QkFBS1gsU0FBTCxDQUFlbkUsR0FBZixFQUFvQixDQUFDLFNBQUQsQ0FBcEI7QUFDQSx1QkFBSytFLFdBQUw7QUFDQSx1QkFBSy9CLFlBQUw7O0FBR0E4Qix1QkFBT3RELEdBQVAsQ0FBVyxRQUFYLEVBQXFCLDhCQUFvQixPQUFLdEIsYUFBTCxDQUFtQnlDLEtBQW5CLENBQXlCcUMsSUFBN0MsQ0FBckI7O0FBRUEvRCwyQkFBVywrQkFBcUIsT0FBS2QsV0FBTCxDQUFpQnNDLE9BQWpCLENBQXlCd0MsVUFBOUMsQ0FBWDtBQUNBaEUsMkJBQVdBLFNBQVNpRSxFQUFULENBQVksK0JBQXFCLE9BQUsvRSxXQUFMLENBQWlCc0MsT0FBakIsQ0FBeUIwQyxXQUE5QyxDQUFaLEVBQ1hELEVBRFcsQ0FDUkosTUFEUSxDQUFYOztBQUdBLHVCQUFLTSxTQUFMLENBQWUsRUFBZixFQUFtQnBGLEdBQW5CLEVBQXdCaUIsUUFBeEI7QUFFSCxhQXRCTSxDQUFQO0FBd0JIOzs7Ozs7a0JBSVVwQixNIiwiZmlsZSI6Ik1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGJlb2YgZnJvbSAnYmVvZic7XG5pbXBvcnQgc3RhcnRzd2l0aCBmcm9tICdsb2Rhc2guc3RhcnRzd2l0aCc7XG5pbXBvcnQgQ29uZmlndXJhdGlvbiBmcm9tICcuL0NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IENvbXBvc2l0ZU1vZHVsZSBmcm9tICcuL0NvbXBvc2l0ZU1vZHVsZSc7XG5pbXBvcnQgUHJvcGVydHlSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1Byb3BlcnR5UmVzb3VyY2UnO1xuaW1wb3J0IFJlcXVpcmVSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1JlcXVpcmVSZXNvdXJjZSc7XG5pbXBvcnQgTW9kdWxlUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9Nb2R1bGVSZXNvdXJjZSc7XG5pbXBvcnQgU2NoZW1lUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9TY2hlbWVSZXNvdXJjZSc7XG5pbXBvcnQgVW5rbm93bkNvbm5lY3RvckVycm9yIGZyb20gJy4vVW5rbm93bkNvbm5lY3RvckVycm9yJztcbmltcG9ydCBVbmtub3duRmlsdGVyRXJyb3IgZnJvbSAnLi9Vbmtub3duRmlsdGVyRXJyb3InO1xuaW1wb3J0IFVua25vd25Nb2R1bGVFcnJvciBmcm9tICcuL1Vua25vd25Nb2R1bGVFcnJvcic7XG5cbmNvbnN0IEJBU0tFVCA9IHt9O1xuY29uc3QgQk9YID0gW107XG5cbi8qKlxuICogTW9kdWxlXG4gKiBAYWJzdHJhY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0NvbmZpZ3VyYXRpb259IGNvbmZpZ1xuICogQHBhcmFtIHtBcHBsaWNhdGlvbn0gYXBwXG4gKiBAcGFyYW0ge01vZHVsZX0gW3BhcmVudF1cbiAqXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICogQHByb3BlcnR5IHtDb25maWd1cmF0aW9ufSBjb25maWd1cmF0aW9uXG4gKiBAcHJvcGVydHkge0FwcGxpY2F0aW9ufSBhcHBsaWNhdGlvblxuICogQHByb3BlcnR5IHtNb2R1bGV9IHBhcmVudFxuICogQHByb3BlcnR5IHtDb21wb3NpdGVNb2R1bGV9IG1vZHVsZXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbY29uZmlnRGlyZWN0b3J5PSdhcGljb25mJ11cbiAqL1xuY2xhc3MgTW9kdWxlIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGNvbmZpZywgYXBwLCBwYXJlbnQgPSBudWxsKSB7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gY29uZmlnO1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gYXBwO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy52aWV3RW5naW5lID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb2R1bGVzID0gbmV3IENvbXBvc2l0ZU1vZHVsZShbXSk7XG4gICAgICAgIHRoaXMuY29uZmlnRGlyZWN0b3J5ID0gJ2FwaWNvbmYnO1xuICAgICAgICB0aGlzLnJlZGlyZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVkaXJlY3RVcmwgPSAnJztcbiAgICAgICAgdGhpcy5yZWRpcmVjdFN0YXR1cyA9IDMwMjtcblxuICAgIH1cblxuICAgIF9wcmVSb3V0aW5nKHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgICAgICAgaWYgKHRoaXMucmVkaXJlY3RpbmcpIHtcbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQodGhpcy5yZWRpcmVjdFN0YXR1cywgeyAnTG9jYXRpb24nOiB0aGlzLnJlZGlyZWN0VXJsIH0pO1xuICAgICAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICBuZXh0KCk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fdmlld0NhbGxiYWNrIHByb3ZpZGVzIGEgY2FsbGJhY2sgdGhhdCB3aWxsXG4gICAgICogaGFuZGxlIHZpZXcgZGVjbGFyYXRpb25zLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3IFRoZSB2aWV3IHRlbXBsYXRlXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgX192aWV3Q2FsbGJhY2sodmlldykge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19pbml0IGluaXRpYWxpemVzIHRoaXMgbW9kdWxlIGFuZCBpdHMgc3VibW9kdWxlc1xuICAgICAqL1xuICAgIF9faW5pdCgpIHtcblxuICAgICAgICB2YXIgc3VibW9kdWxlO1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgU2NoZW1lUmVzb3VyY2UobmV3IE1vZHVsZVJlc291cmNlKHRoaXMpKTtcblxuICAgICAgICB2YXIgc3VibW9kdWxlcyA9IHRoaXMuY29uZmlndXJhdGlvbi5cbiAgICAgICAgcmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5NT0RVTEVTLCBCT1gpO1xuXG4gICAgICAgIHZhciBwcmV2ZW50ZWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZChcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLk1PRFVMRVNfUFJFVkVOVEVELCBCT1gpO1xuXG4gICAgICAgIHJlc291cmNlLmFkZCgncmVxdWlyZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG5cbiAgICAgICAgc3VibW9kdWxlcy5cbiAgICAgICAgZm9yRWFjaChwYXRoID0+IHtcblxuICAgICAgICAgICAgc3VibW9kdWxlID0gcmVzb3VyY2UuZmluZChwYXRoKTtcblxuICAgICAgICAgICAgaWYgKCFzdWJtb2R1bGUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25Nb2R1bGVFcnJvcihwYXRoKTtcblxuICAgICAgICAgICAgaWYgKHByZXZlbnRlZC5pbmRleE9mKHN1Ym1vZHVsZS5uYW1lKSA+IC0xKVxuICAgICAgICAgICAgICAgIHN1Ym1vZHVsZS5wcmV2ZW50Um91dGluZygpO1xuXG4gICAgICAgICAgICB0aGlzLm1vZHVsZXMuYWRkKHN1Ym1vZHVsZSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9faW5pdCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19hdXRvbG9hZCB0aGUgYXV0b2xvYWRhYmxlIGFzcGVjdHMgb2YgdGhlIHN5c3RlbVxuICAgICAqL1xuICAgIF9fYXV0b2xvYWQoKSB7XG5cbiAgICAgICAgdmFyIHJlc291cmNlID0gbmV3IFNjaGVtZVJlc291cmNlKG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG4gICAgICAgIHZhciBhdXRvbG9hZHM7XG4gICAgICAgIHZhciBhdXRva2V5O1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIHZhciBvID0ge307XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OTkVDVE9SU10gPSAnY29ubmVjdG9ycyc7XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuRklMVEVSU10gPSAnZmlsdGVycyc7XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuTUlERExFV0FSRV0gPSAnbWlkZGxld2FyZSc7XG4gICAgICAgIG9bdGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OVFJPTExFUlNdID0gJ2NvbnRyb2xsZXJzJztcblxuICAgICAgICByZXNvdXJjZS5hZGQoJ3JlcXVpcmUnLCBuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuXG4gICAgICAgIFtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTk5FQ1RPUlMsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5GSUxURVJTLFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmtleXMuTUlERExFV0FSRSxcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkNPTlRST0xMRVJTXG4gICAgICAgIF0uXG4gICAgICAgIGZvckVhY2gocHJlZml4ZWRLZXkgPT4ge1xuXG4gICAgICAgICAgICBrZXkgPSBvW3ByZWZpeGVkS2V5XTtcbiAgICAgICAgICAgIGF1dG9rZXkgPSBgcG93ZXIuYXV0b2xvYWQuJHtrZXl9YDtcbiAgICAgICAgICAgIGF1dG9sb2FkcyA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKGF1dG9rZXksIEJBU0tFVCk7XG5cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF1dG9sb2FkcykuZm9yRWFjaChuYW1lID0+XG4gICAgICAgICAgICAgICAgdGhpcy5hcHAuY29udGV4dFtrZXldW25hbWVdID0gcmVzb3VyY2UuZmluZChhdXRvbG9hZHNbYXV0b2tleV0pKTtcblxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnJlcXVpcmUodGhpcy5jb25maWd1cmF0aW9uLnBhdGhzW2tleV0sIHRoaXMuYXBwbGljYXRpb24uY29udGV4dFtrZXldKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX19hdXRvbG9hZCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX192aWV3RW5naW5lIGNvbmZpZ3VyZXMgdGhlIHZpZXcgZW5naW5lIGZvciB0aGlzIG1vZHVsZS5cbiAgICAgKiBUaGUgcGFyZW50IHZpZXcgZW5naW5lIGlzIHVzZWQgaWYgbm9uZSBpcyBjb25maWd1cmVkLlxuICAgICAqL1xuICAgIF9fdmlld0VuZ2luZSgpIHtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgU2NoZW1lUmVzb3VyY2UobmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcbiAgICAgICAgdmFyIGZhY3RvcnkgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5WSUVXU19FTkdJTkUsIG51bGwpO1xuXG4gICAgICAgIGlmICghZmFjdG9yeSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXdFbmdpbmUgPSAodGhpcy5wYXJlbnQpID8gdGhpcy5wYXJlbnQudmlld0VuZ2luZSA6IG51bGw7XG5cbiAgICAgICAgdGhpcy52aWV3RW5naW5lID0gZmFjdG9yeS5jcmVhdGUodGhpcyk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9fdmlld0VuZ2luZSgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19mcmFtZXdvcmsgcGVyZm9ybXMgZnJhbWV3b3JrIHNwZWNpZmljIGFjdGlvbnNcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBfX2ZyYW1ld29yaygpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fY29ubmVjdGlvbnMgZXN0YWJsaXNoZXMgdGhlIGNvbm5lY3Rpb25zIGRlY2xlYXJlZCBpbiB0aGUgY29uZmlnIGZpbGUuXG4gICAgICogQHJldHVybiB7YXJyYXk8UHJvbWlzZT59XG4gICAgICovXG4gICAgX19jb25uZWN0aW9ucygpIHtcblxuICAgICAgICB2YXIgY29uZmlnO1xuICAgICAgICB2YXIgY29ubmVjdG9yO1xuICAgICAgICB2YXIgY29ubmVjdGlvbnMgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5DT05ORUNUSU9OUywgQkFTS0VUKTtcbiAgICAgICAgdmFyIHJlc291cmNlID0gbmV3IFByb3BlcnR5UmVzb3VyY2UodGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0LmNvbm5lY3RvcnMpO1xuXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb25uZWN0aW9ucykuXG4gICAgICAgIG1hcChrZXkgPT4ge1xuXG4gICAgICAgICAgICBjb25maWcgPSBjb25uZWN0aW9uc1trZXldO1xuICAgICAgICAgICAgY29ubmVjdG9yID0gcmVzb3VyY2UuZmluZChjb25maWcuY29ubmVjdG9yKTtcblxuICAgICAgICAgICAgaWYgKCFjb25uZWN0b3IpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25Db25uZWN0b3JFcnJvcihrZXksIGNvbmZpZy5jb25uZWN0b3IsIHRoaXMuYXBwLmNvbnRleHQuY29ubmVjdG9ycyk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29ubmVjdG9yICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYENvbm5lY3RvciBtdXN0IGJlIGEgZnVuY3Rpb24gZ290ICcke3R5cGVvZiBjb25uZWN0b3J9JyFgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rvcihjb25maWcub3B0aW9ucykudGhlbihjID0+IHRoaXMuYXBwbGljYXRpb24uY29ubmVjdGlvbnNba2V5XSA9IGMpO1xuXG4gICAgICAgIH0pLmNvbmNhdCh0aGlzLm1vZHVsZXMuX19jb25uZWN0aW9ucygpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fZmlsdGVycyBsb2FkcyB0aGUgcHJlIHJvdXRpbmcgbWlkZGxld2FyZS5cbiAgICAgKi9cbiAgICBfX2ZpbHRlcnMoYXBwLCBkZWZhdWx0cykge1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShcbiAgICAgICAgICAgIG5ldyBQcm9wZXJ0eVJlc291cmNlKHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5maWx0ZXJzKSk7XG5cbiAgICAgICAgcmVzb3VyY2UuYWRkKCdyZXF1aXJlJywgbmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcblxuICAgICAgICBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4gdGhpcy5fcHJlUm91dGluZyhyZXEsIHJlcywgbmV4dCkpO1xuXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkZJTFRFUlMsIGRlZmF1bHRzKS5cbiAgICAgICAgZm9yRWFjaChmID0+IHtcblxuICAgICAgICAgICAgdmFyIGZpbHRlciA9IHJlc291cmNlLmZpbmQoZik7XG5cbiAgICAgICAgICAgIGlmICghZmlsdGVyKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbmtub3duRmlsdGVyRXJyb3IodGhpcy5uYW1lLCBmKTtcblxuICAgICAgICAgICAgZmlsdGVyLmFwcGx5KGFwcCwgdGhpcy5jb25maWd1cmF0aW9uKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX19maWx0ZXJzKGFwcCwgWydwdWJsaWMnXSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX3JvdXRpbmcgc2V0cyB1cCB0aGUgcm91dGluZyBmb3IgdGhpcyBtb2R1bGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcG9pbnQgVGhlIG1vdW50IHBvaW50IG9mIHRoaXMgbW9kdWxlJ3MgcGFyZW50J3Mgcm91dGVyLlxuICAgICAqIEBwYXJhbSB7RnJhbWV3b3JrQXBwbGljYXRpb259IGFwcFxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2V9IHJlc291cmNlXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgX19yb3V0aW5nKG1vdW50UG9pbnQsIGFwcCwgcmVzb3VyY2UpIHtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVkaXJlY3QgdGhlIHJvdXRlcyBvZiB0aGlzIG1vZHVsZSB0byBhIHVybFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3N0YXR1c11cbiAgICAgKi9cbiAgICByZWRpcmVjdCh1cmwsIHN0YXR1cyA9IDMwMikge1xuXG4gICAgICAgIGJlb2YoeyB1cmwgfSkuc3RyaW5nKCk7XG4gICAgICAgIGJlb2YoeyBzdGF0dXMgfSkubnVtYmVyKCk7XG5cbiAgICAgICAgdGhpcy5yZWRpcmVjdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMucmVkaXJlY3RVcmwgPSB1cmw7XG4gICAgICAgIHRoaXMucmVkaXJlY3RTdGF0dXMgPSBzdGF0dXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdG9wUmVkaXJlY3QgZGlzYWJsZXMgcmVkaXJlY3RpbmdcbiAgICAgKi9cbiAgICBzdG9wUmVkaXJlY3QoKSB7XG5cbiAgICAgICAgdGhpcy5yZWRpcmVjdGluZyA9IGZhbHNlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGF0aCByZXR1cm5zIHRoZSBsb2dpY2FsIGFwcGxpY2F0aW9uIHBhdGggZm9yIHRoaXMgbW9kdWxlLlxuICAgICAqIFRoYXQgaXMsIHRoZSBwYXRoIHJvdXRlcyBhcmUgbW91bnRlZCB0byBieSBkZWZhdWx0LlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcGF0aCgpIHtcblxuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm4gJy8nO1xuICAgICAgICByZXR1cm4gUGF0aC5qb2luKHRoaXMucGFyZW50LnBhdGgoKSwgdGhpcy5uYW1lKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGZpbmQgcmV0cmlldmVzIGEgbW9kdWxlIG9yIG51bGwgaWYgaXQgaXMgbm90IGZvdW5kLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHJldHVybnMge01vZHVsZXxudWxsfVxuICAgICAqL1xuICAgIGZpbmQocGF0aCkge1xuXG4gICAgICAgIGJlb2YoeyBwYXRoIH0pLnN0cmluZygpO1xuXG4gICAgICAgIGlmIChwYXRoID09PSB0aGlzLnBhdGgoKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChzdGFydHN3aXRoKHBhdGgsIHRoaXMucGF0aCgpKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZHVsZXMuZmluZChwYXRoKTtcblxuICAgICAgICBpZiAodGhpcy5wYXJlbnQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZmluZChwYXRoKTtcblxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvYWQgdGhpcyBtb2R1bGVcbiAgICAgKi9cbiAgICBsb2FkKGFwcCkge1xuXG4gICAgICAgIHRoaXMuX19pbml0KCk7XG4gICAgICAgIHRoaXMuX19hdXRvbG9hZCgpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLl9fY29ubmVjdGlvbnMoKSkuXG4gICAgICAgIHRoZW4oKCkgPT4gKHRoaXMucGFyZW50ID09PSBudWxsKSA/XG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLm9uU2VydmljZUxpc3RlbmVyLm9uQ29ubmVjdGVkKHRoaXMuYXBwbGljYXRpb24pIDpcbiAgICAgICAgICAgIG51bGwpLlxuICAgICAgICB0aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdmFyIHJlc291cmNlO1xuICAgICAgICAgICAgdmFyIHNjaGVtZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuXG4gICAgICAgICAgICB0aGlzLl9fZmlsdGVycyhhcHAsIFsnZGVmYXVsdCddKTtcbiAgICAgICAgICAgIHRoaXMuX19mcmFtZXdvcmsoKTtcbiAgICAgICAgICAgIHRoaXMuX192aWV3RW5naW5lKCk7XG5cblxuICAgICAgICAgICAgc2NoZW1lLmFkZCgnbW9kdWxlJywgbmV3IFJlcXVpcmVSZXNvdXJjZSh0aGlzLmNvbmZpZ3VyYXRpb24ucGF0aHMucm9vdCkpO1xuXG4gICAgICAgICAgICByZXNvdXJjZSA9IG5ldyBQcm9wZXJ0eVJlc291cmNlKHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5taWRkbGV3YXJlKTtcbiAgICAgICAgICAgIHJlc291cmNlID0gcmVzb3VyY2Uub3IobmV3IFByb3BlcnR5UmVzb3VyY2UodGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0LmNvbnRyb2xsZXJzKSkuXG4gICAgICAgICAgICBvcihzY2hlbWUpO1xuXG4gICAgICAgICAgICB0aGlzLl9fcm91dGluZygnJywgYXBwLCByZXNvdXJjZSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kdWxlXG4iXX0=