import Loader from './Loader';
import Configuration from './Configuration';
import Connections from './conn/Connections';
import Module from './Module';
import ModuleRegistry from './ModuleRegistry';
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
        this.main = new Module('', this.config, this.loader);
        this.projects.push(this.main);
        this.projects = this.projects.concat(this.main.getSubModules());
        this.projects.forEach(project => project.runPlugins());
        this.projects.forEach(project => project.setConnections(Connections));

        return Connections.open().
        then(() => this.projects.forEach(project => project.register(ModuleRegistry)));
    }

}

export default Application;
