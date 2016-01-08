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

var _commonServerFactory = require('../common/ServerFactory');

var _commonServerFactory2 = _interopRequireDefault(_commonServerFactory);

var _commonApplication = require('../common/Application');

var _commonApplication2 = _interopRequireDefault(_commonApplication);

var _commonPowerstoneServer = require('../common/PowerstoneServer');

var _commonPowerstoneServer2 = _interopRequireDefault(_commonPowerstoneServer);

var _commonManagedServer = require('../common/ManagedServer');

var _commonManagedServer2 = _interopRequireDefault(_commonManagedServer);

var _commonRouter = require('../common/Router');

var _commonRouter2 = _interopRequireDefault(_commonRouter);

var _Plugins = require('./Plugins');

var _Plugins2 = _interopRequireDefault(_Plugins);

var DEFAULT_PLUGINS = [];

var ApiApplication = (function (_Application) {
    _inherits(ApiApplication, _Application);

    function ApiApplication() {
        _classCallCheck(this, ApiApplication);

        _get(Object.getPrototypeOf(ApiApplication.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ApiApplication, [{
        key: 'run',
        value: function run() {
            var _this = this;

            return _get(Object.getPrototypeOf(ApiApplication.prototype), 'run', this).call(this).then(function () {

                var server = _commonServerFactory2['default'].createApiServer(_this.config.readWithDefaults('https', undefined));
                var config;
                var loader;
                var projects = _this.projects.slice();
                var plugins;
                var router;

                projects.unshift(_this.main);

                projects.forEach(function (project) {

                    config = project.getConfiguration();
                    loader = project.getLoader();
                    plugins = config.readWithDefaults('plugins', DEFAULT_PLUGINS);
                    plugins.forEach(function (plugin) {
                        return _Plugins2['default'].get(plugin)(server, config, loader, project);
                    });
                    router = new _commonRouter2['default'](server, config);
                    router.configure(loader.loadFromConf('routes', []));
                });

                server = new _commonManagedServer2['default'](_this.config.readWithDefaults('port', process.env.PORT || 3000), _this.config.readWithDefaults('host', process.env.HOST || '0.0.0.0'), new _commonPowerstoneServer2['default'](server));
                return server.start();
            }).then(function (port) {
                return _this._events.emit(_this.events.STARTED, port, _this);
            })['catch'](function (err) {
                return _this._events.emit(_this.events.ERROR, err, _this);
            });
        }
    }, {
        key: 'shutdown',
        value: function shutdown() {

            var self = this;

            return new _bluebird2['default'](function (resolve, reject) {

                self.server.shutdown().then(function () {

                    for (var key in self.databases) if (self.databases.hasOwnProperty(key)) self.databases[key].close(resolve);
                })['catch'](function (err) {
                    reject(err);
                    return err;
                });
            });
        }
    }]);

    return ApiApplication;
})(_commonApplication2['default']);

exports['default'] = ApiApplication;
module.exports = exports['default'];
//# sourceMappingURL=RestApplication.js.map