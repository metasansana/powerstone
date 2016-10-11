'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ParserFilter 
 * @implements {Filter}
 */
var ParserFilter = function () {
    function ParserFilter() {
        _classCallCheck(this, ParserFilter);
    }

    _createClass(ParserFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            app.use(_restify2.default.bodyParser(config.read('power.filters.parser.body', { mapParams: false })));
            app.use(_restify2.default.queryParser({ mapParams: false }));
        }
    }]);

    return ParserFilter;
}();

exports.default = new ParserFilter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9QYXJzZXJGaWx0ZXIuanMiXSwibmFtZXMiOlsiUGFyc2VyRmlsdGVyIiwiYXBwIiwiY29uZmlnIiwidXNlIiwiYm9keVBhcnNlciIsInJlYWQiLCJtYXBQYXJhbXMiLCJxdWVyeVBhcnNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTs7OztJQUlNQSxZOzs7Ozs7OzhCQUVJQyxHLEVBQUtDLE0sRUFBUTs7QUFFZkQsZ0JBQUlFLEdBQUosQ0FBUSxrQkFBUUMsVUFBUixDQUFtQkYsT0FBT0csSUFBUCxDQUFZLDJCQUFaLEVBQXlDLEVBQUNDLFdBQVUsS0FBWCxFQUF6QyxDQUFuQixDQUFSO0FBQ0FMLGdCQUFJRSxHQUFKLENBQVEsa0JBQVFJLFdBQVIsQ0FBb0IsRUFBQ0QsV0FBVSxLQUFYLEVBQXBCLENBQVI7QUFFSDs7Ozs7O2tCQUlVLElBQUlOLFlBQUosRSIsImZpbGUiOiJQYXJzZXJGaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVzdGlmeSBmcm9tICdyZXN0aWZ5JztcblxuLyoqXG4gKiBQYXJzZXJGaWx0ZXIgXG4gKiBAaW1wbGVtZW50cyB7RmlsdGVyfVxuICovXG5jbGFzcyBQYXJzZXJGaWx0ZXIge1xuXG4gICAgYXBwbHkoYXBwLCBjb25maWcpIHtcblxuICAgICAgICBhcHAudXNlKHJlc3RpZnkuYm9keVBhcnNlcihjb25maWcucmVhZCgncG93ZXIuZmlsdGVycy5wYXJzZXIuYm9keScsIHttYXBQYXJhbXM6ZmFsc2V9KSkpO1xuICAgICAgICBhcHAudXNlKHJlc3RpZnkucXVlcnlQYXJzZXIoe21hcFBhcmFtczpmYWxzZX0pKTtcbiBcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFBhcnNlckZpbHRlcigpXG4iXX0=