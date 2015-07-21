import path from 'path';
import Loader from './Loader';
import Configuration from './Configuration';

/**
 * Project
 */
class Project {

    constructor(prefix, config, loader) {
        this.prefix = prefix;
        this.config = config;
        this.loader = loader;
        this.projects = null;
    }

    isMain() {
        return !this.prefix;
    }

    getSubProjects() {

        var prefix;
        var project;
        var loader;
        var config;

        if (this.projects)
            return this.projects;

        this.projects = this.config.readWithDefaults('projects', []).
            map((_path)=> {

                _path = this.loader.getPath()+'/'+_path;
                prefix = path.basename(_path);
                prefix = (this.prefix) ? this.prefix + '.' + prefix : prefix;
                loader = new Loader(_path);
                config = loader.loadFromConf('config', {});
                project = new Project(prefix, new Configuration(config), new Loader(_path));
                return project;

            });

        return this.projects;

    }

    getLoader() {
        return this.loader;
    }

    getConfiguration() {
        return this.config;
    }

    setConnections(connections) {

        this.config.readWithDefaults('connections', []).
            forEach((con)=> {
                connections.create(con.name, con.type, con.options);
            });
    }

    register(registry) {
        this.loader.requireModels(registry.models, this.prefix);
        this.loader.requireControllers(registry.controllers, this.prefix);
        this.loader.requireQueries(registry.queries, this.prefix);
        this.loader.requireMiddleWare(registry.middleware, this.prefix);
        this.loader.requireTasks(registry.tasks, this.prefix);
    }

    runPlugins() {
        this.config.readWithDefaults('plugins', []).
            forEach((_path)=> {
                var plugin = this.loader.requireRelative(_path);
                plugin(this);

            });
    }


}

export default Project