import Property from 'property-seek';
import PowerstoneServer from '../common/PowerstoneServer';
import ManagedServer from '../common/ManagedServer';
import StateManager from './StateManager';
import Scheduler from '../tasks/Scheduler';

/**
 * Application is the main class of the framework.
 * @param {string} path The path to intialize this Application to. 
 *
 * @property {Module} main - The main Module for this Application.
 * @property {ManagedServer} server - The managed http server.  
 * @property {object} controllers - Controllers loaded into memory.
 * @property {object} models - Models loaded into memory.
 * @property {object} connectors - Various connectors defined for establishing remote connections
 * @property {object} middleware - Middleware loaded into memory.
 * @property {ManagedServer|null} server - The internal managed server that serves clients.
 */
class Application {

    constructor(path) {

        this.path = path;
        this.name = 'main';
        this.server = null;
        this.controllers = {};
        this.models = {};
        this.middleware = {};
        this.connectors = {};
        this._stateManager = new StateManager(this, Application.states.INITIAL);

    }

    /**
     * getState returns the current state of the Application
     * @return {string} 
     */
    getState() {
        return this._stateManager.state;
    }

    /**
     * onConnected is called when connections have been established.
     * @return {Promise|null}
     */
    onConnected() {

        return null;

    }

    /**
     * onError is called when some seemingly unrecoverable error
     * occurs, override it to handle errors on your own.
     * @param {Error} err 
     * @returns {null|Promise}
     */
    onError(err) {

        console.error(err.stack);
        process.exit(-1);
        return null;

    }

    /**
     * on 
     */
    on() {
        this._events.on.apply(this._events, arguments);
    }

    emit() {
        return this._events.emit.apply(this._events, arguments);
    }

    /**
     * start the server for this Application
     * @return {Promise}
     */
    start() {

        return this._stateManager.addListener(Scheduler).
        addListener({

            onStateChange(app) {

                if (app.getState() === 'listening')
                    console.log(`Server started ${app.server.host}:${app.server.port}.`);

            }

        }).
        setState(Application.states.BOOTSTRAP).
        then(() => this.main.load(this.frameworkApp)).
        then(() => this._stateManager.setState(Application.states.CONNECTED)).
        then(() => {

            this.server = new ManagedServer(

                this.main.configuration.read('port', process.env.PORT || 3000),
                this.main.configuration.read('host', process.env.HOST || '0.0.0.0'),
                new PowerstoneServer(this.__createServer()));

            return this.server.start();

        }).
        then(() => this._stateManager.setState(Application.states.LISTENING)).
        catch(e => {
            console.error(e.stack);
            process.exit(1);
        });

    }
}

Application.states = {
    INITIAL: 'initial',
    BOOTSTRAP: 'bootstrap',
    CONNECTED: 'connected',
    LISTENING: 'listening'
};

export default Application;
