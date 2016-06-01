import Results from '../common/Results';

class Controller extends Results {

  send(status, body) {

    this.response.status(status).send(body);

  }

}

export default Controller

