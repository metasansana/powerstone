import Context from '../app/Context';
import DefaultFilters from './filters/DefaultFilters';
import AssetFilter from './filters/AssetFilter';

class WebContext extends Context  {

    constructor() {

        super();
        this.filters = {
            default: DefaultFilters,
            public: AssetFilter
        };

    }

}

export default WebContext
