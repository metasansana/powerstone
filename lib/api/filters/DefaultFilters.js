'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ParserFilter = require('./ParserFilter');

var _ParserFilter2 = _interopRequireDefault(_ParserFilter);

var _AuthorizationFilter = require('./AuthorizationFilter');

var _AuthorizationFilter2 = _interopRequireDefault(_AuthorizationFilter);

/**
 * DefaultFilters installs the default filters we
 * use for restify. It can be used as a shortcut in composing filter rules.
 */

var DefaultFilters = (function () {
    function DefaultFilters() {
        _classCallCheck(this, DefaultFilters);
    }

    _createClass(DefaultFilters, [{
        key: 'apply',
        value: function apply(app, config) {

            _ParserFilter2['default'].apply(app, config);
        }
    }]);

    return DefaultFilters;
})();

exports['default'] = new DefaultFilters();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9EZWZhdWx0RmlsdGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7NEJBQXlCLGdCQUFnQjs7OzttQ0FDVCx1QkFBdUI7Ozs7Ozs7OztJQU1qRCxjQUFjO2FBQWQsY0FBYzs4QkFBZCxjQUFjOzs7aUJBQWQsY0FBYzs7ZUFFWCxlQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7O0FBRWYsc0NBQWEsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUVuQzs7O1dBTkMsY0FBYzs7O3FCQVVMLElBQUksY0FBYyxFQUFFIiwiZmlsZSI6IkRlZmF1bHRGaWx0ZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnNlckZpbHRlciBmcm9tICcuL1BhcnNlckZpbHRlcic7XG5pbXBvcnQgQXV0aG9yaXphdGlvbkZpbHRlciBmcm9tICcuL0F1dGhvcml6YXRpb25GaWx0ZXInO1xuXG4vKipcbiAqIERlZmF1bHRGaWx0ZXJzIGluc3RhbGxzIHRoZSBkZWZhdWx0IGZpbHRlcnMgd2VcbiAqIHVzZSBmb3IgcmVzdGlmeS4gSXQgY2FuIGJlIHVzZWQgYXMgYSBzaG9ydGN1dCBpbiBjb21wb3NpbmcgZmlsdGVyIHJ1bGVzLlxuICovXG5jbGFzcyBEZWZhdWx0RmlsdGVycyB7XG5cbiAgICBhcHBseShhcHAsIGNvbmZpZykge1xuXG4gICAgICAgIFBhcnNlckZpbHRlci5hcHBseShhcHAsIGNvbmZpZyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IERlZmF1bHRGaWx0ZXJzKCk7XG4iXX0=