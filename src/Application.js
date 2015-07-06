import Promise from 'bluebird';
import Loader from './Loader';
import Connections from './connections/Connections';
import tasks from './tasks';
import TaskRecorderFactory from './TaskRecorderFactory';

var noop = function () {};

/**
 * flattenRoutes turns the conf/route.json file contents into one flat array.
 * @return {Array}
 */
var flattenRoutes = function (routes) {

    var flat = [];

    routes.forEach(function (route) {

        route.routes.forEach(function (entry) {

            flat.push(entry);

        })
    })

    return flat;

};

/**
 * Application
 * @param {String} path
 */
class Application {

    constructor(path) {
        this.name = 'default';
        this.parent = path;
        this.controllers = {};
        this.models = {};
        this.routes = [];
        this.tasks = {};
        this.middleware = {};
        this.loader = new Loader(path);
        this.connections = new Connections();
        this.config = this.loader.loadFromConfWithDefaults('config.json', this._defaultConfig());

    }

    /**
     * getModelByName should be overwritten to provide models for queries.
     */
    getModelByName(name) {
        throw new Error('getModelByName() must be overwritten before a target can be provided. Target: ' + name + '.');
    }

    /**
     * run
     * @return {Promise}
     */
    run() {

        var self = this;

        self.routes = flattenRoutes(self.loader.loadFromConf('routes.json'));

        if (Array.isArray(self.config.connections))
            self.config.connections.forEach(function (con) {
                return self.connections.create(con.name, con.type, con.options);
            });

        return self.connections.open().
            then(function () {
                self.models = self.loader.requireModels();
                self.controllers = self.loader.requireControllers();
                self.taskRunner = new tasks.Runner(self.loader.requireTasks(), TaskRecorderFactory.create(self.config.taskRecorderType));
                self.queries = self.loader.requireQueries();
                self.middleware = self.loader.requireMiddleWare();
            }).
            then(function () {
                return self.taskRunner.runAllTasks();
            });
    }

    serverCreated(){}

    serverStarted(){};
}

export default Application
