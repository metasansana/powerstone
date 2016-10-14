/**
 * View
 * @implements {Action}
 */
class Views {

    static prepare(def, action, resource) {


        if (typeof def.view === 'string') {

            if (!action.route.module.viewEngine)
                throw new ReferenceError(`No view engine is installed for this module ` +
                    `'${action.route.module.configuration.paths.root}'!`);

            action.callbacks.push(function(req, res) {

                action.factory.response(req, res, action.output).render(def.view, def.locals);

            });

        }

    }

}

export default Views
