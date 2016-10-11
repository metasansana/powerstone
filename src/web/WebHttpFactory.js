import beof from 'beof';
import HttpFactory from '../app/HttpFactory';
import WebResponse from './WebResponse';
import Action from '../app/route/Action';

/**
 * WebHttpFactory
 */
class WebHttpFactory extends HttpFactory {

    response(res, action) {

        beof({ res }).object();
        beof({ action }).instance(Action);

        return new WebResponse(res, action, action.route, action.route.module);

    }


}
export default WebHttpFactory
