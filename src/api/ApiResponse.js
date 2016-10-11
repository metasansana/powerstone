import beof from 'beof';
import Response from '../app/Response';

/**
 * ApiResponse
 */
class ApiResponse extends Response {

    send(status, body) {

        beof({ status }).number();

        this.response.send(status, body);

    }

}

export default ApiResponse
