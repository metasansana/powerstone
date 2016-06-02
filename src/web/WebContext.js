import DefaultFilters from './filters/DefaultFilters';
import AssetFilter from './filters/AssetFilter';

class WebContext {

    constructor() {

        this.middleware = {};
        this.connectors = {};
        this.controllers = {};
        this.filters = {
            default: DefaultFilters,
                public: AssetFilter
        };

    }

}
export default WebContext
