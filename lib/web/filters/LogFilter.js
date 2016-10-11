'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * LogFilter 
 * @implements {Filter}
 */
var LogFilter = function () {
    function LogFilter() {
        _classCallCheck(this, LogFilter);
    }

    _createClass(LogFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            if (config.read(config.keys.FILTERS_LOG_ENABLED, true)) app.use((0, _morgan2.default)(config.read(config.keys.FILTERS_LOG_FORMAT, 'dev'), config.read(config.keys.FILTERS_LOG_OPTIONS, {})));
        }
    }]);

    return LogFilter;
}();

exports.default = new LogFilter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9Mb2dGaWx0ZXIuanMiXSwibmFtZXMiOlsiTG9nRmlsdGVyIiwiYXBwIiwiY29uZmlnIiwicmVhZCIsImtleXMiLCJGSUxURVJTX0xPR19FTkFCTEVEIiwidXNlIiwiRklMVEVSU19MT0dfRk9STUFUIiwiRklMVEVSU19MT0dfT1BUSU9OUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTs7OztJQUlNQSxTOzs7Ozs7OzhCQUVJQyxHLEVBQUtDLE0sRUFBUTs7QUFFZixnQkFBSUEsT0FBT0MsSUFBUCxDQUFZRCxPQUFPRSxJQUFQLENBQVlDLG1CQUF4QixFQUE2QyxJQUE3QyxDQUFKLEVBQ0lKLElBQUlLLEdBQUosQ0FBUSxzQkFBT0osT0FBT0MsSUFBUCxDQUFZRCxPQUFPRSxJQUFQLENBQVlHLGtCQUF4QixFQUE0QyxLQUE1QyxDQUFQLEVBQ0pMLE9BQU9DLElBQVAsQ0FBWUQsT0FBT0UsSUFBUCxDQUFZSSxtQkFBeEIsRUFBNkMsRUFBN0MsQ0FESSxDQUFSO0FBR1A7Ozs7OztrQkFJVSxJQUFJUixTQUFKLEUiLCJmaWxlIjoiTG9nRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuXG4vKipcbiAqIExvZ0ZpbHRlciBcbiAqIEBpbXBsZW1lbnRzIHtGaWx0ZXJ9XG4gKi9cbmNsYXNzIExvZ0ZpbHRlciB7XG5cbiAgICBhcHBseShhcHAsIGNvbmZpZykge1xuXG4gICAgICAgIGlmIChjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX0xPR19FTkFCTEVELCB0cnVlKSlcbiAgICAgICAgICAgIGFwcC51c2UobW9yZ2FuKGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfTE9HX0ZPUk1BVCwgJ2RldicpLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfTE9HX09QVElPTlMsIHt9KSkpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBMb2dGaWx0ZXIoKVxuIl19