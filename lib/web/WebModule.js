'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Configuration = require('../app/Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Module2 = require('../app/Module');

var _Module3 = _interopRequireDefault(_Module2);

var _Route = require('../app/route/Route');

var _Route2 = _interopRequireDefault(_Route);

var _WebHttpFactory = require('./WebHttpFactory');

var _WebHttpFactory2 = _interopRequireDefault(_WebHttpFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BASKET = {};

var WebModule = function (_Module) {
    _inherits(WebModule, _Module);

    function WebModule(name, config, app, parent) {
        _classCallCheck(this, WebModule);

        var _this = _possibleConstructorReturn(this, (WebModule.__proto__ || Object.getPrototypeOf(WebModule)).call(this, name, config, app, parent));

        _this._expressApp = (0, _express2.default)();
        _this.configDirectory = 'webconf';

        return _this;
    }

    _createClass(WebModule, [{
        key: '__framework',
        value: function __framework() {
            var _this2 = this;

            var settings = this.configuration.read(this.configuration.keys.WEB_FRAMEWORK_SETTINGS, BASKET);

            Object.keys(settings).forEach(function (key) {
                return _this2._expressApp.set(key, settings[key]);
            });
            this.modules.__framework();
        }
    }, {
        key: '__filters',
        value: function __filters(app, defaults) {

            _get(WebModule.prototype.__proto__ || Object.getPrototypeOf(WebModule.prototype), '__filters', this).call(this, this._expressApp, defaults);
        }
    }, {
        key: '__routing',
        value: function __routing(point, app, resource) {
            var _this3 = this;

            var path = this.configuration.read(_Configuration2.default.keys.PATH, _path2.default.join('/', this.name));
            var routes = this.configuration.routes;

            this.routes = Object.keys(routes).map(function (key) {
                return _Route2.default.fromDef(routes[key], key, new _WebHttpFactory2.default(_this3.application.context), _this3).prepare(_this3._expressApp, resource);
            });

            this.modules.__routing(path, this._expressApp, resource);
            app.use(path, this._expressApp);

            if (!this.parent) app.use(function (err, req, res, next) {
                return _this3.application.onRouteErrorListener.onRouteError(err, req, res, next);
            });
        }
    }]);

    return WebModule;
}(_Module3.default);

exports.default = WebModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkJBU0tFVCIsIldlYk1vZHVsZSIsIm5hbWUiLCJjb25maWciLCJhcHAiLCJwYXJlbnQiLCJfZXhwcmVzc0FwcCIsImNvbmZpZ0RpcmVjdG9yeSIsInNldHRpbmdzIiwiY29uZmlndXJhdGlvbiIsInJlYWQiLCJrZXlzIiwiV0VCX0ZSQU1FV09SS19TRVRUSU5HUyIsIk9iamVjdCIsImZvckVhY2giLCJzZXQiLCJrZXkiLCJtb2R1bGVzIiwiX19mcmFtZXdvcmsiLCJkZWZhdWx0cyIsInBvaW50IiwicmVzb3VyY2UiLCJwYXRoIiwiUEFUSCIsImpvaW4iLCJyb3V0ZXMiLCJtYXAiLCJmcm9tRGVmIiwiYXBwbGljYXRpb24iLCJjb250ZXh0IiwicHJlcGFyZSIsIl9fcm91dGluZyIsInVzZSIsImVyciIsInJlcSIsInJlcyIsIm5leHQiLCJvblJvdXRlRXJyb3JMaXN0ZW5lciIsIm9uUm91dGVFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxFQUFmOztJQUVNQyxTOzs7QUFFRix1QkFBWUMsSUFBWixFQUFrQkMsTUFBbEIsRUFBMEJDLEdBQTFCLEVBQStCQyxNQUEvQixFQUF1QztBQUFBOztBQUFBLDBIQUU3QkgsSUFGNkIsRUFFdkJDLE1BRnVCLEVBRWZDLEdBRmUsRUFFVkMsTUFGVTs7QUFJbkMsY0FBS0MsV0FBTCxHQUFtQix3QkFBbkI7QUFDQSxjQUFLQyxlQUFMLEdBQXVCLFNBQXZCOztBQUxtQztBQU90Qzs7OztzQ0FFYTtBQUFBOztBQUVWLGdCQUFJQyxXQUFXLEtBQUtDLGFBQUwsQ0FBbUJDLElBQW5CLENBQXdCLEtBQUtELGFBQUwsQ0FBbUJFLElBQW5CLENBQXdCQyxzQkFBaEQsRUFDWFosTUFEVyxDQUFmOztBQUdBYSxtQkFBT0YsSUFBUCxDQUFZSCxRQUFaLEVBQXNCTSxPQUF0QixDQUE4QjtBQUFBLHVCQUFPLE9BQUtSLFdBQUwsQ0FBaUJTLEdBQWpCLENBQXFCQyxHQUFyQixFQUEwQlIsU0FBU1EsR0FBVCxDQUExQixDQUFQO0FBQUEsYUFBOUI7QUFDQSxpQkFBS0MsT0FBTCxDQUFhQyxXQUFiO0FBRUg7OztrQ0FFU2QsRyxFQUFLZSxRLEVBQVU7O0FBRXJCLDRIQUFnQixLQUFLYixXQUFyQixFQUFrQ2EsUUFBbEM7QUFFSDs7O2tDQUVTQyxLLEVBQU9oQixHLEVBQUtpQixRLEVBQVU7QUFBQTs7QUFFNUIsZ0JBQUlDLE9BQU8sS0FBS2IsYUFBTCxDQUFtQkMsSUFBbkIsQ0FBd0Isd0JBQWNDLElBQWQsQ0FBbUJZLElBQTNDLEVBQWlELGVBQUtDLElBQUwsQ0FBVSxHQUFWLEVBQWUsS0FBS3RCLElBQXBCLENBQWpELENBQVg7QUFDQSxnQkFBSXVCLFNBQVMsS0FBS2hCLGFBQUwsQ0FBbUJnQixNQUFoQzs7QUFFQSxpQkFBS0EsTUFBTCxHQUFjWixPQUFPRixJQUFQLENBQVljLE1BQVosRUFDZEMsR0FEYyxDQUNWO0FBQUEsdUJBQU8sZ0JBQU1DLE9BQU4sQ0FBY0YsT0FBT1QsR0FBUCxDQUFkLEVBQTJCQSxHQUEzQixFQUNQLDZCQUFtQixPQUFLWSxXQUFMLENBQWlCQyxPQUFwQyxDQURPLFVBQzZDQyxPQUQ3QyxDQUNxRCxPQUFLeEIsV0FEMUQsRUFDdUVlLFFBRHZFLENBQVA7QUFBQSxhQURVLENBQWQ7O0FBSUEsaUJBQUtKLE9BQUwsQ0FBYWMsU0FBYixDQUF1QlQsSUFBdkIsRUFBNkIsS0FBS2hCLFdBQWxDLEVBQStDZSxRQUEvQztBQUNBakIsZ0JBQUk0QixHQUFKLENBQVFWLElBQVIsRUFBYyxLQUFLaEIsV0FBbkI7O0FBRUEsZ0JBQUksQ0FBQyxLQUFLRCxNQUFWLEVBQ0lELElBQUk0QixHQUFKLENBQVEsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLEdBQVgsRUFBZ0JDLElBQWhCO0FBQUEsdUJBQ0EsT0FBS1IsV0FBTCxDQUNKUyxvQkFESSxDQUVKQyxZQUZJLENBRVNMLEdBRlQsRUFFY0MsR0FGZCxFQUVtQkMsR0FGbkIsRUFFd0JDLElBRnhCLENBREE7QUFBQSxhQUFSO0FBS1A7Ozs7OztrQkFJVW5DLFMiLCJmaWxlIjoiV2ViTW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBDb25maWd1cmF0aW9uIGZyb20gJy4uL2FwcC9Db25maWd1cmF0aW9uJztcbmltcG9ydCBNb2R1bGUgZnJvbSAnLi4vYXBwL01vZHVsZSc7XG5pbXBvcnQgUm91dGUgZnJvbSAnLi4vYXBwL3JvdXRlL1JvdXRlJztcbmltcG9ydCBXZWJIdHRwRmFjdG9yeSBmcm9tICcuL1dlYkh0dHBGYWN0b3J5JztcblxuY29uc3QgQkFTS0VUID0ge307XG5cbmNsYXNzIFdlYk1vZHVsZSBleHRlbmRzIE1vZHVsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjb25maWcsIGFwcCwgcGFyZW50KSB7XG5cbiAgICAgICAgc3VwZXIobmFtZSwgY29uZmlnLCBhcHAsIHBhcmVudCk7XG5cbiAgICAgICAgdGhpcy5fZXhwcmVzc0FwcCA9IGV4cHJlc3MoKTtcbiAgICAgICAgdGhpcy5jb25maWdEaXJlY3RvcnkgPSAnd2ViY29uZic7XG5cbiAgICB9XG5cbiAgICBfX2ZyYW1ld29yaygpIHtcblxuICAgICAgICB2YXIgc2V0dGluZ3MgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5XRUJfRlJBTUVXT1JLX1NFVFRJTkdTLFxuICAgICAgICAgICAgQkFTS0VUKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhzZXR0aW5ncykuZm9yRWFjaChrZXkgPT4gdGhpcy5fZXhwcmVzc0FwcC5zZXQoa2V5LCBzZXR0aW5nc1trZXldKSk7XG4gICAgICAgIHRoaXMubW9kdWxlcy5fX2ZyYW1ld29yaygpO1xuXG4gICAgfVxuXG4gICAgX19maWx0ZXJzKGFwcCwgZGVmYXVsdHMpIHtcblxuICAgICAgICBzdXBlci5fX2ZpbHRlcnModGhpcy5fZXhwcmVzc0FwcCwgZGVmYXVsdHMpO1xuXG4gICAgfVxuXG4gICAgX19yb3V0aW5nKHBvaW50LCBhcHAsIHJlc291cmNlKSB7XG5cbiAgICAgICAgdmFyIHBhdGggPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZChDb25maWd1cmF0aW9uLmtleXMuUEFUSCwgUGF0aC5qb2luKCcvJywgdGhpcy5uYW1lKSk7XG4gICAgICAgIHZhciByb3V0ZXMgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucm91dGVzO1xuXG4gICAgICAgIHRoaXMucm91dGVzID0gT2JqZWN0LmtleXMocm91dGVzKS5cbiAgICAgICAgbWFwKGtleSA9PiBSb3V0ZS5mcm9tRGVmKHJvdXRlc1trZXldLCBrZXksXG4gICAgICAgICAgICBuZXcgV2ViSHR0cEZhY3RvcnkodGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0KSwgdGhpcykucHJlcGFyZSh0aGlzLl9leHByZXNzQXBwLCByZXNvdXJjZSkpO1xuXG4gICAgICAgIHRoaXMubW9kdWxlcy5fX3JvdXRpbmcocGF0aCwgdGhpcy5fZXhwcmVzc0FwcCwgcmVzb3VyY2UpO1xuICAgICAgICBhcHAudXNlKHBhdGgsIHRoaXMuX2V4cHJlc3NBcHApO1xuXG4gICAgICAgIGlmICghdGhpcy5wYXJlbnQpXG4gICAgICAgICAgICBhcHAudXNlKChlcnIsIHJlcSwgcmVzLCBuZXh0KSA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLlxuICAgICAgICAgICAgICAgIG9uUm91dGVFcnJvckxpc3RlbmVyLlxuICAgICAgICAgICAgICAgIG9uUm91dGVFcnJvcihlcnIsIHJlcSwgcmVzLCBuZXh0KSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViTW9kdWxlXG4iXX0=