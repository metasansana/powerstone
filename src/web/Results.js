import BaseResults from '../common/Results';

/**
 * Results 
 */
class Results extends BaseResults {

  send(status, body) {

    this.response.status(status).send(body);

  }

}

export default Results

