import Pipe from 'pipes/build/Pipe';
import Feature from './Feature';

/**
 * PipesFeature installs middleware for the pipes framework
 * on a route.
 */
class PipesFeature extends Feature {

    install(method, path, definition, q) {

        var p;

        if (typeof definition.pipes !== 'object') return;

        Object.keys(definition.pipes).
        forEach(key => {

            p = new Pipe(definition.pipes[key], this.application.framework.pipes);

            q.enque(method, function(req, res, next) {

                p.run(req[key], function(err, o) {
                    if (err) {
                        res.status(409);
                        return res.send();
                    }
                    req[key] = o;
                    next();
                });

            });
        });

    }

}

export default PipesFeature
