import cookieParser from 'cookie-parser';

/**
 * CookieFilter 
 * @implements {Filter}
 */
class CookieFilter {

    apply(app, config) {

        app.use(cookieParser(
            config.read(config.keys.SECRET, config.defaults.SECRET),
            config.read(config.keys.FILTERS.cookie_parser, {})
        ));

    }


}

export default new CookieFilter()
