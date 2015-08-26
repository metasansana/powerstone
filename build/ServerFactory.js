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
 * ServerFactory provides new instances for http.Server or the
 * framework's own wrapper.
 *
 * Powerstone wraps these in its own wrapper to provide a maintainable api.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TZXJ2ZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7OztxQkFDTCxPQUFPOzs7O3VCQUNMLFNBQVM7Ozs7Ozs7Ozs7O0lBUXRCLGFBQWE7V0FBYixhQUFhOzBCQUFiLGFBQWE7OztlQUFiLGFBQWE7Ozs7Ozs7O1dBT00sK0JBQUMsR0FBRyxFQUFFO0FBQzFCLGFBQU8sa0JBQUssWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQy9COzs7Ozs7Ozs7O1dBUTJCLHFDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUM7QUFDeEMsYUFBTyxtQkFBTSxZQUFZLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3pDOzs7Ozs7OztXQU1nQiwwQkFBQyxPQUFPLEVBQUM7QUFDeEIsYUFBTyxxQkFBUSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdEM7OztTQTNCRSxhQUFhOzs7cUJBK0JILElBQUksYUFBYSxFQUFFIiwiZmlsZSI6IlNlcnZlckZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCBodHRwcyBmcm9tICdodHRwcyc7XG5pbXBvcnQgcmVzdGlmeSBmcm9tICdyZXN0aWZ5JztcblxuLyoqXG4gKiBTZXJ2ZXJGYWN0b3J5IHByb3ZpZGVzIG5ldyBpbnN0YW5jZXMgZm9yIGh0dHAuU2VydmVyIG9yIHRoZVxuICogZnJhbWV3b3JrJ3Mgb3duIHdyYXBwZXIuXG4gKlxuICogUG93ZXJzdG9uZSB3cmFwcyB0aGVzZSBpbiBpdHMgb3duIHdyYXBwZXIgdG8gcHJvdmlkZSBhIG1haW50YWluYWJsZSBhcGkuXG4gKi9cbiBjbGFzcyBTZXJ2ZXJGYWN0b3J5IHtcblxuICAgIC8qKlxuICAgICAqIGNyZWF0ZU5hdGl2ZVdlYlNlcnZlciBjcmVhdGVzIGFuZCByZXR1cm5zIGEgaHR0cC5TZXJ2ZXJcbiAgICAgKiBAcGFyYW0ge2V4cHJlc3MuQXBwbGljYXRpb259IGFwcFxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgICBjcmVhdGVOYXRpdmVXZWJTZXJ2ZXIoYXBwKSB7XG4gICAgICByZXR1cm4gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGVTZWN1cmVOYXRpdmVXZWJTZXJ2ZXIgY3JlYXRlcyBhbmQgcmV0dXJucyBhIGh0dHBzLlNlcnZlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtleHByZXNzLkFwcGxpY2F0aW9ufSBhcHBcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICAgY3JlYXRlU2VjdXJlTmF0aXZlV2ViU2VydmVyKG9wdGlvbnMsIGFwcCl7XG4gICAgICByZXR1cm4gaHR0cHMuY3JlYXRlU2VydmVyKG9wdGlvbnMsIGFwcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY3JlYXRlUmVzdFNlcnZlciBjcmVhdGVzIGFuZCByZXR1cm5zIGEgcmVzdGlmeS5TZXJ2ZXJcbiAgICAgKiBAcGFyYW1zIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKi9cbiAgICAgY3JlYXRlUkVTVFNlcnZlcihvcHRpb25zKXtcbiAgICAgIHJldHVybiByZXN0aWZ5LmNyZWF0ZVNlcnZlcihvcHRpb25zKTtcbiAgICB9XG5cbiAgfVxuXG4gIGV4cG9ydCBkZWZhdWx0IG5ldyBTZXJ2ZXJGYWN0b3J5KClcbiJdfQ==