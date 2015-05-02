var Promise = require('bluebird');
var Pool = require('./Pool');

/**
 * A connection is an object that needs to open to something remotely on application boot time.
 *
 * This usually is a database or some kind of queue system.
 * @param {String} name
 * @param {Object} options
 * @param {Array} list
 * @constructor
 */
function Connection(name, options, list){
    this.name = name;
    this.options = options || {};
    list.push(this);
    Pool[this.name] = this;
}

/**
 * __open__ override this method to preform open/connect logic if the connection does
 * not support promises by default.
 *
 * It is wrapped in a promise for cleaner flow control.
 * @pararm {Function} resolve
 * @param {Function} reject
 */
Connection.prototype.__open__ = function (reject, resolve) {
    resolve();
};

/**
 * __close__ override this method to preform close/disconnect logic if the connection does
 * not support promises by default.
 */
Connection.prototype.__close__ = function (reject, resolve) {
    resolve();
};

/**
 * open the remote connection.
 * @return {Promise}
 */
Connection.prototype.open = function () {
    return new Promise(this.__open__.bind(this));
};

/**
 * close the remote connection.
 */
Connection.prototype.close = function () {
    return new Promise(this.__close__.bind(this));
};

module.exports = Connection;