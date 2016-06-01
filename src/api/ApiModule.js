import Configuration from '../common/Configuration';
import Module from '../common/Module';
import Route from '../route/Route';

/**
 * Module
 * @param {string} fqn The name of the module prefixed with its parent modules 
 * @param {string} path 
 * @param {Configuration} config 
 * @param {Loader} loader 
 * @param {Application} app 
 */
class ApiModule extends Module {

    constructor(name, config, context, app) {

        super(name, config, context, app);
        this.__defaultFilters = ['default'];

    }

    __submodule(resource, app) {

        return new ApiModule(resource.basename,
            new Configuration('apiconf', resource.path), this.context, app);

    }

    __framework() {


    }

    __routing(point, app, actions) {

        var path = this.configuration.read(Configuration.keys.PATH, `${point}/${this.name}`);
        var routes = this.configuration.routes;

        Object.keys(routes).
        forEach(route =>
            this.routes = Object.keys(routes[route]).map(method =>
                new Route(method, `${path}/${route}`, [this.handleRoute.bind(this)].concat(
                    actions.generate(method, `${path}/${route}`, routes[route][method])), app)));

        this.submodules.__routing(path, app, actions);

    }

}

export default ApiModule
