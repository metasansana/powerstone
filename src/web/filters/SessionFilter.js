import session from 'express-session';

/**
 * SessionFilter 
 * @implements {Filter}
 */
class SessionFilter {

    apply(app, config) {

        if (config.read('power.filters.session.enabled', false)) {

            app.use(session(config.read('power.filters.session.options', {}, {
                name: 'CRYINGZANGOLIE',
                secret: config.read('power.secret', SECRET),
                resave: false,
                saveUninitialized: true,
                store: config.read('power.filters.session.store', null)
            })));

        }

    }
}

export default new SessionFilter()
