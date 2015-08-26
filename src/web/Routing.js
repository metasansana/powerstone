
import GeneralRouting from '../GeneralRouting';
import Routes from '../Routes';

/**
 * Routing
 */
class Routing extends GeneralRouting {

    configure(app, routes, config) {

        Routes.flatten(routes).forEach((route)=> {

            this.configureSchema(app, route, config);
            this.configureMiddleWare(app, route, config);
            this.configureQueries(app, route, config);
            this.configureControllers(app, route, config);
            this.configureViews(app, route, config);

        });

    }

    configureViews(router, route) {

        if (route.view)
            router.get(route.href, function (req, res) {

                var locals = res.locals || {};
                var session = req.session || {};

                if (route.locals)
                    locals = merge(locals, route.locals);

                if (route.session) {
                    route.session.forEach(function (key) {
                        locals[key] = session[key];
                    });
                }

                res.render(route.view, locals);

            });


        return this;

    }

}

export default new Routing()
