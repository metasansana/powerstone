'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * CookieFilter
 * @implements {Filter}
 */
var CookieFilter = function () {
    function CookieFilter() {
        _classCallCheck(this, CookieFilter);
    }

    _createClass(CookieFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            app.use((0, _cookieParser2.default)(config.read(config.keys.SECRET, process.env.SECRET || config.defaults.SECRET), config.read(config.keys.FILTERS.cookie_parser, {})));
        }
    }]);

    return CookieFilter;
}();

exports.default = new CookieFilter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9Db29raWVGaWx0ZXIuanMiXSwibmFtZXMiOlsiQ29va2llRmlsdGVyIiwiYXBwIiwiY29uZmlnIiwidXNlIiwicmVhZCIsImtleXMiLCJTRUNSRVQiLCJwcm9jZXNzIiwiZW52IiwiZGVmYXVsdHMiLCJGSUxURVJTIiwiY29va2llX3BhcnNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTs7OztJQUlNQSxZOzs7Ozs7OzhCQUVJQyxHLEVBQUtDLE0sRUFBUTs7QUFFZkQsZ0JBQUlFLEdBQUosQ0FBUSw0QkFDSkQsT0FBT0UsSUFBUCxDQUFZRixPQUFPRyxJQUFQLENBQVlDLE1BQXhCLEVBQWdDQyxRQUFRQyxHQUFSLENBQVlGLE1BQVosSUFBc0JKLE9BQU9PLFFBQVAsQ0FBZ0JILE1BQXRFLENBREksRUFFSkosT0FBT0UsSUFBUCxDQUFZRixPQUFPRyxJQUFQLENBQVlLLE9BQVosQ0FBb0JDLGFBQWhDLEVBQStDLEVBQS9DLENBRkksQ0FBUjtBQUtIOzs7Ozs7a0JBS1UsSUFBSVgsWUFBSixFIiwiZmlsZSI6IkNvb2tpZUZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5cbi8qKlxuICogQ29va2llRmlsdGVyXG4gKiBAaW1wbGVtZW50cyB7RmlsdGVyfVxuICovXG5jbGFzcyBDb29raWVGaWx0ZXIge1xuXG4gICAgYXBwbHkoYXBwLCBjb25maWcpIHtcblxuICAgICAgICBhcHAudXNlKGNvb2tpZVBhcnNlcihcbiAgICAgICAgICAgIGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLlNFQ1JFVCwgcHJvY2Vzcy5lbnYuU0VDUkVUIHx8IGNvbmZpZy5kZWZhdWx0cy5TRUNSRVQpLFxuICAgICAgICAgICAgY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSUy5jb29raWVfcGFyc2VyLCB7fSlcbiAgICAgICAgKSk7XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQ29va2llRmlsdGVyKClcbiJdfQ==