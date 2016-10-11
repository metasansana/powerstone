import beof from 'beof';
import Context from './Context';

/**
 * HttpFactory is a class for creating wrapped versions of request and response
 * passed to controllers and middleware.
 * @param {Context} context
 */
class HttpFactory {

    constructor(context) {

        beof({ context }).instance(Context);

        this._context = context;

    }

    /**
     * request returns a wrapped version of the Request object
     * @param {http.Request} req
     * @param {Action} action
     * @returns {Request}
     */
    request(req, action) {

        return req;

    }

    /**
     * response returns a wrapped version of the Response object
     * @param {http.Response} res
     * @param {Action} action
     */
    response(res, action) {

        return res;

    }

}

export default HttpFactory
