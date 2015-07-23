'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _tasks = require('./tasks');

var _tasks2 = _interopRequireDefault(_tasks);

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Configuration = require('./Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

var _connConnections = require('./conn/Connections');

var _connConnections2 = _interopRequireDefault(_connConnections);

var _Project = require('./Project');

var _Project2 = _interopRequireDefault(_Project);

var _ProjectRegistry = require('./ProjectRegistry');

var _ProjectRegistry2 = _interopRequireDefault(_ProjectRegistry);

var _TaskRecorders = require('./TaskRecorders');

var _TaskRecorders2 = _interopRequireDefault(_TaskRecorders);

/**
 * flattenRoutes turns the conf/route.json file contents into one flat array.
 * @return {Array}
 */
var flattenRoutes = function flattenRoutes(routes) {

    var flat = [];

    routes.forEach(function (route) {

        route.routes.forEach(function (entry) {

            flat.push(entry);
        });
    });

    return flat;
};

/**
 * Application
 * @param {String} path
 */

var Application = (function () {
    function Application(path) {
        _classCallCheck(this, Application);

        this.name = 'default';
        this.path = path;
        this.loader = null;
        this.config = null;
        this.main = null;
        this.projects = [];
    }

    _createClass(Application, [{
        key: 'getModelByName',

        /**
         * getModelByName should be overwritten to provide models for queries.
         */
        value: function getModelByName(name) {
            throw new Error('getModelByName() must be overwritten before a target can be provided. Target: ' + name + '.');
        }
    }, {
        key: 'run',

        /**
         * run
         * @return {Promise}
         */
        value: function run() {
            var _this = this;

            this.loader = new _Loader2['default'](this.path);
            this.config = new _Configuration2['default'](this.loader.loadFromConf('config'));
            this.main = new _Project2['default']('', this.config, this.loader);
            this.projects.push(this.main);
            this.projects = this.projects.concat(this.main.getSubProjects());
            this.projects.forEach(function (project) {
                return project.runPlugins();
            });
            this.projects.forEach(function (project) {
                return project.setConnections(_connConnections2['default']);
            });

            return _connConnections2['default'].open().then(function () {
                _this.projects.forEach(function (project) {
                    return project.register(_ProjectRegistry2['default']);
                });
            }).then(function () {

                var runner = new _tasks2['default'].Runner(_ProjectRegistry2['default'].getTasks(), _TaskRecorders2['default'].create(_this.config.readWithDefaults('tasks.recorder', 'console')));

                return runner.runAllTasks();
            });
        }
    }, {
        key: 'serverCreated',
        value: function serverCreated() {}
    }, {
        key: 'serverStarted',
        value: function serverStarted() {}
    }]);

    return Application;
})();

exports['default'] = Application;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHBsaWNhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7d0JBQW9CLFVBQVU7Ozs7cUJBQ1osU0FBUzs7OztzQkFDUixVQUFVOzs7OzZCQUNILGlCQUFpQjs7OzsrQkFDbkIsb0JBQW9COzs7O3VCQUN4QixXQUFXOzs7OytCQUNILG1CQUFtQjs7Ozs2QkFDckIsaUJBQWlCOzs7Ozs7OztBQU0zQyxJQUFJLGFBQWEsR0FBRyxTQUFoQixhQUFhLENBQWEsTUFBTSxFQUFFOztBQUVsQyxRQUFJLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRWQsVUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssRUFBRTs7QUFFNUIsYUFBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLEVBQUU7O0FBRWxDLGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBRXBCLENBQUMsQ0FBQTtLQUNMLENBQUMsQ0FBQzs7QUFFSCxXQUFPLElBQUksQ0FBQztDQUVmLENBQUM7Ozs7Ozs7SUFNSSxXQUFXO0FBRUYsYUFGVCxXQUFXLENBRUQsSUFBSSxFQUFFOzhCQUZoQixXQUFXOztBQUdULFlBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQ3RCLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFlBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0tBQ3RCOztpQkFUQyxXQUFXOzs7Ozs7ZUFjQyx3QkFBQyxJQUFJLEVBQUU7QUFDakIsa0JBQU0sSUFBSSxLQUFLLENBQUMsZ0ZBQWdGLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2xIOzs7Ozs7OztlQU1FLGVBQUc7OztBQUVGLGdCQUFJLENBQUMsTUFBTSxHQUFHLHdCQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxnQkFBSSxDQUFDLE1BQU0sR0FBRywrQkFBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNwRSxnQkFBSSxDQUFDLElBQUksR0FBRyx5QkFBWSxFQUFFLEVBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckQsZ0JBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QixnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFDakUsZ0JBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTzt1QkFBRSxPQUFPLENBQUMsVUFBVSxFQUFFO2FBQUEsQ0FBQyxDQUFDO0FBQ3JELGdCQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87dUJBQUUsT0FBTyxDQUFDLGNBQWMsOEJBQWE7YUFBQSxDQUFDLENBQUM7O0FBRXBFLG1CQUFPLDZCQUFZLElBQUksRUFBRSxDQUNyQixJQUFJLENBQUMsWUFBSztBQUNOLHNCQUFLLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPOzJCQUFFLE9BQU8sQ0FBQyxRQUFRLDhCQUFpQjtpQkFBQSxDQUFDLENBQUM7YUFDckUsQ0FBQyxDQUNGLElBQUksQ0FBQyxZQUFLOztBQUVMLG9CQUFJLE1BQU0sR0FBRyxJQUFJLG1CQUFNLE1BQU0sQ0FDMUIsNkJBQWdCLFFBQVEsRUFBRSxFQUMxQiwyQkFBYyxNQUFNLENBQUMsTUFBSyxNQUFNLENBQzVCLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFeEQsdUJBQU8sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBRS9CLENBQUMsQ0FBQztTQUNWOzs7ZUFFWSx5QkFBRyxFQUFFOzs7ZUFFTCx5QkFBRyxFQUFFOzs7V0FsRGhCLFdBQVc7OztxQkFzREYsV0FBVyIsImZpbGUiOiJBcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcbmltcG9ydCBMb2FkZXIgZnJvbSAnLi9Mb2FkZXInO1xuaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi9Db25maWd1cmF0aW9uJztcbmltcG9ydCBDb25uZWN0aW9ucyBmcm9tICcuL2Nvbm4vQ29ubmVjdGlvbnMnO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBQcm9qZWN0UmVnaXN0cnkgZnJvbSAnLi9Qcm9qZWN0UmVnaXN0cnknO1xuaW1wb3J0IFRhc2tSZWNvcmRlcnMgZnJvbSAnLi9UYXNrUmVjb3JkZXJzJztcblxuLyoqXG4gKiBmbGF0dGVuUm91dGVzIHR1cm5zIHRoZSBjb25mL3JvdXRlLmpzb24gZmlsZSBjb250ZW50cyBpbnRvIG9uZSBmbGF0IGFycmF5LlxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbnZhciBmbGF0dGVuUm91dGVzID0gZnVuY3Rpb24gKHJvdXRlcykge1xuXG4gICAgdmFyIGZsYXQgPSBbXTtcblxuICAgIHJvdXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChyb3V0ZSkge1xuXG4gICAgICAgIHJvdXRlLnJvdXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xuXG4gICAgICAgICAgICBmbGF0LnB1c2goZW50cnkpO1xuXG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmxhdDtcblxufTtcblxuLyoqXG4gKiBBcHBsaWNhdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAqL1xuY2xhc3MgQXBwbGljYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IocGF0aCkge1xuICAgICAgICB0aGlzLm5hbWUgPSAnZGVmYXVsdCc7XG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgICAgIHRoaXMubG9hZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb25maWcgPSBudWxsO1xuICAgICAgICB0aGlzLm1haW4gPSBudWxsO1xuICAgICAgICB0aGlzLnByb2plY3RzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0TW9kZWxCeU5hbWUgc2hvdWxkIGJlIG92ZXJ3cml0dGVuIHRvIHByb3ZpZGUgbW9kZWxzIGZvciBxdWVyaWVzLlxuICAgICAqL1xuICAgIGdldE1vZGVsQnlOYW1lKG5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXRNb2RlbEJ5TmFtZSgpIG11c3QgYmUgb3ZlcndyaXR0ZW4gYmVmb3JlIGEgdGFyZ2V0IGNhbiBiZSBwcm92aWRlZC4gVGFyZ2V0OiAnICsgbmFtZSArICcuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcnVuXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBydW4oKSB7XG5cbiAgICAgICAgdGhpcy5sb2FkZXIgPSBuZXcgTG9hZGVyKHRoaXMucGF0aCk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbmV3IENvbmZpZ3VyYXRpb24odGhpcy5sb2FkZXIubG9hZEZyb21Db25mKCdjb25maWcnKSk7XG4gICAgICAgIHRoaXMubWFpbiA9IG5ldyBQcm9qZWN0KCcnLHRoaXMuY29uZmlnLCB0aGlzLmxvYWRlcik7XG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaCh0aGlzLm1haW4pO1xuICAgICAgICB0aGlzLnByb2plY3RzID0gdGhpcy5wcm9qZWN0cy5jb25jYXQodGhpcy5tYWluLmdldFN1YlByb2plY3RzKCkpO1xuICAgICAgICB0aGlzLnByb2plY3RzLmZvckVhY2gocHJvamVjdD0+cHJvamVjdC5ydW5QbHVnaW5zKCkpO1xuICAgICAgICB0aGlzLnByb2plY3RzLmZvckVhY2gocHJvamVjdD0+cHJvamVjdC5zZXRDb25uZWN0aW9ucyhDb25uZWN0aW9ucykpO1xuXG4gICAgICAgIHJldHVybiBDb25uZWN0aW9ucy5vcGVuKCkuXG4gICAgICAgICAgICB0aGVuKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0PT5wcm9qZWN0LnJlZ2lzdGVyKFByb2plY3RSZWdpc3RyeSkpO1xuICAgICAgICAgICAgfSkuXG4gICAgICAgICAgICB0aGVuKCgpPT4ge1xuXG4gICAgICAgICAgICAgICAgIHZhciBydW5uZXIgPSBuZXcgdGFza3MuUnVubmVyKFxuICAgICAgICAgICAgICAgICAgICBQcm9qZWN0UmVnaXN0cnkuZ2V0VGFza3MoKSxcbiAgICAgICAgICAgICAgICAgICAgVGFza1JlY29yZGVycy5jcmVhdGUodGhpcy5jb25maWcuXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkV2l0aERlZmF1bHRzKCd0YXNrcy5yZWNvcmRlcicsICdjb25zb2xlJykpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBydW5uZXIucnVuQWxsVGFza3MoKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VydmVyQ3JlYXRlZCgpIHt9XG5cbiAgICBzZXJ2ZXJTdGFydGVkKCkge31cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvblxuIl19