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

                var header = config.read(config.keys.FILTERS_CSRF_TOKEN_HEADER, 'x-csrf-token');
                var key = config.read(config.keys.FILTERS_CSRF_TOKEN_KEY, '_csrf');

                app.use((0, _csurf2.default)(config.read(config.keys.FILTERS_CSRF_OPTIONS, {}, {
                    cookie: true,
                    value: function value(req) {
                        return req.body[key] || req.query[key] || req.headers[header];
                    }
                })));

                app.use(function send_csrf_token(req, res, next) {

                    var tok = req.csrfToken();

                    res.set(header, tok);
                    res.cookie(header, tok);
                    res.locals[key] = tok;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9Dc3JmRmlsdGVyLmpzIl0sIm5hbWVzIjpbIkNzcmZGaWx0ZXIiLCJhcHAiLCJjb25maWciLCJyZWFkIiwia2V5cyIsIkZJTFRFUlNfQ1NSRl9FTkFCTEVEIiwiaGVhZGVyIiwiRklMVEVSU19DU1JGX1RPS0VOX0hFQURFUiIsImtleSIsIkZJTFRFUlNfQ1NSRl9UT0tFTl9LRVkiLCJ1c2UiLCJGSUxURVJTX0NTUkZfT1BUSU9OUyIsImNvb2tpZSIsInZhbHVlIiwicmVxIiwiYm9keSIsInF1ZXJ5IiwiaGVhZGVycyIsInNlbmRfY3NyZl90b2tlbiIsInJlcyIsIm5leHQiLCJ0b2siLCJjc3JmVG9rZW4iLCJzZXQiLCJsb2NhbHMiLCJpZl9jc3JmX2Vycm9yIiwiZXJyIiwiY29kZSIsInN0YXR1cyIsInNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7Ozs7SUFJTUEsVTs7Ozs7Ozs4QkFFSUMsRyxFQUFLQyxNLEVBQVE7O0FBRWYsZ0JBQUlBLE9BQU9DLElBQVAsQ0FBWUQsT0FBT0UsSUFBUCxDQUFZQyxvQkFBeEIsRUFBOEMsS0FBOUMsQ0FBSixFQUEwRDs7QUFFdEQsb0JBQUlDLFNBQVNKLE9BQU9DLElBQVAsQ0FBWUQsT0FBT0UsSUFBUCxDQUFZRyx5QkFBeEIsRUFBbUQsY0FBbkQsQ0FBYjtBQUNBLG9CQUFJQyxNQUFNTixPQUFPQyxJQUFQLENBQVlELE9BQU9FLElBQVAsQ0FBWUssc0JBQXhCLEVBQWdELE9BQWhELENBQVY7O0FBRUFSLG9CQUFJUyxHQUFKLENBQVEscUJBQUtSLE9BQU9DLElBQVAsQ0FBWUQsT0FBT0UsSUFBUCxDQUFZTyxvQkFBeEIsRUFBOEMsRUFBOUMsRUFBa0Q7QUFDM0RDLDRCQUFRLElBRG1EO0FBRTNEQywyQkFBTztBQUFBLCtCQUFPQyxJQUFJQyxJQUFKLENBQVNQLEdBQVQsS0FBaUJNLElBQUlFLEtBQUosQ0FBVVIsR0FBVixDQUFqQixJQUFtQ00sSUFBSUcsT0FBSixDQUFZWCxNQUFaLENBQTFDO0FBQUE7QUFGb0QsaUJBQWxELENBQUwsQ0FBUjs7QUFLQUwsb0JBQUlTLEdBQUosQ0FBUSxTQUFTUSxlQUFULENBQXlCSixHQUF6QixFQUE4QkssR0FBOUIsRUFBbUNDLElBQW5DLEVBQXlDOztBQUU3Qyx3QkFBSUMsTUFBTVAsSUFBSVEsU0FBSixFQUFWOztBQUVBSCx3QkFBSUksR0FBSixDQUFRakIsTUFBUixFQUFnQmUsR0FBaEI7QUFDQUYsd0JBQUlQLE1BQUosQ0FBV04sTUFBWCxFQUFtQmUsR0FBbkI7QUFDQUYsd0JBQUlLLE1BQUosQ0FBV2hCLEdBQVgsSUFBa0JhLEdBQWxCO0FBQ0FEO0FBRUgsaUJBVEQ7O0FBV0E7QUFDQW5CLG9CQUFJUyxHQUFKLENBQVEsU0FBU2UsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJaLEdBQTVCLEVBQWlDSyxHQUFqQyxFQUFzQ0MsSUFBdEMsRUFBNEM7O0FBRWhELHdCQUFJTSxJQUFJQyxJQUFKLEtBQWEsZUFBakIsRUFBa0MsT0FBT1AsS0FBS00sR0FBTCxDQUFQO0FBQ2xDUCx3QkFBSVMsTUFBSixDQUFXLEdBQVg7QUFDQVQsd0JBQUlVLElBQUosQ0FBUyxlQUFUO0FBRUgsaUJBTkQ7QUFRSDtBQUNKOzs7Ozs7a0JBR1UsSUFBSTdCLFVBQUosRSIsImZpbGUiOiJDc3JmRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNzcmYgZnJvbSAnY3N1cmYnO1xuXG4vKipcbiAqIENzcmZGaWx0ZXJcbiAqIEBpbXBsZW1lbnRzIHtGaWx0ZXJ9XG4gKi9cbmNsYXNzIENzcmZGaWx0ZXIge1xuXG4gICAgYXBwbHkoYXBwLCBjb25maWcpIHtcblxuICAgICAgICBpZiAoY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19DU1JGX0VOQUJMRUQsIGZhbHNlKSkge1xuXG4gICAgICAgICAgICB2YXIgaGVhZGVyID0gY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19DU1JGX1RPS0VOX0hFQURFUiwgJ3gtY3NyZi10b2tlbicpO1xuICAgICAgICAgICAgdmFyIGtleSA9IGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfQ1NSRl9UT0tFTl9LRVksICdfY3NyZicpO1xuXG4gICAgICAgICAgICBhcHAudXNlKGNzcmYoY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19DU1JGX09QVElPTlMsIHt9LCB7XG4gICAgICAgICAgICAgICAgY29va2llOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiByZXEgPT4gcmVxLmJvZHlba2V5XSB8fCByZXEucXVlcnlba2V5XSB8fCByZXEuaGVhZGVyc1toZWFkZXJdXG4gICAgICAgICAgICB9KSkpO1xuXG4gICAgICAgICAgICBhcHAudXNlKGZ1bmN0aW9uIHNlbmRfY3NyZl90b2tlbihyZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHRvayA9IHJlcS5jc3JmVG9rZW4oKTtcblxuICAgICAgICAgICAgICAgIHJlcy5zZXQoaGVhZGVyLCB0b2spO1xuICAgICAgICAgICAgICAgIHJlcy5jb29raWUoaGVhZGVyLCB0b2spO1xuICAgICAgICAgICAgICAgIHJlcy5sb2NhbHNba2V5XSA9IHRvaztcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL1RPRE8gYWxsb3cgY2xpZW50IGNvZGUgdG8gaG9vayBpbnRvIHRoaXMgaW5zdGVhZCBvZiB0aGlzIGxhbWUgaGFuZGxlclxuICAgICAgICAgICAgYXBwLnVzZShmdW5jdGlvbiBpZl9jc3JmX2Vycm9yKGVyciwgcmVxLCByZXMsIG5leHQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIuY29kZSAhPT0gJ0VCQURDU1JGVE9LRU4nKSByZXR1cm4gbmV4dChlcnIpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAzKTtcbiAgICAgICAgICAgICAgICByZXMuc2VuZCgnSU5WQUxJRCBUT0tFTicpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQ3NyZkZpbHRlcigpXG4iXX0=