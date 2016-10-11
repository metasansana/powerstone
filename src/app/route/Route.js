import beof from 'beof';
import Error from 'es6-error';
import Action from './Action';
import Module from '../Module';

class UnsupportedMethodError extends Error {

    constructor(method, path) {

        super(`Route: Unknown method '${method}' declared for path '${path}'`);

    }

}

const METHODS = ['get', 'put', 'post', 'patch', 'delete'];

/**
 * Route
 * @param {string} path
 * @param {Module} module
 * @param {array<Action>} actions
 */
class Route {

    constructor(path, module, actions) {

        beof({ path }).string();
        beof({ module }).instance(Module);
        beof({ actions }).array();

        this.path = path;
        this.module = module;
        this.actions = actions;

        actions.forEach(a => a.setRoute(this));

    }

    /**
     * fromDef creates a Route from a definition object.
     * @param {object} def
     * @param {string} path
     * @param {HttpFactory} factory
     * @param {Module} module
     * @returns {Route}
     */
    static fromDef(def, path, factory, module) {

        beof({ def }).instance(Object);
        beof({ path }).string();

        return new Route(path, module,
            METHODS.map(m => (def.hasOwnProperty(m)) ?
                new Action(m, def[m], factory) : null).filter(m => m));

    }

    /**
     * prepare this route
     * @param {express.Application | restify.Server} framework
     * @param {Resource} resource
     */
    prepare(framework, resource) {

        this.actions.forEach(action => action.prepare(this.path, framework, resource));

    }

}

export default Route
