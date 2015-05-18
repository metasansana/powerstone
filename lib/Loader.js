var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');

/**
 * Loader
 * @param {String} path
 * @constructor
 */
function Loader(path) {
    this.path = path;
    this.conf = path+'/conf';
};

/**
 * loadConfFile
 */
Loader.prototype.loadConfFile = function (file, defaults) {
    var ret = require(this.conf+'/'+file);
    if((!ret)&& defaults)
    ret = defaults;
    return ret;
};

/**
 * loadMap requires all files in a directory into a single {}
 * @param {String} dir
 * @pararm {Object} list
 * @returns {Promise}
 */
Loader.prototype.loadMap = function (dir, list, throwError) {

    var self = this;
    dir = this.path+'/'+dir;

    return new Promise(function (resolve, reject) {

        list = list || {};

        fs.readdir(dir, function (err, files) {

            if (err)
                if (throwError)
                    reject(err);

            if (files)
                files.forEach(function (pathToFile) {

                    if(path.extname(pathToFile) !== '.js')
                        return;

                    list[path.basename(pathToFile, '.js')] = require(dir + '/' + pathToFile);
                });

            resolve(list);

        });
    });

}

module.exports = Loader;