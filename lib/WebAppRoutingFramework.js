var RoutingFramework = require('./RoutingFramework');

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
            res.render(route.view);
        });


    return this;

};

module.exports = WebAppRoutingFramework;