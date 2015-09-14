'use strict';

function UnknownConnectionError(name) {

    Error.apply(this, arguments);
    this.message = 'Connection name: ' + name;
}

UnknownConnectionError.prototype = Object.create(Error.prototype);
UnknownConnectionError.prototype.constructor = UnknownConnectionError;

module.exports = UnknownConnectionError;