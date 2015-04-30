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
    loadFromDirectory: function (absPath, list, throwError) {

        return new Promise(function (resolve, reject) {

            list = list || {};

            fs.readdir(absPath, function (err, files) {

                if (err)
                    if (throwError)
                        reject(err);

                if (files)
                    files.forEach(function (pathToFile) {

                        if(path.extname(pathToFile) !== '.js')
                        return;

                        list[path.basename(pathToFile, '.js')] = require(absPath + '/' + pathToFile);
                    });

                resolve(list);

            });
        });

    }

};
