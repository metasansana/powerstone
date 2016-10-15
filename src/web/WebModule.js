import Path from 'path';
import express from 'express';
import Configuration from '../app/Configuration';
import Module from '../app/Module';
import Route from '../app/route/Route';
import WebHttpFactory from './WebHttpFactory';
import AssetFilter from './filters/AssetFilter';

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

        var path = this.configuration.read(this.configuration.keys.PATH, Path.join('/', this.name));
        var routes = this.configuration.routes;
        var factory = new WebHttpFactory(this);

        this.parentMount = point;

        this.routes = Object.keys(routes).
        map(key => Route.fromDef(routes[key], key,
            factory, this).prepare(this._expressApp, resource));

        this.modules.__routing(path, this._expressApp, resource);
        app.use(path, this._expressApp);

            //When we unify the filter api, this hack will go away
            AssetFilter.apply(app, this.configuration);

        if (!this.parent)
            app.use((err, req, res, next) =>
                this.application.onRouteErrorListener.onRouteError(err,
                    factory.request(req, res), factory.response(req, res)));

    }

}

export default WebModule
