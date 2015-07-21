import Promise from 'bluebird';
import Pool from './Pool';
import UnsupportedConnectionTypeError from  './UnsupportedConnectionTypeError';
import UnknownConnectionError from './UnknownConnectionError';

/**
 * Connections is a registry for connections
 */
class Connections {

    constructor() {
        this.types = {};
        this.pool = Pool;
    }

    /**
     *
     * @param {String} name
     * @param {ConnectionFactory} factory
     */
    set(name, factory) {
        this.types[name] = factory;
        return this;
    }

    /**
     * create will return an instance of the desired connection if found.
     * @param {String} name
     * @param {String} type
     * @param {Object} options
     * @returns {AbstractConnection}
     */
    create(name, type, options) {

        var conn;

        if (!this.types.hasOwnProperty(type))
            throw new UnsupportedConnectionTypeError(type);

        conn = this.types[type].create(name, type, options);
        this.pool[name] = conn;

        return conn;

    }

    hasConnection(name) {
        return (this.pool.hasOwnProperty(name))
    }

    /**
     * getConnection
     * @param {String} name
     * @return {AbstractConnection}
     */
    getConnection(name) {

        if (!this.pool.hasOwnProperty(name))
            throw new UnknownConnectionError(name);

        return this.pool[name];
    }

    /**
     * open
     * @return {Promise}
     */
    open() {
        return Promise.all(Object.keys(this.pool).map(key=> {
            this.pool[key].open();
        }));
    }

    /**
     * close all the connections
     * @return {Promise}
     */
    close() {
        return Promise.all(Object.keys(this.pool).map(function (connection) {
            return connection.close()
        }));
    }
}

export default new Connections();