import Context from '../app/Context';
import DefaultFilters from './filters/DefaultFilters';

/**
 * ApiContext is a class that stores a shared context between
 * modules and their submodules.
 */
class ApiContext extends Context {

    constructor() {

        super();

        this.filters = {
            default: DefaultFilters,
            public: {
                apply() {}
            }
        };

    }

}

export default ApiContext
