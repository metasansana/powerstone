import Configuration from '../common/Configuration';
import Module from '../common/Module';
import Route from '../common/route/Route';
import restify from 'restify';

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

        this.viewEngine = function() {
            throw new Error('ApiModule does not support views!');
        }

    }


    __framework() {


    }

    __routing(point, app, actions) {

        var path = this.configuration.read(this.configuration.keys.PATH, `${point}/${this.name}`);
        var routes = this.configuration.routes;

        Object.keys(routes).
        forEach(route =>
            this.routes = Object.keys(routes[route]).map(method =>
                new Route(method, `${path}/${route}`,
                    actions.generate(method, `${path}/${route}`,
                        routes[route][method]), app)));

        this.modules.__routing(path, app, actions);

    }

}

export default ApiModule
