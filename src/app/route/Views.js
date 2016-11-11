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

                var context = {};

                if (res.locals)
                    Object.keys(res.locals).forEach(k => context[k] = res.locals[k]);

                if (def.locals)
                    Object.keys(def.locals).forEach(k => context[k] = def[k]);

                action.factory.response(req, res, action.output).render(def.view, context);

            });

        }

    }

}

export default Views
