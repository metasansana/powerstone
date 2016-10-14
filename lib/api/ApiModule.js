'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Configuration = require('../app/Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Module2 = require('../app/Module');

var _Module3 = _interopRequireDefault(_Module2);

var _Route = require('../app/route/Route');

var _Route2 = _interopRequireDefault(_Route);

var _ApiHttpFactory = require('./ApiHttpFactory');

var _ApiHttpFactory2 = _interopRequireDefault(_ApiHttpFactory);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApiModule = function (_Module) {
    _inherits(ApiModule, _Module);

    function ApiModule(name, config, app, parent) {
        _classCallCheck(this, ApiModule);

        return _possibleConstructorReturn(this, (ApiModule.__proto__ || Object.getPrototypeOf(ApiModule)).call(this, name, config, app, parent));
    }

    _createClass(ApiModule, [{
        key: '__routing',
        value: function __routing(point, app, resource) {
            var _this2 = this;

            var path = this.configuration.read(this.configuration.keys.PATH, _path2.default.join('/', point, this.name));

            var routes = this.configuration.routes;
            var factory = new _ApiHttpFactory2.default(this);

            this.routes = Object.keys(routes).map(function (key) {
                return _Route2.default.fromDef(routes[key], _path2.default.join(path, key), factory, _this2).prepare(app, resource);
            });

            this.modules.__routing(path, app, resource);

            if (!this.parent) app.on('uncaughtException', function (req, res, route, err) {
                return _this2.onRouteErrorListener.onRouteError(err, factory.request(req, res), factory.response(req, res));
            });
        }
    }]);

    return ApiModule;
}(_Module3.default);

