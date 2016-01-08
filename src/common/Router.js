import Route from '../common/Route';
/**
 * Router provides methods for setting up 
 * application routing.
 * @param {Framework} fw 
 * @param {Configuration} config 
 */
class Router {

    constructor(fw, config) {
        this.fw = fw;
        this.config = config;
    }

    /**
     * configure routing
     * @param {object} routes 
     */
    configure(routes) {

        var route;
        Object.keys(routes).
        forEach(path =>
            Object.keys(routes[path]).forEach(method => {
                route = new Route(method.toLowerCase(), path, this.fw, this.config);
                route.configureDefault(routes[path][method]).
                configureSchema(routes[path][method].schema).
                configurePipes(routes[path][method].pipes).
                configureMiddleware(routes[path][method].middleware).
                configureAction(routes[path][method].action);
            }));
    }

}

export default Router;
