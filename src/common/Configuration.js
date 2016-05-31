import Property from 'property-seek';
import merge from 'deepmerge';
import fs from 'fs';

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
            connectors: `${path}/connectors`
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

}

Configuration.keys = {
    MODULES: 'modules',
    CONNECTIONS: 'connections.open',
    CONNECTORS: 'connections.connectors', 
    MIDDLEWARE: 'middleware',
    PATH: 'path'
};

export default Configuration
