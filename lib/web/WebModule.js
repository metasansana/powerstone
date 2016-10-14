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
            var factory = new _WebHttpFactory2.default(this);

            this.routes = Object.keys(routes).map(function (key) {
                return _Route2.default.fromDef(routes[key], key, factory, _this3).prepare(_this3._expressApp, resource);
            });

            this.modules.__routing(path, this._expressApp, resource);
            app.use(path, this._expressApp);

            if (!this.parent) app.use(function (err, req, res, next) {
                return _this3.application.onRouteErrorListener.onRouteError(err, factory.request(req, res), factory.response(req, res));
            });
        }
    }]);

    return WebModule;
}(_Module3.default);

exports.default = WebModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkJBU0tFVCIsIldlYk1vZHVsZSIsIm5hbWUiLCJjb25maWciLCJhcHAiLCJwYXJlbnQiLCJfZXhwcmVzc0FwcCIsImNvbmZpZ0RpcmVjdG9yeSIsInNldHRpbmdzIiwiY29uZmlndXJhdGlvbiIsInJlYWQiLCJrZXlzIiwiV0VCX0ZSQU1FV09SS19TRVRUSU5HUyIsIk9iamVjdCIsImZvckVhY2giLCJzZXQiLCJrZXkiLCJtb2R1bGVzIiwiX19mcmFtZXdvcmsiLCJkZWZhdWx0cyIsInBvaW50IiwicmVzb3VyY2UiLCJwYXRoIiwiUEFUSCIsImpvaW4iLCJyb3V0ZXMiLCJmYWN0b3J5IiwibWFwIiwiZnJvbURlZiIsInByZXBhcmUiLCJfX3JvdXRpbmciLCJ1c2UiLCJlcnIiLCJyZXEiLCJyZXMiLCJuZXh0IiwiYXBwbGljYXRpb24iLCJvblJvdXRlRXJyb3JMaXN0ZW5lciIsIm9uUm91dGVFcnJvciIsInJlcXVlc3QiLCJyZXNwb25zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxFQUFmOztJQUVNQyxTOzs7QUFFRix1QkFBWUMsSUFBWixFQUFrQkMsTUFBbEIsRUFBMEJDLEdBQTFCLEVBQStCQyxNQUEvQixFQUF1QztBQUFBOztBQUFBLDBIQUU3QkgsSUFGNkIsRUFFdkJDLE1BRnVCLEVBRWZDLEdBRmUsRUFFVkMsTUFGVTs7QUFJbkMsY0FBS0MsV0FBTCxHQUFtQix3QkFBbkI7QUFDQSxjQUFLQyxlQUFMLEdBQXVCLFNBQXZCOztBQUxtQztBQU90Qzs7OztzQ0FFYTtBQUFBOztBQUVWLGdCQUFJQyxXQUFXLEtBQUtDLGFBQUwsQ0FBbUJDLElBQW5CLENBQXdCLEtBQUtELGFBQUwsQ0FBbUJFLElBQW5CLENBQXdCQyxzQkFBaEQsRUFDWFosTUFEVyxDQUFmOztBQUdBYSxtQkFBT0YsSUFBUCxDQUFZSCxRQUFaLEVBQXNCTSxPQUF0QixDQUE4QjtBQUFBLHVCQUFPLE9BQUtSLFdBQUwsQ0FBaUJTLEdBQWpCLENBQXFCQyxHQUFyQixFQUEwQlIsU0FBU1EsR0FBVCxDQUExQixDQUFQO0FBQUEsYUFBOUI7QUFDQSxpQkFBS0MsT0FBTCxDQUFhQyxXQUFiO0FBRUg7OztrQ0FFU2QsRyxFQUFLZSxRLEVBQVU7O0FBRXJCLDRIQUFnQixLQUFLYixXQUFyQixFQUFrQ2EsUUFBbEM7QUFFSDs7O2tDQUVTQyxLLEVBQU9oQixHLEVBQUtpQixRLEVBQVU7QUFBQTs7QUFFNUIsZ0JBQUlDLE9BQU8sS0FBS2IsYUFBTCxDQUFtQkMsSUFBbkIsQ0FBd0Isd0JBQWNDLElBQWQsQ0FBbUJZLElBQTNDLEVBQWlELGVBQUtDLElBQUwsQ0FBVSxHQUFWLEVBQWUsS0FBS3RCLElBQXBCLENBQWpELENBQVg7QUFDQSxnQkFBSXVCLFNBQVMsS0FBS2hCLGFBQUwsQ0FBbUJnQixNQUFoQztBQUNBLGdCQUFJQyxVQUFVLDZCQUFtQixJQUFuQixDQUFkOztBQUVBLGlCQUFLRCxNQUFMLEdBQWNaLE9BQU9GLElBQVAsQ0FBWWMsTUFBWixFQUNkRSxHQURjLENBQ1Y7QUFBQSx1QkFBTyxnQkFBTUMsT0FBTixDQUFjSCxPQUFPVCxHQUFQLENBQWQsRUFBMkJBLEdBQTNCLEVBQ1BVLE9BRE8sVUFDUUcsT0FEUixDQUNnQixPQUFLdkIsV0FEckIsRUFDa0NlLFFBRGxDLENBQVA7QUFBQSxhQURVLENBQWQ7O0FBSUEsaUJBQUtKLE9BQUwsQ0FBYWEsU0FBYixDQUF1QlIsSUFBdkIsRUFBNkIsS0FBS2hCLFdBQWxDLEVBQStDZSxRQUEvQztBQUNBakIsZ0JBQUkyQixHQUFKLENBQVFULElBQVIsRUFBYyxLQUFLaEIsV0FBbkI7O0FBRUEsZ0JBQUksQ0FBQyxLQUFLRCxNQUFWLEVBQ0lELElBQUkyQixHQUFKLENBQVEsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLEdBQVgsRUFBZ0JDLElBQWhCO0FBQUEsdUJBQ0osT0FBS0MsV0FBTCxDQUFpQkMsb0JBQWpCLENBQXNDQyxZQUF0QyxDQUFtRE4sR0FBbkQsRUFDSU4sUUFBUWEsT0FBUixDQUFnQk4sR0FBaEIsRUFBcUJDLEdBQXJCLENBREosRUFDK0JSLFFBQVFjLFFBQVIsQ0FBaUJQLEdBQWpCLEVBQXNCQyxHQUF0QixDQUQvQixDQURJO0FBQUEsYUFBUjtBQUlQOzs7Ozs7a0JBSVVqQyxTIiwiZmlsZSI6IldlYk1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgQ29uZmlndXJhdGlvbiBmcm9tICcuLi9hcHAvQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgTW9kdWxlIGZyb20gJy4uL2FwcC9Nb2R1bGUnO1xuaW1wb3J0IFJvdXRlIGZyb20gJy4uL2FwcC9yb3V0ZS9Sb3V0ZSc7XG5pbXBvcnQgV2ViSHR0cEZhY3RvcnkgZnJvbSAnLi9XZWJIdHRwRmFjdG9yeSc7XG5cbmNvbnN0IEJBU0tFVCA9IHt9O1xuXG5jbGFzcyBXZWJNb2R1bGUgZXh0ZW5kcyBNb2R1bGUge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgY29uZmlnLCBhcHAsIHBhcmVudCkge1xuXG4gICAgICAgIHN1cGVyKG5hbWUsIGNvbmZpZywgYXBwLCBwYXJlbnQpO1xuXG4gICAgICAgIHRoaXMuX2V4cHJlc3NBcHAgPSBleHByZXNzKCk7XG4gICAgICAgIHRoaXMuY29uZmlnRGlyZWN0b3J5ID0gJ3dlYmNvbmYnO1xuXG4gICAgfVxuXG4gICAgX19mcmFtZXdvcmsoKSB7XG5cbiAgICAgICAgdmFyIHNldHRpbmdzID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuV0VCX0ZSQU1FV09SS19TRVRUSU5HUyxcbiAgICAgICAgICAgIEJBU0tFVCk7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoc2V0dGluZ3MpLmZvckVhY2goa2V5ID0+IHRoaXMuX2V4cHJlc3NBcHAuc2V0KGtleSwgc2V0dGluZ3Nba2V5XSkpO1xuICAgICAgICB0aGlzLm1vZHVsZXMuX19mcmFtZXdvcmsoKTtcblxuICAgIH1cblxuICAgIF9fZmlsdGVycyhhcHAsIGRlZmF1bHRzKSB7XG5cbiAgICAgICAgc3VwZXIuX19maWx0ZXJzKHRoaXMuX2V4cHJlc3NBcHAsIGRlZmF1bHRzKTtcblxuICAgIH1cblxuICAgIF9fcm91dGluZyhwb2ludCwgYXBwLCByZXNvdXJjZSkge1xuXG4gICAgICAgIHZhciBwYXRoID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQoQ29uZmlndXJhdGlvbi5rZXlzLlBBVEgsIFBhdGguam9pbignLycsIHRoaXMubmFtZSkpO1xuICAgICAgICB2YXIgcm91dGVzID0gdGhpcy5jb25maWd1cmF0aW9uLnJvdXRlcztcbiAgICAgICAgdmFyIGZhY3RvcnkgPSBuZXcgV2ViSHR0cEZhY3RvcnkodGhpcyk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXMgPSBPYmplY3Qua2V5cyhyb3V0ZXMpLlxuICAgICAgICBtYXAoa2V5ID0+IFJvdXRlLmZyb21EZWYocm91dGVzW2tleV0sIGtleSxcbiAgICAgICAgICAgIGZhY3RvcnksIHRoaXMpLnByZXBhcmUodGhpcy5fZXhwcmVzc0FwcCwgcmVzb3VyY2UpKTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX19yb3V0aW5nKHBhdGgsIHRoaXMuX2V4cHJlc3NBcHAsIHJlc291cmNlKTtcbiAgICAgICAgYXBwLnVzZShwYXRoLCB0aGlzLl9leHByZXNzQXBwKTtcblxuICAgICAgICBpZiAoIXRoaXMucGFyZW50KVxuICAgICAgICAgICAgYXBwLnVzZSgoZXJyLCByZXEsIHJlcywgbmV4dCkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLm9uUm91dGVFcnJvckxpc3RlbmVyLm9uUm91dGVFcnJvcihlcnIsXG4gICAgICAgICAgICAgICAgICAgIGZhY3RvcnkucmVxdWVzdChyZXEsIHJlcyksIGZhY3RvcnkucmVzcG9uc2UocmVxLCByZXMpKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViTW9kdWxlXG4iXX0=