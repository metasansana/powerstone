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

            app.use((0, _cookieParser2.default)(config.read(config.keys.SECRET, config.defaults.SECRET), config.read(config.keys.FILTERS.cookie_parser, {})));
        }
    }]);

    return CookieFilter;
}();

exports.default = new CookieFilter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9Db29raWVGaWx0ZXIuanMiXSwibmFtZXMiOlsiQ29va2llRmlsdGVyIiwiYXBwIiwiY29uZmlnIiwidXNlIiwicmVhZCIsImtleXMiLCJTRUNSRVQiLCJkZWZhdWx0cyIsIkZJTFRFUlMiLCJjb29raWVfcGFyc2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztBQUVBOzs7O0lBSU1BLFk7Ozs7Ozs7OEJBRUlDLEcsRUFBS0MsTSxFQUFROztBQUVmRCxnQkFBSUUsR0FBSixDQUFRLDRCQUNKRCxPQUFPRSxJQUFQLENBQVlGLE9BQU9HLElBQVAsQ0FBWUMsTUFBeEIsRUFBZ0NKLE9BQU9LLFFBQVAsQ0FBZ0JELE1BQWhELENBREksRUFFSkosT0FBT0UsSUFBUCxDQUFZRixPQUFPRyxJQUFQLENBQVlHLE9BQVosQ0FBb0JDLGFBQWhDLEVBQStDLEVBQS9DLENBRkksQ0FBUjtBQUtIOzs7Ozs7a0JBS1UsSUFBSVQsWUFBSixFIiwiZmlsZSI6IkNvb2tpZUZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5cbi8qKlxuICogQ29va2llRmlsdGVyIFxuICogQGltcGxlbWVudHMge0ZpbHRlcn1cbiAqL1xuY2xhc3MgQ29va2llRmlsdGVyIHtcblxuICAgIGFwcGx5KGFwcCwgY29uZmlnKSB7XG5cbiAgICAgICAgYXBwLnVzZShjb29raWVQYXJzZXIoXG4gICAgICAgICAgICBjb25maWcucmVhZChjb25maWcua2V5cy5TRUNSRVQsIGNvbmZpZy5kZWZhdWx0cy5TRUNSRVQpLFxuICAgICAgICAgICAgY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSUy5jb29raWVfcGFyc2VyLCB7fSlcbiAgICAgICAgKSk7XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQ29va2llRmlsdGVyKClcbiJdfQ==