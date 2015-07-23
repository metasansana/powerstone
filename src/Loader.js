import Promise from 'bluebird';
import merge from 'deepmerge';
import fs from 'fs';
import path from 'path';
import traverse from 'traverse';
import Configuration from './Configuration';

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

    getConfiguration() {
        return new Configuration(require(this.conf+'/config'));
    }

    getDirName() {
        return path.basename(this.parent);
    }

    getPath() {
        return this.parent;
    }

    /**
     * loadFromConf
     */
    loadFromConf(file, defaults) {


        var ret;
        try {
            ret = require(this.conf + '/' + file);
        }catch(e){

            try {
                ret = require(this.conf+'/../'+file)
            }catch(e) {
                if (defaults) return defaults;
                throw e;
            }
        }

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

    requireRelative(path) {
        return require(this.parent+'/'+path);
    }
    /**
     * requireDirSync requires all files in a sub-directory into a single object
     * @param {String} dir A name of a sub-directory in the current parent.
     * @param {Object} merge An optional object functions can be merged into.
     * @param {String} [prefix] A prefix that will be concatenated to the object's keys
     * @returns {Object}
     */
    requireDirSync(dir, merge, prefix) {

        var files;
        var extensions = extensions || ['.js', '.json'];

        dir = this._parentize(dir);
        merge = merge || {};

        prefix = prefix || '';

        try {
            files = fs.readdirSync(dir);
        }catch(e) {
            return merge || {};
        }

                if (Array.isArray(files))
                    files.forEach(function (pathToFile) {
                        if (extensions.indexOf(path.extname(pathToFile)) < 0) return;
                        merge[prefix+path.basename(pathToFile, path.extname(pathToFile))] =
                            require(dir + '/' + pathToFile);
                    });

                return merge;
    }

    /**
     * requireTasks grabs all the tasks in the tasks folder
     * @param {Object} [merge]
     * @param {String} prefix
     * @returns {Object}
     */
    requireTasks(merge, prefix) {
        return this.requireDirSync('tasks', merge, prefix);
    }

    /**
     * requireModels grabs all the models in the models folder
     * @param {Object} [merge]
     * @param {String} prefix
     * @returns {Object}
     */
    requireModels(merge, prefix){
        return this.requireDirSync('models', merge, prefix);
    }

    /**
     * requireControllers grabs all the controllers in the controllers folder
     * @param {Object} [merge]
     * @param {String} prefix
     * @returns {Object}
     */
    requireControllers(merge, prefix){
        return this.requireDirSync('controllers', merge, prefix);
    }

    /**
     * requireQueries grabs all the queries in the queries folder
     * @param {Object} [merge]
     * @returns {Object}
     */
    requireQueries(merge, prefix){
        return this.requireDirSync('queries', merge, prefix);
    }

    /**
     * requireMiddleware grabs all the middleware in the middlewares folder
     * @param {Object} [merge]
     * @param {String} prefix
     * @returns {Object}
     */
    requireMiddleWare(merge, prefix){
        return this.requireDirSync('middleware', merge, prefix);
    }

}

export default Loader