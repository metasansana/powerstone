'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ServerFactory provides new instances for http.Server or the
 * framework's own wrapper.
 *
 * Powerstone wraps these in its own wrapper to provide a maintainable api.
 */
var ServerFactory = function () {
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
            return _http2.default.createServer(app);
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
            return _https2.default.createServer(options, app);
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
}();

exports.default = new ServerFactory();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvU2VydmVyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJTZXJ2ZXJGYWN0b3J5IiwiYXBwIiwiY3JlYXRlU2VydmVyIiwib3B0aW9ucyIsIm1vZHVsZSIsImNvbmZpZ3VyYXRpb24iLCJyZWFkIiwiY3JlYXRlU2VjdXJlTmF0aXZlV2ViU2VydmVyIiwiY3JlYXRlTmF0aXZlV2ViU2VydmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7OztJQU1NQSxhOzs7Ozs7Ozs7QUFFRjs7Ozs7OENBS3NCQyxHLEVBQUs7QUFDdkIsbUJBQU8sZUFBS0MsWUFBTCxDQUFrQkQsR0FBbEIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7b0RBTTRCRSxPLEVBQVNGLEcsRUFBSztBQUN0QyxtQkFBTyxnQkFBTUMsWUFBTixDQUFtQkMsT0FBbkIsRUFBNEJGLEdBQTVCLENBQVA7QUFDSDs7O3dDQUVlQSxHLEVBQUtHLE0sRUFBUTs7QUFFekIsZ0JBQUlELFVBQVVDLE9BQU9DLGFBQVAsQ0FBcUJDLElBQXJCLENBQTBCLE9BQTFCLEVBQW1DLElBQW5DLENBQWQ7O0FBRUEsZ0JBQUlILE9BQUosRUFDSSxPQUFPLEtBQUtJLDJCQUFMLENBQWlDSixPQUFqQyxFQUEwQ0YsR0FBMUMsQ0FBUDs7QUFFSixtQkFBTyxLQUFLTyxxQkFBTCxDQUEyQlAsR0FBM0IsQ0FBUDtBQUNIOzs7Ozs7a0JBSVUsSUFBSUQsYUFBSixFIiwiZmlsZSI6IlNlcnZlckZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCBodHRwcyBmcm9tICdodHRwcyc7XG5cbi8qKlxuICogU2VydmVyRmFjdG9yeSBwcm92aWRlcyBuZXcgaW5zdGFuY2VzIGZvciBodHRwLlNlcnZlciBvciB0aGVcbiAqIGZyYW1ld29yaydzIG93biB3cmFwcGVyLlxuICpcbiAqIFBvd2Vyc3RvbmUgd3JhcHMgdGhlc2UgaW4gaXRzIG93biB3cmFwcGVyIHRvIHByb3ZpZGUgYSBtYWludGFpbmFibGUgYXBpLlxuICovXG5jbGFzcyBTZXJ2ZXJGYWN0b3J5IHtcblxuICAgIC8qKlxuICAgICAqIGNyZWF0ZU5hdGl2ZVdlYlNlcnZlciBjcmVhdGVzIGFuZCByZXR1cm5zIGEgaHR0cC5TZXJ2ZXJcbiAgICAgKiBAcGFyYW0ge2V4cHJlc3MuQXBwbGljYXRpb259IGFwcFxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGNyZWF0ZU5hdGl2ZVdlYlNlcnZlcihhcHApIHtcbiAgICAgICAgcmV0dXJuIGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY3JlYXRlU2VjdXJlTmF0aXZlV2ViU2VydmVyIGNyZWF0ZXMgYW5kIHJldHVybnMgYSBodHRwcy5TZXJ2ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7ZXhwcmVzcy5BcHBsaWNhdGlvbn0gYXBwXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgY3JlYXRlU2VjdXJlTmF0aXZlV2ViU2VydmVyKG9wdGlvbnMsIGFwcCkge1xuICAgICAgICByZXR1cm4gaHR0cHMuY3JlYXRlU2VydmVyKG9wdGlvbnMsIGFwcCk7XG4gICAgfVxuXG4gICAgY3JlYXRlV2ViU2VydmVyKGFwcCwgbW9kdWxlKSB7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSBtb2R1bGUuY29uZmlndXJhdGlvbi5yZWFkKCdodHRwcycsIG51bGwpO1xuXG4gICAgICAgIGlmIChvcHRpb25zKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlU2VjdXJlTmF0aXZlV2ViU2VydmVyKG9wdGlvbnMsIGFwcCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTmF0aXZlV2ViU2VydmVyKGFwcCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBTZXJ2ZXJGYWN0b3J5KCk7XG4iXX0=