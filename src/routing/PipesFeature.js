import Pipe from 'pipes/build/Pipe';
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

        if (typeof definition.pipes !== 'object') return;

        Object.keys(definition.pipes).
        forEach(property => {

            pipe = definition.pipes[property];
            spec = this.application.framework.pipes.defines[pipe];

            if (!spec)
                throw new Error(`Unknown pipe '${pipe}' decleared for property ${property}`);

            p = new Pipe(spec, this.application.framework.pipes.filters);

            q.enque(method, function(req, res, next) {

                p.run(req[property], function(err, o) {
                    if (err) {
                        res.status(409);
                        return res.send();
                    }
                    req[property] = o;
                    next();
                });
            });
        });
    }

}

export default PipesFeature
