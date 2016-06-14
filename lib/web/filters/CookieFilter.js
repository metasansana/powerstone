'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

/**
 * CookieFilter 
 * @implements {Filter}
 */

var CookieFilter = (function () {
  function CookieFilter() {
    _classCallCheck(this, CookieFilter);
  }

  _createClass(CookieFilter, [{
    key: 'apply',
    value: function apply(app, config) {

      app.use((0, _cookieParser2['default'])(config.read(config.keys.SECRET, config.defaults.SECRET)));
    }
  }]);

  return CookieFilter;
})();

exports['default'] = new CookieFilter();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9Db29raWVGaWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzRCQUF5QixlQUFlOzs7Ozs7Ozs7SUFNbEMsWUFBWTtXQUFaLFlBQVk7MEJBQVosWUFBWTs7O2VBQVosWUFBWTs7V0FFWCxlQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7O0FBRWpCLFNBQUcsQ0FBQyxHQUFHLENBQUMsK0JBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUVoRjs7O1NBTkcsWUFBWTs7O3FCQVdILElBQUksWUFBWSxFQUFFIiwiZmlsZSI6IkNvb2tpZUZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5cbi8qKlxuICogQ29va2llRmlsdGVyIFxuICogQGltcGxlbWVudHMge0ZpbHRlcn1cbiAqL1xuY2xhc3MgQ29va2llRmlsdGVyIHtcblxuICBhcHBseShhcHAsIGNvbmZpZykge1xuXG4gICAgYXBwLnVzZShjb29raWVQYXJzZXIoY29uZmlnLnJlYWQoY29uZmlnLmtleXMuU0VDUkVULCBjb25maWcuZGVmYXVsdHMuU0VDUkVUKSkpO1xuXG4gIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBDb29raWVGaWx0ZXIoKVxuIl19