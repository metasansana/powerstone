import Error from 'es6-error';
import property from 'property-seek';
import Throws from '../../util/Throws';

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

        if(! def.middleware)
        return;

        if (typeof def.middleware !== 'string')
            Throws.fromModule('Middleware must be a string!', action.route.module, TypeError);

        def.middleware.split(',').
        forEach(m => {

            var Mware = resource.find(m);
            var mware;

            if (!Mware)
                throw new UnknownMiddlewareError(m, action.route.module.application.context.middleware);

            if (typeof Mware !== 'function')
                throw new TypeError(`Middleware must be constructor functions! For '${m}'`);

            mware = new Mware(action, action.route.module, action.route.module.application);

            action.callbacks.push((req, res, next) => {

                var preq = action.factory.request(req, res, action.output);
                var pres = action.factory.response(req, res, action.output);

                Promise.resolve(mware.apply(preq, pres, next)).catch(e =>
                    action.route.module.application.onRouteErrorListener.onRouteError(e,
                        preq, pres, next));

            });

        });

    }
}

export default Middleware
