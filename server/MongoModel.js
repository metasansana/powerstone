/**
 * MongoModel
 */
function MongoModel() {
	
	this.properties = {};

}

/**
 * beforeSave
 */
MongoModel.prototype.beforeSave = function (next) {
	
	next();
};

/**
 * afterSave
 */
MongoModel.prototype.afterSave = function () {
  	
};

/**
 * beforeValidate
 */
MongoModel.prototype.beforeValidate = function (next) {
	next();
};

/**
 * afterValidate
 */
MongoModel.prototype.afterValidate = function () {

};

/**
 * beforeRemove
 */
MongoModel.prototype.beforeRemove = function (next) {
	next();
};

/**
 * afterRemove
 */
MongoModel.prototype.afterRemove = function () {

};

module.exports = MongoModel;
