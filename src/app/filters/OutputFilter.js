import beof from 'beof';
import Promise from 'bluebird';
import AndOutputFilter from './AndOutputFilter';

/**
 * OutputFilter provides a method to chain transformations of data being sent to the client
 * in an easy to identify way. Considered much easier to identify and keep track of
 * than a bunch of callback functions.
 * @param {Action} action
 * @param {Route} route
 * @param {Module} module
 */
class OutputFilter {

    constructor(action, route, module) {

        this.action = action;
        this.route = route;
        this.module = module;

    }

    /**
     * and chains another OutputFilter to this one.
     * @param {OutputFilter} filter
     * @returns {OutputFilter}
     */
    and(filter) {

        beof({ filter }).instance(OutputFilter);
        return new AndOutputFilter(this, filter);

    }

    /**
     * apply this OutputFilter
     * @param {*} out
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise}
     */
    apply(out, req, res) {

        return Promise.resolve(out);

    }

}

export default OutputFilter
