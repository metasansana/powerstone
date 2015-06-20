const hasCaptureStackTrace = 'captureStackTrace' in Error;

/**
 * PowerStoneError
 */
class PowerStoneError extends Error {

}

PowerStoneError.setup = function (message) {
    const { name } = this.constructor;

    if (hasCaptureStackTrace)
        Error.captureStackTrace(this, this.constructor);
    else
        Object.defineProperty(this, 'stack', {
            value: new Error().stack
        });

    Object.defineProperties(this, {
        name: { value: name },
        message: { value: message }
    })
};

export default PowerStoneError
