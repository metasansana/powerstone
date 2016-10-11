import beof from 'beof';
import HttpFactory from '../app/HttpFactory';
import ApiResponse from './ApiResponse';
import Action from '../app/route/Action';

/**
 * ApiHttpFactory
 */
class ApiHttpFactory extends HttpFactory {

    response(req, res, action) {

        beof({req}).object();
        beof({ res }).object();
        beof({ action }).instance(Action);

        return new ApiResponse(req, res, action, action.route.module);

    }

}

export default ApiHttpFactory

