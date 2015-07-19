import Promise from 'bluebird';

/**
 * A connection is an object that needs to open to something remotely on application boot time.
 *
 * This usually is a database or some kind of queue system.
 * @param {String} name
 * @param {Object} options
 * @param {Array} list
 * @implements {Connection}
 * @constructor
 */
class AbstractConnection {

    constructor(name, options) {
        this.name = name;
        this.options = options;
    }

    /**
     * __open__ override this method to preform open/connect logic if the connection does
     * not support promises by default.
     *
     * It is wrapped in a promise for cleaner flow control.
     * @pararm {Function} resolve
     * @param {Function} reject
     */
    __open__(reject, resolve) {
        resolve();
    }

    /**
     * __close__ override this method to preform close/disconnect logic if the connection does
     * not support promises by default.
     */
    __close__(reject, resolve) {
        resolve();
    }


    open() {
        return new Promise(this.__open__.bind(this));
    }

    close() {
        return new Promise(this.__close__.bind(this));
    }
}

export default AbstractConnection