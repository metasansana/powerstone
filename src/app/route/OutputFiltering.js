import Error from 'es6-error';
import property from 'property-seek';

class UnknownOutputFilterError extends Error {

    constructor(f, list) {

        super(`OutputFilter'${f}' was not found! Found: ${Object.keys(list)}`);

    }

}

/**
 *
 */
class OutputFiltering {

    static prepare(def, action, resource) {

        if (typeof def.out !== 'string') return;

        def.out.split(',').
        forEach(o => {

            var Filter = resource.find(o);
            var filter;

            if (!Filter)
                throw new UnknownOutputFilteringError(m,
                    action.route.module.application.context.outputFilters);

            if (typeof Filter !== 'function')
                throw new TypeError(`OutputFiltering must be a constructor function! For '${m}'`);

            action.outputs.push(new Filter(action, action.route.module, action.route.module.app));

        });

    }
}

export default OutputFiltering
