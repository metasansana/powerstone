'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _HttpFactory2 = require('../app/HttpFactory');

var _HttpFactory3 = _interopRequireDefault(_HttpFactory2);

var _ApiResponse = require('./ApiResponse');

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _Action = require('../app/route/Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ApiHttpFactory
 */
var ApiHttpFactory = function (_HttpFactory) {
    _inherits(ApiHttpFactory, _HttpFactory);

    function ApiHttpFactory() {
        _classCallCheck(this, ApiHttpFactory);

        return _possibleConstructorReturn(this, (ApiHttpFactory.__proto__ || Object.getPrototypeOf(ApiHttpFactory)).apply(this, arguments));
    }

    _createClass(ApiHttpFactory, [{
        key: 'response',
        value: function response(res, action) {

            (0, _beof2.default)({ res: res }).object();
            (0, _beof2.default)({ action: action }).instance(_Action2.default);

            return new _ApiResponse2.default(res, action, action.route, action.route.module);
        }
    }]);

    return ApiHttpFactory;
}(_HttpFactory3.default);

exports.default = ApiHttpFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpSHR0cEZhY3RvcnkuanMiXSwibmFtZXMiOlsiQXBpSHR0cEZhY3RvcnkiLCJyZXMiLCJhY3Rpb24iLCJvYmplY3QiLCJpbnN0YW5jZSIsInJvdXRlIiwibW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01BLGM7Ozs7Ozs7Ozs7O2lDQUVPQyxHLEVBQUtDLE0sRUFBUTs7QUFFbEIsZ0NBQUssRUFBRUQsUUFBRixFQUFMLEVBQWNFLE1BQWQ7QUFDQSxnQ0FBSyxFQUFFRCxjQUFGLEVBQUwsRUFBaUJFLFFBQWpCOztBQUVBLG1CQUFPLDBCQUFnQkgsR0FBaEIsRUFBcUJDLE1BQXJCLEVBQTZCQSxPQUFPRyxLQUFwQyxFQUEyQ0gsT0FBT0csS0FBUCxDQUFhQyxNQUF4RCxDQUFQO0FBRUg7Ozs7OztrQkFJVU4sYyIsImZpbGUiOiJBcGlIdHRwRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IEh0dHBGYWN0b3J5IGZyb20gJy4uL2FwcC9IdHRwRmFjdG9yeSc7XG5pbXBvcnQgQXBpUmVzcG9uc2UgZnJvbSAnLi9BcGlSZXNwb25zZSc7XG5pbXBvcnQgQWN0aW9uIGZyb20gJy4uL2FwcC9yb3V0ZS9BY3Rpb24nO1xuXG4vKipcbiAqIEFwaUh0dHBGYWN0b3J5XG4gKi9cbmNsYXNzIEFwaUh0dHBGYWN0b3J5IGV4dGVuZHMgSHR0cEZhY3Rvcnkge1xuXG4gICAgcmVzcG9uc2UocmVzLCBhY3Rpb24pIHtcblxuICAgICAgICBiZW9mKHsgcmVzIH0pLm9iamVjdCgpO1xuICAgICAgICBiZW9mKHsgYWN0aW9uIH0pLmluc3RhbmNlKEFjdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBcGlSZXNwb25zZShyZXMsIGFjdGlvbiwgYWN0aW9uLnJvdXRlLCBhY3Rpb24ucm91dGUubW9kdWxlKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBcGlIdHRwRmFjdG9yeVxuXG4iXX0=