import Path from 'path';
import Configuration from '../app/Configuration';
import Module from '../app/Module';
import Route from '../app/route/Route';
import ApiHttpFactory from './ApiHttpFactory';
import restify from 'restify';

class ApiModule extends Module {

    constructor(name, config, app, parent) {

        super(name, config, app, parent);

    }

    __routing(point, app, resource) {

        var path = this.configuration.read(this.configuration.keys.PATH,
            Path.join('/', point, this.name));

        var routes = this.configuration.routes;
        var factory = new ApiHttpFactory(this);

        this.routes = Object.keys(routes).
        map(key => Route.fromDef(routes[key], Path.join(path, key),
            factory, this).prepare(app, resource));

        this.modules.__routing(path, app, resource);

        if (!this.parent)
            app.on('uncaughtException', (req, res, route, err) =>
                this.onRouteErrorListener.onRouteError(err,
                    factory.request(req, res),
                    factory.response(req, res)));

    }

}

export default ApiModule
