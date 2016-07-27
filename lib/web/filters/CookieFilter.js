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

            app.use((0, _cookieParser2['default'])(config.read(config.keys.SECRET, config.defaults.SECRET), config.read(config.keys.FILTERS.cookie_parser, {})));
        }
    }]);

    return CookieFilter;
})();

exports['default'] = new CookieFilter();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9Db29raWVGaWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzRCQUF5QixlQUFlOzs7Ozs7Ozs7SUFNbEMsWUFBWTthQUFaLFlBQVk7OEJBQVosWUFBWTs7O2lCQUFaLFlBQVk7O2VBRVQsZUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFOztBQUVmLGVBQUcsQ0FBQyxHQUFHLENBQUMsK0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FDckQsQ0FBQyxDQUFDO1NBRU47OztXQVRDLFlBQVk7OztxQkFjSCxJQUFJLFlBQVksRUFBRSIsImZpbGUiOiJDb29raWVGaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuXG4vKipcbiAqIENvb2tpZUZpbHRlciBcbiAqIEBpbXBsZW1lbnRzIHtGaWx0ZXJ9XG4gKi9cbmNsYXNzIENvb2tpZUZpbHRlciB7XG5cbiAgICBhcHBseShhcHAsIGNvbmZpZykge1xuXG4gICAgICAgIGFwcC51c2UoY29va2llUGFyc2VyKFxuICAgICAgICAgICAgY29uZmlnLnJlYWQoY29uZmlnLmtleXMuU0VDUkVULCBjb25maWcuZGVmYXVsdHMuU0VDUkVUKSxcbiAgICAgICAgICAgIGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlMuY29va2llX3BhcnNlciwge30pXG4gICAgICAgICkpO1xuXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IENvb2tpZUZpbHRlcigpXG4iXX0=