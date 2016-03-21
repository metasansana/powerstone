import BaseResults from '../common/Results';

/**
 * Results 
 */
class Results extends BaseResults {

    send(status, body) {

        this.response.send(status, body);

    }

}

export default Results
