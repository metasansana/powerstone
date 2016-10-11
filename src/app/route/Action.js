import beof from 'beof';
import Middleware from './Middleware';
import Views from './Views';
import Controllers from './Controllers';
import Route from './Route';
import HttpFactory from '../HttpFactory';
import OutputFiltering from './OutputFiltering';
import LameFilter from '../filters/LameFilter';

/**
 * Action repsents the various tasks that will be performed when a route
 * is accessed via a particular verb.
 * @param {string} method
 * @param {object} def
 * @param {HttpFactory} factory
 */
class Action {

    constructor(method, def, factory) {

        beof({ method }).string();
        beof({ def }).object();
        beof({ factory }).instance(HttpFactory);

        this.id = def.id || '';
        this.method = method;
        this.def = def;
        this.route = null;
        this.callbacks = [];
        this.output = new LameFilter();
        this.factory = factory;

    }

    /**
     * setRoute
     * @param {Route} route
     */
    setRoute(route) {

        beof({ route }).instance(Route);

        this.route = route;

    }

    /**
     * prepare this Action
     * @param {string} path
     * @param {express.Application | restify.Server} framework
     * @param {Resource} resource
     */
    prepare(path, framework, resource) {

        Middleware.prepare(this.def, this, resource);
        Views.prepare(this.def, this, resource);
        Controllers.prepare(this.def, this, resource);
        OutputFiltering.prepare(this.def, this, resource);

        this.callbacks.unshift(path);
        framework[this.method].apply(framework, this.callbacks);

    }

}

export default Action
