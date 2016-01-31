import Feature from './Feature';

/**
 * MiddlewareFeature configures middleware
 */
class MiddlewareFeature extends Feature {

    install(method, path, definition, q) {

        if (!Array.isArray(definition.middleware)) return;

        this.application.resolveMiddleware(definition.middleware).
        forEach(m => q.enque(method, (req, res, next) => 
              m(req, res, next, this.application, definition)));

    }

}

export default MiddlewareFeature
