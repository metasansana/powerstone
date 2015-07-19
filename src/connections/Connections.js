import Promise from 'bluebird';
var UnknownConnectionError = require('./UnknownConnectionError');
var UnsupportedConnectionTypeError = require('./UnsupportedConnectionTypeError');

/**
 * Connections is a registry for connections
 */
class Connections {

    constructor() {
        this.types = {};
        this.pool = {};
    }

    /**
     * create will return an instance of the desired connection if found.
     * @param {String} type
     * @param {String} name
     * @param {Object} options
     * @returns {Connection}
     */
    create(type, name, options) {

        var conn;

        if (type in this.types)
            conn =  this.types[type].create(name, options, this.list);

        this.pool[name] = conn;
        return conn;

    }


    /**
     * getConnection
     * @param {String} name
     * @return {Connection}
     */
    getConnection(name) {
      return this.pool[name];
    }

    /**
     * open
     * @return {Promise}
     */
    open() {
        return Promise.all(Object.keys(this.pool).map(function (connection) {
            return connection.open()
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