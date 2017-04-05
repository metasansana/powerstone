import MethodOverrideFilter from './MethodOverrideFilter';
import LogFilter from './LogFilter';
import CookieFilter from './CookieFilter';
import SessionFilter from './SessionFilter';
import CsrfFilter from './CsrfFilter';
import ParserFilter from './ParserFilter';
import AssetFilter from './AssetFilter';

/**
 * DefaultFilters
 */
class DefaultFilters {

    apply(app, config) {

        MethodOverrideFilter.apply(app, config);
        LogFilter.apply(app, config);
        ParserFilter.apply(app, config);
        CookieFilter.apply(app, config);
        SessionFilter.apply(app, config);
        AssetFilter.apply(app, config);
        CsrfFilter.apply(app, config);

    }

}

export default new DefaultFilters()
