function UnknownServiceError() {

    Error.apply(this, arguments);

}

UnknownServiceError.prototype = Object.create(Error.prototype);
UnknownServiceError.prototype.constructor = UnknownServiceError;

module.exports = UnknownServiceError;