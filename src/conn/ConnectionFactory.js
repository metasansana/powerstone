/**
 * ConnectionFactory provides an api for creating Connection objects.
 * @interface
 */
class ConnectionFactory {

    /**
     * create is called to create a new Connection implementation.
     * @param {String} name
     * @param {String} type
     * @param {Object}options
     * @return {AbstractConnection}
     */
    create(name, type, options) {

    }

}

export default ConnectionFactory