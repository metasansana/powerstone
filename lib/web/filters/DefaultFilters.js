'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

/**
 * DefaultFilters 
 */

var DefaultFilters = (function () {
    function DefaultFilters() {
        _classCallCheck(this, DefaultFilters);
    }

    _createClass(DefaultFilters, [{
        key: 'apply',
        value: function apply(app, config) {

            _MethodOverrideFilter2['default'].apply(app, config);
            _LogFilter2['default'].apply(app, config);
            _ParserFilter2['default'].apply(app, config);
            _CookieFilter2['default'].apply(app, config);
            _SessionFilter2['default'].apply(app, config);
            _CsrfFilter2['default'].apply(app, config);
            _AssetFilter2['default'].apply(app, config);
        }
    }]);

    return DefaultFilters;
})();

exports['default'] = new DefaultFilters();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9EZWZhdWx0RmlsdGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7b0NBQWlDLHdCQUF3Qjs7Ozt5QkFDbkMsYUFBYTs7Ozs0QkFDVixnQkFBZ0I7Ozs7NkJBQ2YsaUJBQWlCOzs7OzBCQUNwQixjQUFjOzs7OzRCQUNaLGdCQUFnQjs7OzsyQkFDakIsZUFBZTs7Ozs7Ozs7SUFLakMsY0FBYzthQUFkLGNBQWM7OEJBQWQsY0FBYzs7O2lCQUFkLGNBQWM7O2VBRVgsZUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFOztBQUVmLDhDQUFxQixLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLG1DQUFVLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDN0Isc0NBQWEsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoQyxzQ0FBYSxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLHVDQUFjLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDakMsb0NBQVcsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM5QixxQ0FBWSxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBRWxDOzs7V0FaQyxjQUFjOzs7cUJBZ0JMLElBQUksY0FBYyxFQUFFIiwiZmlsZSI6IkRlZmF1bHRGaWx0ZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1ldGhvZE92ZXJyaWRlRmlsdGVyIGZyb20gJy4vTWV0aG9kT3ZlcnJpZGVGaWx0ZXInO1xuaW1wb3J0IExvZ0ZpbHRlciBmcm9tICcuL0xvZ0ZpbHRlcic7XG5pbXBvcnQgQ29va2llRmlsdGVyIGZyb20gJy4vQ29va2llRmlsdGVyJztcbmltcG9ydCBTZXNzaW9uRmlsdGVyIGZyb20gJy4vU2Vzc2lvbkZpbHRlcic7XG5pbXBvcnQgQ3NyZkZpbHRlciBmcm9tICcuL0NzcmZGaWx0ZXInO1xuaW1wb3J0IFBhcnNlckZpbHRlciBmcm9tICcuL1BhcnNlckZpbHRlcic7XG5pbXBvcnQgQXNzZXRGaWx0ZXIgZnJvbSAnLi9Bc3NldEZpbHRlcic7XG5cbi8qKlxuICogRGVmYXVsdEZpbHRlcnMgXG4gKi9cbmNsYXNzIERlZmF1bHRGaWx0ZXJzIHtcblxuICAgIGFwcGx5KGFwcCwgY29uZmlnKSB7XG5cbiAgICAgICAgTWV0aG9kT3ZlcnJpZGVGaWx0ZXIuYXBwbHkoYXBwLCBjb25maWcpO1xuICAgICAgICBMb2dGaWx0ZXIuYXBwbHkoYXBwLCBjb25maWcpO1xuICAgICAgICBQYXJzZXJGaWx0ZXIuYXBwbHkoYXBwLCBjb25maWcpO1xuICAgICAgICBDb29raWVGaWx0ZXIuYXBwbHkoYXBwLCBjb25maWcpO1xuICAgICAgICBTZXNzaW9uRmlsdGVyLmFwcGx5KGFwcCwgY29uZmlnKTtcbiAgICAgICAgQ3NyZkZpbHRlci5hcHBseShhcHAsIGNvbmZpZyk7XG4gICAgICAgIEFzc2V0RmlsdGVyLmFwcGx5KGFwcCwgY29uZmlnKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgRGVmYXVsdEZpbHRlcnMoKVxuIl19