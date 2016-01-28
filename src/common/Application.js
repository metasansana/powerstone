import events from 'events';
import Property from 'property-seek';
import Module from './Module';
import * as util from '../util';

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
            events: {},
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
            STARTED: 'started',
            ROUTING: 'routing'
        };
        this._events = new events.EventEmitter();

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
        var hit;

        list = (multi) ? list : [list];

        result = list.map(l => {

            hit = Property.get(source, l);

            if (!hit)
                throw new Error(`Application#interpolate: The source does not
            contain a member at path  ${l}!`);

            return hit;

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

        var m;

        return list.map(w => {

            if (typeof w === 'function') return w;

            m = Property.get(this.middleware, w);

            if (!m)
                throw new Error(`Unknown middleware: '${w}' declared in route file!`);

            return m;

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

        var split;
        var Controller;
        var path;
        var type;

        if (util.isCall(action)) {
            split = action.slice(0, -2).split('.');
            method = split.pop();
        } else {
            split = action.split('.');
        }

        path = split.join('.');
        Controller = Property.get(this.controllers, path);
        type = (typeof Controller);

        switch (type) {

            case 'function':
                break;

            case 'object':
                break;

            default:
                throw new Error(`Controller '${path}' must be a constructor or instance not` +
                    ` '${type}'!`);


        }

        return function(req, res) {

            var instance;

            if (type === 'function') {
                instance = new Controller(req, res, definition);
            } else {
                instance = Controller;
                instance.request = req;
                instance.response = res;
                instance.route = definition;
            }

            if (typeof instance[method] !== 'function') {
                res.status(500);
                return console.error(`
                    Unknown method '${method}' in route description
                    for controller ` +
                    `
                    '${path}'!`);
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
        var m = new Module('', '', loader.getConfiguration(), loader, this);

        this.modules.main = m;

        m.modules(this.modules);
        m.framework(this.framework.connectors, this.framework.pipes, this.framework.events);
        return Promise.all(m.connections(this.framework.connectors, this.pool)).
        then(() => m.userland(this.controllers, this.models, this.middleware));

    }
}

export default Application;
