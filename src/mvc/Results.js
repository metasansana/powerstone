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

    accepted() {
        this.response.status(204).send();
    }

    created(body) {
        this.response.status(201).send(body);
    }

    badRequest(body) {
        this.response.status(400).send(body);
    }

    forbidden(body) {
        this.response.status(403).send(body);
    }

    notFound(body) {
        this.response.status(404).send(body);
    }

    conflict(body) {
        this.response.status(409).send(body);
    }

    internalError() {
        this.response.status(500).send();
    }
}

export default Results;
