'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Application2 = require('../Application');

var _Application3 = _interopRequireDefault(_Application2);

var _PowerstoneServer = require('../PowerstoneServer');

var _PowerstoneServer2 = _interopRequireDefault(_PowerstoneServer);

var _ManagedServer = require('../ManagedServer');

var _ManagedServer2 = _interopRequireDefault(_ManagedServer);

var _WebServerFactory = require('./WebServerFactory');

var _WebServerFactory2 = _interopRequireDefault(_WebServerFactory);

var _Routing = require('./Routing');

var _Routing2 = _interopRequireDefault(_Routing);

var _WebMiddleWareRegistry = require('./WebMiddleWareRegistry');

var _WebMiddleWareRegistry2 = _interopRequireDefault(_WebMiddleWareRegistry);

var _WebViewRegistry = require('./WebViewRegistry');

var _WebViewRegistry2 = _interopRequireDefault(_WebViewRegistry);

var mainWare = ['public', 'method-override', 'morgan', 'body-parser', 'cookie-parser', 'session', 'csrf'];
var subWare = ['public'];

var WebApplication = (function (_Application) {
    _inherits(WebApplication, _Application);

    function WebApplication() {
        _classCallCheck(this, WebApplication);

        _get(Object.getPrototypeOf(WebApplication.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(WebApplication, [{
        key: 'run',
        value: function run() {
            var _this = this;

            return _Application3['default'].prototype.run.call(this).then(function () {

                var app;
                var config;
                var loader;
                var wareOrder;
                var projects = _this.projects.slice();
                var mountain = [];
                var mountPoint;
                var isMain = true;

                projects.unshift(_this.main);

                projects.forEach(function (project) {

                    config = project.getConfiguration();
                    loader = project.getLoader();
                    isMain = project.isMain();

                    mountPoint = config.readWithDefaults('mount_point', isMain ? '' : config.readWithDefaults('mount_root', false) ? '' : '/' + loader.getDirName());

                    wareOrder = isMain ? config.readWithDefaults('middleware', mainWare) : config.readWithDefaults('middleware', subWare);

                    app = isMain ? (0, _express2['default'])() : config.read('router') === true ? _express2['default'].Router() : (0, _express2['default'])();

                    wareOrder.forEach(function (mware) {
                        return _WebMiddleWareRegistry2['default'].get(mware)(mountPoint, app, config, loader, project);
                    });

                    _Routing2['default'].configure(app, loader.loadFromConf('routes', []), config);

                    _WebViewRegistry2['default'].get(config.readWithDefaults('view_engine', 'nunjucks'))(app, config, loader, project);

                    mountain.push({ point: mountPoint, app: app });
                });

                var mainApp = mountain.shift()['app'];
                mountain.forEach(function (mount) {
                    return mainApp.use(mount.point, mount.app);
                });

                var server = new _ManagedServer2['default'](_this.config.readWithDefaults('port', process.env.PORT || 3000), _this.config.readWithDefaults('host', process.env.HOST || '0.0.0.0'), new _PowerstoneServer2['default'](_WebServerFactory2['default'].create(mainApp, _this.config.https)));

                return server.start().then(_this.serverStarted);
            });
        }
    }, {
        key: 'shutdown',
        value: function shutdown() {

            var self = this;

            return new _bluebird2['default'](function (resolve, reject) {

                self.server.shutdown().then(function () {

                    for (var key in self.databases) if (self.databases.hasOwnProperty(key)) {
                        self.databases[key].close(function () {
                            resolve();
                        });
                    }
                })['catch'](function (err) {
                    reject(err);
                    return err;
                });
            });
        }
    }]);

    return WebApplication;
})(_Application3['default']);

exports['default'] = WebApplication;
module.exports = exports['default'];