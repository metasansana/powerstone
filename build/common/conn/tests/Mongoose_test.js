'use strict';

var must = require('must');
var Mongoose = require('../Mongoose');

var service;
var list = [];

describe('Mongoose', function () {

	it('should work', function () {

		service = new Mongoose('default', { url: 'mongodb://localhost/powerstone-testing' }, list);

		return service.open().then(function () {

			must(service.store).not.be.undefined();
			must(service.store.readyState).equal(1);
			return service.close();
		}).then(function () {

			must(service.store.readyState).equal(0);
		});
	});
});
//# sourceMappingURL=Mongoose_test.js.map