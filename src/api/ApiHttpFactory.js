import beof from 'beof';
import HttpFactory from '../app/HttpFactory';
import ApiResponse from './ApiResponse';
import Action from '../app/route/Action';

/**
 * ApiHttpFactory
 */
class ApiHttpFactory extends HttpFactory {

    response(res, action) {

        beof({ res }).object();
        beof({ action }).instance(Action);

        return new ApiResponse(res, action, action.route, action.route.module);

    }

}

export default ApiHttpFactory

