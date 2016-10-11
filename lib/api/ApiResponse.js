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

            (0, _beof2.default)({ status: status }).number();

            this.response.send(status, body);
        }
    }]);

    return ApiResponse;
}(_Response3.default);

exports.default = ApiResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpUmVzcG9uc2UuanMiXSwibmFtZXMiOlsiQXBpUmVzcG9uc2UiLCJzdGF0dXMiLCJib2R5IiwibnVtYmVyIiwicmVzcG9uc2UiLCJzZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsVzs7Ozs7Ozs7Ozs7NkJBRUdDLE0sRUFBUUMsSSxFQUFNOztBQUVmLGdDQUFLLEVBQUVELGNBQUYsRUFBTCxFQUFpQkUsTUFBakI7O0FBRUEsaUJBQUtDLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQkosTUFBbkIsRUFBMkJDLElBQTNCO0FBRUg7Ozs7OztrQkFJVUYsVyIsImZpbGUiOiJBcGlSZXNwb25zZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4uL2FwcC9SZXNwb25zZSc7XG5cbi8qKlxuICogQXBpUmVzcG9uc2VcbiAqL1xuY2xhc3MgQXBpUmVzcG9uc2UgZXh0ZW5kcyBSZXNwb25zZSB7XG5cbiAgICBzZW5kKHN0YXR1cywgYm9keSkge1xuXG4gICAgICAgIGJlb2YoeyBzdGF0dXMgfSkubnVtYmVyKCk7XG5cbiAgICAgICAgdGhpcy5yZXNwb25zZS5zZW5kKHN0YXR1cywgYm9keSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpUmVzcG9uc2VcbiJdfQ==