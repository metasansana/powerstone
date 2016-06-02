import csrf from 'csurf';

/**
 * CsrfFilter 
 * @implements {Filter}
 */
class CsrfFilter {

    apply(app, config) {

        if (config.read(config.keys.FILTERS_CSRF_ENABLED, false)) {

                app.use(csrf(config.read(config.keys.FILTERS_CSRF_OPTIONS, {
                    cookie: true
                })));

                app.use(function send_csrf_token(req, res, next) {

                    res.set('x-csrf-token', req.csrfToken());
                    res.cookie('x-csrf-token', req.csrfToken());
                    res.locals._csrf = req.csrfToken();
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
