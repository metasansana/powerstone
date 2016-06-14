'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

/**
 * AuditFilter 
 * @implements {Filter}
 */

var AuditFilter = (function () {
    function AuditFilter() {
        _classCallCheck(this, AuditFilter);
    }

    _createClass(AuditFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            app.on('after', _restify2['default'].auditLogger(config.read('power.filters.audit', {
                body: true,
                log: bunyan.createLogger({
                    name: 'audit',
                    stream: process.stdout
                })
            })));
        }
    }]);

    return AuditFilter;
})();

exports['default'] = new AuditFilter();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9BdWRpdEZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7dUJBQW9CLFNBQVM7Ozs7Ozs7OztJQU12QixXQUFXO2FBQVgsV0FBVzs4QkFBWCxXQUFXOzs7aUJBQVgsV0FBVzs7ZUFFUixlQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7O0FBRWYsZUFBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUscUJBQVEsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7QUFDbkUsb0JBQUksRUFBRSxJQUFJO0FBQ1YsbUJBQUcsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDO0FBQ3JCLHdCQUFJLEVBQUUsT0FBTztBQUNiLDBCQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07aUJBQ3pCLENBQUM7YUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBRVI7OztXQVpDLFdBQVc7OztxQkFlRixJQUFJLFdBQVcsRUFBRSIsImZpbGUiOiJBdWRpdEZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXN0aWZ5IGZyb20gJ3Jlc3RpZnknO1xuXG4vKipcbiAqIEF1ZGl0RmlsdGVyIFxuICogQGltcGxlbWVudHMge0ZpbHRlcn1cbiAqL1xuY2xhc3MgQXVkaXRGaWx0ZXIge1xuXG4gICAgYXBwbHkoYXBwLCBjb25maWcpIHtcblxuICAgICAgICBhcHAub24oJ2FmdGVyJywgcmVzdGlmeS5hdWRpdExvZ2dlcihjb25maWcucmVhZCgncG93ZXIuZmlsdGVycy5hdWRpdCcsIHtcbiAgICAgICAgICAgIGJvZHk6IHRydWUsXG4gICAgICAgICAgICBsb2c6IGJ1bnlhbi5jcmVhdGVMb2dnZXIoe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdhdWRpdCcsXG4gICAgICAgICAgICAgICAgc3RyZWFtOiBwcm9jZXNzLnN0ZG91dFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkpKTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEF1ZGl0RmlsdGVyKClcbiJdfQ==