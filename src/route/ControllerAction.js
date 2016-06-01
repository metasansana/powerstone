import Property from 'property-seek';

//TODO Someday we will parse the action string with arguments and all, until then,
//bare with me.
function resolveAction(action, controllers) {

    var split;
    var Controller;
    var path;
    var type;
    var method;
    var is_call = function(str) {

        str = str || '';

        if (str.indexOf('(') > -1)
            if (str.indexOf(')') > -1)
                return true;
    }

    if (is_call(action)) {
        split = action.slice(0, -2).split('.');
        method = split.pop();
    } else {
        split = action.split('.');
    }

    path = split.join('.');
    Controller = Property.get(controllers, path);

    return function (req, res) {
    (new Controller(req, res))[method]();
    }
    return Controller;
}

/**
 * ControllerAction configures handlers for controllers.
 * @param {object} controllers A map of known controllers
 */
class ControllerAction {

    constructor(controllers) {

        this._controllers = controllers;

    }

    generate(method, path, route) {


        if (typeof route.action === 'string')
            return resolveAction(route.action, this._controllers);

        if (typeof route.action === 'function')
            return route.action;

    }

}

export default ControllerAction
