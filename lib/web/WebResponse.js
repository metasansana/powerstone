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
 * WebResponse
 */
var WebResponse = function (_Response) {
    _inherits(WebResponse, _Response);

    function WebResponse() {
        _classCallCheck(this, WebResponse);

        return _possibleConstructorReturn(this, (WebResponse.__proto__ || Object.getPrototypeOf(WebResponse)).apply(this, arguments));
    }

    _createClass(WebResponse, [{
        key: 'send',
        value: function send(status, body) {
            var _this2 = this;

            (0, _beof2.default)({ status: status }).number();

            this.filter.apply(body, this.request, this).then(function (body) {
                return _this2.response.status(status).send(body);
            }).catch(function (e) {
                return _this2.error(e);
            });
        }
    }]);

    return WebResponse;
}(_Response3.default);

exports.default = WebResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViUmVzcG9uc2UuanMiXSwibmFtZXMiOlsiV2ViUmVzcG9uc2UiLCJzdGF0dXMiLCJib2R5IiwibnVtYmVyIiwiZmlsdGVyIiwiYXBwbHkiLCJyZXF1ZXN0IiwidGhlbiIsInJlc3BvbnNlIiwic2VuZCIsImNhdGNoIiwiZXJyb3IiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsVzs7Ozs7Ozs7Ozs7NkJBRUdDLE0sRUFBUUMsSSxFQUFNO0FBQUE7O0FBRWYsZ0NBQUssRUFBRUQsY0FBRixFQUFMLEVBQWlCRSxNQUFqQjs7QUFFQSxpQkFBS0MsTUFBTCxDQUFZQyxLQUFaLENBQWtCSCxJQUFsQixFQUF3QixLQUFLSSxPQUE3QixFQUFzQyxJQUF0QyxFQUNBQyxJQURBLENBQ0s7QUFBQSx1QkFBUSxPQUFLQyxRQUFMLENBQWNQLE1BQWQsQ0FBcUJBLE1BQXJCLEVBQTZCUSxJQUE3QixDQUFrQ1AsSUFBbEMsQ0FBUjtBQUFBLGFBREwsRUFFQVEsS0FGQSxDQUVNO0FBQUEsdUJBQUssT0FBS0MsS0FBTCxDQUFXQyxDQUFYLENBQUw7QUFBQSxhQUZOO0FBSUg7Ozs7OztrQkFJVVosVyIsImZpbGUiOiJXZWJSZXNwb25zZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4uL2FwcC9SZXNwb25zZSc7XG5cbi8qKlxuICogV2ViUmVzcG9uc2VcbiAqL1xuY2xhc3MgV2ViUmVzcG9uc2UgZXh0ZW5kcyBSZXNwb25zZSB7XG5cbiAgICBzZW5kKHN0YXR1cywgYm9keSkge1xuXG4gICAgICAgIGJlb2YoeyBzdGF0dXMgfSkubnVtYmVyKCk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIuYXBwbHkoYm9keSwgdGhpcy5yZXF1ZXN0LCB0aGlzKS5cbiAgICAgICAgdGhlbihib2R5ID0+IHRoaXMucmVzcG9uc2Uuc3RhdHVzKHN0YXR1cykuc2VuZChib2R5KSkuXG4gICAgICAgIGNhdGNoKGUgPT4gdGhpcy5lcnJvcihlKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViUmVzcG9uc2VcbiJdfQ==