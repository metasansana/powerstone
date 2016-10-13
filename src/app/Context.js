import Pool from '../net/Pool';

/**
 * Context represents the Application context, ie all the various
 * modules autoloaded.
 * @abstract
 */
class Context {

    constructor() {

        this.middleware = {};
        this.connectors = {};
        this.controllers = {};
        this.outputFilters = {};
        this.connections = Pool;
        this.filters = {};

    }

}

export default Context
