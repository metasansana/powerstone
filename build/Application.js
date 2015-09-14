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
//# sourceMappingURL=Application.js.map