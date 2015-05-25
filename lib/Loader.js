var Promise = require('bluebird');
var merge = require('deepmerge');
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
 * loadFromConf
 */
Loader.prototype.loadFromConf = function (file, defaults) {
    var ret = require(this.conf+'/'+file);
    if((!ret)&& defaults)
    ret = defaults;
    return ret;
};

/**
 * loadFromConfWithDefaults
 */
Loader.prototype.loadFromConfWithDefaults = function (file, defaults) {
    return merge(defaults, this.loadFromConf(file));
};

/**
 * loadMap requires all files in a directory into a single {}
 * @param {String} dir
 * @param {Object} list
 * @param {Array} [extensions=['.js','.json']]
 * @param {Boolean} throwError
 * @returns {Promise}
 */
Loader.prototype.loadMap = function (dir, list, extensions, throwError) {

    dir = this.path+'/'+dir;
    extensions = extensions || ['.js', '.json'];

    return new Promise(function (resolve, reject) {

        list = list || {};

        fs.readdir(dir, function (err, files) {

            if (err)
                if (throwError)
                    reject(err);

            if (files)
                files.forEach(function (pathToFile) {

                    if(extensions.indexOf(path.extname(pathToFile)) < 0) return;

                    list[path.basename(pathToFile, path.extname(pathToFile))] = require(dir + '/' + pathToFile);

                });

            resolve(list);

        });
    });

};

module.exports = Loader;