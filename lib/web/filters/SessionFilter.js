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
                    secret: config.read(config.keys.SECRET, config.defaults.SECRET),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9TZXNzaW9uRmlsdGVyLmpzIl0sIm5hbWVzIjpbIlNlc3Npb25GaWx0ZXIiLCJhcHAiLCJjb25maWciLCJyZWFkIiwia2V5cyIsIkZJTFRFUlNfU0VTU0lPTl9FTkFCTEVEIiwidXNlIiwiRklMVEVSU19TRVNTSU9OX09QVElPTlMiLCJuYW1lIiwic2VjcmV0IiwiU0VDUkVUIiwiZGVmYXVsdHMiLCJyZXNhdmUiLCJzYXZlVW5pbml0aWFsaXplZCIsInN0b3JlIiwiRklMVEVSU19TRVNTSU9OX1NUT1JFIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztBQUVBOzs7O0lBSU1BLGE7Ozs7Ozs7OEJBRUlDLEcsRUFBS0MsTSxFQUFROztBQUVmLGdCQUFJQSxPQUFPQyxJQUFQLENBQVlELE9BQU9FLElBQVAsQ0FBWUMsdUJBQXhCLEVBQWlELEtBQWpELENBQUosRUFBNkQ7O0FBRXpESixvQkFBSUssR0FBSixDQUFRLDhCQUFRSixPQUFPQyxJQUFQLENBQVlELE9BQU9FLElBQVAsQ0FBWUcsdUJBQXhCLEVBQWlELEVBQWpELEVBQXFEO0FBQ2pFQywwQkFBTSxnQkFEMkQ7QUFFakVDLDRCQUFRUCxPQUFPQyxJQUFQLENBQVlELE9BQU9FLElBQVAsQ0FBWU0sTUFBeEIsRUFBZ0NSLE9BQU9TLFFBQVAsQ0FBZ0JELE1BQWhELENBRnlEO0FBR2pFRSw0QkFBUSxLQUh5RDtBQUlqRUMsdUNBQW1CLElBSjhDO0FBS2pFQywyQkFBT1osT0FBT0MsSUFBUCxDQUFZRCxPQUFPRSxJQUFQLENBQVlXLHFCQUF4QixFQUErQyxJQUEvQztBQUwwRCxpQkFBckQsQ0FBUixDQUFSO0FBUUg7QUFFSjs7Ozs7O2tCQUdVLElBQUlmLGFBQUosRSIsImZpbGUiOiJTZXNzaW9uRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNlc3Npb24gZnJvbSAnZXhwcmVzcy1zZXNzaW9uJztcblxuLyoqXG4gKiBTZXNzaW9uRmlsdGVyIFxuICogQGltcGxlbWVudHMge0ZpbHRlcn1cbiAqL1xuY2xhc3MgU2Vzc2lvbkZpbHRlciB7XG5cbiAgICBhcHBseShhcHAsIGNvbmZpZykge1xuXG4gICAgICAgIGlmIChjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX1NFU1NJT05fRU5BQkxFRCwgZmFsc2UpKSB7XG5cbiAgICAgICAgICAgIGFwcC51c2Uoc2Vzc2lvbihjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX1NFU1NJT05fT1BUSU9OUywge30sIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnQ1JZSU5HWkFOR09MSUUnLFxuICAgICAgICAgICAgICAgIHNlY3JldDogY29uZmlnLnJlYWQoY29uZmlnLmtleXMuU0VDUkVULCBjb25maWcuZGVmYXVsdHMuU0VDUkVUKSxcbiAgICAgICAgICAgICAgICByZXNhdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNhdmVVbmluaXRpYWxpemVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN0b3JlOiBjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX1NFU1NJT05fU1RPUkUsIG51bGwpXG4gICAgICAgICAgICB9KSkpO1xuXG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFNlc3Npb25GaWx0ZXIoKVxuIl19