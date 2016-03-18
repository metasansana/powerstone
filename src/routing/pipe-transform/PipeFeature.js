import Feature from '../Feature';
import PipeController from './PipeController';

/**
 * PipeFeature installs middleware for the pipes framework
 * on a route.
 */
class PipeFeature extends Feature {

    install(method, path, definition, q) {

        if (typeof definition.pipes !== 'object') return;

        Object.keys(definition.pipes).
        forEach(prop => {
            q.enque(method, (req, res, next) =>
                (new PipeController(req, res, this.application)).filter(prop, definition, next));
        });
    }

}

export default PipeFeature
