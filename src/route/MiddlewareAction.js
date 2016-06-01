/**
 * MiddlewareAction configures middleware specified by the 'middlewares'
 * key in a route declaration.
 * @implements {Action}
 */
class MiddlewareAction {

    constructor(resources) {

        this._resources = resources;

    }

    generate(method, path, route) {

        if (Array.isArray(route.middleware))
            return route.middleware.map(middleware => (typeof middleware === 'function') ? middleware :
                this._resources.lookup(middleware).module);

    }

}

export default MiddlewareAction
