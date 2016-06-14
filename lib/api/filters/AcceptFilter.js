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
 * AcceptParser 
 * @implements {Filter}
 */

var AcceptParser = (function () {
    function AcceptParser() {
        _classCallCheck(this, AcceptParser);
    }

    _createClass(AcceptParser, [{
        key: 'filter',
        value: function filter(app, config) {
            app.use(_restify2['default'].acceptParser(app.acceptable));
        }
    }]);

    return AcceptParser;
})();

exports['default'] = new AcceptParser();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9BY2NlcHRGaWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3VCQUFvQixTQUFTOzs7Ozs7Ozs7SUFNdkIsWUFBWTthQUFaLFlBQVk7OEJBQVosWUFBWTs7O2lCQUFaLFlBQVk7O2VBRVIsZ0JBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNoQixlQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFRLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUNqRDs7O1dBSkMsWUFBWTs7O3FCQVFILElBQUksWUFBWSxFQUFFIiwiZmlsZSI6IkFjY2VwdEZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXN0aWZ5IGZyb20gJ3Jlc3RpZnknO1xuXG4vKipcbiAqIEFjY2VwdFBhcnNlciBcbiAqIEBpbXBsZW1lbnRzIHtGaWx0ZXJ9XG4gKi9cbmNsYXNzIEFjY2VwdFBhcnNlciB7XG5cbiAgICBmaWx0ZXIoYXBwLCBjb25maWcpIHtcbiAgICAgICAgYXBwLnVzZShyZXN0aWZ5LmFjY2VwdFBhcnNlcihhcHAuYWNjZXB0YWJsZSkpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQWNjZXB0UGFyc2VyKClcbiJdfQ==