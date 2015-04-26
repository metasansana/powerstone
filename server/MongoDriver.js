var mongoose = require('mongoose');
var Bluebird = require('bluebird'); 

/**
 * MongoDriver
 * @implements DatabaseDriver
 */
function MongoDriver() {
	this.models = {};
	this.connection = null;
}

/**
 * connect
 */
MongoDriver.prototype.connect = function (url, opts) {
	
	var self = this;
	
	return new Bluebird(function(resolve, reject) {

		self.connection = mongoose.createConnection(url, opts);
		self.connection.on('open', function(){resolve(self.connection)});
		self.connection.on('error', function(err) {
			throw err;
		})
	});
	
};

/**
 * getModel
 */
MongoDriver.prototype.getModel = function (name, def) {
  
	if(this.models.hasOwnProperty(name))
	return this.models[name];
	
	if(!this.connection)
	throw new Error('Trying to create a model without a database connection!');
	
	var model = this.connection.model(name, def.properties);
	
	model.schema.pre('save', def.beforeSave);
	model.schema.post('save', def.afterSave);
	model.schema.pre('validate', def.beforeValidate);
	model.schema.post('validate', def.afterValidate);
	model.schema.pre('remove', def.beforeRemove);
	model.schema.post('remove', def.afterRemove);
	
	return model;
	
	
};

/**
 * disconnect
 */
MongoDriver.prototype.disconnect = function () {

	var self = this;
	
	return new Bluebird(function(resolve) {
		
		self.connection.close(resolve);
		
	});
	
};

module.exports = MongoDriver;
