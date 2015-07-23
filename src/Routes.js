/**
 * Routes is a utility class for parsing routes.
 */
class Routes {

    flatten(routes) {

        if (Array.isArray(routes)) {

            var flat = [];

            routes.forEach((route)=> {
                if (Array.isArray(route.routes)) {
                    flat.push.apply(flat, route.routes.map((entry)=>entry));
                }else{
                    flat.push(route);
                }
            });

            return flat;
        }

        return routes.routes;

    }

}

export default new Routes()