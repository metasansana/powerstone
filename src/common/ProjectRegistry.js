/**
 * ProjectRegistry
 */
class ProjectRegistry {

    constructor() {
        this.models = Object.create(null);
        this.controllers = Object.create(null);
        this.queries = Object.create(null);
        this.middleware = Object.create(null);
        this.pipes = Object.create(null);
    }

    /**
     * convertMiddleware turns an array of strings
     * into an array of executable middleware functions
     * @param {array} wares 
     * @returns {array<string>}
     */
    convertMiddleware(wares) {

        return wares.map(w => {

            if (typeof w === 'function') return w;
            if (!this.middleware[w]) throw new Error(`Unknown middleware: '${w}' declared in route file!`);
            return this.middleware[w];

        });
    }

    /**
     * convertAction makes an executable of an action decleration
     */
    convertAction(action, route) {

        var Controller;
        var method;

        if (typeof action === 'function') return action;
        action = action.split('.');
        Controller = this.controllers[action[0]];
        method = action[1];

        if (!Controller) throw new Error(`Unknown controller: '${action[0]}' decleared in route file!`);

        return function(req, res) {

            var i = new Controller(req, res, route);
            if (typeof i[method] !== 'function') {
                res.send(500);
                return res.send();
            }
            i[method]();
        };

    }

}

export default new ProjectRegistry();
