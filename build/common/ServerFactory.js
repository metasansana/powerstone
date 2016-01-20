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
        key: 'createApiServer',
        value: function createApiServer(restify, module) {
            return restify.createServer(module.configuration.readWithDefaults('api.options', null));
        }
    }, {
        key: 'createWebServer',
        value: function createWebServer(app, module) {

            var options = module.configuration.readWithDefaults('web.https', null);

            if (options) return this.createSecureNativeWebServer(options, app);

            return this.createNativeWebServer(app);
        }
    }]);

    return ServerFactory;
})();

exports['default'] = new ServerFactory();
module.exports = exports['default'];
//# sourceMappingURL=ServerFactory.js.map