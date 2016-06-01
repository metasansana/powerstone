import CompositeModule from './CompositeModule';
import PropertyDelegate from './PropertyDelegate';
import RequireDelegate from './RequireDelegate';
import SmartResourceDelegate from './SmartResourceDelegate';
import Pool from '../net/Pool';
import Configuration from './Configuration';
import RouteAction from '../route/BulkAction';
import MiddlewareAction from '../route/MiddlewareAction';
import ControllerAction from '../route/ControllerAction';
import ViewAction from '../route/ViewAction';
import BulkAction from '../route/BulkAction';

/**
 * Module
 * @abstract
 * @param {string} name
 * @param {Configuration} config 
 * @param {object} context 
 * @param {Application} app 
 *
 * @property {string} name
 * @property {Configuration} configuration
 * @property {object} context
 * @property {Application} application
 * @property {CompositeModule} submodules
 */
class Module {

    constructor(name, config, context, app) {

        this.name = name;
        this.configuration = config;
        this.context = context;
        this.application = app;
        this.submodules = new CompositeModule([]);

    }

    /**
     * __submodule is called to create a submodule for this module.
     * @param {Resource} resource 
     * @param {Application} app 
     * @abstract
     * @returns {Module}
     */
    __submodule(resource, app) {


    }

    /**
     * __viewCallback provides a callback that will 
     * handle view declarations.
     * @param {string} view The view template
     * @abstract
     */
    __viewCallback(view) {

    }

    /**
     * __init initializes this module and its submodules
     */
    __init() {

        var module;
        var resource;
        var submodules = this.configuration.read(Configuration.keys.MODULES, {});
        var delegate = new SmartResourceDelegate(new RequireDelegate(this.configuration.paths.modules));

        delegate.add('require', new RequireDelegate());

        Object.keys(submodules).
        forEach(path => {

            resource = delegate.resolve(path);
            module = this.__submodule(resource, this.application);

            if (submodules[path] === false)
                module.preventActions();

            this.submodules.add(module);

        });

        this.submodules.__init();

    }

    /**
     * __autoload the autoloadable aspects of the system
     */
    __autoload() {

        var autos = this.configuration.read(Configuration.keys.AUTOS, {});
        var delegate = new SmartResourceDelegate(new RequireDelegate());

        delegate.add('require', new RequireDelegate());

        ['connectors', 'filters', 'middleware', 'controllers'].
        forEach(key => {

            if (autos.hasOwnProperty(key))
                Object.keys(autos[key]).forEach(name =>
                    this.context[key][name] = delegate.lookup(autos[key][name]).module);

            this.configuration.require(this.configuration.paths[key], this.context[key]);

        });

        this.submodules.__autoload();

    }

    /**
     * __framework performs framework specific actions
     * @abstract
     */
    __framework() {

    }

    /**
     * __connections establishes the connections decleared in the config file.
     * @return {array<Promise>}
     */
    __connections() {

        var config;
        var connector;
        var connections = this.configuration.read(Configuration.keys.CONNECTIONS, {});
        var delegate = new PropertyDelegate('connector', this.context.connectors);

        return Object.keys(connections).
        map(key => {

            config = connections[key];
            connector = delegate.lookup(config.connector).module;
            return connector(config.options).then(c => Pool[key] = c);

        }).concat(this.submodules.__connections());

    }

    /**
     * __filters loads the pre routing middleware.
     */
    __filters(app, defaults) {

        var wares = this.configuration.read(Configuration.keys.FILTERS, defaults);
        var delegate = new SmartResourceDelegate(
            new PropertyDelegate('filter', this.context.filters));

        delegate.add('require', new RequireDelegate());
        wares.forEach(m => delegate.lookup(m).module.filter(app, this.configuration));

        this.submodules.__filters(app, []);

    }

    /**
     * __routing sets up the routing for this module
     * @param {string} point The mount point of this module's parent's router.
     * @param {FrameworkApplication} app 
     * @param {array<Action>} actions 
     * @abstract
     */
    __routing(mountPoint, app, actions) {


    }

    /**
     * handleRoute is called before any of the routes for this
     * module are activated.
     * @param {Request} req 
     * @param {Response} res 
     * @param {function} next 
     */
    handleRoute(req, res, next) {

        next();

    }

    /**
     * load this module
     */
    load(app) {

        this.__init();
        this.__autoload();

        return Promise.all(this.__connections()).
        then(() => this.application.onConnected(Pool)).
        then(() => {

            this.__filters(app, ['default']);
            this.__framework();
            this.__routing('', app, new BulkAction([
                new MiddlewareAction(new PropertyDelegate('middleware', this.context.middleware)),
                new ControllerAction(this.context.controllers),
                new ViewAction(this.__viewCallback)
            ]));

        });

    }

}

export default Module
