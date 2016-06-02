import Configuration from './Configuration';
import CompositeModule from './CompositeModule';
import PropertyResource from './resource/PropertyResource';
import RequireResource from './resource/RequireResource';
import ModuleResource from './resource/ModuleResource';
import SchemeResource from './resource/SchemeResource';
import Pool from '../net/Pool';
import RouteAction from './route/BulkAction';
import MiddlewareAction from './route/MiddlewareAction';
import ControllerAction from './route/ControllerAction';
import View from './route/View';
import BulkAction from './route/BulkAction';
import UnknownConnectorError from './UnknownConnectorError';
import UnknownFilterError from './UnknownFilterError';
import UnknownModuleError from './UnknownModuleError';

const BASKET = {};
const BOX = [];

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
 * @property {CompositeModule} modules
 * @property {string} [configDirectory='apiconf']
 */
class Module {

    constructor(name, config, context, app) {

        this.name = name;
        this.configuration = config;
        this.context = context;
        this.application = app;
        this.modules = new CompositeModule([]);
        this.configDirectory = 'apiconf';

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

        var submodule;
        var resource = new SchemeResource(new ModuleResource(this));

        var submodules = this.configuration.
        read(this.configuration.keys.MODULES, BOX);

        var prevented = this.configuration.read(
            this.configuration.keys.MODULES_PREVENTED, BOX);

        resource.add('require', new RequireResource());

        submodules.
        forEach(path => {

            submodule = resource.find(path);

            if (!submodule)
                throw new UnknownModuleError(path);

            if (prevented.indexOf(submodule.name) > -1)
                submodule.preventRouting();

            this.modules.add(submodule);

        });

        this.modules.__init();

    }

    /**
     * __autoload the autoloadable aspects of the system
     */
    __autoload() {

        var resource = new SchemeResource(new RequireResource());
        var autoloads;
        var autokey;
        var key;

        var o = {};
        o[this.configuration.keys.CONNECTORS] = 'connectors';
        o[this.configuration.keys.FILTERS] = 'filters';
        o[this.configuration.keys.MIDDLEWARE] = 'middleware';
        o[this.configuration.keys.CONTROLLERS] = 'controllers';

        resource.add('require', new RequireResource());

        [
            this.configuration.keys.CONNECTORS,
            this.configuration.keys.FILTERS,
            this.configuration.keys.MIDDLEWARE,
            this.configuration.keys.CONTROLLERS
        ].
        forEach(prefixedKey => {

            key = o[prefixedKey];
            autokey = `power.autoload.${key}`;
            autoloads = this.configuration.read(autokey, BASKET);

            Object.keys(autoloads).forEach(name =>
                this.context[key][name] = resource.find(autoloads[autokey]));

            this.configuration.require(this.configuration.paths[key], this.context[key]);

        });

        this.modules.__autoload();

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
        var connections = this.configuration.read(this.configuration.keys.CONNECTIONS, BASKET);
        var resource = new PropertyResource(this.context.connectors);

        return Object.keys(connections).
        map(key => {

            config = connections[key];
            connector = resource.find(config.connector);

            if (!connector)
                throw new UnknownConnectorError(key, config.connector, this.context.connectors);

            return connector(config.options).then(c => Pool[key] = c);

        }).concat(this.modules.__connections());

    }

    /**
     * __filters loads the pre routing middleware.
     */
    __filters(app, defaults) {

        var resource = new SchemeResource(
            new PropertyResource(this.context.filters));

        resource.add('require', new RequireResource());
        app.use(this.handleRequest.bind(this));

        this.configuration.read(this.configuration.keys.FILTERS, defaults).
        forEach(f => {

            var filter = resource.find(f);

            if (!filter)
                throw new UnknownFilterError(this.name, f);

            filter.apply(app, this.configuration);

        });

        this.modules.__filters(app, ['public']);

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
     * preventRouting disables routing for this module.
     * Filters will still be applied but the chain will be blocked there.
     */
    preventRouting() {

    }

    /**
     * handleRequest is called before any of the routes for this
     * module are activated.
     * @param {Request} req 
     * @param {Response} res 
     * @param {function} next 
     */
    handleRequest(req, res, next) {

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
                new MiddlewareAction(new PropertyResource(this.context.middleware)),
                new ControllerAction(this.context.controllers),
                new View(this.viewEngine)
            ]));

        });

    }

}

export default Module
