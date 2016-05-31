'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _commonApplication = require('../common/Application');

var _commonApplication2 = _interopRequireDefault(_commonApplication);

var _commonPowerstoneServer = require('../common/PowerstoneServer');

var _commonPowerstoneServer2 = _interopRequireDefault(_commonPowerstoneServer);

var _commonManagedServer = require('../common/ManagedServer');

var _commonManagedServer2 = _interopRequireDefault(_commonManagedServer);

var _ApiLoader = require('./ApiLoader');

var _ApiLoader2 = _interopRequireDefault(_ApiLoader);

function handleException(req, res, next, err) {

    console.error(err.stack);
    res.status(500);
    res.end();
}

var Api = (function (_Application) {
    _inherits(Api, _Application);

    function Api(path) {
        _classCallCheck(this, Api);

        _get(Object.getPrototypeOf(Api.prototype), 'constructor', this).call(this, path);
        this.main = new ApiModule('', new Configuration('apiconf', path), this);
        this.frameworkApp = _restify2['default'].createServer(this.main.configuration.readOrDefault('restify', null));
    }

    _createClass(Api, [{
        key: 'run',
        value: function run() {
            var _this = this;

            this.main.load(this.frameworkApp).then(function () {

                _this.framework.restify.plugins = (0, _deepmerge2['default'])(_this.framework.restify.plugins, plugins);
                _this.modules.main.restifyFramework(_this.framework.restify.plugins);
                _this.modules.main.restify(engine, ['body_parser', 'query_parser'], '');
                _this.frameworkApp.on('uncaughtException', handleException);

                _this.server = new _commonManagedServer2['default'](_this.modules.main.configuration.readWithDefaults('port', process.env.PORT || 3000), _this.modules.main.configuration.readWithDefaults('host', process.env.HOST || '0.0.0.0'), new _commonPowerstoneServer2['default'](engine));

                return _this.server.start();
            }).then(function (port) {
                return _this._events.emit(_this.events.STARTED, port, _this);
            })['catch'](function (err) {
                return _this._events.emit(_this.events.ERROR, err, _this);
            });
        }
    }]);

    return Api;
})(_commonApplication2['default']);

exports['default'] = _commonApplication2['default'];
module.exports = exports['default'];
//# sourceMappingURL=Api.js.map