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

        /**
         * createSecureNativeWebServer creates and returns a https.Server
         * @param {Object} options
         * @param {express.Application} app
         * @returns {*}
         */
    }, {
        key: 'createSecureNativeWebServer',
        value: function createSecureNativeWebServer(options, app) {
            return _https2['default'].createServer(options, app);
        }
    }, {
        key: 'createWebServer',
        value: function createWebServer(app, module) {

            var options = module.configuration.read('https', null);

            if (options) return this.createSecureNativeWebServer(options, app);

            return this.createNativeWebServer(app);
        }
    }]);

    return ServerFactory;
})();

exports['default'] = new ServerFactory();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvU2VydmVyRmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7cUJBQ0wsT0FBTzs7Ozs7Ozs7Ozs7SUFRbkIsYUFBYTthQUFiLGFBQWE7OEJBQWIsYUFBYTs7O2lCQUFiLGFBQWE7Ozs7Ozs7O2VBT00sK0JBQUMsR0FBRyxFQUFFO0FBQ3ZCLG1CQUFPLGtCQUFLLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqQzs7Ozs7Ozs7OztlQVEwQixxQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0FBQ3RDLG1CQUFPLG1CQUFNLFlBQVksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDM0M7OztlQUVjLHlCQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7O0FBRXpCLGdCQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRXZELGdCQUFJLE9BQU8sRUFDUCxPQUFPLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7O0FBRTFELG1CQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMxQzs7O1dBN0JDLGFBQWE7OztxQkFpQ0osSUFBSSxhQUFhLEVBQUUiLCJmaWxlIjoiU2VydmVyRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IGh0dHBzIGZyb20gJ2h0dHBzJztcblxuLyoqXG4gKiBTZXJ2ZXJGYWN0b3J5IHByb3ZpZGVzIG5ldyBpbnN0YW5jZXMgZm9yIGh0dHAuU2VydmVyIG9yIHRoZVxuICogZnJhbWV3b3JrJ3Mgb3duIHdyYXBwZXIuXG4gKlxuICogUG93ZXJzdG9uZSB3cmFwcyB0aGVzZSBpbiBpdHMgb3duIHdyYXBwZXIgdG8gcHJvdmlkZSBhIG1haW50YWluYWJsZSBhcGkuXG4gKi9cbmNsYXNzIFNlcnZlckZhY3Rvcnkge1xuXG4gICAgLyoqXG4gICAgICogY3JlYXRlTmF0aXZlV2ViU2VydmVyIGNyZWF0ZXMgYW5kIHJldHVybnMgYSBodHRwLlNlcnZlclxuICAgICAqIEBwYXJhbSB7ZXhwcmVzcy5BcHBsaWNhdGlvbn0gYXBwXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgY3JlYXRlTmF0aXZlV2ViU2VydmVyKGFwcCkge1xuICAgICAgICByZXR1cm4gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGVTZWN1cmVOYXRpdmVXZWJTZXJ2ZXIgY3JlYXRlcyBhbmQgcmV0dXJucyBhIGh0dHBzLlNlcnZlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtleHByZXNzLkFwcGxpY2F0aW9ufSBhcHBcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBjcmVhdGVTZWN1cmVOYXRpdmVXZWJTZXJ2ZXIob3B0aW9ucywgYXBwKSB7XG4gICAgICAgIHJldHVybiBodHRwcy5jcmVhdGVTZXJ2ZXIob3B0aW9ucywgYXBwKTtcbiAgICB9XG5cbiAgICBjcmVhdGVXZWJTZXJ2ZXIoYXBwLCBtb2R1bGUpIHtcblxuICAgICAgICB2YXIgb3B0aW9ucyA9IG1vZHVsZS5jb25maWd1cmF0aW9uLnJlYWQoJ2h0dHBzJywgbnVsbCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVTZWN1cmVOYXRpdmVXZWJTZXJ2ZXIob3B0aW9ucywgYXBwKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVOYXRpdmVXZWJTZXJ2ZXIoYXBwKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFNlcnZlckZhY3RvcnkoKTtcbiJdfQ==