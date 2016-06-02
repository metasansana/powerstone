import PowerError from './PowerError';

/**
 * UnknownFilterError 
 */
class UnknownFilterError extends PowerError {

    constructor(module, filter) {

        super(`Unable to locate filter '${filter}' specified in module ${module}!`);

    }

}

export default UnknownFilterError
