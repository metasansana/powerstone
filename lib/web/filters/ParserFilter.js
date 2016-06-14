'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

/**
 * ParserFilter 
 * @implements {Filter}
 * TODO multipart/form-data support
 */

var ParserFilter = (function () {
    function ParserFilter() {
        _classCallCheck(this, ParserFilter);
    }

    _createClass(ParserFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            if (config.read(config.keys.FILTERS_PARSER_JSON_ENABLED, true)) app.use(_bodyParser2['default'].json(config.keys.FILTERS_PARSER_JSON_OPTIONS, null));

            if (config.read(config.keys.FILTERS_PARSER_URLENCODED_ENABLED, true)) app.use(_bodyParser2['default'].urlencoded(config.read(config.keys.FILTERS_PARSER_URLENCODED_OPTIONS, {
                extended: true
            })));

            if (config.read(config.keys.FILTERS_PARSER_RAW_ENABLED, false)) app.use(_bodyParser2['default'].raw(config.keys.FILTERS_PARSER_RAW_OPTIONS, null));

            if (config.read(config.keys.FILTERS_PARSER_TEXT_ENABLED, false)) app.use(_bodyParser2['default'].text(config.keys.FILTERS_PARSER_TEXT_OPTIONS, null));
        }
    }]);

    return ParserFilter;
})();

exports['default'] = new ParserFilter();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9QYXJzZXJGaWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzBCQUFtQixhQUFhOzs7Ozs7Ozs7O0lBTzFCLFlBQVk7YUFBWixZQUFZOzhCQUFaLFlBQVk7OztpQkFBWixZQUFZOztlQUVULGVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTs7QUFFZixnQkFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLEVBQzFELEdBQUcsQ0FBQyxHQUFHLENBQUMsd0JBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTs7QUFFdkUsZ0JBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLElBQUksQ0FBQyxFQUNoRSxHQUFHLENBQUMsR0FBRyxDQUFDLHdCQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUU7QUFDakYsd0JBQVEsRUFBRSxJQUFJO2FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRVIsZ0JBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLEtBQUssQ0FBQyxFQUMxRCxHQUFHLENBQUMsR0FBRyxDQUFDLHdCQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7O0FBRXJFLGdCQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxLQUFLLENBQUMsRUFDM0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyx3QkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO1NBSTFFOzs7V0FwQkMsWUFBWTs7O3FCQXdCSCxJQUFJLFlBQVksRUFBRSIsImZpbGUiOiJQYXJzZXJGaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcblxuLyoqXG4gKiBQYXJzZXJGaWx0ZXIgXG4gKiBAaW1wbGVtZW50cyB7RmlsdGVyfVxuICogVE9ETyBtdWx0aXBhcnQvZm9ybS1kYXRhIHN1cHBvcnRcbiAqL1xuY2xhc3MgUGFyc2VyRmlsdGVyIHtcblxuICAgIGFwcGx5KGFwcCwgY29uZmlnKSB7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfUEFSU0VSX0pTT05fRU5BQkxFRCwgdHJ1ZSkpXG4gICAgICAgICAgICBhcHAudXNlKHBhcnNlci5qc29uKGNvbmZpZy5rZXlzLkZJTFRFUlNfUEFSU0VSX0pTT05fT1BUSU9OUywgbnVsbCkpXG5cbiAgICAgICAgaWYgKGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfUEFSU0VSX1VSTEVOQ09ERURfRU5BQkxFRCwgdHJ1ZSkpXG4gICAgICAgICAgICBhcHAudXNlKHBhcnNlci51cmxlbmNvZGVkKGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfUEFSU0VSX1VSTEVOQ09ERURfT1BUSU9OUywge1xuICAgICAgICAgICAgICAgIGV4dGVuZGVkOiB0cnVlXG4gICAgICAgICAgICB9KSkpXG5cbiAgICAgICAgaWYgKGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfUEFSU0VSX1JBV19FTkFCTEVELCBmYWxzZSkpXG4gICAgICAgICAgICBhcHAudXNlKHBhcnNlci5yYXcoY29uZmlnLmtleXMuRklMVEVSU19QQVJTRVJfUkFXX09QVElPTlMsIG51bGwpKVxuXG4gICAgICAgIGlmIChjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX1BBUlNFUl9URVhUX0VOQUJMRUQsIGZhbHNlKSlcbiAgICAgICAgICAgIGFwcC51c2UocGFyc2VyLnRleHQoY29uZmlnLmtleXMuRklMVEVSU19QQVJTRVJfVEVYVF9PUFRJT05TLCBudWxsKSlcblxuXG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFBhcnNlckZpbHRlcigpXG4iXX0=