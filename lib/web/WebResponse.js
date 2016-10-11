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

            (0, _beof2.default)({ status: status }).number();

            this.response.status(status).send(body);
        }
    }]);

    return WebResponse;
}(_Response3.default);

exports.default = WebResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViUmVzcG9uc2UuanMiXSwibmFtZXMiOlsiV2ViUmVzcG9uc2UiLCJzdGF0dXMiLCJib2R5IiwibnVtYmVyIiwicmVzcG9uc2UiLCJzZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsVzs7Ozs7Ozs7Ozs7NkJBRUdDLE0sRUFBUUMsSSxFQUFNOztBQUVmLGdDQUFLLEVBQUVELGNBQUYsRUFBTCxFQUFpQkUsTUFBakI7O0FBRUEsaUJBQUtDLFFBQUwsQ0FBY0gsTUFBZCxDQUFxQkEsTUFBckIsRUFBNkJJLElBQTdCLENBQWtDSCxJQUFsQztBQUVIOzs7Ozs7a0JBSVVGLFciLCJmaWxlIjoiV2ViUmVzcG9uc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi9hcHAvUmVzcG9uc2UnO1xuXG4vKipcbiAqIFdlYlJlc3BvbnNlXG4gKi9cbmNsYXNzIFdlYlJlc3BvbnNlIGV4dGVuZHMgUmVzcG9uc2Uge1xuXG4gICAgc2VuZChzdGF0dXMsIGJvZHkpIHtcblxuICAgICAgICBiZW9mKHsgc3RhdHVzIH0pLm51bWJlcigpO1xuXG4gICAgICAgIHRoaXMucmVzcG9uc2Uuc3RhdHVzKHN0YXR1cykuc2VuZChib2R5KTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWJSZXNwb25zZVxuIl19