'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _Application2 = require('../Application');

var _Application3 = _interopRequireDefault(_Application2);

var _PowerstoneServer = require('../PowerstoneServer');

var _PowerstoneServer2 = _interopRequireDefault(_PowerstoneServer);

var _ManagedServer = require('../ManagedServer');

var _ManagedServer2 = _interopRequireDefault(_ManagedServer);

var _Builtin = require('./Builtin');

var _Builtin2 = _interopRequireDefault(_Builtin);

var _WebAppRoutingFramework = require('./WebAppRoutingFramework');

var _WebAppRoutingFramework2 = _interopRequireDefault(_WebAppRoutingFramework);

var _WebAppFramework = require('./WebAppFramework');

var _WebAppFramework2 = _interopRequireDefault(_WebAppFramework);

var _StringConversion = require('./StringConversion');

var _StringConversion2 = _interopRequireDefault(_StringConversion);

var _defaultConfig2 = require('./defaultConfig');

var _defaultConfig3 = _interopRequireDefault(_defaultConfig2);

var _WebServerFactory = require('./WebServerFactory');

var _WebServerFactory2 = _interopRequireDefault(_WebServerFactory);

var WebApplication = (function (_Application) {
    function WebApplication() {
        _classCallCheck(this, WebApplication);

        if (_Application != null) {
            _Application.apply(this, arguments);
        }
    }

    _inherits(WebApplication, _Application);

    _createClass(WebApplication, [{
        key: '_defaultConfig',
        value: function _defaultConfig() {
            return _defaultConfig3['default'];
        }
    }, {
        key: 'getAppViewEngine',
        value: function getAppViewEngine(path, app) {

            return _nunjucks2['default'].configure(path, {
                autoescape: true,
                express: app
            });
        }
    }, {
        key: 'run',
        value: function run() {

            var self = this;

            //If the session config describes a store we use it to configure a connection.
            if (self.config.session) if (self.config.session.store) self.connections.create('session', self.config.session.store.type, self.config.session.store.options);

            return _Application3['default'].prototype.run.call(this).then(function () {
                var app = (0, _express2['default'])();
                var routingFramework = new _WebAppRoutingFramework2['default'](_express2['default'].Router(), new _StringConversion2['default']());
                var appFramework = new _WebAppFramework2['default'](app, self.config);
                var conf = self.config;

                conf.views = conf.views || 'views';
                conf.views = self.parent + '/' + conf.views;
                conf['public'] = conf['public'] || 'public';

                appFramework.usePublic(self.parent).useMethodOverride().useLogging().useBodyParser().useCookieParser().useSessions(self.connections).useCSRF();

                self.routes.forEach(function (route) {
                    routingFramework.configureSchema(route);
                    routingFramework.configureMiddleWare(route, self.middleware);
                    routingFramework.configureQueries(route, self.models, self.queries);
                    routingFramework.configureControllers(route, self.controllers);
                    routingFramework.configureViews(route);
                });

                self.getAppViewEngine(conf.views, app);
                app.use('/', routingFramework.toRouter());
                app.use(_Builtin2['default'].send404Page);

                var server = new _ManagedServer2['default'](conf.port, conf.host, new _PowerstoneServer2['default'](_WebServerFactory2['default'].create(app, conf.https)));

                return server.start().then(self.serverStarted);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViQXBwbGljYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7d0JBQXFCLFVBQVU7Ozs7dUJBQ1gsU0FBUzs7OztzQkFDVixRQUFROzs7O3dCQUNOLFVBQVU7Ozs7NEJBQ1AsZ0JBQWdCOzs7O2dDQUNYLHFCQUFxQjs7Ozs2QkFDeEIsa0JBQWtCOzs7O3VCQUN4QixXQUFXOzs7O3NDQUNJLDBCQUEwQjs7OzsrQkFDakMsbUJBQW1COzs7O2dDQUNuQixvQkFBb0I7Ozs7OEJBQ3RCLGlCQUFpQjs7OztnQ0FDZCxvQkFBb0I7Ozs7SUFFM0MsY0FBYzthQUFkLGNBQWM7OEJBQWQsY0FBYzs7Ozs7OztjQUFkLGNBQWM7O2lCQUFkLGNBQWM7O2VBRUYsMEJBQUc7QUFDYiw4Q0FBcUI7U0FDeEI7OztlQUVlLDBCQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7O0FBRXhCLG1CQUFPLHNCQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUU7QUFDNUIsMEJBQVUsRUFBRSxJQUFJO0FBQ2hCLHVCQUFPLEVBQUUsR0FBRzthQUNmLENBQUMsQ0FBQztTQUVOOzs7ZUFFRSxlQUFHOztBQUVGLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUM7OztBQUdoQixnQkFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRS9FLG1CQUFPLHlCQUFZLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN2QyxJQUFJLENBQUMsWUFBWTtBQUNiLG9CQUFJLEdBQUcsR0FBRywyQkFBUyxDQUFDO0FBQ3BCLG9CQUFJLGdCQUFnQixHQUFHLHdDQUEyQixxQkFBUSxNQUFNLEVBQUUsRUFBRSxtQ0FBc0IsQ0FBQyxDQUFDO0FBQzVGLG9CQUFJLFlBQVksR0FBRyxpQ0FBb0IsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6RCxvQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7QUFFdkIsb0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUM7QUFDbkMsb0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUM1QyxvQkFBSSxVQUFPLEdBQUcsSUFBSSxVQUFPLElBQUksUUFBUSxDQUFDOztBQUV0Qyw0QkFBWSxDQUNSLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQ3RCLGlCQUFpQixFQUFFLENBQ25CLFVBQVUsRUFBRSxDQUNaLGFBQWEsRUFBRSxDQUNmLGVBQWUsRUFBRSxDQUNqQixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUM3QixPQUFPLEVBQUUsQ0FBQzs7QUFFZCxvQkFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLEVBQUU7QUFDakMsb0NBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLG9DQUFnQixDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDN0Qsb0NBQWdCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BFLG9DQUFnQixDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDL0Qsb0NBQWdCLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQyxDQUFDLENBQUM7O0FBRUgsb0JBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLG1CQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLG1CQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFRLFdBQVcsQ0FBQyxDQUFDOztBQUU3QixvQkFBSSxNQUFNLEdBQUcsK0JBQ1QsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsSUFBSSxFQUNULGtDQUNJLDhCQUFpQixNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRW5ELHVCQUFPLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUVoQyxDQUFDLENBQUM7U0FFVjs7O2VBRU8sb0JBQUc7O0FBRVAsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFaEIsbUJBQU8sMEJBQVksVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFOztBQUUxQyxvQkFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FDbEIsSUFBSSxDQUFDLFlBQVk7O0FBRWIseUJBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFDMUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNwQyw0QkFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUNsQyxtQ0FBTyxFQUFFLENBQUM7eUJBQ2IsQ0FBQyxDQUFBO3FCQUNMO2lCQUNSLENBQUMsU0FDRyxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ2pCLDBCQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDWiwyQkFBTyxHQUFHLENBQUM7aUJBQ2QsQ0FBQyxDQUFDO2FBQ1YsQ0FBQyxDQUFDO1NBRU47OztXQTVGQyxjQUFjOzs7cUJBK0ZMLGNBQWMiLCJmaWxlIjoiV2ViQXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICAnYmx1ZWJpcmQnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgbnVuanVja3MgZnJvbSAnbnVuanVja3MnO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4uL0FwcGxpY2F0aW9uJztcbmltcG9ydCBQb3dlcnN0b25lU2VydmVyIGZyb20gJy4uL1Bvd2Vyc3RvbmVTZXJ2ZXInO1xuaW1wb3J0IE1hbmFnZWRTZXJ2ZXIgZnJvbSAnLi4vTWFuYWdlZFNlcnZlcic7XG5pbXBvcnQgQnVpbHRpbiBmcm9tICcuL0J1aWx0aW4nO1xuaW1wb3J0IFdlYkFwcFJvdXRpbmdGcmFtZXdvcmsgZnJvbSAnLi9XZWJBcHBSb3V0aW5nRnJhbWV3b3JrJztcbmltcG9ydCBXZWJBcHBGcmFtZXdvcmsgZnJvbSAnLi9XZWJBcHBGcmFtZXdvcmsnO1xuaW1wb3J0IFN0cmluZ0NvbnZlcnNpb24gZnJvbScuL1N0cmluZ0NvbnZlcnNpb24nO1xuaW1wb3J0IGRlZmF1bHRDb25maWcgZnJvbSAnLi9kZWZhdWx0Q29uZmlnJztcbmltcG9ydCBXZWJTZXJ2ZXJGYWN0b3J5IGZyb20gJy4vV2ViU2VydmVyRmFjdG9yeSc7XG5cbmNsYXNzIFdlYkFwcGxpY2F0aW9uIGV4dGVuZHMgQXBwbGljYXRpb24ge1xuXG4gICAgX2RlZmF1bHRDb25maWcoKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0Q29uZmlnO1xuICAgIH1cblxuICAgIGdldEFwcFZpZXdFbmdpbmUocGF0aCwgYXBwKSB7XG5cbiAgICAgICAgcmV0dXJuIG51bmp1Y2tzLmNvbmZpZ3VyZShwYXRoLCB7XG4gICAgICAgICAgICBhdXRvZXNjYXBlOiB0cnVlLFxuICAgICAgICAgICAgZXhwcmVzczogYXBwXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcnVuKCkge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvL0lmIHRoZSBzZXNzaW9uIGNvbmZpZyBkZXNjcmliZXMgYSBzdG9yZSB3ZSB1c2UgaXQgdG8gY29uZmlndXJlIGEgY29ubmVjdGlvbi5cbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLnNlc3Npb24pXG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWcuc2Vzc2lvbi5zdG9yZSlcbiAgICAgICAgICAgICAgICBzZWxmLmNvbm5lY3Rpb25zLmNyZWF0ZSgnc2Vzc2lvbicsXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLnNlc3Npb24uc3RvcmUudHlwZSwgc2VsZi5jb25maWcuc2Vzc2lvbi5zdG9yZS5vcHRpb25zKTtcblxuICAgICAgICByZXR1cm4gQXBwbGljYXRpb24ucHJvdG90eXBlLnJ1bi5jYWxsKHRoaXMpLlxuICAgICAgICAgICAgdGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFwcCA9IGV4cHJlc3MoKTtcbiAgICAgICAgICAgICAgICB2YXIgcm91dGluZ0ZyYW1ld29yayA9IG5ldyBXZWJBcHBSb3V0aW5nRnJhbWV3b3JrKGV4cHJlc3MuUm91dGVyKCksIG5ldyBTdHJpbmdDb252ZXJzaW9uKCkpO1xuICAgICAgICAgICAgICAgIHZhciBhcHBGcmFtZXdvcmsgPSBuZXcgV2ViQXBwRnJhbWV3b3JrKGFwcCwgc2VsZi5jb25maWcpO1xuICAgICAgICAgICAgICAgIHZhciBjb25mID0gc2VsZi5jb25maWc7XG5cbiAgICAgICAgICAgICAgICBjb25mLnZpZXdzID0gY29uZi52aWV3cyB8fCAndmlld3MnO1xuICAgICAgICAgICAgICAgIGNvbmYudmlld3MgPSBzZWxmLnBhcmVudCArICcvJyArIGNvbmYudmlld3M7XG4gICAgICAgICAgICAgICAgY29uZi5wdWJsaWMgPSBjb25mLnB1YmxpYyB8fCAncHVibGljJztcblxuICAgICAgICAgICAgICAgIGFwcEZyYW1ld29yay5cbiAgICAgICAgICAgICAgICAgICAgdXNlUHVibGljKHNlbGYucGFyZW50KS5cbiAgICAgICAgICAgICAgICAgICAgdXNlTWV0aG9kT3ZlcnJpZGUoKS5cbiAgICAgICAgICAgICAgICAgICAgdXNlTG9nZ2luZygpLlxuICAgICAgICAgICAgICAgICAgICB1c2VCb2R5UGFyc2VyKCkuXG4gICAgICAgICAgICAgICAgICAgIHVzZUNvb2tpZVBhcnNlcigpLlxuICAgICAgICAgICAgICAgICAgICB1c2VTZXNzaW9ucyhzZWxmLmNvbm5lY3Rpb25zKS5cbiAgICAgICAgICAgICAgICAgICAgdXNlQ1NSRigpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5yb3V0ZXMuZm9yRWFjaChmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGluZ0ZyYW1ld29yay5jb25maWd1cmVTY2hlbWEocm91dGUpO1xuICAgICAgICAgICAgICAgICAgICByb3V0aW5nRnJhbWV3b3JrLmNvbmZpZ3VyZU1pZGRsZVdhcmUocm91dGUsIHNlbGYubWlkZGxld2FyZSk7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRpbmdGcmFtZXdvcmsuY29uZmlndXJlUXVlcmllcyhyb3V0ZSwgc2VsZi5tb2RlbHMsIHNlbGYucXVlcmllcyk7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRpbmdGcmFtZXdvcmsuY29uZmlndXJlQ29udHJvbGxlcnMocm91dGUsIHNlbGYuY29udHJvbGxlcnMpO1xuICAgICAgICAgICAgICAgICAgICByb3V0aW5nRnJhbWV3b3JrLmNvbmZpZ3VyZVZpZXdzKHJvdXRlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHNlbGYuZ2V0QXBwVmlld0VuZ2luZShjb25mLnZpZXdzLCBhcHApO1xuICAgICAgICAgICAgICAgIGFwcC51c2UoJy8nLCByb3V0aW5nRnJhbWV3b3JrLnRvUm91dGVyKCkpO1xuICAgICAgICAgICAgICAgIGFwcC51c2UoQnVpbHRpbi5zZW5kNDA0UGFnZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2VydmVyID0gbmV3IE1hbmFnZWRTZXJ2ZXIoXG4gICAgICAgICAgICAgICAgICAgIGNvbmYucG9ydCxcbiAgICAgICAgICAgICAgICAgICAgY29uZi5ob3N0LFxuICAgICAgICAgICAgICAgICAgICBuZXcgUG93ZXJzdG9uZVNlcnZlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIFdlYlNlcnZlckZhY3RvcnkuY3JlYXRlKGFwcCwgY29uZi5odHRwcykpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2ZXIuc3RhcnQoKS5cbiAgICAgICAgICAgICAgICAgICAgdGhlbihzZWxmLnNlcnZlclN0YXJ0ZWQpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHNodXRkb3duKCkge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICBzZWxmLnNlcnZlci5zaHV0ZG93bigpLlxuICAgICAgICAgICAgICAgIHRoZW4oZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLmRhdGFiYXNlcylcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmRhdGFiYXNlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhYmFzZXNba2V5XS5jbG9zZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLlxuICAgICAgICAgICAgICAgIGNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWJBcHBsaWNhdGlvblxuIl19