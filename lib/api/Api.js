'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _Application2 = require('../app/Application');

var _Application3 = _interopRequireDefault(_Application2);

var _ApiModule = require('./ApiModule');

var _ApiModule2 = _interopRequireDefault(_ApiModule);

var _Configuration = require('../app/Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

var _ApiContext = require('../api/ApiContext');

var _ApiContext2 = _interopRequireDefault(_ApiContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Api = function (_Application) {
    _inherits(Api, _Application);

    function Api() {
        _classCallCheck(this, Api);

        return _possibleConstructorReturn(this, (Api.__proto__ || Object.getPrototypeOf(Api)).apply(this, arguments));
    }

    _createClass(Api, [{
        key: '__createServer',
        value: function __createServer() {

            return this.framework;
        }
    }, {
        key: 'connect',
        value: function connect() {

            this.main = new _ApiModule2.default('', new _Configuration2.default('apiconf', this.path), this);
            this.context = new _ApiContext2.default();
            return _get(Api.prototype.__proto__ || Object.getPrototypeOf(Api.prototype), 'connect', this).call(this);
        }
    }, {
        key: 'start',
        value: function start() {

            this.main = new _ApiModule2.default('', new _Configuration2.default('apiconf', this.path), this);
            this.context = new _ApiContext2.default();
            this.framework = _restify2.default.createServer(this.main.configuration.read('restify', null));
            return _get(Api.prototype.__proto__ || Object.getPrototypeOf(Api.prototype), 'start', this).call(this);
        }
    }]);

    return Api;
}(_Application3.default);

exports.default = Api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpLmpzIl0sIm5hbWVzIjpbIkFwaSIsImZyYW1ld29yayIsIm1haW4iLCJwYXRoIiwiY29udGV4dCIsImNyZWF0ZVNlcnZlciIsImNvbmZpZ3VyYXRpb24iLCJyZWFkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxHOzs7Ozs7Ozs7Ozt5Q0FFZTs7QUFFYixtQkFBTyxLQUFLQyxTQUFaO0FBRUg7OztrQ0FFUzs7QUFFTixpQkFBS0MsSUFBTCxHQUFZLHdCQUFjLEVBQWQsRUFBa0IsNEJBQWtCLFNBQWxCLEVBQTZCLEtBQUtDLElBQWxDLENBQWxCLEVBQTJELElBQTNELENBQVo7QUFDQSxpQkFBS0MsT0FBTCxHQUFlLDBCQUFmO0FBQ0E7QUFFSDs7O2dDQUVPOztBQUVKLGlCQUFLRixJQUFMLEdBQVksd0JBQWMsRUFBZCxFQUFrQiw0QkFBa0IsU0FBbEIsRUFBNkIsS0FBS0MsSUFBbEMsQ0FBbEIsRUFBMkQsSUFBM0QsQ0FBWjtBQUNBLGlCQUFLQyxPQUFMLEdBQWUsMEJBQWY7QUFDQSxpQkFBS0gsU0FBTCxHQUFpQixrQkFBUUksWUFBUixDQUFxQixLQUFLSCxJQUFMLENBQVVJLGFBQVYsQ0FBd0JDLElBQXhCLENBQTZCLFNBQTdCLEVBQXdDLElBQXhDLENBQXJCLENBQWpCO0FBQ0E7QUFFSDs7Ozs7O2tCQUlVUCxHIiwiZmlsZSI6IkFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCByZXN0aWZ5IGZyb20gJ3Jlc3RpZnknO1xuaW1wb3J0IGRlZXBfbWVyZ2UgZnJvbSAnZGVlcG1lcmdlJztcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuLi9hcHAvQXBwbGljYXRpb24nO1xuaW1wb3J0IEFwaU1vZHVsZSBmcm9tICcuL0FwaU1vZHVsZSc7XG5pbXBvcnQgQ29uZmlndXJhdGlvbiBmcm9tICcuLi9hcHAvQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgQXBpQ29udGV4dCBmcm9tICcuLi9hcGkvQXBpQ29udGV4dCc7XG5cbmNsYXNzIEFwaSBleHRlbmRzIEFwcGxpY2F0aW9uIHtcblxuICAgIF9fY3JlYXRlU2VydmVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmZyYW1ld29yaztcblxuICAgIH1cblxuICAgIGNvbm5lY3QoKSB7XG5cbiAgICAgICAgdGhpcy5tYWluID0gbmV3IEFwaU1vZHVsZSgnJywgbmV3IENvbmZpZ3VyYXRpb24oJ2FwaWNvbmYnLCB0aGlzLnBhdGgpLCB0aGlzKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gbmV3IEFwaUNvbnRleHQoKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmNvbm5lY3QoKTtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIHRoaXMubWFpbiA9IG5ldyBBcGlNb2R1bGUoJycsIG5ldyBDb25maWd1cmF0aW9uKCdhcGljb25mJywgdGhpcy5wYXRoKSwgdGhpcyk7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBBcGlDb250ZXh0KCk7XG4gICAgICAgIHRoaXMuZnJhbWV3b3JrID0gcmVzdGlmeS5jcmVhdGVTZXJ2ZXIodGhpcy5tYWluLmNvbmZpZ3VyYXRpb24ucmVhZCgncmVzdGlmeScsIG51bGwpKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpXG4iXX0=