'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _HttpFactory2 = require('../app/HttpFactory');

var _HttpFactory3 = _interopRequireDefault(_HttpFactory2);

var _WebResponse = require('./WebResponse');

var _WebResponse2 = _interopRequireDefault(_WebResponse);

var _OutputFilter = require('../app/filters/OutputFilter');

var _OutputFilter2 = _interopRequireDefault(_OutputFilter);

var _Action = require('../app/route/Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * WebHttpFactory
 */
var WebHttpFactory = function (_HttpFactory) {
    _inherits(WebHttpFactory, _HttpFactory);

    function WebHttpFactory() {
        _classCallCheck(this, WebHttpFactory);

        return _possibleConstructorReturn(this, (WebHttpFactory.__proto__ || Object.getPrototypeOf(WebHttpFactory)).apply(this, arguments));
    }

    _createClass(WebHttpFactory, [{
        key: 'response',
        value: function response(req, res, output) {

            (0, _beof2.default)({ req: req }).object();
            (0, _beof2.default)({ res: res }).object();

            return new _WebResponse2.default(req, res, this.module, output);
        }
    }]);

    return WebHttpFactory;
}(_HttpFactory3.default);

exports.default = WebHttpFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViSHR0cEZhY3RvcnkuanMiXSwibmFtZXMiOlsiV2ViSHR0cEZhY3RvcnkiLCJyZXEiLCJyZXMiLCJvdXRwdXQiLCJvYmplY3QiLCJtb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNQSxjOzs7Ozs7Ozs7OztpQ0FFT0MsRyxFQUFLQyxHLEVBQUtDLE0sRUFBUTs7QUFFdkIsZ0NBQUssRUFBRUYsUUFBRixFQUFMLEVBQWNHLE1BQWQ7QUFDQSxnQ0FBSyxFQUFFRixRQUFGLEVBQUwsRUFBY0UsTUFBZDs7QUFFQSxtQkFBTywwQkFBZ0JILEdBQWhCLEVBQXFCQyxHQUFyQixFQUEwQixLQUFLRyxNQUEvQixFQUF1Q0YsTUFBdkMsQ0FBUDtBQUVIOzs7Ozs7a0JBS1VILGMiLCJmaWxlIjoiV2ViSHR0cEZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCBIdHRwRmFjdG9yeSBmcm9tICcuLi9hcHAvSHR0cEZhY3RvcnknO1xuaW1wb3J0IFdlYlJlc3BvbnNlIGZyb20gJy4vV2ViUmVzcG9uc2UnO1xuaW1wb3J0IE91dHB1dEZpbHRlciBmcm9tICcuLi9hcHAvZmlsdGVycy9PdXRwdXRGaWx0ZXInO1xuaW1wb3J0IEFjdGlvbiBmcm9tICcuLi9hcHAvcm91dGUvQWN0aW9uJztcblxuLyoqXG4gKiBXZWJIdHRwRmFjdG9yeVxuICovXG5jbGFzcyBXZWJIdHRwRmFjdG9yeSBleHRlbmRzIEh0dHBGYWN0b3J5IHtcblxuICAgIHJlc3BvbnNlKHJlcSwgcmVzLCBvdXRwdXQpIHtcblxuICAgICAgICBiZW9mKHsgcmVxIH0pLm9iamVjdCgpO1xuICAgICAgICBiZW9mKHsgcmVzIH0pLm9iamVjdCgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgV2ViUmVzcG9uc2UocmVxLCByZXMsIHRoaXMubW9kdWxlLCBvdXRwdXQpO1xuXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViSHR0cEZhY3RvcnlcbiJdfQ==