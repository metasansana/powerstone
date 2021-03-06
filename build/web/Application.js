'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _commonApplication = require('../common/Application');

var _commonApplication2 = _interopRequireDefault(_commonApplication);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _commonPowerstoneServer = require('../common/PowerstoneServer');

var _commonPowerstoneServer2 = _interopRequireDefault(_commonPowerstoneServer);

var _commonManagedServer = require('../common/ManagedServer');

var _commonManagedServer2 = _interopRequireDefault(_commonManagedServer);

var _commonServerFactory = require('../common/ServerFactory');

var _commonServerFactory2 = _interopRequireDefault(_commonServerFactory);

var _WebLoader = require('./WebLoader');

var _WebLoader2 = _interopRequireDefault(_WebLoader);

var _middlewareExpress = require('../middleware/express');

var middleware = _interopRequireWildcard(_middlewareExpress);

var defaultWares = ['public', 'serve-index', 'method-override', 'morgan', 'body-parser', 'cookie-parser', 'session', 'csrf'];

var Application = (function (_BaseApplication) {
    _inherits(Application, _BaseApplication);

    function Application() {
        _classCallCheck(this, Application);

        _get(Object.getPrototypeOf(Application.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Application, [{
        key: 'getLoader',
        value: function getLoader(path) {
            return new _WebLoader2['default'](path || this.path);
        }
    }, {
        key: 'run',
        value: function run() {
            var _this = this;

            return _get(Object.getPrototypeOf(Application.prototype), 'run', this).call(this).then(function () {

                var app = (0, _express2['default'])();

                _this.framework.express.middleware = (0, _deepmerge2['default'])(_this.framework.express.middleware, middleware);

                _this.modules.main.expressFramework(_this.framework.express.middleware, _this.framework.express.engines);
                _this.modules.main.express(app, _express2['default'], defaultWares);

                _this.server = new _commonManagedServer2['default'](_this.modules.main.configuration.readWithDefaults('port', process.env.PORT || 3000), _this.modules.main.configuration.readWithDefaults('host', process.env.HOST || '0.0.0.0'), new _commonPowerstoneServer2['default'](_commonServerFactory2['default'].createWebServer(app, _this.modules.main)));

                return _this.server.start();
            }).then(function (port) {
                return _this._events.emit(_this.events.STARTED, port, _this);
            })['catch'](function (err) {
                return _this._events.emit(_this.events.ERROR, err, _this);
            });
        }
    }, {
        key: 'shutdown',
        value: function shutdown() {

            return this.server.shutdown();
        }
    }]);

    return Application;
})(_commonApplication2['default']);

exports['default'] = Application;
module.exports = exports['default'];
//# sourceMappingURL=Application.js.map