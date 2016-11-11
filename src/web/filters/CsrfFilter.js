import csrf from 'csurf';

/**
 * CsrfFilter
 * @implements {Filter}
 */
class CsrfFilter {

    apply(app, config) {

        if (config.read(config.keys.FILTERS_CSRF_ENABLED, false)) {

            var header = config.read(config.keys.FILTERS_CSRF_TOKEN_HEADER, 'x-csrf-token');
            var key = config.read(config.keys.FILTERS_CSRF_TOKEN_KEY, '_csrf');

            app.use(csrf(config.read(config.keys.FILTERS_CSRF_OPTIONS, {}, {
                cookie: true,
                value: req => req.body[key] || req.query[key] || req.headers[header]
            })));

            app.use(function send_csrf_token(req, res, next) {

                var tok = req.csrfToken();

                res.set(header, tok);
                res.cookie(header, tok);
                res.locals[key] = tok;
                next();

            });

            //TODO allow client code to hook into this instead of this lame handler
            app.use(function if_csrf_error(err, req, res, next) {

                if (err.code !== 'EBADCSRFTOKEN') return next(err);
                res.status(403);
                res.send('INVALID TOKEN');

            });

        }
    }
}

export default new CsrfFilter()
