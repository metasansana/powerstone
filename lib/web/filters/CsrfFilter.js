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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9Dc3JmRmlsdGVyLmpzIl0sIm5hbWVzIjpbIkNzcmZGaWx0ZXIiLCJhcHAiLCJjb25maWciLCJyZWFkIiwia2V5cyIsIkZJTFRFUlNfQ1NSRl9FTkFCTEVEIiwiaGVhZGVyIiwiRklMVEVSU19DU1JGX1RPS0VOX0hFQURFUiIsImtleSIsIkZJTFRFUlNfQ1NSRl9UT0tFTl9LRVkiLCJ1c2UiLCJGSUxURVJTX0NTUkZfT1BUSU9OUyIsImNvb2tpZSIsInZhbHVlIiwicmVxIiwiYm9keSIsInF1ZXJ5IiwiaGVhZGVycyIsInNlbmRfY3NyZl90b2tlbiIsInJlcyIsIm5leHQiLCJ0b2siLCJjc3JmVG9rZW4iLCJzZXQiLCJsb2NhbHMiLCJpZl9jc3JmX2Vycm9yIiwiZXJyIiwiY29kZSIsInN0YXR1cyIsInNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7Ozs7SUFJTUEsVTs7Ozs7Ozs4QkFFSUMsRyxFQUFLQyxNLEVBQVE7O0FBRWYsZ0JBQUlBLE9BQU9DLElBQVAsQ0FBWUQsT0FBT0UsSUFBUCxDQUFZQyxvQkFBeEIsRUFBOEMsS0FBOUMsQ0FBSixFQUEwRDs7QUFFdEQsb0JBQUlDLFNBQVNKLE9BQU9DLElBQVAsQ0FBWUQsT0FBT0UsSUFBUCxDQUFZRyx5QkFBeEIsRUFBbUQsY0FBbkQsQ0FBYjtBQUNBLG9CQUFJQyxNQUFNTixPQUFPQyxJQUFQLENBQVlELE9BQU9FLElBQVAsQ0FBWUssc0JBQXhCLEVBQWdELE9BQWhELENBQVY7O0FBRUFSLG9CQUFJUyxHQUFKLENBQVEscUJBQUtSLE9BQU9DLElBQVAsQ0FBWUQsT0FBT0UsSUFBUCxDQUFZTyxvQkFBeEIsRUFBOEMsRUFBOUMsRUFBa0Q7QUFDM0RDLDRCQUFRLElBRG1EO0FBRTNEQywyQkFBTztBQUFBLCtCQUFPQyxJQUFJQyxJQUFKLENBQVNQLEdBQVQsS0FBaUJNLElBQUlFLEtBQUosQ0FBVVIsR0FBVixDQUFqQixJQUFtQ00sSUFBSUcsT0FBSixDQUFZWCxNQUFaLENBQTFDO0FBQUE7QUFGb0QsaUJBQWxELENBQUwsQ0FBUjs7QUFLQUwsb0JBQUlTLEdBQUosQ0FBUSxTQUFTUSxlQUFULENBQXlCSixHQUF6QixFQUE4QkssR0FBOUIsRUFBbUNDLElBQW5DLEVBQXlDOztBQUU5Qyx3QkFBSUMsTUFBTVAsSUFBSVEsU0FBSixFQUFWO0FBQ0VILHdCQUFJSSxHQUFKLENBQVFqQixNQUFSLEVBQWdCZSxHQUFoQjtBQUNDRix3QkFBSVAsTUFBSixDQUFXTixNQUFYLEVBQW1CZSxHQUFuQjtBQUNBRix3QkFBSUssTUFBSixDQUFXaEIsR0FBWCxJQUFrQmEsR0FBbEI7O0FBRUZEO0FBRUgsaUJBVEQ7O0FBV0E7QUFDQW5CLG9CQUFJUyxHQUFKLENBQVEsU0FBU2UsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJaLEdBQTVCLEVBQWlDSyxHQUFqQyxFQUFzQ0MsSUFBdEMsRUFBNEM7O0FBRWhELHdCQUFJTSxJQUFJQyxJQUFKLEtBQWEsZUFBakIsRUFBa0MsT0FBT1AsS0FBS00sR0FBTCxDQUFQO0FBQ2xDUCx3QkFBSVMsTUFBSixDQUFXLEdBQVg7QUFDQVQsd0JBQUlVLElBQUosQ0FBUyxlQUFUO0FBRUgsaUJBTkQ7QUFRSDtBQUNKOzs7Ozs7a0JBR1UsSUFBSTdCLFVBQUosRSIsImZpbGUiOiJDc3JmRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNzcmYgZnJvbSAnY3N1cmYnO1xuXG4vKipcbiAqIENzcmZGaWx0ZXJcbiAqIEBpbXBsZW1lbnRzIHtGaWx0ZXJ9XG4gKi9cbmNsYXNzIENzcmZGaWx0ZXIge1xuXG4gICAgYXBwbHkoYXBwLCBjb25maWcpIHtcblxuICAgICAgICBpZiAoY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19DU1JGX0VOQUJMRUQsIGZhbHNlKSkge1xuXG4gICAgICAgICAgICB2YXIgaGVhZGVyID0gY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19DU1JGX1RPS0VOX0hFQURFUiwgJ3gtY3NyZi10b2tlbicpO1xuICAgICAgICAgICAgdmFyIGtleSA9IGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfQ1NSRl9UT0tFTl9LRVksICdfY3NyZicpO1xuXG4gICAgICAgICAgICBhcHAudXNlKGNzcmYoY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19DU1JGX09QVElPTlMsIHt9LCB7XG4gICAgICAgICAgICAgICAgY29va2llOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiByZXEgPT4gcmVxLmJvZHlba2V5XSB8fCByZXEucXVlcnlba2V5XSB8fCByZXEuaGVhZGVyc1toZWFkZXJdXG4gICAgICAgICAgICB9KSkpO1xuXG4gICAgICAgICAgICBhcHAudXNlKGZ1bmN0aW9uIHNlbmRfY3NyZl90b2tlbihyZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgICAgICAgICB2YXIgdG9rID0gcmVxLmNzcmZUb2tlbigpO1xuICAgICAgICAgICAgICAgICByZXMuc2V0KGhlYWRlciwgdG9rKTtcbiAgICAgICAgICAgICAgICAgIHJlcy5jb29raWUoaGVhZGVyLCB0b2spO1xuICAgICAgICAgICAgICAgICAgcmVzLmxvY2Fsc1trZXldID0gdG9rO1xuXG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy9UT0RPIGFsbG93IGNsaWVudCBjb2RlIHRvIGhvb2sgaW50byB0aGlzIGluc3RlYWQgb2YgdGhpcyBsYW1lIGhhbmRsZXJcbiAgICAgICAgICAgIGFwcC51c2UoZnVuY3Rpb24gaWZfY3NyZl9lcnJvcihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyLmNvZGUgIT09ICdFQkFEQ1NSRlRPS0VOJykgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMyk7XG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoJ0lOVkFMSUQgVE9LRU4nKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IENzcmZGaWx0ZXIoKVxuIl19