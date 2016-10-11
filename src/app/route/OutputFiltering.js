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

        var output = def.output;

        if (!output) return;

        if (typeof output === 'string')
            output = output.split(',');

        if (!Array.isArray(output))
            throw new TypeError('The \'output\' directive must be a string or array!');

        output.forEach(o => {

            var Filter = resource.find(o);
            var filter;

            if (!Filter)
                throw new UnknownOutputFilteringError(m,
                    action.route.module.application.context.outputFilters);

            if (typeof Filter !== 'function')
                throw new TypeError(`OutputFiltering: invalid constructor function for: '${m}'!`);

            action.output = action.output.and(new Filter(action, action.route, action.route.module));

        });

    }
}

export default OutputFiltering
