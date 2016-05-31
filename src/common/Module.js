import CompositeModule from './CompositeModule';
import BulkLookup from './BulkLookup';
import RequireLookup from './RequireLookup';
import Router from './Router';

/**
 * Module
 * @abstract
 * @param {string} name
 * @param {Configuration} config 
 * @param {HttpHandler} handler 
 * @param {Application} app 
 *
 * @property {string} name
 * @property {Configuration} configuration
 * @property {HttpHandler} handler
 * @property {ResourceLookup} resources
 * @property {Router} router
 * @property {Application} application
 * @property {CompositeModule} submodules
 */
class Module {

    constructor(name, config, app) {

        this.name = name;
        this.configuration = config;
        this.application = app;
        this.submodules = new CompositeModule([]);

    }

    /**
     * __submodule is called to create a submodule for this module.
     * @param {string} name 
     * @param {Configuration} config 
     * @param {Application} app 
     * @abstract
     * @returns {Module}
     */
    __submodule(name, config, app) {


    }

    /**
     * __init initializes this module and its submodules
     */
    __init() {

        var module;
        var submodules = this.configuration.read(Configuration.keys.MODULES, {});
        var look = new BulkLookup('require', new RequireLookup(this.configuration.path.modules));

        look.add('require', new RequireLookup());

        Object.keys(submodules).
        forEach(path => {

            module = resources.lookup(path).module;

            if (subs[path] === false)
                module.preventRoutes();

            this.submodules.add(module);


        }) this.submodules.add(
            this.__submodule(this.resources.lookup(path), this.handler, this.application)));

    this.submodules.__init();

}

/**
 * __connections establishes the connections decleared in the config file.
 * @param {object} pool 
 * @return {array<Promise>}
 */
__connections(pool) {

    var config;
    var connector;

    return Object.keys(this.configuration.readOrDefault(Configuration.keys.CONNECTIONS, {})).
    map(key => {

        config = connections[key];
        connector = this.resources.lookup(config.connector);
        return connector(config.options).then(c => pool[key] = c);

    }).concat(this.submodules.connections(pool));

}

/**
 * __middleware loads the pre routing middleware.
 */
__middleware() {

    var wares = this.config.readOrDefault(Configuration.keys.MIDDLEWARE, {});

    if (Array.isArray(wares.load))
        wares.load.forEach(m => {
            var resource = this.resources.lookup(m);

            if (typeof resource.module !== 'function')
                throw new TypeError('Middleware must be a function, got ',
                    typeof resource.module, '!');

            resource.module.
            apply(this, (wares.options) ?
                (wares.options[resource.basename]) ? wares.options[resource.basename] : null : null);
        });

    this.submodules.middleware();

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

}

}

export default Module
