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

        this.response.status(200);
        this.response.send();

    }

    accepted() {
        this.response.status(204);
        this.response.send();
    }

    created(body) {
        this.response.status(201);
        this.response.send(body);
    }

    badRequest(body) {
        this.response.status(400);
        this.response.send(body);
    }

    forbidden(body) {
        this.response.status(403);
        this.response.send(body);
    }

    notFound(body) {
        this.response.status(404);
        this.response.send(body);
    }

    conflict(body) {
        this.response.status(409);
        this.response.send(body);
    }

    internalError() {
        this.response.status(500);
        this.response.send();
    }
}

export default Results;
