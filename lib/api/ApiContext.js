'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Context2 = require('../app/Context');

var _Context3 = _interopRequireDefault(_Context2);

var _DefaultFilters = require('./filters/DefaultFilters');

var _DefaultFilters2 = _interopRequireDefault(_DefaultFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ApiContext is a class that stores a shared context between
 * modules and their submodules.
 */
var ApiContext = function (_Context) {
    _inherits(ApiContext, _Context);

    function ApiContext() {
        _classCallCheck(this, ApiContext);

        var _this = _possibleConstructorReturn(this, (ApiContext.__proto__ || Object.getPrototypeOf(ApiContext)).call(this));

        _this.filters = {
            default: _DefaultFilters2.default,
            public: {
                apply: function apply() {}
            }
        };

        return _this;
    }

    return ApiContext;
}(_Context3.default);

exports.default = ApiContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpQ29udGV4dC5qcyJdLCJuYW1lcyI6WyJBcGlDb250ZXh0IiwiZmlsdGVycyIsImRlZmF1bHQiLCJwdWJsaWMiLCJhcHBseSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7SUFJTUEsVTs7O0FBRUYsMEJBQWM7QUFBQTs7QUFBQTs7QUFJVixjQUFLQyxPQUFMLEdBQWU7QUFDWEMsNkNBRFc7QUFFWEMsb0JBQVE7QUFDSkMscUJBREksbUJBQ0ksQ0FBRTtBQUROO0FBRkcsU0FBZjs7QUFKVTtBQVdiOzs7OztrQkFJVUosVSIsImZpbGUiOiJBcGlDb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnRleHQgZnJvbSAnLi4vYXBwL0NvbnRleHQnO1xuaW1wb3J0IERlZmF1bHRGaWx0ZXJzIGZyb20gJy4vZmlsdGVycy9EZWZhdWx0RmlsdGVycyc7XG5cbi8qKlxuICogQXBpQ29udGV4dCBpcyBhIGNsYXNzIHRoYXQgc3RvcmVzIGEgc2hhcmVkIGNvbnRleHQgYmV0d2VlblxuICogbW9kdWxlcyBhbmQgdGhlaXIgc3VibW9kdWxlcy5cbiAqL1xuY2xhc3MgQXBpQ29udGV4dCBleHRlbmRzIENvbnRleHQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmZpbHRlcnMgPSB7XG4gICAgICAgICAgICBkZWZhdWx0OiBEZWZhdWx0RmlsdGVycyxcbiAgICAgICAgICAgIHB1YmxpYzoge1xuICAgICAgICAgICAgICAgIGFwcGx5KCkge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBcGlDb250ZXh0XG4iXX0=