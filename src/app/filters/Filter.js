/**
 * Filter
 * @param {Action} action
 * @param {Module} module
 * @param {Application} application
 */
class Filter {

    constructor(action, module, application) {

        this.action = action;
        this.module = module;
        this.application = application;

    }

    /**
     * apply this Filter
     * @param {Request} req
     * @param {Response} res
     * @param {function} next
     */
    apply(req, res, next) {

        next();

    }

}

export default Filter
