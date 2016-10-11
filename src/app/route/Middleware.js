import Error from 'es6-error';
import property from 'property-seek';

class UnknownMiddlewareError extends Error {

    constructor(ware, list) {

        super(`Middleware '${ware}' was not found! Found: ${Object.keys(list)}`);

    }

}

/**
 *
 */
class Middleware {

    static prepare(def, action, resource) {

        if (typeof def.middleware !== 'string') return;

        def.middleware.split(',').
        forEach(m => {

            var Mware = resource.find(m);
            var mware

            if (!Mware)
                throw new UnknownMiddlewareError(m, action.route.module.application.context.middleware);

            if (typeof Mware !== 'function')
                throw new TypeError(`Middleware must be constructor functions! For '${m}'`);

            mware = new Mware(action, action.route.module, action.route.module.application);
            action.callbacks.push((req, res, next) =>
                mware.apply(action.factory.request(req, action),
                    action.factory.response(res, action), next));

        });

    }
}

export default Middleware
