var Promise = require('bluebird');
var merge = require('deepmerge');
var fs = require('fs');
var path = require('path');
var traverse = require('traverse');

/**
 * Loader
 */
class Loader {

    /**
     *
     * @param {String} parent The parent parent all load operations will operate from.
     */
    constructor(parent) {
        this.parent = parent;
        this.conf = parent + '/conf';
    }

    _parentize(dir){
        return this.parent + '/' + dir;
    }

    /**
     * loadFromConf
     */
    loadFromConf(file, defaults) {

        var ret = require(this.conf + '/' + file);
        var wd = path.dirname(this.conf + '/' + file) + '/';

        if ((!ret) && defaults) ret = defaults;

        traverse(ret).
            forEach(function (value) {
                if (this.key === '$ref')
                    this.parent.update(require(wd + value));
            });

        return ret;
    }

    /**
     * loadFromConfWithDefaults
     */
    loadFromConfWithDefaults(file, defaults) {
        return merge(defaults, this.loadFromConf(file));
    }

    /**
     * requireDirSync requires all files in a sub-directory into a single object
     * @param {String} dir A name of a sub-directory in the current parent.
     * @param {Array} [extensions=['.js','.json']] A list of extensions to load.
     * @param {Object} merge An optional object functions can be merged into.
     * @returns {Object}
     */
    requireDirSync(dir, extensions, merge) {

        dir = this._parentize(dir);
        merge = merge || {};
        extensions = extensions || ['.js', '.json'];

            var files = fs.readdirSync(dir);

                if (Array.isArray(files))
                    files.forEach(function (pathToFile) {
                        if (extensions.indexOf(path.extname(pathToFile)) < 0) return;
                        merge[path.basename(pathToFile, path.extname(pathToFile))] = require(dir + '/' + pathToFile);
                    });

                return merge;
    }

    /**
     * requireTasks grabs all the tasks in the tasks folder
     * @param {Object} [merge]
     * @returns {Array}
     */
    requireTasks(merge) {
        var ret  = this.requireDirSync('tasks', null, merge);
        return Object.keys(ret).map(key=>ret[key]);
    }

    /**
     * requireModels grabs all the models in the models folder
     * @param {Object} [merge]
     * @returns {Object}
     */
    requireModels(merge){
        return this.requireDirSync('models', null, merge);
    }

    /**
     * requireControllers grabs all the controllers in the controllers folder
     * @param {Object} [merge]
     * @returns {Object}
     */
    requireControllers(merge){
        return this.requireDirSync('controllers', null, merge);
    }

    /**
     * requireQueries grabs all the queries in the queries folder
     * @param {Object} [merge]
     * @returns {Object}
     */
    requireQueries(merge){
        return this.requireDirSync('queries', null, merge);
    }

    /**
     * requireMiddleware grabs all the middleware in the middlewares folder
     * @param {Object} [merge]
     * @returns {Object}
     */
    requireMiddleWare(merge){
        return this.requireDirSync('middleware', null, merge);
    }

}

export default Loader;