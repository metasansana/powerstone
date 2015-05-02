var must = require('must');

var Mongoose = require('../Mongoose');
var Connections = require('../Connections');
var UnsupportedConnectionTypeError = require('../UnsupportedConnectionTypeError');


describe('Connections', function () {

    it('must provide the correct connection instance', function () {
        Connections.create('main', 'mongoose', {}).must.be.an.instanceOf(Mongoose);
    });

    it('must throw when a connection is not found', function () {

        try {
            Connections.create('main', 'monkey', {})
        } catch (e) {

            e.must.be.an.instanceOf(UnsupportedConnectionTypeError);

        }
    })

});
