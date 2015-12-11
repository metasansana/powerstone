import expressJSONSchema from 'express-jsonschema';
import ProjectRegistry from './ProjectRegistry';
import Routes from './Routes';

var validate = expressJSONSchema.validate;

var onValidatorError = function(err, req, res, next) {

    if (err.name === 'JsonSchemaValidation') {

        res.status(400);

        var responseData = {
            message: 'Errors occurred during ' + req.method + ' request to ' + req.url + '.',
            errors: err.validations
        };

        if (req.xhr || req.get('Content-Type') === 'application/json') {
            res.json(responseData);
        } else {
            console.log(err.stack);
            res.send();
        }

    } else {
        next(err);
    }
};

/**
 * GeneralRouting provides methods for configuring
 * framework routing from the routes.json file.
 */
class GeneralRouting {

    /**
     * configureSchema sets up json-schema on the route.
     * @param {Router} router
     * @param {Object} route
     */
    configureSchema(router, route) {

        if (route.schema) {
            router[Routes.defaultMethod(route.method)].call(router, route.href, validate(route.schema));
            router.use(onValidatorError);

        }

        return this;
    }

    /**
     * configureMiddleWare sets up middleware on the route
     * @param {Router} router
     * @param {Object} route
     */
    configureMiddleWare(router, route) {

        if (route.middleware) {
            route.middleware.split(',').forEach(mware => {

                if (!ProjectRegistry.middleware.hasOwnProperty(mware))
                    throw new Error('funcListToArray: Func: ' + mware + ' was not found!');

                router[Routes.defaultMethod(route.method)].call(router, route.href, (req, res, next) => ProjectRegistry.middleware[mware](req, res, next, route));

            });
        }

        return this;
    }

    /**
     * configureQueries sets up queries on the route.
     * @param {Router} router
     * @param {Object} route
     * @deprecated
     */
    configureQueries(router, route) {

        if (route.query) {
            router[Routes.defaultMethod(route.method)](route.href, function(req, res, next) {
                ProjectRegistry.queries[route.query.script](ProjectRegistry.models, route.query, req, res, next);
            });
        }

        return this;
    }

    /**
     * configureControllers sets up controllers on the route
     * @param {Router} router
     * @param {Object} route
     */
    configureControllers(router, route) {

        if (route.controller) {

            var list = route.controller.split('.');
            var Constructor = ProjectRegistry.controllers[list[0]];
            var method = list[1];
            var instance;

            router[Routes.defaultMethod(route.method)](route.href, (req, res) => {
                instance = new Constructor(req, res, route.vars);
                instance[method]();
            });

        }

        return this;
    }



}
export default GeneralRouting;
