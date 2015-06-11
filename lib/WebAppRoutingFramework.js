var RoutingFramework = require('./RoutingFramework');
var merge = require('deepmerge');

function WebAppRoutingFramework() {
    RoutingFramework.apply(this, arguments);
};

WebAppRoutingFramework.prototype = Object.create(RoutingFramework.prototype);
WebAppRoutingFramework.prototype.constructor = WebAppRoutingFramework;

/**
 * configureViews
 */
WebAppRoutingFramework.prototype.configureViews = function (route) {

    if (route.view)
        this.router.get(route.href, function (req, res) {

            var locals = res.locals || {};
            var session = req.session || {};

            if(route.locals)
             locals = merge(locals, route.locals);

            if(route.session) {
                route.session.forEach(function(key) {
                   locals[key] = session[key];
                });
            }

            res.render(route.view, locals);

        });


    return this;

};

module.exports = WebAppRoutingFramework;