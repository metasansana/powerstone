import Property from 'property-seek';
import deepmerge from 'deepmerge';
import fs from 'fs';
import Path from 'path';
import crypto from 'crypto';
import Pool from '../net/Pool';
import PropertyResource from './resource/PropertyResource';
import RequireResource from './resource/RequireResource';
import StringResource from './resource/StringResource';
import SchemeResource from './resource/SchemeResource';

const keys = {
    MODULES: 'power.modules',
    MODULES_PREVENTED: 'power.modules.preventRouting',
    CONNECTIONS: 'power.connections',
    MIDDLEWARE: 'power.app.middleware',
    CONTROLLERS: 'power.app.controllers',
    PATH: 'power.routing.root',
    WEB_FRAMEWORK_SETTINGS: 'power.web.framework.settings',
    WEB_VIEWS_ENGINE: 'power.web.views.engine',
    WEB_VIEWS_PATHS: 'power.web.views.paths',
    FILTERS: 'power.filters',
    FILTERS_PARSER_JSON_ENABLED: 'power.filters.parser.json.enabled',
    FILTERS_PARSER_JSON_OPTIONS: 'power.filters.parser.json.options',
    FILTERS_PARSER_URLENCODED_ENABLED: 'power.filters.parser.urlencoded.enabled',
    FILTERS_PARSER_URLENCODED_OPTIONS: 'power.filters.parser.urlencoded.options',
    FILTERS_PARSER_TEXT_ENABLED: 'power.filters.parser.text.enabled',
    FILTERS_PARSER_TEXT_OPTIONS: 'power.filters.parser.text.options',
    FILTERS_PARSER_RAW_ENABLED: 'power.filters.parser.raw.enabled',
    FILTERS_PARSER_RAW_OPTIONS: 'power.filters.parser.raw.options',
    FILTERS_CSRF_ENABLED: 'power.filters.csrf.enabled',
    FILTERS_CSRF_OPTIONS: 'power.filters.csrf.options',
    FILTERS_LOG_ENABLED: 'power.filters.log.enabled',
    FILTERS_LOG_FORMAT: 'power.filters.log.format',
    FILTERS_LOG_OPTIONS: 'power.filters.log.options',
    FILTERS_ASSET_PATHS: 'power.filters.asset.paths',
    FILTERS_ASSET_DIRECTORY: 'power.filters.asset.directory'
};

const defaults = {
    SECRET: crypto.randomBytes(32).toString('hex')
};

function exists(path) {

    try {
        return fs.statSync(path).isFile();
    } catch (e) {
        return false;

    }
}


/**
 * Configuration provides an api for reading interesting values from a
 * modules configuration.
 * @param {string} dir
 * @param {string} path 
 * @property {object} keys
 * @property {string} path
 * TODO Document the properties of this class properly.
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
            controllers: `${path}/app/controllers`,
            views: `${path}/app/views`,
            lib: `${path}/lib`,
          public: `${path}/public`
        };

        this.keys = keys;
        this.defaults = defaults;
        this.options = (exists(this.paths.config)) ? require(this.paths.config) : {};
        this.routes = (exists(this.paths.routes)) ? require(this.paths.routes) : {};
        this._resources = new SchemeResource(new StringResource());
        this._resources.add('require', new RequireResource());
        this._resources.add('lib', new RequireResource(`${this.paths.lib}/`));
        this._resources.add('env', new PropertyResource(process.env));
        this._resources.add('pool', new PropertyResource(Pool));

    }

    read(key, defaults, merge) {

        var ret = (this.options.hasOwnProperty(key)) ? this.options[key] : defaults;

        if (typeof ret === 'string')
            return this._resources.find(ret);

        if (merge)
            return deepmerge(ret, merge);

        return ret;

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
