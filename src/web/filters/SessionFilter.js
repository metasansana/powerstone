import session from 'express-session';

/**
 * SessionFilter 
 * @implements {Filter}
 */
class SessionFilter {

    apply(app, config) {

        if (config.read(config.keys.FILTERS_SESSION_ENABLED, false)) {

            app.use(session(config.read(config.keys.FILTERS_SESSION_OPTIONS, {}, {
                name: 'CRYINGZANGOLIE',
                secret: config.read(config.keys.SECRET, config.defaults.SECRET),
                resave: false,
                saveUninitialized: true,
                store: config.read(config.keys.FILTERS_SESSION_STORE, null)
            })));

        }

    }
}

export default new SessionFilter()
