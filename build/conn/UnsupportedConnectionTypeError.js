'use strict';

function UnsupportedConnectionTypeError(type) {

    Error.apply(this, arguments);
    this.message = 'Connection type: ' + type;
}

UnsupportedConnectionTypeError.prototype = Object.create(Error.prototype);
UnsupportedConnectionTypeError.prototype.constructor = UnsupportedConnectionTypeError;
module.exports = UnsupportedConnectionTypeError;