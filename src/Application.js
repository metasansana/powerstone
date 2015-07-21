import Promise from 'bluebird';
import tasks from './tasks';
import Loader from './Loader';
import Configuration from './Configuration';
import Connections from './conn/Connections';
import Project from './Project';
import ProjectRegistry from './ProjectRegistry';
import TaskRecorders from './TaskRecorders';

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
    });

    return flat;

};

/**
 * Application
 * @param {String} path
 */
class Application {

    constructor(path) {
        this.name = 'default';
        this.path = path;
        this.loader = null;
        this.config = null;
        this.main = null;
        this.projects = [];
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

        this.loader = new Loader(this.path);
        this.config = new Configuration(this.loader.loadFromConf('config'));
        this.main = new Project('',this.config, this.loader);
        this.projects.push(this.main);
        this.projects = this.projects.concat(this.main.getSubProjects());
        this.projects.forEach(project=>project.runPlugins());
        this.projects.forEach(project=>project.setConnections(Connections));

        return Connections.open().
            then(()=> {
                this.projects.forEach(project=>project.register(ProjectRegistry));
            }).
            then(()=> {

                 var runner = new tasks.Runner(
                    ProjectRegistry.getTasks(),
                    TaskRecorders.create(this.config.
                        readWithDefaults('tasks.recorder', 'console')));

                return runner.runAllTasks();

            });
    }

    serverCreated() {}

    serverStarted() {}

}

export default Application
