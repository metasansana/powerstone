/**
 * Router
 */
class Router {

    constructor(handler) {

        this._handler = handler;
        this._routes = [];

    }

configure() {

        var path = this.configuration.readOrDefault(Configuration.keys.PATH, `/${this.name}`);
        var routes = this.configuration.readOrDefault(Configuration.keys.ROUTES, {});
        var location = `${point}/${path}`;
        var action;

        Object.keys(routes).
        forEach(path => {

            Object.keys(routes[path]).
            map(method => {

                actions = new Actions(method, path, Delegates.create(routes[path][method]));
                actions.apply(this._handler);

            });

        });

        this.submodules.__routing(location, this.handler);
        parent.use(path, this.handler);

}

    /**
     * add a Route to this router
     * @param {string} path 
     * @param {Route} route 
     */
    add(path, route) {

        route.apply(this._handler);
        this._routes.push(route);

    }

}
export default Router
