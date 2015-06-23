import Runtime from '../Runtime';
/**
 * Controller
 */
class Controller {

    constructor() {
        Runtime.controllers[this.constructor] = this;
    }

}

export default Controller
