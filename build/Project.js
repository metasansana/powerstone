'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path2 = require('path');

var _path3 = _interopRequireDefault(_path2);

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Configuration = require('./Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

/**
 * Project
 */

var Project = (function () {
    function Project(prefix, config, loader) {
        _classCallCheck(this, Project);

        this.prefix = prefix;
        this.config = config;
        this.loader = loader;
        this.projects = null;
    }

    _createClass(Project, [{
        key: 'isMain',
        value: function isMain() {
            return !this.prefix;
        }
    }, {
        key: 'getSubProjects',
        value: function getSubProjects() {
            var _this = this;

            var prefix;
            var project;
            var loader;
            var config;

            if (this.projects) return this.projects;

            this.projects = this.config.readWithDefaults('projects', []).map(function (_path) {

                _path = _this.loader.getPath() + '/' + _path;
                prefix = _path3['default'].basename(_path);
                prefix = _this.prefix ? _this.prefix + '.' + prefix : prefix;
                loader = new _Loader2['default'](_path);
                config = loader.loadFromConf('config', {});
                project = new Project(prefix, new _Configuration2['default'](config), new _Loader2['default'](_path));
                return project;
            });

            return this.projects;
        }
    }, {
        key: 'getLoader',
        value: function getLoader() {
            return this.loader;
        }
    }, {
        key: 'getConfiguration',
        value: function getConfiguration() {
            return this.config;
        }
    }, {
        key: 'setConnections',
        value: function setConnections(connections) {

            this.config.readWithDefaults('connections', []).forEach(function (con) {
                connections.create(con.name, con.type, con.options);
            });
        }
    }, {
        key: 'register',
        value: function register(registry) {
            this.loader.requireControllers(registry.controllers, this.prefix);
            this.loader.requireModels(registry.models, this.prefix);
            this.loader.requireQueries(registry.queries, this.prefix);
            this.loader.requireMiddleWare(registry.middleware, this.prefix);
            this.loader.requireTasks(registry.tasks, this.prefix);
        }
    }, {
        key: 'runPlugins',
        value: function runPlugins() {
            var _this2 = this;

            this.config.readWithDefaults('plugins', []).forEach(function (_path) {
                var plugin = _this2.loader.requireRelative(_path);
                plugin(_this2);
            });
        }
    }]);

    return Project;
})();

exports['default'] = Project;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Qcm9qZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztxQkFBaUIsTUFBTTs7OztzQkFDSixVQUFVOzs7OzZCQUNILGlCQUFpQjs7Ozs7Ozs7SUFLckMsT0FBTztBQUVFLGFBRlQsT0FBTyxDQUVHLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFOzhCQUZsQyxPQUFPOztBQUdMLFlBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFlBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFlBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFlBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0tBQ3hCOztpQkFQQyxPQUFPOztlQVNILGtCQUFHO0FBQ0wsbUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3ZCOzs7ZUFFYSwwQkFBRzs7O0FBRWIsZ0JBQUksTUFBTSxDQUFDO0FBQ1gsZ0JBQUksT0FBTyxDQUFDO0FBQ1osZ0JBQUksTUFBTSxDQUFDO0FBQ1gsZ0JBQUksTUFBTSxDQUFDOztBQUVYLGdCQUFJLElBQUksQ0FBQyxRQUFRLEVBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDOztBQUV6QixnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FDeEQsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFJOztBQUVWLHFCQUFLLEdBQUcsTUFBSyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUMsR0FBRyxHQUFDLEtBQUssQ0FBQztBQUN4QyxzQkFBTSxHQUFHLGtCQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM5QixzQkFBTSxHQUFHLEFBQUMsTUFBSyxNQUFNLEdBQUksTUFBSyxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDN0Qsc0JBQU0sR0FBRyx3QkFBVyxLQUFLLENBQUMsQ0FBQztBQUMzQixzQkFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLHVCQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLCtCQUFrQixNQUFNLENBQUMsRUFBRSx3QkFBVyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzVFLHVCQUFPLE9BQU8sQ0FBQzthQUVsQixDQUFDLENBQUM7O0FBRVAsbUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUV4Qjs7O2VBRVEscUJBQUc7QUFDUixtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCOzs7ZUFFZSw0QkFBRztBQUNmLG1CQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7OztlQUVhLHdCQUFDLFdBQVcsRUFBRTs7QUFFeEIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUMzQyxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUk7QUFDWiwyQkFBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZELENBQUMsQ0FBQztTQUNWOzs7ZUFFTyxrQkFBQyxRQUFRLEVBQUU7QUFDZixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsRSxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEQsZ0JBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFELGdCQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hFLGdCQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6RDs7O2VBRVMsc0JBQUc7OztBQUNULGdCQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FDdkMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFJO0FBQ2Qsb0JBQUksTUFBTSxHQUFHLE9BQUssTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxzQkFBTSxRQUFNLENBQUM7YUFFaEIsQ0FBQyxDQUFDO1NBQ1Y7OztXQXZFQyxPQUFPOzs7cUJBNEVFLE9BQU8iLCJmaWxlIjoiUHJvamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IExvYWRlciBmcm9tICcuL0xvYWRlcic7XG5pbXBvcnQgQ29uZmlndXJhdGlvbiBmcm9tICcuL0NvbmZpZ3VyYXRpb24nO1xuXG4vKipcbiAqIFByb2plY3RcbiAqL1xuY2xhc3MgUHJvamVjdCB7XG5cbiAgICBjb25zdHJ1Y3RvcihwcmVmaXgsIGNvbmZpZywgbG9hZGVyKSB7XG4gICAgICAgIHRoaXMucHJlZml4ID0gcHJlZml4O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBsb2FkZXI7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBudWxsO1xuICAgIH1cblxuICAgIGlzTWFpbigpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnByZWZpeDtcbiAgICB9XG5cbiAgICBnZXRTdWJQcm9qZWN0cygpIHtcblxuICAgICAgICB2YXIgcHJlZml4O1xuICAgICAgICB2YXIgcHJvamVjdDtcbiAgICAgICAgdmFyIGxvYWRlcjtcbiAgICAgICAgdmFyIGNvbmZpZztcblxuICAgICAgICBpZiAodGhpcy5wcm9qZWN0cylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xuXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLmNvbmZpZy5yZWFkV2l0aERlZmF1bHRzKCdwcm9qZWN0cycsIFtdKS5cbiAgICAgICAgICAgIG1hcCgoX3BhdGgpPT4ge1xuXG4gICAgICAgICAgICAgICAgX3BhdGggPSB0aGlzLmxvYWRlci5nZXRQYXRoKCkrJy8nK19wYXRoO1xuICAgICAgICAgICAgICAgIHByZWZpeCA9IHBhdGguYmFzZW5hbWUoX3BhdGgpO1xuICAgICAgICAgICAgICAgIHByZWZpeCA9ICh0aGlzLnByZWZpeCkgPyB0aGlzLnByZWZpeCArICcuJyArIHByZWZpeCA6IHByZWZpeDtcbiAgICAgICAgICAgICAgICBsb2FkZXIgPSBuZXcgTG9hZGVyKF9wYXRoKTtcbiAgICAgICAgICAgICAgICBjb25maWcgPSBsb2FkZXIubG9hZEZyb21Db25mKCdjb25maWcnLCB7fSk7XG4gICAgICAgICAgICAgICAgcHJvamVjdCA9IG5ldyBQcm9qZWN0KHByZWZpeCwgbmV3IENvbmZpZ3VyYXRpb24oY29uZmlnKSwgbmV3IExvYWRlcihfcGF0aCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0O1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcblxuICAgIH1cblxuICAgIGdldExvYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVyO1xuICAgIH1cblxuICAgIGdldENvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZztcbiAgICB9XG5cbiAgICBzZXRDb25uZWN0aW9ucyhjb25uZWN0aW9ucykge1xuXG4gICAgICAgIHRoaXMuY29uZmlnLnJlYWRXaXRoRGVmYXVsdHMoJ2Nvbm5lY3Rpb25zJywgW10pLlxuICAgICAgICAgICAgZm9yRWFjaCgoY29uKT0+IHtcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9ucy5jcmVhdGUoY29uLm5hbWUsIGNvbi50eXBlLCBjb24ub3B0aW9ucyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWdpc3RlcihyZWdpc3RyeSkge1xuICAgICAgICB0aGlzLmxvYWRlci5yZXF1aXJlQ29udHJvbGxlcnMocmVnaXN0cnkuY29udHJvbGxlcnMsIHRoaXMucHJlZml4KTtcbiAgICAgICAgdGhpcy5sb2FkZXIucmVxdWlyZU1vZGVscyhyZWdpc3RyeS5tb2RlbHMsIHRoaXMucHJlZml4KTtcbiAgICAgICAgdGhpcy5sb2FkZXIucmVxdWlyZVF1ZXJpZXMocmVnaXN0cnkucXVlcmllcywgdGhpcy5wcmVmaXgpO1xuICAgICAgICB0aGlzLmxvYWRlci5yZXF1aXJlTWlkZGxlV2FyZShyZWdpc3RyeS5taWRkbGV3YXJlLCB0aGlzLnByZWZpeCk7XG4gICAgICAgIHRoaXMubG9hZGVyLnJlcXVpcmVUYXNrcyhyZWdpc3RyeS50YXNrcywgdGhpcy5wcmVmaXgpO1xuICAgIH1cblxuICAgIHJ1blBsdWdpbnMoKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLnJlYWRXaXRoRGVmYXVsdHMoJ3BsdWdpbnMnLCBbXSkuXG4gICAgICAgICAgICBmb3JFYWNoKChfcGF0aCk9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHBsdWdpbiA9IHRoaXMubG9hZGVyLnJlcXVpcmVSZWxhdGl2ZShfcGF0aCk7XG4gICAgICAgICAgICAgICAgcGx1Z2luKHRoaXMpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0XG4iXX0=