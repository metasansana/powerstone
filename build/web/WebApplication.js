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

var _Builtin = require('./Builtin');

var _Builtin2 = _interopRequireDefault(_Builtin);

var _WebServerFactory = require('./WebServerFactory');

var _WebServerFactory2 = _interopRequireDefault(_WebServerFactory);

var _WebRouting = require('./WebRouting');

var _WebRouting2 = _interopRequireDefault(_WebRouting);

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

                    mountPoint = config.readWithDefaults('mount_point', isMain ? '' : '/' + loader.getDirName());

                    wareOrder = isMain ? config.readWithDefaults('middleware', mainWare) : config.readWithDefaults('middleware', subWare);

                    app = isMain ? (0, _express2['default'])() : config.read('router') === true ? _express2['default'].Router() : (0, _express2['default'])();

                    wareOrder.forEach(function (mware) {
                        return _WebMiddleWareRegistry2['default'].get(mware)(mountPoint, app, config, loader, project);
                    });

                    _WebRouting2['default'].configure(app, loader.loadFromConf('routes', []), config);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViQXBwbGljYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFBcUIsVUFBVTs7Ozt1QkFDWCxTQUFTOzs7OzRCQUNMLGdCQUFnQjs7OztnQ0FDWCxxQkFBcUI7Ozs7NkJBQ3hCLGtCQUFrQjs7Ozt1QkFDeEIsV0FBVzs7OztnQ0FDRixvQkFBb0I7Ozs7MEJBQzFCLGNBQWM7Ozs7cUNBQ0gseUJBQXlCOzs7OytCQUMvQixtQkFBbUI7Ozs7QUFFL0MsSUFBSSxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUNqRCxhQUFhLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN2RCxJQUFJLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztJQUVuQixjQUFjO2NBQWQsY0FBYzs7YUFBZCxjQUFjOzhCQUFkLGNBQWM7O21DQUFkLGNBQWM7OztpQkFBZCxjQUFjOztlQUViLGVBQUc7OztBQUVGLG1CQUFPLHlCQUFZLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN2QyxJQUFJLENBQUMsWUFBSzs7QUFFTixvQkFBSSxHQUFHLENBQUM7QUFDUixvQkFBSSxNQUFNLENBQUM7QUFDWCxvQkFBSSxNQUFNLENBQUM7QUFDWCxvQkFBSSxTQUFTLENBQUM7QUFDZCxvQkFBSSxRQUFRLEdBQUcsTUFBSyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsb0JBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixvQkFBSSxVQUFVLENBQUM7QUFDZixvQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDOztBQUVsQix3QkFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFLLElBQUksQ0FBQyxDQUFDOztBQUU1Qix3QkFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBSTs7QUFFekIsMEJBQU0sR0FBRyxPQUFPLENBQUMs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LENBQUMsQ0FBQTtxQkFDTDtpQkFDUixDQUFDLFNBQ0csQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNqQiwwQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1osMkJBQU8sR0FBRyxDQUFDO2lCQUNkLENBQUMsQ0FBQzthQUNWLENBQUMsQ0FBQztTQUVOOzs7V0F6RkMsY0FBYzs7O3FCQTRGTCxjQUFjIiwiZmlsZSI6IldlYkFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAgJ2JsdWViaXJkJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4uL0FwcGxpY2F0aW9uJztcbmltcG9ydCBQb3dlcnN0b25lU2VydmVyIGZyb20gJy4uL1Bvd2Vyc3RvbmVTZXJ2ZXInO1xuaW1wb3J0IE1hbmFnZWRTZXJ2ZXIgZnJvbSAnLi4vTWFuYWdlZFNlcnZlcic7XG5pbXBvcnQgQnVpbHRpbiBmcm9tICcuL0J1aWx0aW4nO1xuaW1wb3J0IFdlYlNlcnZlckZhY3RvcnkgZnJvbSAnLi9XZWJTZXJ2ZXJGYWN0b3J5JztcbmltcG9ydCBXZWJSb3V0aW5nIGZyb20gJy4vV2ViUm91dGluZyc7XG5pbXBvcnQgV2ViTWlkZGxlV2FyZVJlZ2lzdHJ5IGZyb20gJy4vV2ViTWlkZGxlV2FyZVJlZ2lzdHJ5JztcbmltcG9ydCBXZWJWaWV3UmVnaXN0cnkgZnJvbSAnLi9XZWJWaWV3UmVnaXN0cnknO1xuXG52YXIgbWFpbldhcmUgPSBbJ3B1YmxpYycsICdtZXRob2Qtb3ZlcnJpZGUnLCAnbW9yZ2FuJyxcbiAgICAnYm9keS1wYXJzZXInLCAnY29va2llLXBhcnNlcicsICdzZXNzaW9uJywgJ2NzcmYnXTtcbnZhciBzdWJXYXJlID0gWydwdWJsaWMnXTtcblxuY2xhc3MgV2ViQXBwbGljYXRpb24gZXh0ZW5kcyBBcHBsaWNhdGlvbiB7XG5cbiAgICBydW4oKSB7XG5cbiAgICAgICAgcmV0dXJuIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5ydW4uY2FsbCh0aGlzKS5cbiAgICAgICAgICAgIHRoZW4oKCk9PiB7XG5cbiAgICAgICAgICAgICAgICB2YXIgYXBwO1xuICAgICAgICAgICAgICAgIHZhciBjb25maWc7XG4gICAgICAgICAgICAgICAgdmFyIGxvYWRlcjtcbiAgICAgICAgICAgICAgICB2YXIgd2FyZU9yZGVyO1xuICAgICAgICAgICAgICAgIHZhciBwcm9qZWN0cyA9IHRoaXMucHJvamVjdHMuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICB2YXIgbW91bnRhaW4gPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgbW91bnRQb2ludDtcbiAgICAgICAgICAgICAgICB2YXIgaXNNYWluID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHByb2plY3RzLnVuc2hpZnQodGhpcy5tYWluKTtcblxuICAgICAgICAgICAgICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IHByb2plY3QuZ2V0Q29uZmlndXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBsb2FkZXIgPSBwcm9qZWN0LmdldExvYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBpc01haW4gPSBwcm9qZWN0LmlzTWFpbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIG1vdW50UG9pbnQgPSBjb25maWcucmVhZFdpdGhEZWZhdWx0cygnbW91bnRfcG9pbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGlzTWFpbik/ICcnOicvJytsb2FkZXIuZ2V0RGlyTmFtZSgpKTtcblxuICAgICAgICAgICAgICAgICAgICB3YXJlT3JkZXIgPSAoaXNNYWluKT9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5yZWFkV2l0aERlZmF1bHRzKCdtaWRkbGV3YXJlJywgbWFpbldhcmUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5yZWFkV2l0aERlZmF1bHRzKCdtaWRkbGV3YXJlJywgc3ViV2FyZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgYXBwID0gKGlzTWFpbik/XG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzKCk6KGNvbmZpZy5yZWFkKCdyb3V0ZXInKT09PXRydWUpP1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzcy5Sb3V0ZXIoKTpleHByZXNzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgd2FyZU9yZGVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yRWFjaChtd2FyZT0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgV2ViTWlkZGxlV2FyZVJlZ2lzdHJ5LmdldChtd2FyZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91bnRQb2ludCwgYXBwLCBjb25maWcsIGxvYWRlciwgcHJvamVjdCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIFdlYlJvdXRpbmcuY29uZmlndXJlKGFwcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlci5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkRnJvbUNvbmYoJ3JvdXRlcycsIFtdKSwgY29uZmlnKTtcblxuICAgICAgICAgICAgICAgICAgICBXZWJWaWV3UmVnaXN0cnkuZ2V0KGNvbmZpZy5yZWFkV2l0aERlZmF1bHRzKCd2aWV3X2VuZ2luZScsJ251bmp1Y2tzJykpXG4gICAgICAgICAgICAgICAgICAgIChhcHAsIGNvbmZpZywgbG9hZGVyLCBwcm9qZWN0KTtcblxuICAgICAgICAgICAgICAgICAgICBtb3VudGFpbi5wdXNoKHtwb2ludDptb3VudFBvaW50LCBhcHA6YXBwfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciBtYWluQXBwID0gbW91bnRhaW4uc2hpZnQoKVsnYXBwJ107XG4gICAgICAgICAgICAgICAgbW91bnRhaW4uZm9yRWFjaChtb3VudD0+bWFpbkFwcC51c2UobW91bnQucG9pbnQsIG1vdW50LmFwcCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNlcnZlciA9IG5ldyBNYW5hZ2VkU2VydmVyKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5yZWFkV2l0aERlZmF1bHRzKCdwb3J0JywgcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcucmVhZFdpdGhEZWZhdWx0cygnaG9zdCcsIHByb2Nlc3MuZW52LkhPU1QgfHwgJzAuMC4wLjAnKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFBvd2Vyc3RvbmVTZXJ2ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICBXZWJTZXJ2ZXJGYWN0b3J5LmNyZWF0ZShtYWluQXBwLCB0aGlzLmNvbmZpZy5odHRwcykpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2ZXIuc3RhcnQoKS5cbiAgICAgICAgICAgICAgICAgICAgdGhlbih0aGlzLnNlcnZlclN0YXJ0ZWQpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHNodXRkb3duKCkge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICBzZWxmLnNlcnZlci5zaHV0ZG93bigpLlxuICAgICAgICAgICAgICAgIHRoZW4oZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLmRhdGFiYXNlcylcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmRhdGFiYXNlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhYmFzZXNba2V5XS5jbG9zZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLlxuICAgICAgICAgICAgICAgIGNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWJBcHBsaWNhdGlvblxuIl19