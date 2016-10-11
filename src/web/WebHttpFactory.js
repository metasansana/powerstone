import beof from 'beof';
import HttpFactory from '../app/HttpFactory';
import WebResponse from './WebResponse';
import Action from '../app/route/Action';

/**
 * WebHttpFactory
 */
class WebHttpFactory extends HttpFactory {

    response(req, res, action) {

        beof({req}).object();
        beof({ res }).object();
        beof({ action }).instance(Action);

        return new WebResponse(req, res, action,  action.route.module);

    }


}
export default WebHttpFactory
