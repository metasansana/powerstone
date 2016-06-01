/**
 * ViewAction
 */
class ViewAction {

    constructor(cb) {

        this._cb = cb;

    }

    generate(method, path, route) {

        if (route.view)
            return this.cb(view);

    }

}

export default ViewAction
