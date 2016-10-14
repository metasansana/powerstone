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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpLmpzIl0sIm5hbWVzIjpbIkFwaSIsImZyYW1ld29yayIsIm1haW4iLCJwYXRoIiwiY29udGV4dCIsImNyZWF0ZVNlcnZlciIsImNvbmZpZ3VyYXRpb24iLCJyZWFkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxHOzs7Ozs7Ozs7Ozt5Q0FFZTs7QUFFYixtQkFBTyxLQUFLQyxTQUFaO0FBRUg7OztnQ0FFTzs7QUFFSixpQkFBS0MsSUFBTCxHQUFZLHdCQUFjLEVBQWQsRUFBa0IsNEJBQWtCLFNBQWxCLEVBQTZCLEtBQUtDLElBQWxDLENBQWxCLEVBQTJELElBQTNELENBQVo7QUFDQSxpQkFBS0MsT0FBTCxHQUFlLDBCQUFmO0FBQ0EsaUJBQUtILFNBQUwsR0FBaUIsa0JBQVFJLFlBQVIsQ0FBcUIsS0FBS0gsSUFBTCxDQUFVSSxhQUFWLENBQXdCQyxJQUF4QixDQUE2QixTQUE3QixFQUF3QyxJQUF4QyxDQUFyQixDQUFqQjtBQUNBO0FBRUg7Ozs7OztrQkFJVVAsRyIsImZpbGUiOiJBcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgcmVzdGlmeSBmcm9tICdyZXN0aWZ5JztcbmltcG9ydCBkZWVwX21lcmdlIGZyb20gJ2RlZXBtZXJnZSc7XG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi4vYXBwL0FwcGxpY2F0aW9uJztcbmltcG9ydCBBcGlNb2R1bGUgZnJvbSAnLi9BcGlNb2R1bGUnO1xuaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi4vYXBwL0NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IEFwaUNvbnRleHQgZnJvbSAnLi4vYXBpL0FwaUNvbnRleHQnO1xuXG5jbGFzcyBBcGkgZXh0ZW5kcyBBcHBsaWNhdGlvbiB7XG5cbiAgICBfX2NyZWF0ZVNlcnZlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZXdvcms7XG5cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgICAgICB0aGlzLm1haW4gPSBuZXcgQXBpTW9kdWxlKCcnLCBuZXcgQ29uZmlndXJhdGlvbignYXBpY29uZicsIHRoaXMucGF0aCksIHRoaXMpO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBuZXcgQXBpQ29udGV4dCgpO1xuICAgICAgICB0aGlzLmZyYW1ld29yayA9IHJlc3RpZnkuY3JlYXRlU2VydmVyKHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQoJ3Jlc3RpZnknLCBudWxsKSk7XG4gICAgICAgIHJldHVybiBzdXBlci5zdGFydCgpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwaVxuIl19