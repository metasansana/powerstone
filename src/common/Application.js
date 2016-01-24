import Module from './Module';
import events from 'events';

/**
 * Application is the main class of the framework.
 * @param {String} path The path to intialize this Application to. 
 *
 * @property {string} path - The path this Application was initialized to.
 * @property {ManagedServer} server - The managed http server.  
 * @property {object} modules - Modules loaded into memory.
 * @property {object} controllers - Controllers loaded into memory.
 * @property {object} models - Models loaded into memory.
 * @property {object} middleware - Middleware loaded into memory.
 * @property {object} pool - A pool of connections the Application has made.
 * @property {object} framework.express - Loaded modules for express
 * @property {object} framework.restify - Loaded modules for restify
 * @property {object} framework.pipes - Loaded modules for the pipes framework
 */
class Application {

    constructor(path) {

        this.path = path;
        this.server = null;
        this.modules = {};
        this.controllers = {};
        this.models = {};
        this.middleware = {};
        this.pool = {};
        this.framework = {
            pipes: {},
            run: {},
            connectors: {},
            express: {
                engines: {},
                middleware: {}
            },
            restify: {
                plugins: {}
            }
        };
        this.events = {
            ERROR: 'error',
            STARTED: 'started'
        };
        this._events = new events.EventEmitter();

    }

    /**
     * on 
     */
    on() {
        this._events.on.apply(this._events, arguments);
    }



    /**
     * interpolate swaps a list of string for values
     * from a source.
     *
     * Use it to turn for example, a list of controller
     * strings into an object.
     * @param {object} source The source to swap from
     * @param {array|string} list The list or string to interpolate
     * @returns {object}
     */
    interpolate(source, list) {

        var multi = Array.isArray(list);
        var result;
        list = (multi) ? list : [list];

        result = list.map(l => {

            if (!source[l])
                throw new Error(`Application#interpolate: The source does not
            contain a member ${l}!`);

            return source[l];

        });

        return (multi) ? result : result[0];
    }

    /**
     * resolveMiddleware resolves a list of strings into registered middleware.
     * @param {array<string|function>} list 
     * @returns {array<function>}
     * @throws Will throw if an unregistered string is encountered.
     */
    resolveMiddleware(list) {
        return list.map(w => {

            if (typeof w === 'function') return w;

            if (!this.middleware[w])
                throw new Error(`Unknown middleware: '${w}' declared in route file!`);

            return this.middleware[w];

        });
    }

    /**
     * resolveAction turns a string into a route action
     * @param {string} action 
     * @param {string} method 
     * @param {object} definition 
     * @throws Will throw if you specify an unknown controller
     */
    resolveAction(action, method, definition) {

        var split = action.split('.');
        var Controller;

        Controller = this.controllers[split[0]];
        method = split[1] || method;

        if (typeof Controller !== 'function')
            throw new Error(`Controller '${split[0]}' must be a constructor not`+
                ` '${typeof Controller}'!`);

        return function(req, res) {
            var instance = new Controller(req, res, definition);
            if (typeof instance[method] !== 'function') {
                res.status(500);
                return res.send(`
                    Unknown method '${method}' in route description
                    for controller ` +
                    `
                    '${action[0]}'!`);
            }

            instance[method]();
        };


    }

    /**
     * run this Application
     * @return {Promise}
     */
    run() {

        var loader = this.getLoader();
        var m = new Module('main', '', loader.getConfiguration(), loader, this);

        this.modules.main = m;

        m.modules(this.modules);
        m.framework(this.framework.connectors, this.framework.pipes);
        return Promise.all(m.connections(this.framework.connectors, this.pool)).
        then(() => m.userland(this.controllers, this.models, this.middleware));

    }
}

export default Application;
