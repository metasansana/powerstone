var must = require('must');

var Mongoose = require('../Mongoose');
var Services = require('../Services');
var UnknownServiceError = require('../UnknownServiceError');


describe('Services', function () {

    it('must provide the correct service instance', function () {
        Services.get({name: 'main', options: {}, type: 'mongoose'}).must.be.an.instanceOf(Mongoose);
    });

    it('must throw when a service is not found', function () {

        try {
            Services.get({name: 'main', options: {}, type: 'monkey'})
        } catch (e) {

            e.must.be.an.instanceOf(UnknownServiceError);

        }
    })

});
