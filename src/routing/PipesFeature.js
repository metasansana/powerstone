import Pipe from 'pipe-transform/Pipe';
import Feature from './Feature';

/**
 * PipesFeature installs middleware for the pipes framework
 * on a route.
 */
class PipesFeature extends Feature {

    install(method, path, definition, q) {

        var p;
        var spec;
        var pipe;
        var selection;

        if (typeof definition.pipes !== 'object') return;

        Object.keys(definition.pipes).
        forEach(request_property => {

            selection = definition.pipes[request_property];

            spec = (typeof selection === 'object') ? selection :
                this.application.framework.pipes.defines[selection];

            if (!spec)
                throw new Error(`Unknown pipe selection '${selection}' ` +
                    `decleared for property '${request_property}'!`);

            p = new Pipe(spec, this.application.framework.pipes.filters);

            q.enque(method, function(req, res, next) {

                p.run(req[request_property], function(err, o) {
                    if (err) {
                        res.status(409);
                        return res.send();
                    }
                    req[request_property] = o;
                    next();
                });
            });
        });
    }

}

export default PipesFeature
