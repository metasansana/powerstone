var must = require('must');
var MongoDriver = require('../../server/MongoDriver');
var MongoModel = require('../../server/MongoModel');

var driver;
var url = 'mongodb://localhost/testing-database';

function MockModel() {
	
	this.properties = {
		name:{type:String, default:'Mock Name'}
	}
	
}

MockModel.prototype = Object.create(MongoModel.prototype);

describe('MongoDriver', function () {
	
	beforeEach(function() {
		
		driver = new MongoDriver();
		
	});
	
	afterEach(function(done) {
		
		driver.connection.close(done);
		
	});
	
	it('should connect to a database', function() {
		
		return driver.connect(url).
			then(function() {
				(true).must.be.true();
			});
		
	});
	
	it('should disconnect from a database', function() {

		return driver.connect(url).
			then(function() {

				return driver.disconnect().
					then(function() {
						(true).must.be.true();
					});
			});

	});
	
	it('should create models', function() {

		return driver.connect(url).
			then(function() {
				
				var Model = driver.getModel('Test', new MockModel);
				
				must(Model).exist();
				
				var instance = new Model();
				
				must(instance.name).equal('Mock Name');
				
				
			});


	});
	
	
});
