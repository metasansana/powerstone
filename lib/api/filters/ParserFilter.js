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
 * ParserFilter 
 * @implements {Filter}
 */

var ParserFilter = (function () {
    function ParserFilter() {
        _classCallCheck(this, ParserFilter);
    }

    _createClass(ParserFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            app.use(_restify2['default'].bodyParser(config.read('power.filters.parser.body', { mapParams: false })));
            app.use(_restify2['default'].queryParser({ mapParams: false }));
        }
    }]);

    return ParserFilter;
})();

exports['default'] = new ParserFilter();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9QYXJzZXJGaWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3VCQUFvQixTQUFTOzs7Ozs7Ozs7SUFNdkIsWUFBWTthQUFaLFlBQVk7OEJBQVosWUFBWTs7O2lCQUFaLFlBQVk7O2VBRVQsZUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFOztBQUVmLGVBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekYsZUFBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBUSxXQUFXLENBQUMsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBRW5EOzs7V0FQQyxZQUFZOzs7cUJBV0gsSUFBSSxZQUFZLEVBQUUiLCJmaWxlIjoiUGFyc2VyRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc3RpZnkgZnJvbSAncmVzdGlmeSc7XG5cbi8qKlxuICogUGFyc2VyRmlsdGVyIFxuICogQGltcGxlbWVudHMge0ZpbHRlcn1cbiAqL1xuY2xhc3MgUGFyc2VyRmlsdGVyIHtcblxuICAgIGFwcGx5KGFwcCwgY29uZmlnKSB7XG5cbiAgICAgICAgYXBwLnVzZShyZXN0aWZ5LmJvZHlQYXJzZXIoY29uZmlnLnJlYWQoJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLmJvZHknLCB7bWFwUGFyYW1zOmZhbHNlfSkpKTtcbiAgICAgICAgYXBwLnVzZShyZXN0aWZ5LnF1ZXJ5UGFyc2VyKHttYXBQYXJhbXM6ZmFsc2V9KSk7XG4gXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBQYXJzZXJGaWx0ZXIoKVxuIl19