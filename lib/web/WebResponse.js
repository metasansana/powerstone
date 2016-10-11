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

            this.action.output.apply(body, this.request, this).then(function (body) {
                return _this2.response.status(status).send(body);
            }).catch(function (e) {
                return _this2.error(e);
            });
        }
    }]);

    return WebResponse;
}(_Response3.default);

exports.default = WebResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViUmVzcG9uc2UuanMiXSwibmFtZXMiOlsiV2ViUmVzcG9uc2UiLCJzdGF0dXMiLCJib2R5IiwibnVtYmVyIiwiYWN0aW9uIiwib3V0cHV0IiwiYXBwbHkiLCJyZXF1ZXN0IiwidGhlbiIsInJlc3BvbnNlIiwic2VuZCIsImNhdGNoIiwiZXJyb3IiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsVzs7Ozs7Ozs7Ozs7NkJBRUdDLE0sRUFBUUMsSSxFQUFNO0FBQUE7O0FBRWYsZ0NBQUssRUFBRUQsY0FBRixFQUFMLEVBQWlCRSxNQUFqQjs7QUFFQSxpQkFBS0MsTUFBTCxDQUFZQyxNQUFaLENBQW1CQyxLQUFuQixDQUF5QkosSUFBekIsRUFBK0IsS0FBS0ssT0FBcEMsRUFBNkMsSUFBN0MsRUFDSUMsSUFESixDQUNTO0FBQUEsdUJBQU8sT0FBS0MsUUFBTCxDQUFjUixNQUFkLENBQXFCQSxNQUFyQixFQUE2QlMsSUFBN0IsQ0FBa0NSLElBQWxDLENBQVA7QUFBQSxhQURULEVBRUlTLEtBRkosQ0FFVTtBQUFBLHVCQUFHLE9BQUtDLEtBQUwsQ0FBV0MsQ0FBWCxDQUFIO0FBQUEsYUFGVjtBQUlIOzs7Ozs7a0JBSVViLFciLCJmaWxlIjoiV2ViUmVzcG9uc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi9hcHAvUmVzcG9uc2UnO1xuXG4vKipcbiAqIFdlYlJlc3BvbnNlXG4gKi9cbmNsYXNzIFdlYlJlc3BvbnNlIGV4dGVuZHMgUmVzcG9uc2Uge1xuXG4gICAgc2VuZChzdGF0dXMsIGJvZHkpIHtcblxuICAgICAgICBiZW9mKHsgc3RhdHVzIH0pLm51bWJlcigpO1xuXG4gICAgICAgIHRoaXMuYWN0aW9uLm91dHB1dC5hcHBseShib2R5LCB0aGlzLnJlcXVlc3QsIHRoaXMpLlxuICAgICAgICAgICAgdGhlbihib2R5PT4gdGhpcy5yZXNwb25zZS5zdGF0dXMoc3RhdHVzKS5zZW5kKGJvZHkpKS5cbiAgICAgICAgICAgIGNhdGNoKGU9PnRoaXMuZXJyb3IoZSkpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYlJlc3BvbnNlXG4iXX0=