exports.default = ApiModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkFwaU1vZHVsZSIsIm5hbWUiLCJjb25maWciLCJhcHAiLCJwYXJlbnQiLCJwb2ludCIsInJlc291cmNlIiwicGF0aCIsImNvbmZpZ3VyYXRpb24iLCJyZWFkIiwia2V5cyIsIlBBVEgiLCJqb2luIiwicm91dGVzIiwiZmFjdG9yeSIsIk9iamVjdCIsIm1hcCIsImZyb21EZWYiLCJrZXkiLCJwcmVwYXJlIiwibW9kdWxlcyIsIl9fcm91dGluZyIsIm9uIiwicmVxIiwicmVzIiwicm91dGUiLCJlcnIiLCJvblJvdXRlRXJyb3JMaXN0ZW5lciIsIm9uUm91dGVFcnJvciIsInJlcXVlc3QiLCJyZXNwb25zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxTOzs7QUFFRix1QkFBWUMsSUFBWixFQUFrQkMsTUFBbEIsRUFBMEJDLEdBQTFCLEVBQStCQyxNQUEvQixFQUF1QztBQUFBOztBQUFBLHFIQUU3QkgsSUFGNkIsRUFFdkJDLE1BRnVCLEVBRWZDLEdBRmUsRUFFVkMsTUFGVTtBQUl0Qzs7OztrQ0FFU0MsSyxFQUFPRixHLEVBQUtHLFEsRUFBVTtBQUFBOztBQUU1QixnQkFBSUMsT0FBTyxLQUFLQyxhQUFMLENBQW1CQyxJQUFuQixDQUF3QixLQUFLRCxhQUFMLENBQW1CRSxJQUFuQixDQUF3QkMsSUFBaEQsRUFDUCxlQUFLQyxJQUFMLENBQVUsR0FBVixFQUFlUCxLQUFmLEVBQXNCLEtBQUtKLElBQTNCLENBRE8sQ0FBWDs7QUFHQSxnQkFBSVksU0FBUyxLQUFLTCxhQUFMLENBQW1CSyxNQUFoQztBQUNBLGdCQUFJQyxVQUFVLDZCQUFtQixJQUFuQixDQUFkOztBQUVBLGlCQUFLRCxNQUFMLEdBQWNFLE9BQU9MLElBQVAsQ0FBWUcsTUFBWixFQUNkRyxHQURjLENBQ1Y7QUFBQSx1QkFBTyxnQkFBTUMsT0FBTixDQUFjSixPQUFPSyxHQUFQLENBQWQsRUFBMkIsZUFBS04sSUFBTCxDQUFVTCxJQUFWLEVBQWdCVyxHQUFoQixDQUEzQixFQUNQSixPQURPLFVBQ1FLLE9BRFIsQ0FDZ0JoQixHQURoQixFQUNxQkcsUUFEckIsQ0FBUDtBQUFBLGFBRFUsQ0FBZDs7QUFJQSxpQkFBS2MsT0FBTCxDQUFhQyxTQUFiLENBQXVCZCxJQUF2QixFQUE2QkosR0FBN0IsRUFBa0NHLFFBQWxDOztBQUVBLGdCQUFJLENBQUMsS0FBS0YsTUFBVixFQUNJRCxJQUFJbUIsRUFBSixDQUFPLG1CQUFQLEVBQTRCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxLQUFYLEVBQWtCQyxHQUFsQjtBQUFBLHVCQUN4QixPQUFLQyxvQkFBTCxDQUEwQkMsWUFBMUIsQ0FBdUNGLEdBQXZDLEVBQ0laLFFBQVFlLE9BQVIsQ0FBZ0JOLEdBQWhCLEVBQXFCQyxHQUFyQixDQURKLEVBRUlWLFFBQVFnQixRQUFSLENBQWlCUCxHQUFqQixFQUFzQkMsR0FBdEIsQ0FGSixDQUR3QjtBQUFBLGFBQTVCO0FBS1A7Ozs7OztrQkFJVXhCLFMiLCJmaWxlIjoiQXBpTW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgQ29uZmlndXJhdGlvbiBmcm9tICcuLi9hcHAvQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgTW9kdWxlIGZyb20gJy4uL2FwcC9Nb2R1bGUnO1xuaW1wb3J0IFJvdXRlIGZyb20gJy4uL2FwcC9yb3V0ZS9Sb3V0ZSc7XG5pbXBvcnQgQXBpSHR0cEZhY3RvcnkgZnJvbSAnLi9BcGlIdHRwRmFjdG9yeSc7XG5pbXBvcnQgcmVzdGlmeSBmcm9tICdyZXN0aWZ5JztcblxuY2xhc3MgQXBpTW9kdWxlIGV4dGVuZHMgTW9kdWxlIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGNvbmZpZywgYXBwLCBwYXJlbnQpIHtcblxuICAgICAgICBzdXBlcihuYW1lLCBjb25maWcsIGFwcCwgcGFyZW50KTtcblxuICAgIH1cblxuICAgIF9fcm91dGluZyhwb2ludCwgYXBwLCByZXNvdXJjZSkge1xuXG4gICAgICAgIHZhciBwYXRoID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuUEFUSCxcbiAgICAgICAgICAgIFBhdGguam9pbignLycsIHBvaW50LCB0aGlzLm5hbWUpKTtcblxuICAgICAgICB2YXIgcm91dGVzID0gdGhpcy5jb25maWd1cmF0aW9uLnJvdXRlcztcbiAgICAgICAgdmFyIGZhY3RvcnkgPSBuZXcgQXBpSHR0cEZhY3RvcnkodGhpcyk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXMgPSBPYmplY3Qua2V5cyhyb3V0ZXMpLlxuICAgICAgICBtYXAoa2V5ID0+IFJvdXRlLmZyb21EZWYocm91dGVzW2tleV0sIFBhdGguam9pbihwYXRoLCBrZXkpLFxuICAgICAgICAgICAgZmFjdG9yeSwgdGhpcykucHJlcGFyZShhcHAsIHJlc291cmNlKSk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9fcm91dGluZyhwYXRoLCBhcHAsIHJlc291cmNlKTtcblxuICAgICAgICBpZiAoIXRoaXMucGFyZW50KVxuICAgICAgICAgICAgYXBwLm9uKCd1bmNhdWdodEV4Y2VwdGlvbicsIChyZXEsIHJlcywgcm91dGUsIGVycikgPT5cbiAgICAgICAgICAgICAgICB0aGlzLm9uUm91dGVFcnJvckxpc3RlbmVyLm9uUm91dGVFcnJvcihlcnIsXG4gICAgICAgICAgICAgICAgICAgIGZhY3RvcnkucmVxdWVzdChyZXEsIHJlcyksXG4gICAgICAgICAgICAgICAgICAgIGZhY3RvcnkucmVzcG9uc2UocmVxLCByZXMpKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpTW9kdWxlXG4iXX0=