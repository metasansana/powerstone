import restify from 'restify';

/**
 * AuthorizationFilter
 * @implements {Filter}
 */
class AuthorizationFilter {

    apply(app, config) {

        app.use(restify.authorizationParser(config.read('power.filters.authorization', null)));

    }

}

export default new AuthorizationFilter()
