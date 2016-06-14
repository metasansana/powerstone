'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

/**
 * GzipFilter 
 * @implements {Filter}
 */

var GzipFilter = (function () {
  function GzipFilter() {
    _classCallCheck(this, GzipFilter);
  }

  _createClass(GzipFilter, [{
    key: 'apply',
    value: function apply(app, config) {

      app.use(_restify2['default'].gzipResponse());
    }
  }]);

  return GzipFilter;
})();

exports['default'] = new GzipFilter();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9HemlwRmlsdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt1QkFBb0IsU0FBUzs7Ozs7Ozs7O0lBTXZCLFVBQVU7V0FBVixVQUFVOzBCQUFWLFVBQVU7OztlQUFWLFVBQVU7O1dBRVQsZUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFOztBQUVqQixTQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFRLFlBQVksRUFBRSxDQUFDLENBQUM7S0FFakM7OztTQU5HLFVBQVU7OztxQkFVRCxJQUFJLFVBQVUsRUFBRSIsImZpbGUiOiJHemlwRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc3RpZnkgZnJvbSAncmVzdGlmeSc7XG5cbi8qKlxuICogR3ppcEZpbHRlciBcbiAqIEBpbXBsZW1lbnRzIHtGaWx0ZXJ9XG4gKi9cbmNsYXNzIEd6aXBGaWx0ZXIge1xuXG4gIGFwcGx5KGFwcCwgY29uZmlnKSB7XG5cbiAgICBhcHAudXNlKHJlc3RpZnkuZ3ppcFJlc3BvbnNlKCkpO1xuXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgR3ppcEZpbHRlcigpXG5cbiJdfQ==