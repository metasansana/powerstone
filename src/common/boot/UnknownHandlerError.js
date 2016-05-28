/**
 * UnknownHandlerError 
 * @param {string} handler 
 * @param {string} str 
 */
class UnknownHandlerError extends Error {

    constructor(handler, str) {
        super(`An unknown handler '${handler}' was specified in string '${str}'!`);
        Error.captureStackTrace(this, this.constructor);
    }

}

export default UnknownHandlerError
