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
//# sourceMappingURL=ServerFactory_test.js.map