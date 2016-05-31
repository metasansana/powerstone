/**
 * UnknownResourceLookupError 
 * @param {string} lookup 
 * @param {string} str 
 */
class UnknownResourceLookupError extends Error {

    constructor(lookup, str) {
        super(`An unknown lookup '${lookup}' was specified in the string '${str}'!`);
        Error.captureStackTrace(this, this.constructor);
    }

}

export default UnknownResourceLookupError
