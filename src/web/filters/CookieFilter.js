import cookieParser from 'cookie-parser';

/**
 * CookieFilter 
 * @implements {Filter}
 */
class CookieFilter {

  apply(app, config) {

    app.use(cookieParser(config.read(config.keys.SECRET, config.defaults.SECRET)));

  }


}

export default new CookieFilter()
