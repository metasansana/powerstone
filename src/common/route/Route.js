import PowerError from '../PowerError';

class UnsupportedMethodError extends PowerError {

    constructor(method, path) {

        super(`Unknown method '${method}' declared for path '${path}'`);

    }

}

/**
 * Route
 * @param {string} method 
 * @param {string} path 
 * @param {object} route 
 * @param {array<function>} actions 
 * @param {FrameworkApplication} app 
 */
class Route {

    constructor(method, path, spec, actions, app) {

        this.spec = spec;

        actions.unshift(this.handleRoute.bind(this));

        if (!app[method])
            throw new UnsupportedMethodError(method, path);

        app[method.toLowerCase()].apply(app, [path].concat(actions));

    }

    handleRoute(req, res, next) {

      req.power = {

        route: this.spec

      };

        next();

    }

}

export default Route
