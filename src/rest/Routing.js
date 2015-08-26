import {validate}  from 'express-jsonschema';
import Routes from '../Routes';
import GeneralRouting from '../GeneralRouting';
/**
 * Routing
 */
class Routing extends GeneralRouting{

    configure(app, routes, config) {

        Routes.flatten(routes).forEach((route)=> {

            this.configureSchema(app, route, config);
            this.configureMiddleWare(app, route, config);
            this.configureQueries(app, route, config);
            this.configureControllers(app, route, config);

        });

    }

}

export default new Routing()
