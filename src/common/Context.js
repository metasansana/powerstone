/**
 * Context is a class that stores a shared context between
 * modules and their submodules.
 */
class Context {

    constructor() {

      this.middleware = {};
        this.connectors = {};
        this.controllers = {};
        this.filters = {};

    }

}
export default Context
