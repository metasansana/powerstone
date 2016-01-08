import path from 'path';
import Loader from './Loader';
import Configuration from './Configuration';

/**
 * Module
 */
class Module {

    constructor(prefix, config, loader) {
        this.prefix = prefix;
        this.config = config;
        this.loader = loader;
        this.modules = null;
    }

    isMain() {
        return !this.prefix;
    }

    getSubModules() {

        var prefix;
        var project;
        var loader;
        var config;

        if (this.modules)
            return this.modules;

        this.modules = this.config.readWithDefaults('modules', []).
        map((_path) => {

            _path = this.loader.getPath() + '/' + _path;
            prefix = path.basename(_path);
            prefix = (this.prefix) ? this.prefix + '.' + prefix : prefix;
            loader = new Loader(_path);
            config = loader.loadFromConf('config', {});
            project = new Module(prefix, new Configuration(config), new Loader(_path));
            return project;

        });

        return this.modules;

    }

    getLoader() {
        return this.loader;
    }

    getConfiguration() {
        return this.config;
    }

    setConnections(connections) {

        this.config.readWithDefaults('connections', []).
        forEach((con) => {
            connections.create(con.name, con.type, con.options);
        });
    }

    register(registry) {
        this.loader.requireControllers(registry.controllers, this.prefix);
        this.loader.requireModels(registry.models, this.prefix);
        this.loader.requireMiddleWare(registry.middleware, this.prefix);
        this.loader.requirePipes(registry.pipes, this.prefix);
    }

    runPlugins() {
        this.config.readWithDefaults('plugins', []).
        forEach((_path) => {
            var plugin = this.loader.requireRelative(_path);
            plugin(this);

        });
    }


}

export default Module
