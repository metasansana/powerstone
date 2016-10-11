import beof from 'beof';
import Action from './route/Action';
import Module from './Module';
import Application from './Application';

/**
 * Controller
 * @param {Action} action
 * @param {Module} module
 * @param {Application} app
 */
class Controller {

    constructor(action, module, app) {

        beof({ action }).instance(Action);
        beof({ module }).instance(Module);
        beof({ app }).instance(Application);

        this.action = action;
        this.module = module;
        this.application = app;

    }

}

export default Controller
