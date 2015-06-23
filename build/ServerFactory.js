'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

/**
 * ServerFactory
 */

var ServerFactory = (function () {
  function ServerFactory() {
    _classCallCheck(this, ServerFactory);
  }

  _createClass(ServerFactory, [{
    key: 'createNativeWebServer',

    /**
     * createNativeWebServer creates and returns a http.Server
     * @param {express.Application} app
     * @returns {*}
     */
    value: function createNativeWebServer(app) {
      return _http2['default'].createServer(app);
    }
  }, {
    key: 'createSecureNativeWebServer',

    /**
     * createSecureNativeWebServer creates and returns a https.Server
     * @param {Object} options
     * @param {express.Application} app
     * @returns {*}
     */
    value: function createSecureNativeWebServer(options, app) {
      return _https2['default'].createServer(options, app);
    }
  }, {
    key: 'createRESTServer',

    /**
     * createRestServer creates and returns a restify.Server
     * @params {Object} options
     */
    value: function createRESTServer(options) {
      return _restify2['default'].createServer(options);
    }
  }]);

  return ServerFactory;
})();

exports['default'] = new ServerFactory();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TZXJ2ZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7OztxQkFDTCxPQUFPOzs7O3VCQUNMLFNBQVM7Ozs7Ozs7O0lBS3ZCLGFBQWE7V0FBYixhQUFhOzBCQUFiLGFBQWE7OztlQUFiLGFBQWE7Ozs7Ozs7O1dBT00sK0JBQUMsR0FBRyxFQUFFO0FBQ3ZCLGFBQU8sa0JBQUssWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pDOzs7Ozs7Ozs7O1dBUTBCLHFDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUM7QUFDckMsYUFBTyxtQkFBTSxZQUFZLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQzNDOzs7Ozs7OztXQU1lLDBCQUFDLE9BQU8sRUFBQztBQUNyQixhQUFPLHFCQUFRLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN4Qzs7O1NBM0JDLGFBQWE7OztxQkErQkosSUFBSSxhQUFhLEVBQUUiLCJmaWxlIjoiU2VydmVyRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IGh0dHBzIGZyb20gJ2h0dHBzJztcbmltcG9ydCByZXN0aWZ5IGZyb20gJ3Jlc3RpZnknO1xuXG4vKipcbiAqIFNlcnZlckZhY3RvcnlcbiAqL1xuY2xhc3MgU2VydmVyRmFjdG9yeSB7XG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGVOYXRpdmVXZWJTZXJ2ZXIgY3JlYXRlcyBhbmQgcmV0dXJucyBhIGh0dHAuU2VydmVyXG4gICAgICogQHBhcmFtIHtleHByZXNzLkFwcGxpY2F0aW9ufSBhcHBcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBjcmVhdGVOYXRpdmVXZWJTZXJ2ZXIoYXBwKSB7XG4gICAgICAgIHJldHVybiBodHRwLmNyZWF0ZVNlcnZlcihhcHApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNyZWF0ZVNlY3VyZU5hdGl2ZVdlYlNlcnZlciBjcmVhdGVzIGFuZCByZXR1cm5zIGEgaHR0cHMuU2VydmVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge2V4cHJlc3MuQXBwbGljYXRpb259IGFwcFxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGNyZWF0ZVNlY3VyZU5hdGl2ZVdlYlNlcnZlcihvcHRpb25zLCBhcHApe1xuICAgICAgICByZXR1cm4gaHR0cHMuY3JlYXRlU2VydmVyKG9wdGlvbnMsIGFwcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY3JlYXRlUmVzdFNlcnZlciBjcmVhdGVzIGFuZCByZXR1cm5zIGEgcmVzdGlmeS5TZXJ2ZXJcbiAgICAgKiBAcGFyYW1zIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKi9cbiAgICBjcmVhdGVSRVNUU2VydmVyKG9wdGlvbnMpe1xuICAgICAgICByZXR1cm4gcmVzdGlmeS5jcmVhdGVTZXJ2ZXIob3B0aW9ucyk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBTZXJ2ZXJGYWN0b3J5KClcbiJdfQ==