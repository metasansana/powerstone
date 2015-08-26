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

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _ServerFactory = require('../ServerFactory');

var _ServerFactory2 = _interopRequireDefault(_ServerFactory);

var _Application2 = require('../Application');

var _Application3 = _interopRequireDefault(_Application2);

var _PowerstoneServer = require('../PowerstoneServer');

var _PowerstoneServer2 = _interopRequireDefault(_PowerstoneServer);

var _ManagedServer = require('../ManagedServer');

var _ManagedServer2 = _interopRequireDefault(_ManagedServer);

var _Routing = require('./Routing');

var _Routing2 = _interopRequireDefault(_Routing);

var _Plugins = require('./Plugins');

var _Plugins2 = _interopRequireDefault(_Plugins);

var DEFAULT_PLUGINS = [];

var RESTApplication = (function (_Application) {
    _inherits(RESTApplication, _Application);

    function RESTApplication() {
        _classCallCheck(this, RESTApplication);

        _get(Object.getPrototypeOf(RESTApplication.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(RESTApplication, [{
        key: 'run',
        value: function run() {
            var _this = this;

            return _Application3['default'].prototype.run.call(this).then(function () {

                var server = _ServerFactory2['default'].createRESTServer(_this.config.readWithDefaults('https', undefined));
                var config;
                var loader;
                var projects = _this.projects.slice();
                var plugins;

                projects.unshift(_this.main);

                projects.forEach(function (project) {

                    config = project.getConfiguration();
                    loader = project.getLoader();
                    plugins = config.readWithDefaults('plugins', DEFAULT_PLUGINS);
                    plugins.forEach(function (plugin) {
                        return _Plugins2['default'].get(plugin)(server, config, loader, project);
                    });
                    _Routing2['default'].configure(server, loader.loadFromConf('routes', []), config);
                });

                var server = new _ManagedServer2['default'](_this.config.readWithDefaults('port', process.env.PORT || 3000), _this.config.readWithDefaults('host', process.env.HOST || '0.0.0.0'), new _PowerstoneServer2['default'](server));

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

    return RESTApplication;
})(_Application3['default']);

exports['default'] = RESTApplication;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXN0L1JFU1RBcHBsaWNhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3dCQUFvQixVQUFVOzs7O3VCQUNWLFNBQVM7Ozs7NkJBQ0gsa0JBQWtCOzs7OzRCQUNwQixnQkFBZ0I7Ozs7Z0NBQ1gscUJBQXFCOzs7OzZCQUN4QixrQkFBa0I7Ozs7dUJBQ3hCLFdBQVc7Ozs7dUJBQ1gsV0FBVzs7OztBQUUvQixJQUFNLGVBQWUsR0FBQyxFQUFFLENBQUM7O0lBRW5CLGVBQWU7Y0FBZixlQUFlOzthQUFmLGVBQWU7OEJBQWYsZUFBZTs7bUNBQWYsZUFBZTs7O2lCQUFmLGVBQWU7O2VBRWQsZUFBRzs7O0FBRUYsbUJBQU8seUJBQVksU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQzNDLElBQUksQ0FBQyxZQUFLOztBQUVOLG9CQUFJLE1BQU0sR0FBRywyQkFBYyxnQkFBZ0IsQ0FBQyxNQUFLLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUM5RixvQkFBSSxNQUFNLENBQUM7QUFDWCxvQkFBSSxNQUFNLENBQUM7QUFDWCxvQkFBSSxRQUFRLEdBQUcsTUFBSyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsb0JBQUksT0FBTyxDQUFDOztBQUVaLHdCQUFRLENBQUMsT0FBTyxDQUFDLE1BQUssSUFBSSxDQUFDLENBQUM7O0FBRTVCLHdCQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFJOztBQUV6QiwwQkFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0FBQ3BDLDBCQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzdCLDJCQUFPLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUM5RCwyQkFBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07K0JBQUUscUJBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQztxQkFBQSxDQUFDLENBQUM7QUFDM0UseUNBQVEsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFFeEUsQ0FBQyxDQUFDOztBQUVILG9CQUFJLE1BQU0sR0FBRywrQkFDVCxNQUFLLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQzlELE1BQUssTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsRUFDbkUsa0NBQXFCLE1BQU0sQ0FBQyxDQUFDLENBQUM7O0FBRWxDLHVCQUFPLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBSyxhQUFhLENBQUMsQ0FBQzthQUVsRCxDQUFDLENBQUM7U0FFVjs7O2VBRU8sb0JBQUc7O0FBRVAsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFaEIsbUJBQU8sMEJBQVksVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFOztBQUUxQyxvQkFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FDdEIsSUFBSSxDQUFDLFlBQVk7O0FBRWIseUJBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFDMUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNwQyw0QkFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUNsQyxtQ0FBTyxFQUFFLENBQUM7eUJBQ2IsQ0FBQyxDQUFBO3FCQUNMO2lCQUNKLENBQUMsU0FDRCxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ2pCLDBCQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDWiwyQkFBTyxHQUFHLENBQUM7aUJBQ2QsQ0FBQyxDQUFDO2FBQ04sQ0FBQyxDQUFDO1NBRU47OztXQTFESyxlQUFlOzs7cUJBNkROLGVBQWUiLCJmaWxlIjoiUkVTVEFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHJlc3RpZnkgZnJvbSAncmVzdGlmeSc7XG5pbXBvcnQgU2VydmVyRmFjdG9yeSBmcm9tICcuLi9TZXJ2ZXJGYWN0b3J5JztcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuLi9BcHBsaWNhdGlvbic7XG5pbXBvcnQgUG93ZXJzdG9uZVNlcnZlciBmcm9tICcuLi9Qb3dlcnN0b25lU2VydmVyJztcbmltcG9ydCBNYW5hZ2VkU2VydmVyIGZyb20gJy4uL01hbmFnZWRTZXJ2ZXInO1xuaW1wb3J0IFJvdXRpbmcgZnJvbSAnLi9Sb3V0aW5nJztcbmltcG9ydCBQbHVnaW5zIGZyb20gJy4vUGx1Z2lucyc7XG5cbmNvbnN0IERFRkFVTFRfUExVR0lOUz1bXTtcblxuY2xhc3MgUkVTVEFwcGxpY2F0aW9uIGV4dGVuZHMgQXBwbGljYXRpb24ge1xuXG4gICAgcnVuKCkge1xuXG4gICAgICAgIHJldHVybiBBcHBsaWNhdGlvbi5wcm90b3R5cGUucnVuLmNhbGwodGhpcykuXG4gICAgICAgIHRoZW4oKCk9PiB7XG5cbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBTZXJ2ZXJGYWN0b3J5LmNyZWF0ZVJFU1RTZXJ2ZXIodGhpcy5jb25maWcucmVhZFdpdGhEZWZhdWx0cygnaHR0cHMnLCB1bmRlZmluZWQpKTtcbiAgICAgICAgICAgIHZhciBjb25maWc7XG4gICAgICAgICAgICB2YXIgbG9hZGVyO1xuICAgICAgICAgICAgdmFyIHByb2plY3RzID0gdGhpcy5wcm9qZWN0cy5zbGljZSgpO1xuICAgICAgICAgICAgdmFyIHBsdWdpbnM7XG5cbiAgICAgICAgICAgIHByb2plY3RzLnVuc2hpZnQodGhpcy5tYWluKTtcblxuICAgICAgICAgICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCk9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25maWcgPSBwcm9qZWN0LmdldENvbmZpZ3VyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBsb2FkZXIgPSBwcm9qZWN0LmdldExvYWRlcigpO1xuICAgICAgICAgICAgICAgIHBsdWdpbnMgPSBjb25maWcucmVhZFdpdGhEZWZhdWx0cygncGx1Z2lucycsIERFRkFVTFRfUExVR0lOUyk7XG4gICAgICAgICAgICAgICAgcGx1Z2lucy5mb3JFYWNoKHBsdWdpbj0+UGx1Z2lucy5nZXQocGx1Z2luKShzZXJ2ZXIsY29uZmlnLGxvYWRlcixwcm9qZWN0KSk7XG4gICAgICAgICAgICAgICAgUm91dGluZy5jb25maWd1cmUoc2VydmVyLCBsb2FkZXIubG9hZEZyb21Db25mKCdyb3V0ZXMnLCBbXSksIGNvbmZpZyk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgc2VydmVyID0gbmV3IE1hbmFnZWRTZXJ2ZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcucmVhZFdpdGhEZWZhdWx0cygncG9ydCcsIHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCksXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcucmVhZFdpdGhEZWZhdWx0cygnaG9zdCcsIHByb2Nlc3MuZW52LkhPU1QgfHwgJzAuMC4wLjAnKSxcbiAgICAgICAgICAgICAgICBuZXcgUG93ZXJzdG9uZVNlcnZlcihzZXJ2ZXIpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlcnZlci5zdGFydCgpLnRoZW4odGhpcy5zZXJ2ZXJTdGFydGVkKTtcblxuICAgICAgICB9KTtcblxufVxuXG5zaHV0ZG93bigpIHtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgc2VsZi5zZXJ2ZXIuc2h1dGRvd24oKS5cbiAgICAgICAgdGhlbihmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLmRhdGFiYXNlcylcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kYXRhYmFzZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGFiYXNlc1trZXldLmNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5cbiAgICAgICAgY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufVxufVxuXG5leHBvcnQgZGVmYXVsdCBSRVNUQXBwbGljYXRpb25cbiJdfQ==