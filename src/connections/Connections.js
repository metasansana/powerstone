var Promise = require('bluebird');
var UnknownConnectionError = require('./UnknownConnectionError');
var UnsupportedConnectionTypeError = require('./UnsupportedConnectionTypeError');

/**
 * Connections provides a factory for creating supported connections.
 */
function Connections() {

    this.types = {
        'mongoose': require('./Mongoose'),
        'connect-mongo': require('./ConnectMongo')
    }

    this.list = [];

}

/**
 * create will return an instance of the desired connection if found.
 * @param {String} name
 * @param {String} type
 * @param {Object} options
 * @returns {Connection}
 */
Connections.prototype.create = function (name, type, options) {

    if (type in this.types)
        return new this.types[type](name, options, this.list);

    throw new UnsupportedConnectionTypeError(name);

};

/**
 * hasName
 * @return {Boolean}
 */
Connections.prototype.hasName = function (name) {

    var ret;

    this.list.forEach(function (connection) {
        if (connection.name === name)
            ret = true;
    });

    return ret;
};
/**
 * getByName returns a connection based on its assigned name.
 * @param {Connection}
 */
Connections.prototype.getByName = function (name) {

    var ret;

    this.list.forEach(function (connection) {

        if (connection.name === name)
            ret = connection;
    })

    if (!ret)
        throw new UnknownConnectionError(name);

    return ret;

};

/**
 * open all the connections.
 */
Connections.prototype.open = function () {
    return Promise.all(this.list.map(function (connection) {
        return connection.open()
    }));
};

/**
 * close all the connections
 */
Connections.prototype.close = function () {
    return Promise.all(this.list.map(function (connection) {
        return connection.close();
    }));
};

module.exports = new Connections();