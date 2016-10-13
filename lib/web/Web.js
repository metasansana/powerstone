'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Application2 = require('../app/Application');

var _Application3 = _interopRequireDefault(_Application2);

var _Configuration = require('../app/Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

var _WebContext = require('./WebContext');

var _WebContext2 = _interopRequireDefault(_WebContext);

var _WebModule = require('./WebModule');

var _WebModule2 = _interopRequireDefault(_WebModule);

var _ServerFactory = require('./ServerFactory');

var _ServerFactory2 = _interopRequireDefault(_ServerFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Web = function (_Application) {
    _inherits(Web, _Application);

    function Web() {
        _classCallCheck(this, Web);

        return _possibleConstructorReturn(this, (Web.__proto__ || Object.getPrototypeOf(Web)).apply(this, arguments));
    }

    _createClass(Web, [{
        key: '__createServer',
        value: function __createServer() {
            return _ServerFactory2.default.createWebServer(this.framework, this.main);
        }
    }, {
        key: 'start',
        value: function start() {

            this.main = new _WebModule2.default('', new _Configuration2.default('webconf', this.path), this, null);
            this.framework = (0, _express2.default)();
            this.context = new _WebContext2.default();
            return _get(Web.prototype.__proto__ || Object.getPrototypeOf(Web.prototype), 'start', this).call(this);
        }
    }]);

    return Web;
}(_Application3.default);

exports.default = Web;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViLmpzIl0sIm5hbWVzIjpbIldlYiIsImNyZWF0ZVdlYlNlcnZlciIsImZyYW1ld29yayIsIm1haW4iLCJwYXRoIiwiY29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsRzs7Ozs7Ozs7Ozs7eUNBRWU7QUFDYixtQkFBTyx3QkFBY0MsZUFBZCxDQUE4QixLQUFLQyxTQUFuQyxFQUE4QyxLQUFLQyxJQUFuRCxDQUFQO0FBQ0g7OztnQ0FFTzs7QUFFSixpQkFBS0EsSUFBTCxHQUFZLHdCQUFjLEVBQWQsRUFBa0IsNEJBQWtCLFNBQWxCLEVBQTZCLEtBQUtDLElBQWxDLENBQWxCLEVBQTJELElBQTNELEVBQWlFLElBQWpFLENBQVo7QUFDQSxpQkFBS0YsU0FBTCxHQUFpQix3QkFBakI7QUFDQSxpQkFBS0csT0FBTCxHQUFlLDBCQUFmO0FBQ0E7QUFFSDs7Ozs7O2tCQUlVTCxHIiwiZmlsZSI6IldlYi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4uL2FwcC9BcHBsaWNhdGlvbic7XG5pbXBvcnQgQ29uZmlndXJhdGlvbiBmcm9tICcuLi9hcHAvQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgV2ViQ29udGV4dCBmcm9tICcuL1dlYkNvbnRleHQnO1xuaW1wb3J0IFdlYk1vZHVsZSBmcm9tICcuL1dlYk1vZHVsZSc7XG5pbXBvcnQgU2VydmVyRmFjdG9yeSBmcm9tICcuL1NlcnZlckZhY3RvcnknO1xuXG5jbGFzcyBXZWIgZXh0ZW5kcyBBcHBsaWNhdGlvbiB7XG5cbiAgICBfX2NyZWF0ZVNlcnZlcigpIHtcbiAgICAgICAgcmV0dXJuIFNlcnZlckZhY3RvcnkuY3JlYXRlV2ViU2VydmVyKHRoaXMuZnJhbWV3b3JrLCB0aGlzLm1haW4pO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIHRoaXMubWFpbiA9IG5ldyBXZWJNb2R1bGUoJycsIG5ldyBDb25maWd1cmF0aW9uKCd3ZWJjb25mJywgdGhpcy5wYXRoKSwgdGhpcywgbnVsbCk7XG4gICAgICAgIHRoaXMuZnJhbWV3b3JrID0gZXhwcmVzcygpO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBuZXcgV2ViQ29udGV4dCgpO1xuICAgICAgICByZXR1cm4gc3VwZXIuc3RhcnQoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWJcbiJdfQ==