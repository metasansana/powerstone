import beof from 'beof';
import Promise from 'bluebird';
import LameFilter from './filters/LameFilter';
import Module from './Module';

/**
 * Response provides helper methods for http responses.
 */
class Response {

    constructor(request, response, module, filter = new LameFilter()) {

        beof({ request }).object();
        beof({ response }).object();
        beof({ module }).instance(Module);

        this.request = request;
        this.response = response;
        this.module = module;
        this.filter = filter;

    }

    status() {

        this.response.status.apply(this.response, arguments);

    }

    ok(body) {

        this.send(200, body);

    }

    accepted() {

        this.send(202);

    }

    noContent() {

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

    error(err) {

        this.send(500);
        console.error(err.stack ? err.stack : err);

    }

    /**
     * render a view using the installed view engine.
     * @param {string} view
     * @param {object} context
     * @return {Promise}
     */
    render(view, context) {

        beof({ view }).string();
        beof({ context }).optional().object();

        if (!this.module.viewEngine)
            return this.error(new ReferenceError('No view engine installed!'));

        return Promise.resolve(this.module.viewEngine.render(view, context)).
        then(result => this.ok(result)).
        catch(e =>
            this.module.application.onRouteErrorListener.onRouteError(e, this.request, this));

    }

}

export default Response;
