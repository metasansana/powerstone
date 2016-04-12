import Promise from 'bluebird';
import merge from 'deepmerge';
import fs from 'fs';
import Path from 'path';
import Property from 'property-seek';
import Configuration from './Configuration';

/**
 * Loader
 */
class Loader {

    /**
     * @param {String} path The path where all requires will be relative to.
     */
    constructor(path) {
        this.path = path;
    }

    /**
     * basename returns the basename of this Loaders's path
     * @returns {string}
     */
    basename() {
        return Path.basename(this.path);
    }

    /**
     * join a value to the Loader's Path.
     * @param {string} value 
     * @returns {string}
     */
    join(value) {
        return Path.join(this.path, value);
    }

    /**
     * load requires a single file into memory
     * @param {string} path 
     * @param {*} defaults 
     * @returns {*}
     */
    load(path, defaults) {

        var isdir = false;

        path = this.join(path);

        try {
            isdir = fs.statSync(path).isDirectory();
        } catch (e) {
            if (!defaults) throw new Error(`Unable to load path '${path}'!`);
            return defaults;
        }

        if (isdir)
            throw new Error(`The path '${path}' must be a file!`);

        return require(path);

    }

    /**
     * require requires all files in a sub-directory into a single object
     * @param {string} dir A name of a sub-directory in the current path.
     * @param {object} merge An optional object functions can be merged into.
     * @param {string} [prefix] A prefix that will be concatenated to the object's keys
     * @returns {Object}
     */
    require(dir, merge, prefix) {

        var files;
        var extensions = extensions || ['.js', '.json'];

        dir = this.path + '/' + dir;
        merge = merge || {};

        prefix = prefix || '';
        prefix = (prefix) ? prefix + '.' : prefix;
        prefix = (prefix[0] === '/') ? prefix.replace('/', '') : prefix;
        prefix = prefix.replace(/\//g, '.');

        try {
            files = fs.readdirSync(dir);
        } catch (e) {
            return merge || {};
        }

        if (Array.isArray(files))
            files.forEach((pathToFile) => {
                if (extensions.indexOf(Path.extname(pathToFile)) < 0) return;

                Property.set(merge, prefix + Path.basename(pathToFile, Path.extname(pathToFile)),
                    require(dir + '/' + pathToFile));

                //Disabled, will remove if using property-seek works
                //merge[prefix + Path.basename(pathToFile, Path.extname(pathToFile))] =
                // require(dir + '/' + pathToFile);

            });

        return merge;
    }
}

export default Loader
