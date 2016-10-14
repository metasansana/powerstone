import beof from 'beof';
import Module from './Module';

/**
 * HttpFactory is a class for creating wrapped versions of request and response
 * passed to controllers and middleware.
 * @param {Module} module
 */
class HttpFactory {

    constructor(module) {

        beof({ module }).instance(Module);

        this.module = module;

    }

    /**
     * request returns a wrapped version of the Request object
     * @param {http.Request} req
     * @param {http.Response} res
     * @param {OutputFilter} filter
     * @returns {Request}
     */
    request(req, res) {

        return req;

    }

    /**
     * response returns a wrapped version of the Response object
     * @param {http.Request} req
     * @param {http.Response} res
     * @param {OutputFilter} filter
     * @returns {Response}
     */
    response(req, res) {

        return res;

    }

}

export default HttpFactory
