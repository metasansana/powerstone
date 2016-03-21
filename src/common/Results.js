/**
 * Results provides helper methods for http responses. 
 * @param {Request} request
 * @param {Response} response
 * @param {Application} app 
 * @param {object} route
 *
 * @property {Request} request - The Request object
 * @property {Response} response - The Response object
 * @property {Application} app - The Application being run
 * @property {object} route - The route definition that activate this code
 *
 */
class Results {

    constructor(request, response, app, route) {
        this.request = request;
        this.response = response;
        this.app = app;
        this.route = route;
    }

    success() {

        this.send(200);

    }

    accepted() {

        this.send(204);

    }

    created(body) {

        this.send(201, body);

    }

    badRequest(body) {

        this.send(400, body);

    }

    forbidden(body) {

        this.send(403, body);

    }

    notFound(body) {

        this.send(404, body);

    }

    conflict(body) {

        this.send(409, body);

    }

    internalError(err) {

        this.send(500);

    }
}

export default Results;
