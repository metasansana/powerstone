import beof from 'beof';
import Response from '../app/Response';

/**
 * WebResponse
 */
class WebResponse extends Response {

    send(status, body) {

        beof({ status }).number();

        this.action.output.apply(body, this.request, this).
            then(body=> this.response.status(status).send(body)).
            catch(e=>this.error(e));

    }

}

export default WebResponse
