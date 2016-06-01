import Results from '../common/Results';

class Controller extends Results {

    send(status, body) {

        this.response.send(status, body);

    }

}

export default Controller
