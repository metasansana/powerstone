import beof from 'beof';
import Action from './route/Action';
import Module from './Module';

/**
 * Response provides helper methods for http responses.
 */
class Response {

    constructor(request, response, action, module) {

        beof({ request }).object();
        beof({ response }).object();
        beof({ action }).instance(Action);
        beof({ module }).instance(Module);

        this.request = request;
        this.response = response;
        this.action = action;
        this.module = module;

    }

    ok() {

        this.send(200);

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

    render(view, locals) {

        beof({ view }).string();
        beof({ locals }).optional().object();

        if (!this.module.viewEngine)
            return this.error(new ReferenceError('No view engine installed!'));

        this.module.viewEngine.render(view, locals, this);

    }

}

export default Response;
