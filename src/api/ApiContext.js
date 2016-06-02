import DefaultFilters from './filters/DefaultFilters';

/**
 * ApiContext is a class that stores a shared context between
 * modules and their submodules.
 */
class ApiContext {

    constructor() {

        this.middleware = {};
        this.connectors = {};
        this.controllers = {};
        this.filters = {
            default: DefaultFilters,
            public: {
                apply() {}
            }
        };

    }

}
export default ApiContext
