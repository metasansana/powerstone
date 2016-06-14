'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

/**
 * SessionFilter 
 * @implements {Filter}
 */

var SessionFilter = (function () {
    function SessionFilter() {
        _classCallCheck(this, SessionFilter);
    }

    _createClass(SessionFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            if (config.read(config.keys.FILTERS_SESSION_ENABLED, false)) {

                app.use((0, _expressSession2['default'])(config.read(config.keys.FILTERS_SESSION_OPTIONS, {}, {
                    name: 'CRYINGZANGOLIE',
                    secret: config.read(config.keys.SECRET, config.defaults.SECRET),
                    resave: false,
                    saveUninitialized: true,
                    store: config.read(config.keys.FILTERS_SESSION_STORE, null)
                })));
            }
        }
    }]);

    return SessionFilter;
})();

exports['default'] = new SessionFilter();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9TZXNzaW9uRmlsdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs4QkFBb0IsaUJBQWlCOzs7Ozs7Ozs7SUFNL0IsYUFBYTthQUFiLGFBQWE7OEJBQWIsYUFBYTs7O2lCQUFiLGFBQWE7O2VBRVYsZUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFOztBQUVmLGdCQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLENBQUMsRUFBRTs7QUFFekQsbUJBQUcsQ0FBQyxHQUFHLENBQUMsaUNBQVEsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsRUFBRTtBQUNqRSx3QkFBSSxFQUFFLGdCQUFnQjtBQUN0QiwwQkFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDL0QsMEJBQU0sRUFBRSxLQUFLO0FBQ2IscUNBQWlCLEVBQUUsSUFBSTtBQUN2Qix5QkFBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUM7aUJBQzlELENBQUMsQ0FBQyxDQUFDLENBQUM7YUFFUjtTQUVKOzs7V0FoQkMsYUFBYTs7O3FCQW1CSixJQUFJLGFBQWEsRUFBRSIsImZpbGUiOiJTZXNzaW9uRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNlc3Npb24gZnJvbSAnZXhwcmVzcy1zZXNzaW9uJztcblxuLyoqXG4gKiBTZXNzaW9uRmlsdGVyIFxuICogQGltcGxlbWVudHMge0ZpbHRlcn1cbiAqL1xuY2xhc3MgU2Vzc2lvbkZpbHRlciB7XG5cbiAgICBhcHBseShhcHAsIGNvbmZpZykge1xuXG4gICAgICAgIGlmIChjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX1NFU1NJT05fRU5BQkxFRCwgZmFsc2UpKSB7XG5cbiAgICAgICAgICAgIGFwcC51c2Uoc2Vzc2lvbihjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX1NFU1NJT05fT1BUSU9OUywge30sIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnQ1JZSU5HWkFOR09MSUUnLFxuICAgICAgICAgICAgICAgIHNlY3JldDogY29uZmlnLnJlYWQoY29uZmlnLmtleXMuU0VDUkVULCBjb25maWcuZGVmYXVsdHMuU0VDUkVUKSxcbiAgICAgICAgICAgICAgICByZXNhdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNhdmVVbmluaXRpYWxpemVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN0b3JlOiBjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX1NFU1NJT05fU1RPUkUsIG51bGwpXG4gICAgICAgICAgICB9KSkpO1xuXG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFNlc3Npb25GaWx0ZXIoKVxuIl19