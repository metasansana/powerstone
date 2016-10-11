import beof from 'beof';
import Response from '../app/Response';

/**
 * WebResponse
 */
class WebResponse extends Response {

    send(status, body) {

        beof({ status }).number();

        this.response.status(status).send(body);

    }

}

export default WebResponse
