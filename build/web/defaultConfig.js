'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var defaultSecret = process.env.SECRET || _crypto2['default'].randomBytes(64).toString('hex');
exports['default'] = {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    session: {
        name: 'PHPSESSIONID',
        secret: defaultSecret,
        resave: false,
        saveUninitialized: true
    },
    csrf: {
        enabled: true
    },
    secret: defaultSecret
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvZGVmYXVsdENvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztzQkFBbUIsUUFBUTs7OztBQUUzQixJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxvQkFBTyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNqRTtBQUNaLFFBQUksRUFBRSxTQUFTO0FBQ2YsUUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUk7QUFDOUIsV0FBTyxFQUFFO0FBQ0wsWUFBSSxFQUFFLGNBQWM7QUFDcEIsY0FBTSxFQUFFLGFBQWE7QUFDckIsY0FBTSxFQUFFLEtBQUs7QUFDYix5QkFBaUIsRUFBRSxJQUFJO0tBQzFCO0FBQ0QsUUFBSSxFQUFFO0FBQ0YsZUFBTyxFQUFFLElBQUk7S0FDaEI7QUFDRCxVQUFNLEVBQUUsYUFBYTtDQUN4QiIsImZpbGUiOiJkZWZhdWx0Q29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuXG52YXIgZGVmYXVsdFNlY3JldCA9IHByb2Nlc3MuZW52LlNFQ1JFVCB8fCBjcnlwdG8ucmFuZG9tQnl0ZXMoNjQpLnRvU3RyaW5nKCdoZXgnKTtcbmV4cG9ydCBkZWZhdWx0ICB7XG4gICAgaG9zdDogJzAuMC4wLjAnLFxuICAgIHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCxcbiAgICBzZXNzaW9uOiB7XG4gICAgICAgIG5hbWU6ICdQSFBTRVNTSU9OSUQnLFxuICAgICAgICBzZWNyZXQ6IGRlZmF1bHRTZWNyZXQsXG4gICAgICAgIHJlc2F2ZTogZmFsc2UsXG4gICAgICAgIHNhdmVVbmluaXRpYWxpemVkOiB0cnVlXG4gICAgfSxcbiAgICBjc3JmOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICB9LFxuICAgIHNlY3JldDogZGVmYXVsdFNlY3JldFxufTsiXX0=