'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ServerFactory = require('../ServerFactory');

var _ServerFactory2 = _interopRequireDefault(_ServerFactory);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

describe('ServerFactory', function () {

    it('createNativeWebServer', function () {
        (0, _must2['default'])(_ServerFactory2['default'].createNativeWebServer((0, _express2['default'])())).to.be.instanceOf(_http2['default'].Server);
    });

    it('createSecureNativeWebServer', function () {
        (0, _must2['default'])(_ServerFactory2['default'].createSecureNativeWebServer({
            key: require('./assets/alice.key.js'),
            cert: require('./assets/alice.crt.js')
        }, (0, _express2['default'])())).to.be.instanceOf(_https2['default'].Server);
    });

    it('createRESTServer', function () {
        (0, _must2['default'])(_ServerFactory2['default'].createRESTServer((0, _express2['default'])())).to.be.instanceOf(require('restify/lib/server'));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L1NlcnZlckZhY3RvcnlfdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OzZCQUEwQixrQkFBa0I7Ozs7dUJBQ3hCLFNBQVM7Ozs7b0JBQ1osTUFBTTs7OztxQkFDTCxPQUFPOzs7O3VCQUNMLFNBQVM7Ozs7b0JBQ1osTUFBTTs7OztBQUV2QixRQUFRLENBQUMsZUFBZSxFQUFFLFlBQVk7O0FBRWxDLE1BQUUsQ0FBQyx1QkFBdUIsRUFBRSxZQUFZO0FBQ3BDLCtCQUFLLDJCQUFjLHFCQUFxQixDQUFDLDJCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFLLE1BQU0sQ0FBQyxDQUFDO0tBQ3RGLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsNkJBQTZCLEVBQUUsWUFBWTtBQUMxQywrQkFBSywyQkFBYywyQkFBMkIsQ0FBQztBQUMzQyxlQUFHLEVBQUUsT0FBTyxDQUFDLHVCQUF1QixDQUFDO0FBQ3JDLGdCQUFJLEVBQUUsT0FBTyxDQUFDLHVCQUF1QixDQUFDO1NBQ3pDLEVBQUUsMkJBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQU0sTUFBTSxDQUFDLENBQUM7S0FDakQsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZO0FBQy9CLCtCQUFLLDJCQUFjLGdCQUFnQixDQUFDLDJCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7S0FDbkcsQ0FBQyxDQUFBO0NBRUwsQ0FBQyxDQUFDIiwiZmlsZSI6IlNlcnZlckZhY3RvcnlfdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZXJ2ZXJGYWN0b3J5IGZyb20gJy4uL1NlcnZlckZhY3RvcnknO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCBodHRwcyBmcm9tICdodHRwcyc7XG5pbXBvcnQgcmVzdGlmeSBmcm9tICdyZXN0aWZ5JztcbmltcG9ydCBtdXN0IGZyb20gJ211c3QnO1xuXG5kZXNjcmliZSgnU2VydmVyRmFjdG9yeScsIGZ1bmN0aW9uICgpIHtcblxuICAgIGl0KCdjcmVhdGVOYXRpdmVXZWJTZXJ2ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG11c3QoU2VydmVyRmFjdG9yeS5jcmVhdGVOYXRpdmVXZWJTZXJ2ZXIoZXhwcmVzcygpKSkudG8uYmUuaW5zdGFuY2VPZihodHRwLlNlcnZlcik7XG4gICAgfSk7XG5cbiAgICBpdCgnY3JlYXRlU2VjdXJlTmF0aXZlV2ViU2VydmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBtdXN0KFNlcnZlckZhY3RvcnkuY3JlYXRlU2VjdXJlTmF0aXZlV2ViU2VydmVyKHtcbiAgICAgICAgICAgIGtleTogcmVxdWlyZSgnLi9hc3NldHMvYWxpY2Uua2V5LmpzJyksXG4gICAgICAgICAgICBjZXJ0OiByZXF1aXJlKCcuL2Fzc2V0cy9hbGljZS5jcnQuanMnKVxuICAgICAgICB9LCBleHByZXNzKCkpKS50by5iZS5pbnN0YW5jZU9mKGh0dHBzLlNlcnZlcik7XG4gICAgfSk7XG5cbiAgICBpdCgnY3JlYXRlUkVTVFNlcnZlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXVzdChTZXJ2ZXJGYWN0b3J5LmNyZWF0ZVJFU1RTZXJ2ZXIoZXhwcmVzcygpKSkudG8uYmUuaW5zdGFuY2VPZihyZXF1aXJlKCdyZXN0aWZ5L2xpYi9zZXJ2ZXInKSk7XG4gICAgfSlcblxufSk7Il19