/**
 * ConnectionFactory provides an api for creating Connection objects.
 * @interface
 */
class ConnectionFactory {

    /**
     * create is called to create a new Connection implementation.
     * @param {String} type
     * @param {String} name
     * @param {Object}options
     * @return {AbstractConnection}
     */
    create(type, name, options) {

    }

}

export default ConnectionFactory