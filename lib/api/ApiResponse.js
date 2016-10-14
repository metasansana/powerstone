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

            this.filter.apply(body, this.request, this).then(function (body) {
                return _this2.response.send(status, body);
            }).catch(function (e) {
                return _this2.error(e);
            });
        }
    }]);

    return ApiResponse;
}(_Response3.default);

exports.default = ApiResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpUmVzcG9uc2UuanMiXSwibmFtZXMiOlsiQXBpUmVzcG9uc2UiLCJzdGF0dXMiLCJib2R5IiwibnVtYmVyIiwiZmlsdGVyIiwiYXBwbHkiLCJyZXF1ZXN0IiwidGhlbiIsInJlc3BvbnNlIiwic2VuZCIsImNhdGNoIiwiZXJyb3IiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsVzs7Ozs7Ozs7Ozs7NkJBRUdDLE0sRUFBUUMsSSxFQUFNO0FBQUE7O0FBRWYsZ0NBQUssRUFBRUQsY0FBRixFQUFMLEVBQWlCRSxNQUFqQjs7QUFFQSxpQkFBS0MsTUFBTCxDQUFZQyxLQUFaLENBQWtCSCxJQUFsQixFQUF3QixLQUFLSSxPQUE3QixFQUFzQyxJQUF0QyxFQUNBQyxJQURBLENBQ0s7QUFBQSx1QkFBUSxPQUFLQyxRQUFMLENBQWNDLElBQWQsQ0FBbUJSLE1BQW5CLEVBQTBCQyxJQUExQixDQUFSO0FBQUEsYUFETCxFQUVBUSxLQUZBLENBRU07QUFBQSx1QkFBSyxPQUFLQyxLQUFMLENBQVdDLENBQVgsQ0FBTDtBQUFBLGFBRk47QUFJSDs7Ozs7O2tCQUlVWixXIiwiZmlsZSI6IkFwaVJlc3BvbnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJlb2YgZnJvbSAnYmVvZic7XG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vYXBwL1Jlc3BvbnNlJztcblxuLyoqXG4gKiBBcGlSZXNwb25zZVxuICovXG5jbGFzcyBBcGlSZXNwb25zZSBleHRlbmRzIFJlc3BvbnNlIHtcblxuICAgIHNlbmQoc3RhdHVzLCBib2R5KSB7XG5cbiAgICAgICAgYmVvZih7IHN0YXR1cyB9KS5udW1iZXIoKTtcblxuICAgICAgICB0aGlzLmZpbHRlci5hcHBseShib2R5LCB0aGlzLnJlcXVlc3QsIHRoaXMpLlxuICAgICAgICB0aGVuKGJvZHkgPT4gdGhpcy5yZXNwb25zZS5zZW5kKHN0YXR1cyxib2R5KSkuXG4gICAgICAgIGNhdGNoKGUgPT4gdGhpcy5lcnJvcihlKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpUmVzcG9uc2VcbiJdfQ==