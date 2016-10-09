import ParserFilter from './ParserFilter';
import AuthorizationFilter from './AuthorizationFilter';
import AuditFilter from './AuditFilter';

/**
 * DefaultFilters installs the default filters we
 * use for restify. It can be used as a shortcut in composing filter rules.
 */
class DefaultFilters {

    apply(app, config) {

        ParserFilter.apply(app, config);
        AuditFilter.apply(app, config);

    }

}

export default new DefaultFilters();
