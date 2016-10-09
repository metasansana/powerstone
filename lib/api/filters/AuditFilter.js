'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

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

            if (config.read(config.keys.FILTERS_LOG_ENABLED, true)) app.on('after', _restify2['default'].auditLogger(config.read('power.filters.audit', {
                body: true,
                log: _bunyan2['default'].createLogger({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9BdWRpdEZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7dUJBQW9CLFNBQVM7Ozs7c0JBQ1YsUUFBUTs7Ozs7Ozs7O0lBTXJCLFdBQVc7YUFBWCxXQUFXOzhCQUFYLFdBQVc7OztpQkFBWCxXQUFXOztlQUVSLGVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTs7QUFFZixnQkFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLEVBQ2xELEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLHFCQUFRLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO0FBQ25FLG9CQUFJLEVBQUUsSUFBSTtBQUNWLG1CQUFHLEVBQUUsb0JBQU8sWUFBWSxDQUFDO0FBQ3JCLHdCQUFJLEVBQUUsT0FBTztBQUNiLDBCQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07aUJBQ3pCLENBQUM7YUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBRVo7OztXQWJDLFdBQVc7OztxQkFnQkYsSUFBSSxXQUFXLEVBQUUiLCJmaWxlIjoiQXVkaXRGaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVzdGlmeSBmcm9tICdyZXN0aWZ5JztcbmltcG9ydCBidW55YW4gZnJvbSAnYnVueWFuJztcblxuLyoqXG4gKiBBdWRpdEZpbHRlciBcbiAqIEBpbXBsZW1lbnRzIHtGaWx0ZXJ9XG4gKi9cbmNsYXNzIEF1ZGl0RmlsdGVyIHtcblxuICAgIGFwcGx5KGFwcCwgY29uZmlnKSB7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfTE9HX0VOQUJMRUQsIHRydWUpKVxuICAgICAgICAgICAgYXBwLm9uKCdhZnRlcicsIHJlc3RpZnkuYXVkaXRMb2dnZXIoY29uZmlnLnJlYWQoJ3Bvd2VyLmZpbHRlcnMuYXVkaXQnLCB7XG4gICAgICAgICAgICAgICAgYm9keTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsb2c6IGJ1bnlhbi5jcmVhdGVMb2dnZXIoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnYXVkaXQnLFxuICAgICAgICAgICAgICAgICAgICBzdHJlYW06IHByb2Nlc3Muc3Rkb3V0XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pKSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBBdWRpdEZpbHRlcigpXG4iXX0=