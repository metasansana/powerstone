'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _Pool = require('../net/Pool');

var _Pool2 = _interopRequireDefault(_Pool);

var _BulkAction = require('./route/BulkAction');

var _BulkAction2 = _interopRequireDefault(_BulkAction);

var _MiddlewareAction = require('./route/MiddlewareAction');

var _MiddlewareAction2 = _interopRequireDefault(_MiddlewareAction);

var _ControllerAction = require('./route/ControllerAction');

var _ControllerAction2 = _interopRequireDefault(_ControllerAction);

var _View = require('./route/View');

var _View2 = _interopRequireDefault(_View);

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

var Module = function () {
    function Module(name, config, context, app) {
        _classCallCheck(this, Module);

        this.name = name;
        this.configuration = config;
        this.context = context;
        this.application = app;
        this.modules = new _CompositeModule2.default([]);
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
            var resource = new _PropertyResource2.default(this.context.connectors);

            return Object.keys(connections).map(function (key) {

                config = connections[key];
                connector = resource.find(config.connector);

                if (!connector) throw new _UnknownConnectorError2.default(key, config.connector, _this3.context.connectors);

                if (typeof connector !== 'function') throw new TypeError('Connector must be a function got \'' + (typeof connector === 'undefined' ? 'undefined' : _typeof(connector)) + '\'!');

                return connector(config.options).then(function (c) {
                    return _Pool2.default[key] = c;
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

            var resource = new _SchemeResource2.default(new _PropertyResource2.default(this.context.filters));

            resource.add('require', new _RequireResource2.default());
            app.use(this.handleRequest.bind(this));

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
                return _this5.application.onConnected(_Pool2.default);
            }).then(function () {

                _this5.__filters(app, ['default']);
                _this5.__framework();
                _this5.__routing('', app, new _BulkAction2.default([new _MiddlewareAction2.default(new _PropertyResource2.default(_this5.context.middleware)), new _ControllerAction2.default(_this5.context.controllers), new _View2.default(_this5.viewEngine)]));
            });
        }
    }]);

    return Module;
}();

