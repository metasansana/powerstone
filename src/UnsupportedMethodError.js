import PowerStoneError from './PowerStoneError';
import str from 'strtpl';

/**
 *  UnsupportedMethodError
 */
class  UnsupportedMethodError extends PowerStoneError{

    /**
     *
     * @param {String} method
     * @param {String} klass
     * @param {String} [message]
     */
    constructor(method, klass, message) {
        super();
        message = message || 'Unsupported method: {{klass}}#{{method}}';
        PowerStoneError.setup.call(this, str(message, {klass:klass, method:method}));
    }

}

export default UnsupportedMethodError
