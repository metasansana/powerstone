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

var _AuditFilter = require('./AuditFilter');

var _AuditFilter2 = _interopRequireDefault(_AuditFilter);

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
            _AuditFilter2['default'].apply(app, config);
        }
    }]);

    return DefaultFilters;
})();

exports['default'] = new DefaultFilters();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9EZWZhdWx0RmlsdGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7NEJBQXlCLGdCQUFnQjs7OzttQ0FDVCx1QkFBdUI7Ozs7MkJBQy9CLGVBQWU7Ozs7Ozs7OztJQU1qQyxjQUFjO2FBQWQsY0FBYzs4QkFBZCxjQUFjOzs7aUJBQWQsY0FBYzs7ZUFFWCxlQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7O0FBRWYsc0NBQWEsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoQyxxQ0FBWSxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBRWxDOzs7V0FQQyxjQUFjOzs7cUJBV0wsSUFBSSxjQUFjLEVBQUUiLCJmaWxlIjoiRGVmYXVsdEZpbHRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFyc2VyRmlsdGVyIGZyb20gJy4vUGFyc2VyRmlsdGVyJztcbmltcG9ydCBBdXRob3JpemF0aW9uRmlsdGVyIGZyb20gJy4vQXV0aG9yaXphdGlvbkZpbHRlcic7XG5pbXBvcnQgQXVkaXRGaWx0ZXIgZnJvbSAnLi9BdWRpdEZpbHRlcic7XG5cbi8qKlxuICogRGVmYXVsdEZpbHRlcnMgaW5zdGFsbHMgdGhlIGRlZmF1bHQgZmlsdGVycyB3ZVxuICogdXNlIGZvciByZXN0aWZ5LiBJdCBjYW4gYmUgdXNlZCBhcyBhIHNob3J0Y3V0IGluIGNvbXBvc2luZyBmaWx0ZXIgcnVsZXMuXG4gKi9cbmNsYXNzIERlZmF1bHRGaWx0ZXJzIHtcblxuICAgIGFwcGx5KGFwcCwgY29uZmlnKSB7XG5cbiAgICAgICAgUGFyc2VyRmlsdGVyLmFwcGx5KGFwcCwgY29uZmlnKTtcbiAgICAgICAgQXVkaXRGaWx0ZXIuYXBwbHkoYXBwLCBjb25maWcpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBEZWZhdWx0RmlsdGVycygpO1xuIl19