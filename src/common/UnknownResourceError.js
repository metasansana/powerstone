/**
 * UnknownResourceError 
 * @param {string} lookup 
 * @param {string} str 
 */
class UnknownResourceError extends Error {

    constructor(lookup, str) {
        super(`An unknown lookup '${lookup}' was specified in the string '${str}'!`);
        Error.captureStackTrace(this, this.constructor);
    }

}

export default UnknownResourceError
