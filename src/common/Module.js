import CompositeModule from './CompositeModule';
import PropertyDelegate from './PropertyDelegate';
import RequireDelegate from './RequireDelegate';
import SmartResourceDelegate from './SmartResourceDelegate';
import Pool from '../net/Pool';
import Configuration from './Configuration';

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
     * __framework performs framework specific actions
     * @abstract
     */
    __framework() {

    }

    /**
     * __connectors loads the known connectors so that they can
     * be used when opening connections.
     */
    __connectors() {

        var connectors = this.configuration.read(Configuration.keys.CONNECTORS, {});
        var delegate = new SmartResourceDelegate(
            new RequireDelegate(this.configuration.paths.connectors));

        delegate.add('require', new RequireDelegate());

        Object.keys(connectors).
        forEach(key =>
            this.context.connectors[key] = delegate.lookup(connectors[key]).module);

    }

    /**
     * __connections establishes the connections decleared in the config file.
     * @return {array<Promise>}
     */
    __connections() {

        var config;
        var connector;
        var connections = this.configuration.read(Configuration.keys.CONNECTIONS, {});
        var delegate = new SmartResourceDelegate(new PropertyDelegate(this.context.connectors));

        return Object.keys(connections).
        map(key => {

            config = connections[key];
            connector = delegate.lookup(config.connector).module;
            return connector(config.options).then(c => Pool[key] = c);

        }).concat(this.submodules.__connections());

    }

    /**
     * __middleware loads the pre routing middleware.
     */
    __middleware() {

        var wares = this.configuration.read(Configuration.keys.MIDDLEWARE, {});
        var delegate = new SmartResourceDelegate('require',
            new RequireDelegate(this.configuration.paths.middleware));

        delegate.add('require', new RequireDelegate());

        if (Array.isArray(wares))
            wares.forEach(m => {

                var resource = delegate.lookup(m);

                if (typeof resource.module !== 'function')
                    throw new TypeError('Middleware must be a function, got ',
                        typeof resource.module, '!');

                resource.module.apply(this);

            });

        this.submodules.__middleware();

    }

    /**
     * __routing sets up the routing for this module
     * @param {string} point The mount point of this module's parent's router.
     * @param {Router} parent The router of this module's parent.
     */
    __routing(mountPoint, parent) {

        var path = this.configuration.readOrDefault(Configuration.keys.PATH, `/${this.name}`);
        var routes = this.configuration.readOrDefault(Configuration.keys.ROUTES, {});

        Object.keys(routes).forEach(route => this.router.add(route));
        this.submodules.__routing(`${point}/${path}`, this.router);
        parent.use(path, this.router);

    }

    /**
     * load this module
     */
    load() {

        this.__init();
        this.__connectors();
        this.__framework();

        return Promise.all(this.__connections()).
        then(() => this.application.onConnected(Pool)).
        then(() => {

            this.__middleware();

        });

    }

}

export default Module
