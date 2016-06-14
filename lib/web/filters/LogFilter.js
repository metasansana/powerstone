'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

/**
 * LogFilter 
 * @implements {Filter}
 */

var LogFilter = (function () {
    function LogFilter() {
        _classCallCheck(this, LogFilter);
    }

    _createClass(LogFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            if (config.read(config.keys.FILTERS_LOG_ENABLED, true)) app.use((0, _morgan2['default'])(config.read(config.keys.FILTERS_LOG_FORMAT, 'dev'), config.read(config.keys.FILTERS_LOG_OPTIONS, {})));
        }
    }]);

    return LogFilter;
})();

exports['default'] = new LogFilter();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9Mb2dGaWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3NCQUFtQixRQUFROzs7Ozs7Ozs7SUFNckIsU0FBUzthQUFULFNBQVM7OEJBQVQsU0FBUzs7O2lCQUFULFNBQVM7O2VBRU4sZUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFOztBQUVmLGdCQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsRUFDbEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyx5QkFBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLEVBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FFOUQ7OztXQVJDLFNBQVM7OztxQkFZQSxJQUFJLFNBQVMsRUFBRSIsImZpbGUiOiJMb2dGaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5cbi8qKlxuICogTG9nRmlsdGVyIFxuICogQGltcGxlbWVudHMge0ZpbHRlcn1cbiAqL1xuY2xhc3MgTG9nRmlsdGVyIHtcblxuICAgIGFwcGx5KGFwcCwgY29uZmlnKSB7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfTE9HX0VOQUJMRUQsIHRydWUpKVxuICAgICAgICAgICAgYXBwLnVzZShtb3JnYW4oY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19MT0dfRk9STUFULCAnZGV2JyksXG4gICAgICAgICAgICAgICAgY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19MT0dfT1BUSU9OUywge30pKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IExvZ0ZpbHRlcigpXG4iXX0=