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
            queries[route.query](models[route.model],req, res, next, route.query);
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
