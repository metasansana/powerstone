/**
 * Router
 */
class Router {

    constructor(handler) {

        this._handler = handler;
        this._routes = [];

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
