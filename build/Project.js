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
//# sourceMappingURL=Project.js.map