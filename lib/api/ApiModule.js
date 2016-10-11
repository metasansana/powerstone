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

            this.routes = Object.keys(routes).map(function (key) {
                return _Route2.default.fromDef(routes[key], _path2.default.join(path, key), new _ApiHttpFactory2.default(_this2.application.context), _this2).prepare(app, resource);
            });

            this.modules.__routing(path, app, resource);
        }
    }]);

    return ApiModule;
}(_Module3.default);

exports.default = ApiModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkFwaU1vZHVsZSIsIm5hbWUiLCJjb25maWciLCJhcHAiLCJwYXJlbnQiLCJwb2ludCIsInJlc291cmNlIiwicGF0aCIsImNvbmZpZ3VyYXRpb24iLCJyZWFkIiwia2V5cyIsIlBBVEgiLCJqb2luIiwicm91dGVzIiwiT2JqZWN0IiwibWFwIiwiZnJvbURlZiIsImtleSIsImFwcGxpY2F0aW9uIiwiY29udGV4dCIsInByZXBhcmUiLCJtb2R1bGVzIiwiX19yb3V0aW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFM7OztBQUVGLHVCQUFZQyxJQUFaLEVBQWtCQyxNQUFsQixFQUEwQkMsR0FBMUIsRUFBK0JDLE1BQS9CLEVBQXVDO0FBQUE7O0FBQUEscUhBRTdCSCxJQUY2QixFQUV2QkMsTUFGdUIsRUFFZkMsR0FGZSxFQUVWQyxNQUZVO0FBSXRDOzs7O2tDQUVTQyxLLEVBQU9GLEcsRUFBS0csUSxFQUFVO0FBQUE7O0FBRTVCLGdCQUFJQyxPQUFPLEtBQUtDLGFBQUwsQ0FBbUJDLElBQW5CLENBQXdCLEtBQUtELGFBQUwsQ0FBbUJFLElBQW5CLENBQXdCQyxJQUFoRCxFQUNQLGVBQUtDLElBQUwsQ0FBVSxHQUFWLEVBQWVQLEtBQWYsRUFBc0IsS0FBS0osSUFBM0IsQ0FETyxDQUFYOztBQUdBLGdCQUFJWSxTQUFTLEtBQUtMLGFBQUwsQ0FBbUJLLE1BQWhDOztBQUVBLGlCQUFLQSxNQUFMLEdBQWNDLE9BQU9KLElBQVAsQ0FBWUcsTUFBWixFQUNkRSxHQURjLENBQ1Y7QUFBQSx1QkFBTyxnQkFBTUMsT0FBTixDQUFjSCxPQUFPSSxHQUFQLENBQWQsRUFBMkIsZUFBS0wsSUFBTCxDQUFVTCxJQUFWLEVBQWdCVSxHQUFoQixDQUEzQixFQUNQLDZCQUFtQixPQUFLQyxXQUFMLENBQWlCQyxPQUFwQyxDQURPLFVBQzZDQyxPQUQ3QyxDQUNxRGpCLEdBRHJELEVBQzBERyxRQUQxRCxDQUFQO0FBQUEsYUFEVSxDQUFkOztBQUlBLGlCQUFLZSxPQUFMLENBQWFDLFNBQWIsQ0FBdUJmLElBQXZCLEVBQTZCSixHQUE3QixFQUFrQ0csUUFBbEM7QUFFSDs7Ozs7O2tCQUlVTixTIiwiZmlsZSI6IkFwaU1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi4vYXBwL0NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IE1vZHVsZSBmcm9tICcuLi9hcHAvTW9kdWxlJztcbmltcG9ydCBSb3V0ZSBmcm9tICcuLi9hcHAvcm91dGUvUm91dGUnO1xuaW1wb3J0IEFwaUh0dHBGYWN0b3J5IGZyb20gJy4vQXBpSHR0cEZhY3RvcnknO1xuaW1wb3J0IHJlc3RpZnkgZnJvbSAncmVzdGlmeSc7XG5cbmNsYXNzIEFwaU1vZHVsZSBleHRlbmRzIE1vZHVsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjb25maWcsIGFwcCwgcGFyZW50KSB7XG5cbiAgICAgICAgc3VwZXIobmFtZSwgY29uZmlnLCBhcHAsIHBhcmVudCk7XG5cbiAgICB9XG5cbiAgICBfX3JvdXRpbmcocG9pbnQsIGFwcCwgcmVzb3VyY2UpIHtcblxuICAgICAgICB2YXIgcGF0aCA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLlBBVEgsXG4gICAgICAgICAgICBQYXRoLmpvaW4oJy8nLCBwb2ludCwgdGhpcy5uYW1lKSk7XG5cbiAgICAgICAgdmFyIHJvdXRlcyA9IHRoaXMuY29uZmlndXJhdGlvbi5yb3V0ZXM7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXMgPSBPYmplY3Qua2V5cyhyb3V0ZXMpLlxuICAgICAgICBtYXAoa2V5ID0+IFJvdXRlLmZyb21EZWYocm91dGVzW2tleV0sIFBhdGguam9pbihwYXRoLCBrZXkpLFxuICAgICAgICAgICAgbmV3IEFwaUh0dHBGYWN0b3J5KHRoaXMuYXBwbGljYXRpb24uY29udGV4dCksIHRoaXMpLnByZXBhcmUoYXBwLCByZXNvdXJjZSkpO1xuXG4gICAgICAgIHRoaXMubW9kdWxlcy5fX3JvdXRpbmcocGF0aCwgYXBwLCByZXNvdXJjZSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpTW9kdWxlXG4iXX0=