import express from 'express';
import Module from '../common/Module';

class WebModule extends Module {

    __submodule(resource, framework, app) {

        var config = new Configuration('webconf.js', resource.path);
        return new WebModule(name, config, express(), app);

    }

    __framework() {



    }

    __routing(point, parent) {

        var path = this.configuration.readOrDefault(Configuration.keys.PATH, `/${this.name}`);
        var routes = this.configuration.readOrDefault(Configuration.keys.ROUTES, {});
        var location = `${point}/${path}`;
        var action;

        Object.keys(routes).
        forEach(path => {

            Object.keys(routes[path]).
            map(method => {

                actions = new Actions(method, path, Delegates.create(routes[path][method]));
                actions.apply(this._handler);

            });

        });

        this.submodules.__routing(location, this.handler);
        parent.use(path, this.handler);

    }
}

export default WebModule
