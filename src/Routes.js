/**
 * Routes is a utility class for parsing routes.
 */
class Routes {

    /**
     * flatten turns a list of routes into a single array of routes.
     * @param {Array|Object} routes
     * @returns Array
     */
    flatten(routes) {

        if (Array.isArray(routes)) {

            var flat = [];

            routes.forEach((route)=> {
                if (Array.isArray(route.routes)) {
                    flat.push.apply(flat, route.routes.map((entry)=>entry));
                } else {
                    flat.push(route);
                }
            });

            return flat;
        }

        return routes.routes;

    }

    defaultMethod(method) {
        return (method) ? method.toLowerCase() : 'get'
    }

}

export default new Routes()