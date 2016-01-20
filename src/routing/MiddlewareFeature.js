import Feature from './Feature';

/**
 * MiddlewareFeature configures middleware
 */
class MiddlewareFeature extends Feature {

    install(method, path, definition, q) {

        if (!Array.isArray(definition.middleware)) return;

        this.application.resolveMiddleware(definition.middleware).
        forEach(function(m) {

 q.enque(method, function(req, res, next) {

                m(req, res, next, definition);
                next();

            });

        });

    }

}

export default MiddlewareFeature
