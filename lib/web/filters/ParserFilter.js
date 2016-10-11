'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ParserFilter 
 * @implements {Filter}
 * TODO multipart/form-data support
 */
var ParserFilter = function () {
    function ParserFilter() {
        _classCallCheck(this, ParserFilter);
    }

    _createClass(ParserFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            if (config.read(config.keys.FILTERS_PARSER_JSON_ENABLED, true)) app.use(_bodyParser2.default.json(config.keys.FILTERS_PARSER_JSON_OPTIONS, null));

            if (config.read(config.keys.FILTERS_PARSER_URLENCODED_ENABLED, true)) app.use(_bodyParser2.default.urlencoded(config.read(config.keys.FILTERS_PARSER_URLENCODED_OPTIONS, {
                extended: true
            })));

            if (config.read(config.keys.FILTERS_PARSER_RAW_ENABLED, false)) app.use(_bodyParser2.default.raw(config.keys.FILTERS_PARSER_RAW_OPTIONS, null));

            if (config.read(config.keys.FILTERS_PARSER_TEXT_ENABLED, false)) app.use(_bodyParser2.default.text(config.keys.FILTERS_PARSER_TEXT_OPTIONS, null));
        }
    }]);

    return ParserFilter;
}();

exports.default = new ParserFilter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9QYXJzZXJGaWx0ZXIuanMiXSwibmFtZXMiOlsiUGFyc2VyRmlsdGVyIiwiYXBwIiwiY29uZmlnIiwicmVhZCIsImtleXMiLCJGSUxURVJTX1BBUlNFUl9KU09OX0VOQUJMRUQiLCJ1c2UiLCJqc29uIiwiRklMVEVSU19QQVJTRVJfSlNPTl9PUFRJT05TIiwiRklMVEVSU19QQVJTRVJfVVJMRU5DT0RFRF9FTkFCTEVEIiwidXJsZW5jb2RlZCIsIkZJTFRFUlNfUEFSU0VSX1VSTEVOQ09ERURfT1BUSU9OUyIsImV4dGVuZGVkIiwiRklMVEVSU19QQVJTRVJfUkFXX0VOQUJMRUQiLCJyYXciLCJGSUxURVJTX1BBUlNFUl9SQVdfT1BUSU9OUyIsIkZJTFRFUlNfUEFSU0VSX1RFWFRfRU5BQkxFRCIsInRleHQiLCJGSUxURVJTX1BBUlNFUl9URVhUX09QVElPTlMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7Ozs7O0lBS01BLFk7Ozs7Ozs7OEJBRUlDLEcsRUFBS0MsTSxFQUFROztBQUVmLGdCQUFJQSxPQUFPQyxJQUFQLENBQVlELE9BQU9FLElBQVAsQ0FBWUMsMkJBQXhCLEVBQXFELElBQXJELENBQUosRUFDSUosSUFBSUssR0FBSixDQUFRLHFCQUFPQyxJQUFQLENBQVlMLE9BQU9FLElBQVAsQ0FBWUksMkJBQXhCLEVBQXFELElBQXJELENBQVI7O0FBRUosZ0JBQUlOLE9BQU9DLElBQVAsQ0FBWUQsT0FBT0UsSUFBUCxDQUFZSyxpQ0FBeEIsRUFBMkQsSUFBM0QsQ0FBSixFQUNJUixJQUFJSyxHQUFKLENBQVEscUJBQU9JLFVBQVAsQ0FBa0JSLE9BQU9DLElBQVAsQ0FBWUQsT0FBT0UsSUFBUCxDQUFZTyxpQ0FBeEIsRUFBMkQ7QUFDakZDLDBCQUFVO0FBRHVFLGFBQTNELENBQWxCLENBQVI7O0FBSUosZ0JBQUlWLE9BQU9DLElBQVAsQ0FBWUQsT0FBT0UsSUFBUCxDQUFZUywwQkFBeEIsRUFBb0QsS0FBcEQsQ0FBSixFQUNJWixJQUFJSyxHQUFKLENBQVEscUJBQU9RLEdBQVAsQ0FBV1osT0FBT0UsSUFBUCxDQUFZVywwQkFBdkIsRUFBbUQsSUFBbkQsQ0FBUjs7QUFFSixnQkFBSWIsT0FBT0MsSUFBUCxDQUFZRCxPQUFPRSxJQUFQLENBQVlZLDJCQUF4QixFQUFxRCxLQUFyRCxDQUFKLEVBQ0lmLElBQUlLLEdBQUosQ0FBUSxxQkFBT1csSUFBUCxDQUFZZixPQUFPRSxJQUFQLENBQVljLDJCQUF4QixFQUFxRCxJQUFyRCxDQUFSO0FBSVA7Ozs7OztrQkFJVSxJQUFJbEIsWUFBSixFIiwiZmlsZSI6IlBhcnNlckZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuXG4vKipcbiAqIFBhcnNlckZpbHRlciBcbiAqIEBpbXBsZW1lbnRzIHtGaWx0ZXJ9XG4gKiBUT0RPIG11bHRpcGFydC9mb3JtLWRhdGEgc3VwcG9ydFxuICovXG5jbGFzcyBQYXJzZXJGaWx0ZXIge1xuXG4gICAgYXBwbHkoYXBwLCBjb25maWcpIHtcblxuICAgICAgICBpZiAoY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19QQVJTRVJfSlNPTl9FTkFCTEVELCB0cnVlKSlcbiAgICAgICAgICAgIGFwcC51c2UocGFyc2VyLmpzb24oY29uZmlnLmtleXMuRklMVEVSU19QQVJTRVJfSlNPTl9PUFRJT05TLCBudWxsKSlcblxuICAgICAgICBpZiAoY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19QQVJTRVJfVVJMRU5DT0RFRF9FTkFCTEVELCB0cnVlKSlcbiAgICAgICAgICAgIGFwcC51c2UocGFyc2VyLnVybGVuY29kZWQoY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19QQVJTRVJfVVJMRU5DT0RFRF9PUFRJT05TLCB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kZWQ6IHRydWVcbiAgICAgICAgICAgIH0pKSlcblxuICAgICAgICBpZiAoY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19QQVJTRVJfUkFXX0VOQUJMRUQsIGZhbHNlKSlcbiAgICAgICAgICAgIGFwcC51c2UocGFyc2VyLnJhdyhjb25maWcua2V5cy5GSUxURVJTX1BBUlNFUl9SQVdfT1BUSU9OUywgbnVsbCkpXG5cbiAgICAgICAgaWYgKGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfUEFSU0VSX1RFWFRfRU5BQkxFRCwgZmFsc2UpKVxuICAgICAgICAgICAgYXBwLnVzZShwYXJzZXIudGV4dChjb25maWcua2V5cy5GSUxURVJTX1BBUlNFUl9URVhUX09QVElPTlMsIG51bGwpKVxuXG5cblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUGFyc2VyRmlsdGVyKClcbiJdfQ==