import Property from 'property-seek';
import merge from 'deepmerge';
import fs from 'fs';
import Path from 'path';

function exists(path) {

    try {
        return fs.statSync(path).isFile();
    } catch (e) {
        return false;

    }
}


/**
 * Configuration
 * @param {string} dir
 * @param {string} path 
 * @property {object} keys
 * @property {string} path
 */
class Configuration {

    constructor(dir, path) {

        this.paths = {
            root: path,
            config: `${path}/${dir}/config.js`,
            routes: `${path}/${dir}/routes.js`,
            modules: `${path}/modules`,
            connectors: `${path}/connectors`,
            filters: `${path}/filters`,
            middleware: `${path}/app/middleware`,
            controllers: `${path}/app/controllers`
        };

        this.options = (exists(this.paths.config)) ? require(this.paths.config) : {};
        this.routes = (exists(this.paths.routes)) ? require(this.paths.routes) : {};

    }

    read(key, defaults) {
        var ret = Property.get(this.options, key);
        if (ret) return ret;
        return defaults;
    }

    readAndMerge(key, target, defaults) {
        var ret = this.readWithDefaults(key, defaults);
        return merge(target, ret);
    }

    /**
     * require requires all files in a sub-directory into a single object
     * @param {string} dir The  path.
     * @param {object} merge An optional object functions can be merged into.
     * @param {string} [prefix] A prefix that will be concatenated to the object's keys
     * @returns {Object}
     */
    require(dir, merge, prefix) {

        var files;
        var extensions = extensions || ['.js', '.json'];

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

            });

        return merge;
    }

}

Configuration.keys = {
    MODULES: 'modules',
    CONNECTIONS: 'connections',
    MIDDLEWARE: 'middleware',
    FILTERS: 'filters',
    PATH: 'path'
};

export default Configuration
