import beof from 'beof';
import HttpFactory from '../app/HttpFactory';
import ApiResponse from './ApiResponse';

/**
 * ApiHttpFactory
 */
class ApiHttpFactory extends HttpFactory {

    response(req, res, output) {

        beof({ req }).object();
        beof({ res }).object();

        return new ApiResponse(req, res, this.module, output);

    }

}

export default ApiHttpFactory
