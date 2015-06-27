
var validator = require('express-jsonschema').validate;

var onValidatorError = function (err, req, res, next) {

    if (err.name === 'JsonSchemaValidation') {

        res.status(400);

        var responseData = {
            message:'Errors occurred during '+req.method+' request to '+req.url +'.',
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
 * RoutingFramework is used to setup the express Router
 * @param {Router} router
 * @param {StringConversion}
 * @constructor
 */
function RoutingFramework(router, converter) {
    this.router = router;
    this.converter = converter;
}

/**
 * configureSchema
 */
RoutingFramework.prototype.configureSchema = function (route) {

    if(route.schema) {
        this.router[route.method].call(this.router, route.href, validator(route.schema));
        this.router.use(onValidatorError);

    }

    return this;
};

/**
 * configureMiddleWare
 */
RoutingFramework.prototype.configureMiddleWare = function (route, middleware) {

    if(route.middleware) {

        var args = this.converter.funcListToArray(route.middleware, middleware);
        args.unshift(route.href);
        this.router[route.method].apply(this.router, args);

    }

    return this;
};

/**
 * configureQueries
 */
RoutingFramework.prototype.configureQueries = function (route, models, queries) {

    if (route.query) {
        this.router[route.method](route.href, function (req, res, next) {
            queries[route.query.script](models[route.query.model],req, res, next, route.query);
        });
    }

    return this;
};

/**
 * configureControllers
 */
RoutingFramework.prototype.configureControllers = function (route, controllers) {

    if (route.controller) {

        var args = this.converter.methodListToBoundFunctionArray(route.controller, controllers);
        args.unshift(route.href);
        this.router[route.method].apply(this.router, args);

    }
    return this;
};

/**
 * toRouter
 */
RoutingFramework.prototype.toRouter = function () {
  return this.router;
};

module.exports = RoutingFramework;