exports.default = Module;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkJBU0tFVCIsIkJPWCIsIk1vZHVsZSIsIm5hbWUiLCJjb25maWciLCJjb250ZXh0IiwiYXBwIiwiY29uZmlndXJhdGlvbiIsImFwcGxpY2F0aW9uIiwibW9kdWxlcyIsImNvbmZpZ0RpcmVjdG9yeSIsInZpZXciLCJzdWJtb2R1bGUiLCJyZXNvdXJjZSIsInN1Ym1vZHVsZXMiLCJyZWFkIiwia2V5cyIsIk1PRFVMRVMiLCJwcmV2ZW50ZWQiLCJNT0RVTEVTX1BSRVZFTlRFRCIsImFkZCIsImZvckVhY2giLCJmaW5kIiwicGF0aCIsImluZGV4T2YiLCJwcmV2ZW50Um91dGluZyIsIl9faW5pdCIsImF1dG9sb2FkcyIsImF1dG9rZXkiLCJrZXkiLCJvIiwiQ09OTkVDVE9SUyIsIkZJTFRFUlMiLCJNSURETEVXQVJFIiwiQ09OVFJPTExFUlMiLCJwcmVmaXhlZEtleSIsIk9iamVjdCIsInJlcXVpcmUiLCJwYXRocyIsIl9fYXV0b2xvYWQiLCJjb25uZWN0b3IiLCJjb25uZWN0aW9ucyIsIkNPTk5FQ1RJT05TIiwiY29ubmVjdG9ycyIsIm1hcCIsIlR5cGVFcnJvciIsIm9wdGlvbnMiLCJ0aGVuIiwiYyIsImNvbmNhdCIsIl9fY29ubmVjdGlvbnMiLCJkZWZhdWx0cyIsImZpbHRlcnMiLCJ1c2UiLCJoYW5kbGVSZXF1ZXN0IiwiYmluZCIsImZpbHRlciIsImYiLCJhcHBseSIsIl9fZmlsdGVycyIsIm1vdW50UG9pbnQiLCJhY3Rpb25zIiwicmVxIiwicmVzIiwibmV4dCIsIlByb21pc2UiLCJhbGwiLCJvbkNvbm5lY3RlZCIsIl9fZnJhbWV3b3JrIiwiX19yb3V0aW5nIiwibWlkZGxld2FyZSIsImNvbnRyb2xsZXJzIiwidmlld0VuZ2luZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7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QUFBOztBQUVOLGlCQUFLb0IsTUFBTDtBQUNBLGlCQUFLYSxVQUFMOztBQUVBLG1CQUFPMEIsUUFBUUMsR0FBUixDQUFZLEtBQUtoQixhQUFMLEVBQVosRUFDUEgsSUFETyxDQUNGO0FBQUEsdUJBQU0sT0FBS3ZDLFdBQUwsQ0FBaUIyRCxXQUFqQixnQkFBTjtBQUFBLGFBREUsRUFFUHBCLElBRk8sQ0FFRixZQUFNOztBQUVQLHVCQUFLWSxTQUFMLENBQWVyRCxHQUFmLEVBQW9CLENBQUMsU0FBRCxDQUFwQjtBQUNBLHVCQUFLOEQsV0FBTDtBQUNBLHVCQUFLQyxTQUFMLENBQWUsRUFBZixFQUFtQi9ELEdBQW5CLEVBQXdCLHlCQUFlLENBQ25DLCtCQUFxQiwrQkFBcUIsT0FBS0QsT0FBTCxDQUFhaUUsVUFBbEMsQ0FBckIsQ0FEbUMsRUFFbkMsK0JBQXFCLE9BQUtqRSxPQUFMLENBQWFrRSxXQUFsQyxDQUZtQyxFQUduQyxtQkFBUyxPQUFLQyxVQUFkLENBSG1DLENBQWYsQ0FBeEI7QUFNSCxhQVpNLENBQVA7QUFjSDs7Ozs7O2tCQUlVdEUsTSIsImZpbGUiOiJNb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29uZmlndXJhdGlvbiBmcm9tICcuL0NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IENvbXBvc2l0ZU1vZHVsZSBmcm9tICcuL0NvbXBvc2l0ZU1vZHVsZSc7XG5pbXBvcnQgUHJvcGVydHlSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1Byb3BlcnR5UmVzb3VyY2UnO1xuaW1wb3J0IFJlcXVpcmVSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1JlcXVpcmVSZXNvdXJjZSc7XG5pbXBvcnQgTW9kdWxlUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9Nb2R1bGVSZXNvdXJjZSc7XG5pbXBvcnQgU2NoZW1lUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9TY2hlbWVSZXNvdXJjZSc7XG5pbXBvcnQgUG9vbCBmcm9tICcuLi9uZXQvUG9vbCc7XG5pbXBvcnQgUm91dGVBY3Rpb24gZnJvbSAnLi9yb3V0ZS9CdWxrQWN0aW9uJztcbmltcG9ydCBNaWRkbGV3YXJlQWN0aW9uIGZyb20gJy4vcm91dGUvTWlkZGxld2FyZUFjdGlvbic7XG5pbXBvcnQgQ29udHJvbGxlckFjdGlvbiBmcm9tICcuL3JvdXRlL0NvbnRyb2xsZXJBY3Rpb24nO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi9yb3V0ZS9WaWV3JztcbmltcG9ydCBCdWxrQWN0aW9uIGZyb20gJy4vcm91dGUvQnVsa0FjdGlvbic7XG5pbXBvcnQgVW5rbm93bkNvbm5lY3RvckVycm9yIGZyb20gJy4vVW5rbm93bkNvbm5lY3RvckVycm9yJztcbmltcG9ydCBVbmtub3duRmlsdGVyRXJyb3IgZnJvbSAnLi9Vbmtub3duRmlsdGVyRXJyb3InO1xuaW1wb3J0IFVua25vd25Nb2R1bGVFcnJvciBmcm9tICcuL1Vua25vd25Nb2R1bGVFcnJvcic7XG5cbmNvbnN0IEJBU0tFVCA9IHt9O1xuY29uc3QgQk9YID0gW107XG5cbi8qKlxuICogTW9kdWxlXG4gKiBAYWJzdHJhY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0NvbmZpZ3VyYXRpb259IGNvbmZpZyBcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IFxuICogQHBhcmFtIHtBcHBsaWNhdGlvbn0gYXBwIFxuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gKiBAcHJvcGVydHkge0NvbmZpZ3VyYXRpb259IGNvbmZpZ3VyYXRpb25cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBjb250ZXh0XG4gKiBAcHJvcGVydHkge0FwcGxpY2F0aW9ufSBhcHBsaWNhdGlvblxuICogQHByb3BlcnR5IHtDb21wb3NpdGVNb2R1bGV9IG1vZHVsZXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbY29uZmlnRGlyZWN0b3J5PSdhcGljb25mJ11cbiAqL1xuY2xhc3MgTW9kdWxlIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGNvbmZpZywgY29udGV4dCwgYXBwKSB7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gY29uZmlnO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gYXBwO1xuICAgICAgICB0aGlzLm1vZHVsZXMgPSBuZXcgQ29tcG9zaXRlTW9kdWxlKFtdKTtcbiAgICAgICAgdGhpcy5jb25maWdEaXJlY3RvcnkgPSAnYXBpY29uZic7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX3ZpZXdDYWxsYmFjayBwcm92aWRlcyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBcbiAgICAgKiBoYW5kbGUgdmlldyBkZWNsYXJhdGlvbnMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZpZXcgVGhlIHZpZXcgdGVtcGxhdGVcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBfX3ZpZXdDYWxsYmFjayh2aWV3KSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX2luaXQgaW5pdGlhbGl6ZXMgdGhpcyBtb2R1bGUgYW5kIGl0cyBzdWJtb2R1bGVzXG4gICAgICovXG4gICAgX19pbml0KCkge1xuXG4gICAgICAgIHZhciBzdWJtb2R1bGU7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgTW9kdWxlUmVzb3VyY2UodGhpcykpO1xuXG4gICAgICAgIHZhciBzdWJtb2R1bGVzID0gdGhpcy5jb25maWd1cmF0aW9uLlxuICAgICAgICByZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLk1PRFVMRVMsIEJPWCk7XG5cbiAgICAgICAgdmFyIHByZXZlbnRlZCA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmtleXMuTU9EVUxFU19QUkVWRU5URUQsIEJPWCk7XG5cbiAgICAgICAgcmVzb3VyY2UuYWRkKCdyZXF1aXJlJywgbmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcblxuICAgICAgICBzdWJtb2R1bGVzLlxuICAgICAgICBmb3JFYWNoKHBhdGggPT4ge1xuXG4gICAgICAgICAgICBzdWJtb2R1bGUgPSByZXNvdXJjZS5maW5kKHBhdGgpO1xuXG4gICAgICAgICAgICBpZiAoIXN1Ym1vZHVsZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVW5rbm93bk1vZHVsZUVycm9yKHBhdGgpO1xuXG4gICAgICAgICAgICBpZiAocHJldmVudGVkLmluZGV4T2Yoc3VibW9kdWxlLm5hbWUpID4gLTEpXG4gICAgICAgICAgICAgICAgc3VibW9kdWxlLnByZXZlbnRSb3V0aW5nKCk7XG5cbiAgICAgICAgICAgIHRoaXMubW9kdWxlcy5hZGQoc3VibW9kdWxlKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX19pbml0KCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX2F1dG9sb2FkIHRoZSBhdXRvbG9hZGFibGUgYXNwZWN0cyBvZiB0aGUgc3lzdGVtXG4gICAgICovXG4gICAgX19hdXRvbG9hZCgpIHtcblxuICAgICAgICB2YXIgcmVzb3VyY2UgPSBuZXcgU2NoZW1lUmVzb3VyY2UobmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcbiAgICAgICAgdmFyIGF1dG9sb2FkcztcbiAgICAgICAgdmFyIGF1dG9rZXk7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgdmFyIG8gPSB7fTtcbiAgICAgICAgb1t0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5DT05ORUNUT1JTXSA9ICdjb25uZWN0b3JzJztcbiAgICAgICAgb1t0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5GSUxURVJTXSA9ICdmaWx0ZXJzJztcbiAgICAgICAgb1t0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5NSURETEVXQVJFXSA9ICdtaWRkbGV3YXJlJztcbiAgICAgICAgb1t0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5DT05UUk9MTEVSU10gPSAnY29udHJvbGxlcnMnO1xuXG4gICAgICAgIHJlc291cmNlLmFkZCgncmVxdWlyZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG5cbiAgICAgICAgW1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OTkVDVE9SUyxcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLkZJTFRFUlMsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5NSURETEVXQVJFLFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OVFJPTExFUlNcbiAgICAgICAgXS5cbiAgICAgICAgZm9yRWFjaChwcmVmaXhlZEtleSA9PiB7XG5cbiAgICAgICAgICAgIGtleSA9IG9bcHJlZml4ZWRLZXldO1xuICAgICAgICAgICAgYXV0b2tleSA9IGBwb3dlci5hdXRvbG9hZC4ke2tleX1gO1xuICAgICAgICAgICAgYXV0b2xvYWRzID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQoYXV0b2tleSwgQkFTS0VUKTtcblxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXV0b2xvYWRzKS5mb3JFYWNoKG5hbWUgPT5cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRba2V5XVtuYW1lXSA9IHJlc291cmNlLmZpbmQoYXV0b2xvYWRzW2F1dG9rZXldKSk7XG5cbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5yZXF1aXJlKHRoaXMuY29uZmlndXJhdGlvbi5wYXRoc1trZXldLCB0aGlzLmNvbnRleHRba2V5XSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9fYXV0b2xvYWQoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fZnJhbWV3b3JrIHBlcmZvcm1zIGZyYW1ld29yayBzcGVjaWZpYyBhY3Rpb25zXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgX19mcmFtZXdvcmsoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBfX2Nvbm5lY3Rpb25zIGVzdGFibGlzaGVzIHRoZSBjb25uZWN0aW9ucyBkZWNsZWFyZWQgaW4gdGhlIGNvbmZpZyBmaWxlLlxuICAgICAqIEByZXR1cm4ge2FycmF5PFByb21pc2U+fVxuICAgICAqL1xuICAgIF9fY29ubmVjdGlvbnMoKSB7XG5cbiAgICAgICAgdmFyIGNvbmZpZztcbiAgICAgICAgdmFyIGNvbm5lY3RvcjtcbiAgICAgICAgdmFyIGNvbm5lY3Rpb25zID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuQ09OTkVDVElPTlMsIEJBU0tFVCk7XG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBQcm9wZXJ0eVJlc291cmNlKHRoaXMuY29udGV4dC5jb25uZWN0b3JzKTtcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29ubmVjdGlvbnMpLlxuICAgICAgICBtYXAoa2V5ID0+IHtcblxuICAgICAgICAgICAgY29uZmlnID0gY29ubmVjdGlvbnNba2V5XTtcbiAgICAgICAgICAgIGNvbm5lY3RvciA9IHJlc291cmNlLmZpbmQoY29uZmlnLmNvbm5lY3Rvcik7XG5cbiAgICAgICAgICAgIGlmICghY29ubmVjdG9yKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbmtub3duQ29ubmVjdG9yRXJyb3Ioa2V5LCBjb25maWcuY29ubmVjdG9yLCB0aGlzLmNvbnRleHQuY29ubmVjdG9ycyk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29ubmVjdG9yICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYENvbm5lY3RvciBtdXN0IGJlIGEgZnVuY3Rpb24gZ290ICcke3R5cGVvZiBjb25uZWN0b3J9JyFgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rvcihjb25maWcub3B0aW9ucykudGhlbihjID0+IFBvb2xba2V5XSA9IGMpO1xuXG4gICAgICAgIH0pLmNvbmNhdCh0aGlzLm1vZHVsZXMuX19jb25uZWN0aW9ucygpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fZmlsdGVycyBsb2FkcyB0aGUgcHJlIHJvdXRpbmcgbWlkZGxld2FyZS5cbiAgICAgKi9cbiAgICBfX2ZpbHRlcnMoYXBwLCBkZWZhdWx0cykge1xuXG4gICAgICAgIHZhciByZXNvdXJjZSA9IG5ldyBTY2hlbWVSZXNvdXJjZShcbiAgICAgICAgICAgIG5ldyBQcm9wZXJ0eVJlc291cmNlKHRoaXMuY29udGV4dC5maWx0ZXJzKSk7XG5cbiAgICAgICAgcmVzb3VyY2UuYWRkKCdyZXF1aXJlJywgbmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcbiAgICAgICAgYXBwLnVzZSh0aGlzLmhhbmRsZVJlcXVlc3QuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuRklMVEVSUywgZGVmYXVsdHMpLlxuICAgICAgICBmb3JFYWNoKGYgPT4ge1xuXG4gICAgICAgICAgICB2YXIgZmlsdGVyID0gcmVzb3VyY2UuZmluZChmKTtcblxuICAgICAgICAgICAgaWYgKCFmaWx0ZXIpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25GaWx0ZXJFcnJvcih0aGlzLm5hbWUsIGYpO1xuXG4gICAgICAgICAgICBmaWx0ZXIuYXBwbHkoYXBwLCB0aGlzLmNvbmZpZ3VyYXRpb24pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kdWxlcy5fX2ZpbHRlcnMoYXBwLCBbJ3B1YmxpYyddKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fcm91dGluZyBzZXRzIHVwIHRoZSByb3V0aW5nIGZvciB0aGlzIG1vZHVsZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwb2ludCBUaGUgbW91bnQgcG9pbnQgb2YgdGhpcyBtb2R1bGUncyBwYXJlbnQncyByb3V0ZXIuXG4gICAgICogQHBhcmFtIHtGcmFtZXdvcmtBcHBsaWNhdGlvbn0gYXBwIFxuICAgICAqIEBwYXJhbSB7YXJyYXk8QWN0aW9uPn0gYWN0aW9ucyBcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBfX3JvdXRpbmcobW91bnRQb2ludCwgYXBwLCBhY3Rpb25zKSB7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHByZXZlbnRSb3V0aW5nIGRpc2FibGVzIHJvdXRpbmcgZm9yIHRoaXMgbW9kdWxlLlxuICAgICAqIEZpbHRlcnMgd2lsbCBzdGlsbCBiZSBhcHBsaWVkIGJ1dCB0aGUgY2hhaW4gd2lsbCBiZSBibG9ja2VkIHRoZXJlLlxuICAgICAqL1xuICAgIHByZXZlbnRSb3V0aW5nKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlUmVxdWVzdCBpcyBjYWxsZWQgYmVmb3JlIGFueSBvZiB0aGUgcm91dGVzIGZvciB0aGlzXG4gICAgICogbW9kdWxlIGFyZSBhY3RpdmF0ZWQuXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSByZXEgXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzIFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG5leHQgXG4gICAgICovXG4gICAgaGFuZGxlUmVxdWVzdChyZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgIG5leHQoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvYWQgdGhpcyBtb2R1bGVcbiAgICAgKi9cbiAgICBsb2FkKGFwcCkge1xuXG4gICAgICAgIHRoaXMuX19pbml0KCk7XG4gICAgICAgIHRoaXMuX19hdXRvbG9hZCgpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLl9fY29ubmVjdGlvbnMoKSkuXG4gICAgICAgIHRoZW4oKCkgPT4gdGhpcy5hcHBsaWNhdGlvbi5vbkNvbm5lY3RlZChQb29sKSkuXG4gICAgICAgIHRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLl9fZmlsdGVycyhhcHAsIFsnZGVmYXVsdCddKTtcbiAgICAgICAgICAgIHRoaXMuX19mcmFtZXdvcmsoKTtcbiAgICAgICAgICAgIHRoaXMuX19yb3V0aW5nKCcnLCBhcHAsIG5ldyBCdWxrQWN0aW9uKFtcbiAgICAgICAgICAgICAgICBuZXcgTWlkZGxld2FyZUFjdGlvbihuZXcgUHJvcGVydHlSZXNvdXJjZSh0aGlzLmNvbnRleHQubWlkZGxld2FyZSkpLFxuICAgICAgICAgICAgICAgIG5ldyBDb250cm9sbGVyQWN0aW9uKHRoaXMuY29udGV4dC5jb250cm9sbGVycyksXG4gICAgICAgICAgICAgICAgbmV3IFZpZXcodGhpcy52aWV3RW5naW5lKVxuICAgICAgICAgICAgXSkpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vZHVsZVxuIl19