'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MethodOverrideFilter = require('./MethodOverrideFilter');

var _MethodOverrideFilter2 = _interopRequireDefault(_MethodOverrideFilter);

var _LogFilter = require('./LogFilter');

var _LogFilter2 = _interopRequireDefault(_LogFilter);

var _CookieFilter = require('./CookieFilter');

var _CookieFilter2 = _interopRequireDefault(_CookieFilter);

var _SessionFilter = require('./SessionFilter');

var _SessionFilter2 = _interopRequireDefault(_SessionFilter);

var _CsrfFilter = require('./CsrfFilter');

var _CsrfFilter2 = _interopRequireDefault(_CsrfFilter);

var _ParserFilter = require('./ParserFilter');

var _ParserFilter2 = _interopRequireDefault(_ParserFilter);

var _AssetFilter = require('./AssetFilter');

var _AssetFilter2 = _interopRequireDefault(_AssetFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * DefaultFilters
 */
var DefaultFilters = function () {
    function DefaultFilters() {
        _classCallCheck(this, DefaultFilters);
    }

    _createClass(DefaultFilters, [{
        key: 'apply',
        value: function apply(app, config) {

            _MethodOverrideFilter2.default.apply(app, config);
            _LogFilter2.default.apply(app, config);
            _ParserFilter2.default.apply(app, config);
            _CookieFilter2.default.apply(app, config);
            _SessionFilter2.default.apply(app, config);
            _AssetFilter2.default.apply(app, config);
            _CsrfFilter2.default.apply(app, config);
        }
    }]);

    return DefaultFilters;
}();

exports.default = new DefaultFilters();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9EZWZhdWx0RmlsdGVycy5qcyJdLCJuYW1lcyI6WyJEZWZhdWx0RmlsdGVycyIsImFwcCIsImNvbmZpZyIsImFwcGx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7SUFHTUEsYzs7Ozs7Ozs4QkFFSUMsRyxFQUFLQyxNLEVBQVE7O0FBRWYsMkNBQXFCQyxLQUFyQixDQUEyQkYsR0FBM0IsRUFBZ0NDLE1BQWhDO0FBQ0EsZ0NBQVVDLEtBQVYsQ0FBZ0JGLEdBQWhCLEVBQXFCQyxNQUFyQjtBQUNBLG1DQUFhQyxLQUFiLENBQW1CRixHQUFuQixFQUF3QkMsTUFBeEI7QUFDQSxtQ0FBYUMsS0FBYixDQUFtQkYsR0FBbkIsRUFBd0JDLE1BQXhCO0FBQ0Esb0NBQWNDLEtBQWQsQ0FBb0JGLEdBQXBCLEVBQXlCQyxNQUF6QjtBQUNBLGtDQUFZQyxLQUFaLENBQWtCRixHQUFsQixFQUF1QkMsTUFBdkI7QUFDQSxpQ0FBV0MsS0FBWCxDQUFpQkYsR0FBakIsRUFBc0JDLE1BQXRCO0FBRUg7Ozs7OztrQkFJVSxJQUFJRixjQUFKLEUiLCJmaWxlIjoiRGVmYXVsdEZpbHRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWV0aG9kT3ZlcnJpZGVGaWx0ZXIgZnJvbSAnLi9NZXRob2RPdmVycmlkZUZpbHRlcic7XG5pbXBvcnQgTG9nRmlsdGVyIGZyb20gJy4vTG9nRmlsdGVyJztcbmltcG9ydCBDb29raWVGaWx0ZXIgZnJvbSAnLi9Db29raWVGaWx0ZXInO1xuaW1wb3J0IFNlc3Npb25GaWx0ZXIgZnJvbSAnLi9TZXNzaW9uRmlsdGVyJztcbmltcG9ydCBDc3JmRmlsdGVyIGZyb20gJy4vQ3NyZkZpbHRlcic7XG5pbXBvcnQgUGFyc2VyRmlsdGVyIGZyb20gJy4vUGFyc2VyRmlsdGVyJztcbmltcG9ydCBBc3NldEZpbHRlciBmcm9tICcuL0Fzc2V0RmlsdGVyJztcblxuLyoqXG4gKiBEZWZhdWx0RmlsdGVyc1xuICovXG5jbGFzcyBEZWZhdWx0RmlsdGVycyB7XG5cbiAgICBhcHBseShhcHAsIGNvbmZpZykge1xuXG4gICAgICAgIE1ldGhvZE92ZXJyaWRlRmlsdGVyLmFwcGx5KGFwcCwgY29uZmlnKTtcbiAgICAgICAgTG9nRmlsdGVyLmFwcGx5KGFwcCwgY29uZmlnKTtcbiAgICAgICAgUGFyc2VyRmlsdGVyLmFwcGx5KGFwcCwgY29uZmlnKTtcbiAgICAgICAgQ29va2llRmlsdGVyLmFwcGx5KGFwcCwgY29uZmlnKTtcbiAgICAgICAgU2Vzc2lvbkZpbHRlci5hcHBseShhcHAsIGNvbmZpZyk7XG4gICAgICAgIEFzc2V0RmlsdGVyLmFwcGx5KGFwcCwgY29uZmlnKTtcbiAgICAgICAgQ3NyZkZpbHRlci5hcHBseShhcHAsIGNvbmZpZyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IERlZmF1bHRGaWx0ZXJzKClcbiJdfQ==