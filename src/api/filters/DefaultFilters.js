import QueryParser from './QueryParser';
import BodyParser from './BodyParser';
import AcceptParser from './AcceptParser';
/**
 * DefaultFilters installs the default filters we
 * use for restify. It can be used as a shortcut in composing filter rules.
 */
class DefaultFilters {

    filter(app, config) {

        QueryParser.filter(app, config);
        BodyParser.filter(app, config);
        AcceptParser.filter(app, config);

    }

}

export default new DefaultFilters();
