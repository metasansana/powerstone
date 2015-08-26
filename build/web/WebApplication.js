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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViQXBwbGljYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFBcUIsVUFBVTs7Ozt1QkFDWCxTQUFTOzs7OzRCQUNMLGdCQUFnQjs7OztnQ0FDWCxxQkFBcUI7Ozs7NkJBQ3hCLGtCQUFrQjs7OztnQ0FDZixvQkFBb0I7Ozs7dUJBQzdCLFdBQVc7Ozs7cUNBQ0cseUJBQXlCOzs7OytCQUMvQixtQkFBbUI7Ozs7QUFFL0MsSUFBSSxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUNqRCxhQUFhLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN2RCxJQUFJLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztJQUVuQixjQUFjO2NBQWQsY0FBYzs7YUFBZCxjQUFjOzhCQUFkLGNBQWM7O21DQUFkLGNBQWM7OztpQkFBZCxjQUFjOztlQUViLGVBQUc7OztBQUVGLG1CQUFPLHlCQUFZLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN2QyxJQUFJLENBQUMsWUFBSzs7QUFFTixvQkFBSSxHQUFHLENBQUM7QUFDUixvQkFBSSxNQUFNLENBQUM7QUFDWCxvQkFBSSxNQUFNLENBQUM7QUFDWCxvQkFBSSxTQUFTLENBQUM7QUFDZCxvQkFBSSxRQUFRLEdBQUcsTUFBSyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsb0JBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixvQkFBSSxVQUFVLENBQUM7QUFDZixvQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDOztBQUVsQix3QkFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFLLElBQUksQ0FBQyxDQUFDOztBQUU1Qix3QkFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBSTs7QUFFekIsMEJBQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FB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LENBQUMsS0FBSyxDQUFDLFlBQVk7QUFDbEMsbUNBQU8sRUFBRSxDQUFDO3lCQUNiLENBQUMsQ0FBQTtxQkFDTDtpQkFDUixDQUFDLFNBQ0csQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNqQiwwQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1osMkJBQU8sR0FBRyxDQUFDO2lCQUNkLENBQUMsQ0FBQzthQUNWLENBQUMsQ0FBQztTQUVOOzs7V0ExRkMsY0FBYzs7O3FCQTZGTCxjQUFjIiwiZmlsZSI6IldlYkFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAgJ2JsdWViaXJkJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4uL0FwcGxpY2F0aW9uJztcbmltcG9ydCBQb3dlcnN0b25lU2VydmVyIGZyb20gJy4uL1Bvd2Vyc3RvbmVTZXJ2ZXInO1xuaW1wb3J0IE1hbmFnZWRTZXJ2ZXIgZnJvbSAnLi4vTWFuYWdlZFNlcnZlcic7XG5pbXBvcnQgV2ViU2VydmVyRmFjdG9yeSBmcm9tICcuL1dlYlNlcnZlckZhY3RvcnknO1xuaW1wb3J0IFJvdXRpbmcgZnJvbSAnLi9Sb3V0aW5nJztcbmltcG9ydCBXZWJNaWRkbGVXYXJlUmVnaXN0cnkgZnJvbSAnLi9XZWJNaWRkbGVXYXJlUmVnaXN0cnknO1xuaW1wb3J0IFdlYlZpZXdSZWdpc3RyeSBmcm9tICcuL1dlYlZpZXdSZWdpc3RyeSc7XG5cbnZhciBtYWluV2FyZSA9IFsncHVibGljJywgJ21ldGhvZC1vdmVycmlkZScsICdtb3JnYW4nLFxuICAgICdib2R5LXBhcnNlcicsICdjb29raWUtcGFyc2VyJywgJ3Nlc3Npb24nLCAnY3NyZiddO1xudmFyIHN1YldhcmUgPSBbJ3B1YmxpYyddO1xuXG5jbGFzcyBXZWJBcHBsaWNhdGlvbiBleHRlbmRzIEFwcGxpY2F0aW9uIHtcblxuICAgIHJ1bigpIHtcblxuICAgICAgICByZXR1cm4gQXBwbGljYXRpb24ucHJvdG90eXBlLnJ1bi5jYWxsKHRoaXMpLlxuICAgICAgICAgICAgdGhlbigoKT0+IHtcblxuICAgICAgICAgICAgICAgIHZhciBhcHA7XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZztcbiAgICAgICAgICAgICAgICB2YXIgbG9hZGVyO1xuICAgICAgICAgICAgICAgIHZhciB3YXJlT3JkZXI7XG4gICAgICAgICAgICAgICAgdmFyIHByb2plY3RzID0gdGhpcy5wcm9qZWN0cy5zbGljZSgpO1xuICAgICAgICAgICAgICAgIHZhciBtb3VudGFpbiA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBtb3VudFBvaW50O1xuICAgICAgICAgICAgICAgIHZhciBpc01haW4gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgcHJvamVjdHMudW5zaGlmdCh0aGlzLm1haW4pO1xuXG4gICAgICAgICAgICAgICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCk9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gcHJvamVjdC5nZXRDb25maWd1cmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRlciA9IHByb2plY3QuZ2V0TG9hZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGlzTWFpbiA9IHByb2plY3QuaXNNYWluKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbW91bnRQb2ludCA9IGNvbmZpZy5yZWFkV2l0aERlZmF1bHRzKCdtb3VudF9wb2ludCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAoaXNNYWluKT8gJyc6KGNvbmZpZy5yZWFkV2l0aERlZmF1bHRzKCdtb3VudF9yb290JyxmYWxzZSkpP1xuICAgICAgICAgICAgICAgICAgICAgICAgJyc6Jy8nK2xvYWRlci5nZXREaXJOYW1lKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHdhcmVPcmRlciA9IChpc01haW4pP1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLnJlYWRXaXRoRGVmYXVsdHMoJ21pZGRsZXdhcmUnLCBtYWluV2FyZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLnJlYWRXaXRoRGVmYXVsdHMoJ21pZGRsZXdhcmUnLCBzdWJXYXJlKTtcblxuICAgICAgICAgICAgICAgICAgICBhcHAgPSAoaXNNYWluKT9cbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3MoKTooY29uZmlnLnJlYWQoJ3JvdXRlcicpPT09dHJ1ZSk/XG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzLlJvdXRlcigpOmV4cHJlc3MoKTtcblxuICAgICAgICAgICAgICAgICAgICB3YXJlT3JkZXIuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JFYWNoKG13YXJlPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZWJNaWRkbGVXYXJlUmVnaXN0cnkuZ2V0KG13YXJlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VudFBvaW50LCBhcHAsIGNvbmZpZywgbG9hZGVyLCBwcm9qZWN0KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgUm91dGluZy5jb25maWd1cmUoYXBwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRGcm9tQ29uZigncm91dGVzJywgW10pLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgICAgIFdlYlZpZXdSZWdpc3RyeS5nZXQoY29uZmlnLnJlYWRXaXRoRGVmYXVsdHMoJ3ZpZXdfZW5naW5lJywnbnVuanVja3MnKSlcbiAgICAgICAgICAgICAgICAgICAgKGFwcCwgY29uZmlnLCBsb2FkZXIsIHByb2plY3QpO1xuXG4gICAgICAgICAgICAgICAgICAgIG1vdW50YWluLnB1c2goe3BvaW50Om1vdW50UG9pbnQsIGFwcDphcHB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIG1haW5BcHAgPSBtb3VudGFpbi5zaGlmdCgpWydhcHAnXTtcbiAgICAgICAgICAgICAgICBtb3VudGFpbi5mb3JFYWNoKG1vdW50PT5tYWluQXBwLnVzZShtb3VudC5wb2ludCwgbW91bnQuYXBwKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2VydmVyID0gbmV3IE1hbmFnZWRTZXJ2ZXIoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnJlYWRXaXRoRGVmYXVsdHMoJ3BvcnQnLCBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDApLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5yZWFkV2l0aERlZmF1bHRzKCdob3N0JywgcHJvY2Vzcy5lbnYuSE9TVCB8fCAnMC4wLjAuMCcpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgUG93ZXJzdG9uZVNlcnZlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIFdlYlNlcnZlckZhY3RvcnkuY3JlYXRlKG1haW5BcHAsIHRoaXMuY29uZmlnLmh0dHBzKSkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZlci5zdGFydCgpLlxuICAgICAgICAgICAgICAgICAgICB0aGVuKHRoaXMuc2VydmVyU3RhcnRlZCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc2h1dGRvd24oKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIHNlbGYuc2VydmVyLnNodXRkb3duKCkuXG4gICAgICAgICAgICAgICAgdGhlbihmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHNlbGYuZGF0YWJhc2VzKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuZGF0YWJhc2VzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGFiYXNlc1trZXldLmNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuXG4gICAgICAgICAgICAgICAgY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYkFwcGxpY2F0aW9uXG4iXX0=