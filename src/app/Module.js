import Path from 'path';
import beof from 'beof';
import startswith from 'lodash.startswith';
import Configuration from './Configuration';
import CompositeModule from './CompositeModule';
import PropertyResource from './resource/PropertyResource';
import RequireResource from './resource/RequireResource';
import ModuleResource from './resource/ModuleResource';
import SchemeResource from './resource/SchemeResource';
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
 * @param {Application} app
 * @param {Module} [parent]
 *
 * @property {string} name
 * @property {Configuration} configuration
 * @property {Application} application
 * @property {Module} parent
 * @property {CompositeModule} modules
 * @property {string} [configDirectory='apiconf']
 */
class Module {

    constructor(name, config, app, parent = null) {

        this.name = name;
        this.configuration = config;
        this.application = app;
        this.parent = parent;
        this.viewEngine = null;
        this.modules = new CompositeModule([]);
        this.configDirectory = 'apiconf';
        this.redirecting = false;
        this.redirectUrl = '';
        this.redirectStatus = 302;

    }

    preRouting(req, res, next) {

        if (this.redirecting) {
            res.writeHead(this.redirectStatus, { 'Location': this.redirectUrl });
            res.end();
            return;

        }

        next();


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
                this.app.context[key][name] = resource.find(autoloads[autokey]));

            this.configuration.require(this.configuration.paths[key], this.application.context[key]);

        });

        this.modules.__autoload();

    }

    /**
     * __viewEngine configures the view engine for this module.
     * The parent view engine is used if none is configured.
     */
    __viewEngine() {

        var resource = new SchemeResource(new RequireResource());
        var factory = this.configuration.read(this.configuration.keys.VIEWS_ENGINE, null);

        if (!factory)
            return this.viewEngine = (this.parent) ? this.parent.viewEngine : null;

        this.viewEngine = factory.create(this);

        this.modules.__viewEngine();

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
        var resource = new PropertyResource(this.application.context.connectors);

        return Object.keys(connections).
        map(key => {

            config = connections[key];
            connector = resource.find(config.connector);

            if (!connector)
                throw new UnknownConnectorError(key, config.connector,
                    this.application.context.connectors);

            if (typeof connector !== 'function')
                throw new TypeError(`Connector must be a function got '${typeof connector}'!`);

            return connector(config.options).then(c => this.application.context.connections[key] = c);

        }).concat(this.modules.__connections());

    }

    /**
     * __filters loads the pre routing middleware.
     */
    __filters(app, defaults) {

        var resource = new SchemeResource(
            new PropertyResource(this.application.context.filters));

        resource.add('require', new RequireResource());

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
     * @param {Resource} resource
     * @abstract
     */
    __routing(mountPoint, app, resource) {


    }

    /**
     * redirect the routes of this module to a url
     * @param {string} url
     * @param {number} [status]
     */
    redirect(url, status = 302) {

        beof({ url }).string();
        beof({ status }).number();

        this.redirecting = true;
        this.redirectUrl = url;
        this.redirectStatus = status;

    }

    /**
     * stopRedirecting disables redirecting
     */
    stopRedirecting() {

        this.redirecting = false;

    }

    /**
     * path returns the logical application path for this module.
     * That is, the path routes are mounted to by default.
     * @returns {string}
     */
    path() {

        if (!this.parent) return '/';
        return Path.join(this.parent.path(), this.name);

    }

    /**
     * isChild checks if a path is a child module of this module
     * @param {string} path
     */
    isChild(path) {

        return startswith(path, this.path());

    }

    /**
     * find retrieves a module or null if it is not found.
     * @param {string} path
     * @returns {Module|null}
     */
    find(path) {

        beof({ path }).string();

        if (path === this.path())
            return this;

        if (this.isChild(path))
            return this.modules.find(path);

        if (this.parent)
            return this.parent.find(path);

        return null;

    }

    /**
     * connect
     */
    connect() {

        this.__init();
        this.__autoload();

        return Promise.all(this.__connections()).
        then(() => (this.parent === null) ?
            this.application.onServiceListener.onConnected(this.application) :
            null);

    }

    /**
     * load this module
     */
    load(app) {

 return       this.connect().
        then(() => {

            var resource;
            var scheme = new SchemeResource(new RequireResource());

            this.__filters(app, ['default']);
            this.__framework();
            this.__viewEngine();

            scheme.add('module', new RequireResource(this.configuration.paths.root));

            resource = new PropertyResource(this.application.context.middleware);
            resource = resource.or(new PropertyResource(this.application.context.controllers)).
            or(scheme);

            this.__routing('', app, resource);

        });

    }

}

export default Module
