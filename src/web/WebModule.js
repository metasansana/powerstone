import express from 'express';
import Configuration from '../common/Configuration';
import Module from '../common/Module';
import Route from '../common/route/Route';

const BASKET = {};

class WebModule extends Module {

    constructor(name, config, context, app) {

        super(name, config, context, app);

        this._expressApp = express();
        this.configDirectory = 'webconf';

        this.viewEngine = function(view, locals) {

            return function render_web_view(req, res, next) {

                res.render(view, locals, function(err, html) {

                    if (err) next(err);
                    res.send(html);

                });

            }

        };

    }

    __framework() {

        var engine = this.configuration.read(this.configuration.keys.WEB_VIEWS_ENGINE, null);
        var settings = this.configuration.read(this.configuration.keys.WEB_FRAMEWORK_SETTINGS,
            BASKET);

        switch (typeof engine) {

            case 'function':
                engine(this._expressApp, this.configuration)
                break;

            case 'string':
                this._expressApp.set('views',
                    this.configuration.read(this.configuration.keys.WEB_VIEWS_PATHS,
                        this.configuration.paths.views));
                this._expressApp.set('view engine', engine);
                break;
            case null:
                break;

            default:
                break;

        }

        Object.keys(settings).forEach(key => this._expressApp.set(key, settings[key]));
        this.modules.__framework();


    }

    __filters(app, defaults) {

        super.__filters(this._expressApp, defaults);

    }

    __routing(point, app, actions) {

        var path = this.configuration.read(Configuration.keys.PATH, `/${this.name}`);
        var routes = this.configuration.routes;

        Object.keys(routes).
        forEach(route =>
            this.routes = Object.keys(routes[route]).map(method =>
                new Route(method, route, routes[route][method],
                    actions.generate(method, route, routes[route][method], this.application),
                    this._expressApp)));

        this.modules.__routing(path, this._expressApp, actions);
        app.use(path, this._expressApp);
    }

}

export default WebModule
