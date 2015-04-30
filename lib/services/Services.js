var UnknownServiceError = require('./UnknownServiceError');

/**
 * Services provides a factory for creating supported services.
 */
function Services() {

    this.types = {
        'mongoose': require('./Mongoose')
    }

    this.list = [];

}

/**
 * createFromType will return an instance of the desired service if found.
 * @param {String} type
 * @param {String} name
 * @param {Object} options
 * @returns {Service}
 */
Services.prototype.createFromType = function (type, name, options) {

    if (type in this.types)
        return new this.types[type](name, options, this.list);

    throw new UnknownServiceError(name);

};

/**
 * getByName returns a service based on its assigned name.
 * @param {Service}
 */
Services.prototype.getByName = function (name) {

    var ret;

    this.list.forEach(function (service) {

        if (service.name === 'name')
            ret = service;
    })

    if (!ret)
        throw new UnknownServiceError(name);

    return ret;

};

/**
 * open all the services.
 */
Services.prototype.open = function () {
    return Promise.all(this.list.map(function (service) {
        return service.open()
    }));
};

/**
 * close all the services
 */
Services.prototype.close = function () {
    return Promise.all(this.list.map(function (service) {
        return service.close();
    }));
};

module.exports = Services;