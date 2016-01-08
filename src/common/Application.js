import Loader from './Loader';
import Configuration from './Configuration';
import Connections from './conn/Connections';
import Project from './Project';
import ProjectRegistry from './ProjectRegistry';
import events from 'events';

/**
 * Application is the main class of the framework.
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
        this._events = new events.EventEmitter();
        this.events = {
            ERROR: 'error',
            STARTED: 'started'
        };

    }

    /**
     * on 
     */
    on() {
        this._events.on.apply(this._events, arguments);
    }

    /**
     * run this Application
     * @return {Promise}
     */
    run() {

        this.loader = new Loader(this.path);
        this.config = new Configuration(this.loader.loadFromConf('config'));
        this.main = new Project('', this.config, this.loader);
        this.projects.push(this.main);
        this.projects = this.projects.concat(this.main.getSubProjects());
        this.projects.forEach(project => project.runPlugins());
        this.projects.forEach(project => project.setConnections(Connections));

        return Connections.open().
        then(() => this.projects.forEach(project => project.register(ProjectRegistry)));
    }

}

export default Application;
