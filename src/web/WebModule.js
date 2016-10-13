import Path from 'path';
import express from 'express';
import Configuration from '../app/Configuration';
import Module from '../app/Module';
import Route from '../app/route/Route';
import WebHttpFactory from './WebHttpFactory';

const BASKET = {};

class WebModule extends Module {

    constructor(name, config, app, parent) {

        super(name, config, app, parent);

        this._expressApp = express();
        this.configDirectory = 'webconf';

    }

    __framework() {

        var settings = this.configuration.read(this.configuration.keys.WEB_FRAMEWORK_SETTINGS,
            BASKET);

        Object.keys(settings).forEach(key => this._expressApp.set(key, settings[key]));
        this.modules.__framework();

    }

    __filters(app, defaults) {

        super.__filters(this._expressApp, defaults);

    }

    __routing(point, app, resource) {

        var path = this.configuration.read(Configuration.keys.PATH, Path.join('/', this.name));
        var routes = this.configuration.routes;

        this.routes = Object.keys(routes).
        map(key => Route.fromDef(routes[key], key,
            new WebHttpFactory(this.application.context), this).prepare(this._expressApp, resource));

        this.modules.__routing(path, this._expressApp, resource);
        app.use(path, this._expressApp);

        if (!this.parent)
            app.use((err, req, res, next) =>
                    this.application.
                onRouteErrorListener.
                onRouteError(err, req, res, next));

    }

}

export default WebModule
