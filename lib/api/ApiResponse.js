'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _Response2 = require('../app/Response');

var _Response3 = _interopRequireDefault(_Response2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ApiResponse
 */
var ApiResponse = function (_Response) {
    _inherits(ApiResponse, _Response);

    function ApiResponse() {
        _classCallCheck(this, ApiResponse);

        return _possibleConstructorReturn(this, (ApiResponse.__proto__ || Object.getPrototypeOf(ApiResponse)).apply(this, arguments));
    }

    _createClass(ApiResponse, [{
        key: 'send',
        value: function send(status, body) {
            var _this2 = this;

            (0, _beof2.default)({ status: status }).number();

            this.action.output.apply(body, this.request, this).then(function (body) {
                return _this2.response.send(status, body);
            }).catch(function (e) {
                return _this2.error(e);
            });
        }
    }]);

    return ApiResponse;
}(_Response3.default);

exports.default = ApiResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpUmVzcG9uc2UuanMiXSwibmFtZXMiOlsiQXBpUmVzcG9uc2UiLCJzdGF0dXMiLCJib2R5IiwibnVtYmVyIiwiYWN0aW9uIiwib3V0cHV0IiwiYXBwbHkiLCJyZXF1ZXN0IiwidGhlbiIsInJlc3BvbnNlIiwic2VuZCIsImNhdGNoIiwiZXJyb3IiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsVzs7Ozs7Ozs7Ozs7NkJBRUdDLE0sRUFBUUMsSSxFQUFNO0FBQUE7O0FBRWYsZ0NBQUssRUFBRUQsY0FBRixFQUFMLEVBQWlCRSxNQUFqQjs7QUFFQSxpQkFBS0MsTUFBTCxDQUFZQyxNQUFaLENBQW1CQyxLQUFuQixDQUF5QkosSUFBekIsRUFBK0IsS0FBS0ssT0FBcEMsRUFBNkMsSUFBN0MsRUFDQUMsSUFEQSxDQUNLO0FBQUEsdUJBQVEsT0FBS0MsUUFBTCxDQUFjQyxJQUFkLENBQW1CVCxNQUFuQixFQUEwQkMsSUFBMUIsQ0FBUjtBQUFBLGFBREwsRUFFQVMsS0FGQSxDQUVNO0FBQUEsdUJBQUssT0FBS0MsS0FBTCxDQUFXQyxDQUFYLENBQUw7QUFBQSxhQUZOO0FBSUg7Ozs7OztrQkFJVWIsVyIsImZpbGUiOiJBcGlSZXNwb25zZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4uL2FwcC9SZXNwb25zZSc7XG5cbi8qKlxuICogQXBpUmVzcG9uc2VcbiAqL1xuY2xhc3MgQXBpUmVzcG9uc2UgZXh0ZW5kcyBSZXNwb25zZSB7XG5cbiAgICBzZW5kKHN0YXR1cywgYm9keSkge1xuXG4gICAgICAgIGJlb2YoeyBzdGF0dXMgfSkubnVtYmVyKCk7XG5cbiAgICAgICAgdGhpcy5hY3Rpb24ub3V0cHV0LmFwcGx5KGJvZHksIHRoaXMucmVxdWVzdCwgdGhpcykuXG4gICAgICAgIHRoZW4oYm9keSA9PiB0aGlzLnJlc3BvbnNlLnNlbmQoc3RhdHVzLGJvZHkpKS5cbiAgICAgICAgY2F0Y2goZSA9PiB0aGlzLmVycm9yKGUpKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBcGlSZXNwb25zZVxuIl19