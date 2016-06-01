/**
 * Route
 * @param {string} method 
 * @param {string} path 
 * @param {object} route 
 * @param {array<function>} actions 
 * @param {FrameworkApplication} app 
 */
class Route {

    constructor(method, path, actions, app) {

        actions.unshift(this.handleRoute.bind(this));
        app[method.toLowerCase()].apply(app, [path].concat(actions));

    }

    handleRoute(req, res, next) {

        next();

    }



}

export default Route
