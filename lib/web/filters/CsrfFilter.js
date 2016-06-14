'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _csurf = require('csurf');

var _csurf2 = _interopRequireDefault(_csurf);

/**
 * CsrfFilter 
 * @implements {Filter}
 */

var CsrfFilter = (function () {
    function CsrfFilter() {
        _classCallCheck(this, CsrfFilter);
    }

    _createClass(CsrfFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            if (config.read(config.keys.FILTERS_CSRF_ENABLED, false)) {

                app.use((0, _csurf2['default'])(config.read(config.keys.FILTERS_CSRF_OPTIONS, {
                    cookie: true
                })));

                app.use(function send_csrf_token(req, res, next) {

                    res.set('x-csrf-token', req.csrfToken());
                    res.cookie('x-csrf-token', req.csrfToken());
                    res.locals._csrf = req.csrfToken();
                    next();
                });

                //TODO allow client code to hook into this instead of this lame handler
                app.use(function if_csrf_error(err, req, res, next) {

                    if (err.code !== 'EBADCSRFTOKEN') return next(err);
                    res.status(403);
                    res.send('INVALID TOKEN');
                });
            }
        }
    }]);

    return CsrfFilter;
})();

exports['default'] = new CsrfFilter();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9Dc3JmRmlsdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztxQkFBaUIsT0FBTzs7Ozs7Ozs7O0lBTWxCLFVBQVU7YUFBVixVQUFVOzhCQUFWLFVBQVU7OztpQkFBVixVQUFVOztlQUVQLGVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTs7QUFFZixnQkFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLEVBQUU7O0FBRWxELG1CQUFHLENBQUMsR0FBRyxDQUFDLHdCQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtBQUN2RCwwQkFBTSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFTCxtQkFBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTs7QUFFN0MsdUJBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQ3pDLHVCQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUM1Qyx1QkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ25DLHdCQUFJLEVBQUUsQ0FBQztpQkFFVixDQUFDLENBQUM7OztBQUdILG1CQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTs7QUFFaEQsd0JBQUksR0FBRyxDQUFDLElBQUksS0FBSyxlQUFlLEVBQUUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsdUJBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEIsdUJBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBRTdCLENBQUMsQ0FBQzthQUVOO1NBQ0o7OztXQTdCSCxVQUFVOzs7cUJBZ0NHLElBQUksVUFBVSxFQUFFIiwiZmlsZSI6IkNzcmZGaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3NyZiBmcm9tICdjc3VyZic7XG5cbi8qKlxuICogQ3NyZkZpbHRlciBcbiAqIEBpbXBsZW1lbnRzIHtGaWx0ZXJ9XG4gKi9cbmNsYXNzIENzcmZGaWx0ZXIge1xuXG4gICAgYXBwbHkoYXBwLCBjb25maWcpIHtcblxuICAgICAgICBpZiAoY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19DU1JGX0VOQUJMRUQsIGZhbHNlKSkge1xuXG4gICAgICAgICAgICAgICAgYXBwLnVzZShjc3JmKGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfQ1NSRl9PUFRJT05TLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvb2tpZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pKSk7XG5cbiAgICAgICAgICAgICAgICBhcHAudXNlKGZ1bmN0aW9uIHNlbmRfY3NyZl90b2tlbihyZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZXQoJ3gtY3NyZi10b2tlbicsIHJlcS5jc3JmVG9rZW4oKSk7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5jb29raWUoJ3gtY3NyZi10b2tlbicsIHJlcS5jc3JmVG9rZW4oKSk7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5sb2NhbHMuX2NzcmYgPSByZXEuY3NyZlRva2VuKCk7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy9UT0RPIGFsbG93IGNsaWVudCBjb2RlIHRvIGhvb2sgaW50byB0aGlzIGluc3RlYWQgb2YgdGhpcyBsYW1lIGhhbmRsZXJcbiAgICAgICAgICAgICAgICBhcHAudXNlKGZ1bmN0aW9uIGlmX2NzcmZfZXJyb3IoZXJyLCByZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIuY29kZSAhPT0gJ0VCQURDU1JGVE9LRU4nKSByZXR1cm4gbmV4dChlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMyk7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKCdJTlZBTElEIFRPS0VOJyk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGRlZmF1bHQgbmV3IENzcmZGaWx0ZXIoKVxuIl19