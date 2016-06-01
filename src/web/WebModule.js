import express from 'express';
import Configuration from '../common/Configuration';
import Module from '../common/Module';

class WebModule extends Module {

   __submodule(resource, app) {

        return new WebModule(resource.basename,
            new Configuration('webconf', resource.path), this.context, app);

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
