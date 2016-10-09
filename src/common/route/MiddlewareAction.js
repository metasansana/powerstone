import PowerError from '../PowerError';

class UnknownMiddlewareError extends PowerError {
    constructor(ware) {
        super(`Unable to locate middleware specified as ${ware}!`);
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * MiddlewareAction configures middleware specified by the 'middlewares'
 * key in a route declaration.
 * @implements {Action}
 */
class MiddlewareAction {

    constructor(resources) {

        this._resources = resources;

    }

    generate(method, path, route, main) {

        if (Array.isArray(route.middleware))
            return route.middleware.map(middleware => {

                if (typeof middleware === 'function')
                    return middleware;

                var module = this._resources.find(middleware);

                if (!module)
                    throw new UnknownMiddlewareError(middleware);

                return module;

            });

    }
}

export default MiddlewareAction
