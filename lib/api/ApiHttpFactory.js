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
        value: function response(req, res, output) {

            (0, _beof2.default)({ req: req }).object();
            (0, _beof2.default)({ res: res }).object();

            return new _ApiResponse2.default(req, res, this.module, output);
        }
    }]);

    return ApiHttpFactory;
}(_HttpFactory3.default);

exports.default = ApiHttpFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpSHR0cEZhY3RvcnkuanMiXSwibmFtZXMiOlsiQXBpSHR0cEZhY3RvcnkiLCJyZXEiLCJyZXMiLCJvdXRwdXQiLCJvYmplY3QiLCJtb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01BLGM7Ozs7Ozs7Ozs7O2lDQUVPQyxHLEVBQUtDLEcsRUFBS0MsTSxFQUFROztBQUV2QixnQ0FBSyxFQUFFRixRQUFGLEVBQUwsRUFBY0csTUFBZDtBQUNBLGdDQUFLLEVBQUVGLFFBQUYsRUFBTCxFQUFjRSxNQUFkOztBQUVBLG1CQUFPLDBCQUFnQkgsR0FBaEIsRUFBcUJDLEdBQXJCLEVBQTBCLEtBQUtHLE1BQS9CLEVBQXVDRixNQUF2QyxDQUFQO0FBRUg7Ozs7OztrQkFJVUgsYyIsImZpbGUiOiJBcGlIdHRwRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IEh0dHBGYWN0b3J5IGZyb20gJy4uL2FwcC9IdHRwRmFjdG9yeSc7XG5pbXBvcnQgQXBpUmVzcG9uc2UgZnJvbSAnLi9BcGlSZXNwb25zZSc7XG5cbi8qKlxuICogQXBpSHR0cEZhY3RvcnlcbiAqL1xuY2xhc3MgQXBpSHR0cEZhY3RvcnkgZXh0ZW5kcyBIdHRwRmFjdG9yeSB7XG5cbiAgICByZXNwb25zZShyZXEsIHJlcywgb3V0cHV0KSB7XG5cbiAgICAgICAgYmVvZih7IHJlcSB9KS5vYmplY3QoKTtcbiAgICAgICAgYmVvZih7IHJlcyB9KS5vYmplY3QoKTtcblxuICAgICAgICByZXR1cm4gbmV3IEFwaVJlc3BvbnNlKHJlcSwgcmVzLCB0aGlzLm1vZHVsZSwgb3V0cHV0KTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBcGlIdHRwRmFjdG9yeVxuIl19