import PowerError from './PowerError';
/**
 * UnknownModuleError 
 */
class UnknownModuleError extends PowerError {

    constructor(name) {

        super(`The module '${name}' was not found!`);

    }

}

export default UnknownModuleError
