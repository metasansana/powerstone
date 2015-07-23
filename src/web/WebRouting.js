import {validate}  from 'express-jsonschema';
import Strings from '../Strings';
import ProjectRegistry from '../ProjectRegistry';

var onValidatorError = function (err, req, res, next) {

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

var flattenRoutes = function (routes) {

    var flat = [];

    if(Array.isArray(routes)) {
        routes.forEach((route)=> {
            if (!Array.isArray(route.routes)) return flat.push(route);
            route.routes.forEach((entry)=>flat.push(entry));
        });
    }else{
        flat.push(routes);
    }

    return flat;

};

/**
 * WebRouting
 */
class WebRouting {

    configure(app, routes, config) {

        flattenRoutes(routes).forEach((route)=> {

            this.configureSchema(app, route, config);
            this.configureMiddleWare(app, route, config);
            this.configureQueries(app, route, config);
            this.configureControllers(app, route, config);
            this.configureViews(app, route, config);

        });

    }

    /**
     * configureSchema
     */
    configureSchema(router, route) {

        if (route.schema) {
            router[route.method].call(router, route.href, validate(route.schema));
            router.use(onValidatorError);

        }

        return this;
    }

    /**
     * configureMiddleWare
     */
    configureMiddleWare(router, route) {

        if (route.middleware) {
            var args = Strings.funcListToArray(route.middleware, ProjectRegistry.middleware);
            args.unshift(route.href);
            router[route.method].apply(router, args);

        }

        return this;
    }

    /**
     * configureQueries
     */
    configureQueries(router, route) {

        if (route.query) {
            router[route.method](route.href, function (req, res, next) {
                ProjectRegistry.queries[route.query.script]
                (ProjectRegistry.models[route.query.model], req, res, next, route.query);
            });
        }

        return this;
    }

    /**
     * configureControllers
     */
    configureControllers(router, route) {

        if (route.controller) {

            var args = Strings.methodListToBoundFunctionArray(route.controller,
                ProjectRegistry.controllers);
            args.unshift(route.href);

            router[(route.method)?route.method.toLowerCase():'get'].apply(router, args);

        }
        return this;
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

export default new WebRouting()