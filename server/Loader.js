var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');

module.exports = {

	/**
	 * loadFromDirectory resolves with a list of modules that have been loaded from a directory.
	 * @param {String} absPath
	 * @pararm {Object} list
	 * @returns {Promise}
	 */
	loadFromDirectory: function(absPath, list) {
		
		return new Promise(function (resolve, reject) {

			list = list || {};

			fs.readdir(absPath, function (err, files) {

				if(err)	reject(err);

				if(files)
				files.forEach(function (pathToFile) {
					list[path.basename(pathToFile, '.js')] = require(pathToFile);
				});

				resolve(list);

			});
		});
		
	}
	
};
