'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _connectionsConnections = require('./connections/Connections');

var _connectionsConnections2 = _interopRequireDefault(_connectionsConnections);

var _tasks = require('./tasks');

var _tasks2 = _interopRequireDefault(_tasks);

var _TaskRecorderFactory = require('./TaskRecorderFactory');

var _TaskRecorderFactory2 = _interopRequireDefault(_TaskRecorderFactory);

var noop = function noop() {};

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
        this.parent = path;
        this.controllers = {};
        this.models = {};
        this.routes = [];
        this.tasks = {};
        this.middleware = {};
        this.loader = new _Loader2['default'](path);
        this.connections = new _connectionsConnections2['default']();
        this.config = this.loader.loadFromConfWithDefaults('config.json', this._defaultConfig());
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

            var self = this;

            self.routes = flattenRoutes(self.loader.loadFromConf('routes.json'));

            if (Array.isArray(self.config.connections)) self.config.connections.forEach(function (con) {
                return self.connections.create(con.name, con.type, con.options);
            });

            return self.connections.open().then(function () {
                self.models = self.loader.requireModels();
                self.controllers = self.loader.requireControllers();
                self.taskRunner = new _tasks2['default'].Runner(self.loader.requireTasks(), _TaskRecorderFactory2['default'].create(self.config.taskRecorderType));
                self.queries = self.loader.requireQueries();
                self.middleware = self.loader.requireMiddleWare();
            }).then(function () {
                return self.taskRunner.runAllTasks();
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
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxDQUFDO0FBQ3pILG9CQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDNUMsb0JBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQ3JELENBQUMsQ0FDRixJQUFJLENBQUMsWUFBWTtBQUNiLHVCQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEMsQ0FBQyxDQUFDO1NBQ1Y7OztlQUVZLHlCQUFFLEVBQUU7OztlQUVKLHlCQUFFLEVBQUU7OztXQXJEZixXQUFXOzs7cUJBd0RGLFdBQVciLCJmaWxlIjoiQXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgTG9hZGVyIGZyb20gJy4vTG9hZGVyJztcbmltcG9ydCBDb25uZWN0aW9ucyBmcm9tICcuL2Nvbm5lY3Rpb25zL0Nvbm5lY3Rpb25zJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcbmltcG9ydCBUYXNrUmVjb3JkZXJGYWN0b3J5IGZyb20gJy4vVGFza1JlY29yZGVyRmFjdG9yeSc7XG5cbnZhciBub29wID0gZnVuY3Rpb24gKCkge307XG5cbi8qKlxuICogZmxhdHRlblJvdXRlcyB0dXJucyB0aGUgY29uZi9yb3V0ZS5qc29uIGZpbGUgY29udGVudHMgaW50byBvbmUgZmxhdCBhcnJheS5cbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG52YXIgZmxhdHRlblJvdXRlcyA9IGZ1bmN0aW9uIChyb3V0ZXMpIHtcblxuICAgIHZhciBmbGF0ID0gW107XG5cbiAgICByb3V0ZXMuZm9yRWFjaChmdW5jdGlvbiAocm91dGUpIHtcblxuICAgICAgICByb3V0ZS5yb3V0ZXMuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcblxuICAgICAgICAgICAgZmxhdC5wdXNoKGVudHJ5KTtcblxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICByZXR1cm4gZmxhdDtcblxufTtcblxuLyoqXG4gKiBBcHBsaWNhdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAqL1xuY2xhc3MgQXBwbGljYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IocGF0aCkge1xuICAgICAgICB0aGlzLm5hbWUgPSAnZGVmYXVsdCc7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGF0aDtcbiAgICAgICAgdGhpcy5jb250cm9sbGVycyA9IHt9O1xuICAgICAgICB0aGlzLm1vZGVscyA9IHt9O1xuICAgICAgICB0aGlzLnJvdXRlcyA9IFtdO1xuICAgICAgICB0aGlzLnRhc2tzID0ge307XG4gICAgICAgIHRoaXMubWlkZGxld2FyZSA9IHt9O1xuICAgICAgICB0aGlzLmxvYWRlciA9IG5ldyBMb2FkZXIocGF0aCk7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnMgPSBuZXcgQ29ubmVjdGlvbnMoKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLmxvYWRlci5sb2FkRnJvbUNvbmZXaXRoRGVmYXVsdHMoJ2NvbmZpZy5qc29uJywgdGhpcy5fZGVmYXVsdENvbmZpZygpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldE1vZGVsQnlOYW1lIHNob3VsZCBiZSBvdmVyd3JpdHRlbiB0byBwcm92aWRlIG1vZGVscyBmb3IgcXVlcmllcy5cbiAgICAgKi9cbiAgICBnZXRNb2RlbEJ5TmFtZShuYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0TW9kZWxCeU5hbWUoKSBtdXN0IGJlIG92ZXJ3cml0dGVuIGJlZm9yZSBhIHRhcmdldCBjYW4gYmUgcHJvdmlkZWQuIFRhcmdldDogJyArIG5hbWUgKyAnLicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJ1blxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgcnVuKCkge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLnJvdXRlcyA9IGZsYXR0ZW5Sb3V0ZXMoc2VsZi5sb2FkZXIubG9hZEZyb21Db25mKCdyb3V0ZXMuanNvbicpKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzZWxmLmNvbmZpZy5jb25uZWN0aW9ucykpXG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5jb25uZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChjb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5jb25uZWN0aW9ucy5jcmVhdGUoY29uLm5hbWUsIGNvbi50eXBlLCBjb24ub3B0aW9ucyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZi5jb25uZWN0aW9ucy5vcGVuKCkuXG4gICAgICAgICAgICB0aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1vZGVscyA9IHNlbGYubG9hZGVyLnJlcXVpcmVNb2RlbHMoKTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnRyb2xsZXJzID0gc2VsZi5sb2FkZXIucmVxdWlyZUNvbnRyb2xsZXJzKCk7XG4gICAgICAgICAgICAgICAgc2VsZi50YXNrUnVubmVyID0gbmV3IHRhc2tzLlJ1bm5lcihzZWxmLmxvYWRlci5yZXF1aXJlVGFza3MoKSwgVGFza1JlY29yZGVyRmFjdG9yeS5jcmVhdGUoc2VsZi5jb25maWcudGFza1JlY29yZGVyVHlwZSkpO1xuICAgICAgICAgICAgICAgIHNlbGYucXVlcmllcyA9IHNlbGYubG9hZGVyLnJlcXVpcmVRdWVyaWVzKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5taWRkbGV3YXJlID0gc2VsZi5sb2FkZXIucmVxdWlyZU1pZGRsZVdhcmUoKTtcbiAgICAgICAgICAgIH0pLlxuICAgICAgICAgICAgdGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYudGFza1J1bm5lci5ydW5BbGxUYXNrcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VydmVyQ3JlYXRlZCgpe31cblxuICAgIHNlcnZlclN0YXJ0ZWQoKXt9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvblxuIl19