import CompositeModule from './CompositeModule';
import FeatureFactory from '../routing/FeatureFactory';
import RestifyQ from '../routing/RestifyQ';
import ExpressQ from '../routing/ExpressQ';
import * as util from '../util';
import {
    configs, paths
}
from './properties';

/**
 * Module
 * @param {string} fqn The name of the module prefixed with its parent modules 
 * @param {string} path 
 * @param {Configuration} config 
 * @param {Loader} loader 
 * @param {Application} app 
 */
class Module {

    constructor(fqn, path, config, loader, app) {
        this.fqn = fqn;
        this.path = path;
        this.configuration = config;
        this.loader = loader;
        this.application = app;
        this.submodules = new CompositeModule([]);
    }

    /**
     * name provides the name of this module
     *  @return {string}
     */
    name() {
        return (this.fqn) ?
            this.fqn.split('.').pop() : '';
    }

    /**
     * modules loads all the submodules for this module into memory.
     * @param {object} mods 
     */
    modules(mods) {

        var name;
        var path;
        var loader;
        var config;
        var fqn;
        var m;

        this.submodules = new CompositeModule(
            this.configuration.readWithDefaults(paths.MODULES, []).map((path) => {

                loader = this.application.getLoader(this.loader.join(paths.MODULES + '/' + path));
                config = loader.getConfiguration();
                name = loader.basename();
                fqn = (this.fqn) ? `${this.fqn}.${name}` : name;
                path = `${this.path}/${name}`;

                m = new Module(fqn, path, config, loader, this.application);
                mods[name] = m;
                return m;

            }));

        this.submodules.modules(mods);

    }

    /**
     * framework loads the files from the framework
     * folder so that they are available in later steps
     * @param {object} connectors
     * @param {object} pipes 
     * @param {object} events 
     */
    framework(connectors, pipes, events) {

        this.loader.require(paths.CONNECTORS, connectors);
        this.loader.require(paths.PIPES, pipes);

        Object.keys(this.loader.require(paths.EVENTS, events)).
        forEach(event =>
            this.application.on(event, this.application.framework.events[event]));

        this.submodules.framework(connectors, pipes, events);

    }

    /**
     * expressFramework loads the pieces for the express framework
     * @param {object} middleware
     * @param {object} engines 
     */
    expressFramework(middleware, engines) {

        this.loader.require(paths.WEB_PLUGINS, middleware);
        this.loader.require(paths.WEB_ENGINES, engines);
        this.submodules.expressFramework(middleware, engines);

    }

    /**
     * restifyFramework loads the pieces for the restify framework
     */
    restifyFramework(plugins) {
        this.loader.require(paths.API_PLUGINS, plugins);
        this.submodules.restifyFramework(plugins);
    }

    /**
     * connections opens the connections defined in the module's config file.
     * @param {object} types A list of available connection types
     * @param {object} conns Opened connections will be referenced here
     * @return {array<Promise>}
     */
    connections(types, conns) {

        var type;
        var cfgs = this.configuration.readWithDefaults(configs.CONNECTIONS, {});
        var cfg;

        return Object.keys(cfgs)
            .map(key => {

                cfg = cfgs[key];
                type = types[cfg.connector];

                if (!type)
                    throw new Error(`Unknown connector '${cfg.connector}' ` +
                        `specified in ${this.configuration.path}`);

                return new Promise((yes, no) => type(cfg.options, yes, no)).
                then(con => conns[key] = con);

            }).concat(this.submodules.connections(types, conns));

    }

    /**
     * userland loads the userland code into memory
     * @param {object} controllers 
     * @param {object} models
     * @param {object} middleware 
     */
    userland(controllers, models, middleware) {

        var prefix = (this.name()) ?
            this.configuration.readWithDefaults('prefix', this.fqn) : '';

        this.loader.require('controllers', controllers, prefix);
        this.loader.require('models', models, prefix);
        this.loader.require('middleware', middleware, prefix);

        this.submodules.userland(controllers, models, middleware);
    }

    /**
     * express configures the express framework
     * @param {express.Application} app
     * @param {express} express 
     * @param {array} mware Default middleware to apply if non specified
     */
    express(app, express, mware) {

        var isMain = (this.name() === '');
        var isApp = ((!this.configuration.read(configs.USE_WEB_ROUTER)) || isMain);
        var target = (isApp) ? express() : express.Router();
        var router;
        var path = this.configuration.readWithDefaults(configs.PATH, `/${this.name()}`);
        var engine = this.configuration.readWithDefaults(configs.WEB_ENGINE, null);
        var engineSetup = this.application.framework.express.engines[engine];
        var features
        var routes;
        var q;

        this.application.interpolate(this.application.framework.express.middleware,
            this.configuration.readWithDefaults(configs.WEB_PLUGINS, mware)).
        forEach(m => m(target, this));

        if (isMain)
            this.application.emit(this.application.events.ROUTING, target, this);

        if (isApp) {
            if (engine && (!engineSetup)) {
                throw new Error(`The view engine '${engine}' was not found!`);
            } else if (engine) {

                if (typeof engineSetup !== 'function')
                    throw new Error(`Invalid configure script found for view engine '${engine}'!` +
                        `The script must export a function, found typeof '${typeof engine}'.`);

                engineSetup(target, this);

            }
        }

        features = FeatureFactory.web(this.application);

        routes = this.loader.load(paths.WEB_ROUTES, {
            web: {}
        });

        Object.keys(routes).
        forEach(function(path) {
            q = new ExpressQ(path, target);
            Object.keys(routes[path]).
            forEach(method => features.install(method, path, routes[path][method], q));
            q.flush();
        });

        if (isMain) {
            app.use(target);
        } else if (path) {
            app.use(path, target);
        }

        this.submodules.express((isApp) ? target : app, express, (isApp) ? ['public'] : []);
    }

    /**
     * restify
     * @param {restify.Server} server
     * @param {array} plugins 
     * @param {string} path 
     */
    restify(server, plugins) {

        var features;
        var routes;
        var q;
        var path = this.configuration.readWithDefaults(configs.PATH, this.path);

        this.application.interpolate(this.application.framework.restify.plugins,
            this.configuration.readWithDefaults(configs.API_PLUGINS, plugins)).
        forEach(p => p(server, this.application, this));

        features = FeatureFactory.api(this.application);
        routes = this.loader.load(paths.API_ROUTES, {
            api: {}
        });

        Object.keys(routes).
        forEach((route) => {
            q = new RestifyQ(path + route, server);
            Object.keys(routes[route]).
            forEach(method =>
                features.install(method, path + route, routes[route][method], q));
            q.flush();
        });

        this.submodules.restify(server, []);

    }
}

export default Module
