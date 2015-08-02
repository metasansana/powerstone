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
        value: function serverStarted(port) {
            console.log('Server started on port ' + port);
        }
    }]);

    return Application;
})();

exports['default'] = Application;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHBsaWNhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7d0JBQW9CLFVBQVU7Ozs7cUJBQ1osU0FBUzs7OztzQkFDUixVQUFVOzs7OzZCQUNILGlCQUFpQjs7OzsrQkFDbkIsb0JBQW9COzs7O3VCQUN4QixXQUFXOzs7OytCQUNILG1CQUFtQjs7Ozs2QkFDckIsaUJBQWlCOzs7Ozs7OztBQU0zQyxJQUFJLGFBQWEsR0FBRyxTQUFoQixhQUFhLENBQWEsTUFBTSxFQUFFOztBQUVsQyxRQUFJLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRWQsVUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssRUFBRTs7QUFFNUIsYUFBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLEVBQUU7O0FBRWxDLGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBRXBCLENBQUMsQ0FBQTtLQUNMLENBQUMsQ0FBQzs7QUFFSCxXQUFPLElBQUksQ0FBQztDQUVmLENBQUM7Ozs7Ozs7SUFNSSxXQUFXO0FBRUYsYUFGVCxXQUFXLENBRUQsSUFBSSxFQUFFOzhCQUZoQixXQUFXOztBQUdULFlBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQ3RCLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFlBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0tBQ3RCOztpQkFUQyxXQUFXOzs7Ozs7ZUFjQyx3QkFBQyxJQUFJLEVBQUU7QUFDakIsa0JBQU0sSUFBSSxLQUFLLENBQUMsZ0ZBQWdGLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2xIOzs7Ozs7OztlQU1FLGVBQUc7OztBQUVGLGdCQUFJLENBQUMsTUFBTSxHQUFHLHdCQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxnQkFBSSxDQUFDLE1BQU0sR0FBRywrQkFBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNwRSxnQkFBSSxDQUFDLElBQUksR0FBRyx5QkFBWSxFQUFFLEVBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckQsZ0JBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QixnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFDakUsZ0JBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTzt1QkFBRSxPQUFPLENBQUMsVUFBVSxFQUFFO2FBQUEsQ0FBQyxDQUFDO0FBQ3JELGdCQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87dUJBQUUsT0FBTyxDQUFDLGNBQWMsOEJBQWE7YUFBQSxDQUFDLENBQUM7O0FBRXBFLG1CQUFPLDZCQUFZLElBQUksRUFBRSxDQUNyQixJQUFJLENBQUMsWUFBSztBQUNOLHNCQUFLLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPOzJCQUFFLE9BQU8sQ0FBQyxRQUFRLDhCQUFpQjtpQkFBQSxDQUFDLENBQUM7YUFDckUsQ0FBQyxDQUNGLElBQUksQ0FBQyxZQUFLOztBQUVMLG9CQUFJLE1BQU0sR0FBRyxJQUFJLG1CQUFNLE1BQU0sQ0FDMUIsNkJBQWdCLFFBQVEsRUFBRSxFQUMxQiwyQkFBYyxNQUFNLENBQUMsTUFBSyxNQUFNLENBQzVCLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFeEQsdUJBQU8sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBRS9CLENBQUMsQ0FBQztTQUNWOzs7ZUFFWSx5QkFBRyxFQUFFOzs7ZUFFTCx1QkFBQyxJQUFJLEVBQUU7QUFDaEIsbUJBQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEdBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0M7OztXQXBEQyxXQUFXOzs7cUJBd0RGLFdBQVciLCJmaWxlIjoiQXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgdGFza3MgZnJvbSAnLi90YXNrcyc7XG5pbXBvcnQgTG9hZGVyIGZyb20gJy4vTG9hZGVyJztcbmltcG9ydCBDb25maWd1cmF0aW9uIGZyb20gJy4vQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgQ29ubmVjdGlvbnMgZnJvbSAnLi9jb25uL0Nvbm5lY3Rpb25zJztcbmltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5pbXBvcnQgUHJvamVjdFJlZ2lzdHJ5IGZyb20gJy4vUHJvamVjdFJlZ2lzdHJ5JztcbmltcG9ydCBUYXNrUmVjb3JkZXJzIGZyb20gJy4vVGFza1JlY29yZGVycyc7XG5cbi8qKlxuICogZmxhdHRlblJvdXRlcyB0dXJucyB0aGUgY29uZi9yb3V0ZS5qc29uIGZpbGUgY29udGVudHMgaW50byBvbmUgZmxhdCBhcnJheS5cbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG52YXIgZmxhdHRlblJvdXRlcyA9IGZ1bmN0aW9uIChyb3V0ZXMpIHtcblxuICAgIHZhciBmbGF0ID0gW107XG5cbiAgICByb3V0ZXMuZm9yRWFjaChmdW5jdGlvbiAocm91dGUpIHtcblxuICAgICAgICByb3V0ZS5yb3V0ZXMuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcblxuICAgICAgICAgICAgZmxhdC5wdXNoKGVudHJ5KTtcblxuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZsYXQ7XG5cbn07XG5cbi8qKlxuICogQXBwbGljYXRpb25cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKi9cbmNsYXNzIEFwcGxpY2F0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKHBhdGgpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gJ2RlZmF1bHQnO1xuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgICB0aGlzLmxvYWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbnVsbDtcbiAgICAgICAgdGhpcy5tYWluID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldE1vZGVsQnlOYW1lIHNob3VsZCBiZSBvdmVyd3JpdHRlbiB0byBwcm92aWRlIG1vZGVscyBmb3IgcXVlcmllcy5cbiAgICAgKi9cbiAgICBnZXRNb2RlbEJ5TmFtZShuYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0TW9kZWxCeU5hbWUoKSBtdXN0IGJlIG92ZXJ3cml0dGVuIGJlZm9yZSBhIHRhcmdldCBjYW4gYmUgcHJvdmlkZWQuIFRhcmdldDogJyArIG5hbWUgKyAnLicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJ1blxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgcnVuKCkge1xuXG4gICAgICAgIHRoaXMubG9hZGVyID0gbmV3IExvYWRlcih0aGlzLnBhdGgpO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWd1cmF0aW9uKHRoaXMubG9hZGVyLmxvYWRGcm9tQ29uZignY29uZmlnJykpO1xuICAgICAgICB0aGlzLm1haW4gPSBuZXcgUHJvamVjdCgnJyx0aGlzLmNvbmZpZywgdGhpcy5sb2FkZXIpO1xuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2godGhpcy5tYWluKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMucHJvamVjdHMuY29uY2F0KHRoaXMubWFpbi5nZXRTdWJQcm9qZWN0cygpKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3Q9PnByb2plY3QucnVuUGx1Z2lucygpKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3Q9PnByb2plY3Quc2V0Q29ubmVjdGlvbnMoQ29ubmVjdGlvbnMpKTtcblxuICAgICAgICByZXR1cm4gQ29ubmVjdGlvbnMub3BlbigpLlxuICAgICAgICAgICAgdGhlbigoKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RzLmZvckVhY2gocHJvamVjdD0+cHJvamVjdC5yZWdpc3RlcihQcm9qZWN0UmVnaXN0cnkpKTtcbiAgICAgICAgICAgIH0pLlxuICAgICAgICAgICAgdGhlbigoKT0+IHtcblxuICAgICAgICAgICAgICAgICB2YXIgcnVubmVyID0gbmV3IHRhc2tzLlJ1bm5lcihcbiAgICAgICAgICAgICAgICAgICAgUHJvamVjdFJlZ2lzdHJ5LmdldFRhc2tzKCksXG4gICAgICAgICAgICAgICAgICAgIFRhc2tSZWNvcmRlcnMuY3JlYXRlKHRoaXMuY29uZmlnLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZFdpdGhEZWZhdWx0cygndGFza3MucmVjb3JkZXInLCAnY29uc29sZScpKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcnVubmVyLnJ1bkFsbFRhc2tzKCk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlcnZlckNyZWF0ZWQoKSB7fVxuXG4gICAgc2VydmVyU3RhcnRlZChwb3J0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTZXJ2ZXIgc3RhcnRlZCBvbiBwb3J0ICcrcG9ydCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uXG4iXX0=