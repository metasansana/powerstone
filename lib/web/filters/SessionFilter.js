'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * SessionFilter
 * @implements {Filter}
 */
var SessionFilter = function () {
    function SessionFilter() {
        _classCallCheck(this, SessionFilter);
    }

    _createClass(SessionFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            if (config.read(config.keys.FILTERS_SESSION_ENABLED, false)) {

                app.use((0, _expressSession2.default)(config.read(config.keys.FILTERS_SESSION_OPTIONS, {}, {
                    name: 'CRYINGZANGOLIE',
                    secret: config.read(config.keys.SECRET, process.env.SECRET || config.defaults.SECRET),
                    resave: false,
                    saveUninitialized: true,
                    store: config.read(config.keys.FILTERS_SESSION_STORE, null)
                })));
            }
        }
    }]);

    return SessionFilter;
}();

exports.default = new SessionFilter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9TZXNzaW9uRmlsdGVyLmpzIl0sIm5hbWVzIjpbIlNlc3Npb25GaWx0ZXIiLCJhcHAiLCJjb25maWciLCJyZWFkIiwia2V5cyIsIkZJTFRFUlNfU0VTU0lPTl9FTkFCTEVEIiwidXNlIiwiRklMVEVSU19TRVNTSU9OX09QVElPTlMiLCJuYW1lIiwic2VjcmV0IiwiU0VDUkVUIiwicHJvY2VzcyIsImVudiIsImRlZmF1bHRzIiwicmVzYXZlIiwic2F2ZVVuaW5pdGlhbGl6ZWQiLCJzdG9yZSIsIkZJTFRFUlNfU0VTU0lPTl9TVE9SRSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTs7OztJQUlNQSxhOzs7Ozs7OzhCQUVJQyxHLEVBQUtDLE0sRUFBUTs7QUFFZixnQkFBSUEsT0FBT0MsSUFBUCxDQUFZRCxPQUFPRSxJQUFQLENBQVlDLHVCQUF4QixFQUFpRCxLQUFqRCxDQUFKLEVBQTZEOztBQUV6REosb0JBQUlLLEdBQUosQ0FBUSw4QkFBUUosT0FBT0MsSUFBUCxDQUFZRCxPQUFPRSxJQUFQLENBQVlHLHVCQUF4QixFQUFpRCxFQUFqRCxFQUFxRDtBQUNqRUMsMEJBQU0sZ0JBRDJEO0FBRWpFQyw0QkFBUVAsT0FBT0MsSUFBUCxDQUFZRCxPQUFPRSxJQUFQLENBQVlNLE1BQXhCLEVBQWdDQyxRQUFRQyxHQUFSLENBQVlGLE1BQVosSUFDcENSLE9BQU9XLFFBQVAsQ0FBZ0JILE1BRFosQ0FGeUQ7QUFJakVJLDRCQUFRLEtBSnlEO0FBS2pFQyx1Q0FBbUIsSUFMOEM7QUFNakVDLDJCQUFPZCxPQUFPQyxJQUFQLENBQVlELE9BQU9FLElBQVAsQ0FBWWEscUJBQXhCLEVBQStDLElBQS9DO0FBTjBELGlCQUFyRCxDQUFSLENBQVI7QUFTSDtBQUVKOzs7Ozs7a0JBR1UsSUFBSWpCLGFBQUosRSIsImZpbGUiOiJTZXNzaW9uRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNlc3Npb24gZnJvbSAnZXhwcmVzcy1zZXNzaW9uJztcblxuLyoqXG4gKiBTZXNzaW9uRmlsdGVyXG4gKiBAaW1wbGVtZW50cyB7RmlsdGVyfVxuICovXG5jbGFzcyBTZXNzaW9uRmlsdGVyIHtcblxuICAgIGFwcGx5KGFwcCwgY29uZmlnKSB7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfU0VTU0lPTl9FTkFCTEVELCBmYWxzZSkpIHtcblxuICAgICAgICAgICAgYXBwLnVzZShzZXNzaW9uKGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfU0VTU0lPTl9PUFRJT05TLCB7fSwge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdDUllJTkdaQU5HT0xJRScsXG4gICAgICAgICAgICAgICAgc2VjcmV0OiBjb25maWcucmVhZChjb25maWcua2V5cy5TRUNSRVQsIHByb2Nlc3MuZW52LlNFQ1JFVCB8fFxuICAgICAgICAgICAgICAgICAgICBjb25maWcuZGVmYXVsdHMuU0VDUkVUKSxcbiAgICAgICAgICAgICAgICByZXNhdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNhdmVVbmluaXRpYWxpemVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN0b3JlOiBjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX1NFU1NJT05fU1RPUkUsIG51bGwpXG4gICAgICAgICAgICB9KSkpO1xuXG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFNlc3Npb25GaWx0ZXIoKVxuIl19