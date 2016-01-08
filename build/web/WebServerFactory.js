'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _commonServerFactory = require('../common/ServerFactory');

var _commonServerFactory2 = _interopRequireDefault(_commonServerFactory);

/**
 * WebServerFactory
 */

var WebServerFactory = (function () {
    function WebServerFactory() {
        _classCallCheck(this, WebServerFactory);
    }

    _createClass(WebServerFactory, [{
        key: 'create',
        value: function create(app, options) {

            if (options) return _commonServerFactory2['default'].createSecureNativeWebServer(options, app);

            return _commonServerFactory2['default'].createNativeWebServer(app);
        }
    }]);

    return WebServerFactory;
})();

exports['default'] = new WebServerFactory();
module.exports = exports['default'];
//# sourceMappingURL=WebServerFactory.js.map