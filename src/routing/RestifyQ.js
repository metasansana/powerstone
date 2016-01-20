/**
 * RestifyQ
 **/
class RestifyQ {

    constructor(path, server) {
        this.path = path;
        this.server = server;
        this.methods = Object.create(null);
    }

    enque(method, cb) {

        this.methods[method] = this.methods[method] || [];
        this.methods[method].push(cb);

    }

    flush() {

        Object.keys(this.methods).
        forEach(method => this.server[method](this.path, this.methods[method]));

    }
}

export default RestifyQ
