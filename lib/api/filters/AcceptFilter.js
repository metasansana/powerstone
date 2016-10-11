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
 * AcceptParser 
 * @implements {Filter}
 */
var AcceptParser = function () {
    function AcceptParser() {
        _classCallCheck(this, AcceptParser);
    }

    _createClass(AcceptParser, [{
        key: 'filter',
        value: function filter(app, config) {
            app.use(_restify2.default.acceptParser(app.acceptable));
        }
    }]);

    return AcceptParser;
}();

exports.default = new AcceptParser();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9BY2NlcHRGaWx0ZXIuanMiXSwibmFtZXMiOlsiQWNjZXB0UGFyc2VyIiwiYXBwIiwiY29uZmlnIiwidXNlIiwiYWNjZXB0UGFyc2VyIiwiYWNjZXB0YWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTs7OztJQUlNQSxZOzs7Ozs7OytCQUVLQyxHLEVBQUtDLE0sRUFBUTtBQUNoQkQsZ0JBQUlFLEdBQUosQ0FBUSxrQkFBUUMsWUFBUixDQUFxQkgsSUFBSUksVUFBekIsQ0FBUjtBQUNIOzs7Ozs7a0JBSVUsSUFBSUwsWUFBSixFIiwiZmlsZSI6IkFjY2VwdEZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXN0aWZ5IGZyb20gJ3Jlc3RpZnknO1xuXG4vKipcbiAqIEFjY2VwdFBhcnNlciBcbiAqIEBpbXBsZW1lbnRzIHtGaWx0ZXJ9XG4gKi9cbmNsYXNzIEFjY2VwdFBhcnNlciB7XG5cbiAgICBmaWx0ZXIoYXBwLCBjb25maWcpIHtcbiAgICAgICAgYXBwLnVzZShyZXN0aWZ5LmFjY2VwdFBhcnNlcihhcHAuYWNjZXB0YWJsZSkpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQWNjZXB0UGFyc2VyKClcbiJdfQ==