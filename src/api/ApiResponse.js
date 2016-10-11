import beof from 'beof';
import Response from '../app/Response';

/**
 * ApiResponse
 */
class ApiResponse extends Response {

    send(status, body) {

        beof({ status }).number();

        this.action.output.apply(body, this.request, this).
        then(body => this.response.send(status,body)).
        catch(e => this.error(e));

    }

}

export default ApiResponse
