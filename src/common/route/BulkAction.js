/**
 * BulkAction provides an api for grouping actions together
 * so that the Route class has an easier time utilizing them.
 * @param {array<Action>} actions 
 * @implments {Action}
 */
class BulkAction {

    constructor(actions) {

        this._actions = actions;

    }

    generate(method, path, route, main) {

        var all = [];

        this._actions.forEach(a => {

            var action = a.generate(method, path, route, main);

            if (Array.isArray(action)) {
                all.push.apply(all, a.generate(method, path, route, main));
            } else {
                all.push(action);
            }

        });

        return all.filter(f => f);

    }

}

export default BulkAction
