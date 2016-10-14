import beof from 'beof';
import HttpFactory from '../app/HttpFactory';
import WebResponse from './WebResponse';
import OutputFilter from '../app/filters/OutputFilter';
import Action from '../app/route/Action';

/**
 * WebHttpFactory
 */
class WebHttpFactory extends HttpFactory {

    response(req, res, output) {

        beof({ req }).object();
        beof({ res }).object();

        return new WebResponse(req, res, this.module, output);

    }


}

export default WebHttpFactory
