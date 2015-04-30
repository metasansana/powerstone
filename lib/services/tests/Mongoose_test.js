var must = require('must');
var Mongoose = require('../Mongoose');

var service;
var list = [];

describe('Mongoose', function () {

	it('should work', function() {

		service = new Mongoose('default', {url:'mongodb://localhost/powerstone-testing'}, list);

		return service.open().
			then(function() {

				must(service.connection).not.be.undefined();
				must(service.connection.readyState).equal(1);
				return service.close();

			}).
			then(function() {

				must(service.connection.readyState).equal(0);

			})
		
	});

	
});
