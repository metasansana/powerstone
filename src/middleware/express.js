import crypto from 'crypto';
import express from 'express';
import methodOverride from 'method-override';
import morgan from 'morgan';
import body_parser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import csrf from 'csurf';
import serve_index from 'serve-index';

const SECRET = crypto.randomBytes(32).toString('hex');

const send_csrf_token = function(req, res, next) {
    res.set('x-csrf-token', req.csrfToken());
    res.cookie('x-csrf-token', req.csrfToken());
    res.locals._csrf = req.csrfToken();
    next();
};

export default {

    public: function(router, module) {
        module.configuration.readWithDefaults('public', ['public']).
        forEach(path => {

            if (Array.isArray(path))
                return router.use(path[0], express.static(module.loader.join(path[1])));

            router.use(express.static(module.loader.join(path)));

        });
    },
  'serve-index': function(router, module) {
        module.configuration.readWithDefaults('directory', []).
        forEach(path => {

            if (Array.isArray(path))
                return router.use(path[0], serve_index(module.loader.join(path[1])));

            router.use(serve_index(module.loader.join(path)));

        });

    },
    'method-override': function(router, module) {
        router.use(module.path, methodOverride());
    },
    morgan: function(router, module) {

        if (module.configuration.read('morgan') === false) return;

        router.use(module.path, morgan(module.configuration.readWithDefaults('morgan.format',
            process.env.LOG_FORMAT || 'dev', module.configuration.read('morgan.options'))));
    },
    'body-parser': function(router, module) {
        router.use(module.path, body_parser.json());
        router.use(module.path, body_parser.urlencoded({
            extended: true
        }));
    },
    'cookie-parser': function(router, module) {
        router.use(module.path, cookieParser(module.configuration.readWithDefaults('secret',
            process.env.SECRET || SECRET)));
    },
    session: function(router, module) {

        var sessionConfig = module.configuration.readAndMerge('session', {
            name: 'PHPSESSID',
            secret: module.configuration.readWithDefaults('secret',
                process.env.SECRET || SECRET),
            resave: false,
            saveUninitialized: true
        }, {});

        if (module.application.pool.session)
            sessionConfig.store = module.application.pool.session;

        router.use(module.path, session(sessionConfig));

    },
    csrf: function(router, module) {

        if (module.configuration.read('csrf')) {
            router.use(module.path, csrf());
            router.use(module.path, send_csrf_token);
        }

    }
};
