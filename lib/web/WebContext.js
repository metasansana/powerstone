'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Context2 = require('../app/Context');

var _Context3 = _interopRequireDefault(_Context2);

var _DefaultFilters = require('./filters/DefaultFilters');

var _DefaultFilters2 = _interopRequireDefault(_DefaultFilters);

var _AssetFilter = require('./filters/AssetFilter');

var _AssetFilter2 = _interopRequireDefault(_AssetFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebContext = function (_Context) {
    _inherits(WebContext, _Context);

    function WebContext() {
        _classCallCheck(this, WebContext);

        var _this = _possibleConstructorReturn(this, (WebContext.__proto__ || Object.getPrototypeOf(WebContext)).call(this));

        _this.filters = {
            default: _DefaultFilters2.default,
            public: _AssetFilter2.default
        };

        return _this;
    }

    return WebContext;
}(_Context3.default);

exports.default = WebContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViQ29udGV4dC5qcyJdLCJuYW1lcyI6WyJXZWJDb250ZXh0IiwiZmlsdGVycyIsImRlZmF1bHQiLCJwdWJsaWMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFU7OztBQUVGLDBCQUFjO0FBQUE7O0FBQUE7O0FBR1YsY0FBS0MsT0FBTCxHQUFlO0FBQ1hDLDZDQURXO0FBRVhDO0FBRlcsU0FBZjs7QUFIVTtBQVFiOzs7OztrQkFJVUgsVSIsImZpbGUiOiJXZWJDb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnRleHQgZnJvbSAnLi4vYXBwL0NvbnRleHQnO1xuaW1wb3J0IERlZmF1bHRGaWx0ZXJzIGZyb20gJy4vZmlsdGVycy9EZWZhdWx0RmlsdGVycyc7XG5pbXBvcnQgQXNzZXRGaWx0ZXIgZnJvbSAnLi9maWx0ZXJzL0Fzc2V0RmlsdGVyJztcblxuY2xhc3MgV2ViQ29udGV4dCBleHRlbmRzIENvbnRleHQgIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZmlsdGVycyA9IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IERlZmF1bHRGaWx0ZXJzLFxuICAgICAgICAgICAgcHVibGljOiBBc3NldEZpbHRlclxuICAgICAgICB9O1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYkNvbnRleHRcbiJdfQ==