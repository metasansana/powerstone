'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _csurf = require('csurf');

var _csurf2 = _interopRequireDefault(_csurf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * CsrfFilter 
 * @implements {Filter}
 */
var CsrfFilter = function () {
    function CsrfFilter() {
        _classCallCheck(this, CsrfFilter);
    }

    _createClass(CsrfFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            if (config.read(config.keys.FILTERS_CSRF_ENABLED, false)) {

                app.use((0, _csurf2.default)(config.read(config.keys.FILTERS_CSRF_OPTIONS, {
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
}();

exports.default = new CsrfFilter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9Dc3JmRmlsdGVyLmpzIl0sIm5hbWVzIjpbIkNzcmZGaWx0ZXIiLCJhcHAiLCJjb25maWciLCJyZWFkIiwia2V5cyIsIkZJTFRFUlNfQ1NSRl9FTkFCTEVEIiwidXNlIiwiRklMVEVSU19DU1JGX09QVElPTlMiLCJjb29raWUiLCJzZW5kX2NzcmZfdG9rZW4iLCJyZXEiLCJyZXMiLCJuZXh0Iiwic2V0IiwiY3NyZlRva2VuIiwibG9jYWxzIiwiX2NzcmYiLCJpZl9jc3JmX2Vycm9yIiwiZXJyIiwiY29kZSIsInN0YXR1cyIsInNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7Ozs7SUFJTUEsVTs7Ozs7Ozs4QkFFSUMsRyxFQUFLQyxNLEVBQVE7O0FBRWYsZ0JBQUlBLE9BQU9DLElBQVAsQ0FBWUQsT0FBT0UsSUFBUCxDQUFZQyxvQkFBeEIsRUFBOEMsS0FBOUMsQ0FBSixFQUEwRDs7QUFFbERKLG9CQUFJSyxHQUFKLENBQVEscUJBQUtKLE9BQU9DLElBQVAsQ0FBWUQsT0FBT0UsSUFBUCxDQUFZRyxvQkFBeEIsRUFBOEM7QUFDdkRDLDRCQUFRO0FBRCtDLGlCQUE5QyxDQUFMLENBQVI7O0FBSUFQLG9CQUFJSyxHQUFKLENBQVEsU0FBU0csZUFBVCxDQUF5QkMsR0FBekIsRUFBOEJDLEdBQTlCLEVBQW1DQyxJQUFuQyxFQUF5Qzs7QUFFN0NELHdCQUFJRSxHQUFKLENBQVEsY0FBUixFQUF3QkgsSUFBSUksU0FBSixFQUF4QjtBQUNBSCx3QkFBSUgsTUFBSixDQUFXLGNBQVgsRUFBMkJFLElBQUlJLFNBQUosRUFBM0I7QUFDQUgsd0JBQUlJLE1BQUosQ0FBV0MsS0FBWCxHQUFtQk4sSUFBSUksU0FBSixFQUFuQjtBQUNBRjtBQUVILGlCQVBEOztBQVNBO0FBQ0FYLG9CQUFJSyxHQUFKLENBQVEsU0FBU1csYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJSLEdBQTVCLEVBQWlDQyxHQUFqQyxFQUFzQ0MsSUFBdEMsRUFBNEM7O0FBRWhELHdCQUFJTSxJQUFJQyxJQUFKLEtBQWEsZUFBakIsRUFBa0MsT0FBT1AsS0FBS00sR0FBTCxDQUFQO0FBQ2xDUCx3QkFBSVMsTUFBSixDQUFXLEdBQVg7QUFDQVQsd0JBQUlVLElBQUosQ0FBUyxlQUFUO0FBRUgsaUJBTkQ7QUFRSDtBQUNKOzs7Ozs7a0JBR1UsSUFBSXJCLFVBQUosRSIsImZpbGUiOiJDc3JmRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNzcmYgZnJvbSAnY3N1cmYnO1xuXG4vKipcbiAqIENzcmZGaWx0ZXIgXG4gKiBAaW1wbGVtZW50cyB7RmlsdGVyfVxuICovXG5jbGFzcyBDc3JmRmlsdGVyIHtcblxuICAgIGFwcGx5KGFwcCwgY29uZmlnKSB7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfQ1NSRl9FTkFCTEVELCBmYWxzZSkpIHtcblxuICAgICAgICAgICAgICAgIGFwcC51c2UoY3NyZihjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX0NTUkZfT1BUSU9OUywge1xuICAgICAgICAgICAgICAgICAgICBjb29raWU6IHRydWVcbiAgICAgICAgICAgICAgICB9KSkpO1xuXG4gICAgICAgICAgICAgICAgYXBwLnVzZShmdW5jdGlvbiBzZW5kX2NzcmZfdG9rZW4ocmVxLCByZXMsIG5leHQpIHtcblxuICAgICAgICAgICAgICAgICAgICByZXMuc2V0KCd4LWNzcmYtdG9rZW4nLCByZXEuY3NyZlRva2VuKCkpO1xuICAgICAgICAgICAgICAgICAgICByZXMuY29va2llKCd4LWNzcmYtdG9rZW4nLCByZXEuY3NyZlRva2VuKCkpO1xuICAgICAgICAgICAgICAgICAgICByZXMubG9jYWxzLl9jc3JmID0gcmVxLmNzcmZUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vVE9ETyBhbGxvdyBjbGllbnQgY29kZSB0byBob29rIGludG8gdGhpcyBpbnN0ZWFkIG9mIHRoaXMgbGFtZSBoYW5kbGVyXG4gICAgICAgICAgICAgICAgYXBwLnVzZShmdW5jdGlvbiBpZl9jc3JmX2Vycm9yKGVyciwgcmVxLCByZXMsIG5leHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLmNvZGUgIT09ICdFQkFEQ1NSRlRPS0VOJykgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDMpO1xuICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCgnSU5WQUxJRCBUT0tFTicpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBkZWZhdWx0IG5ldyBDc3JmRmlsdGVyKClcbiJdfQ==