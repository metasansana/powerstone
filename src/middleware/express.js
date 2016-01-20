import crypto from 'crypto';
import express from 'express';
import methodOverride from 'method-override';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import csrf from 'csurf';

const SECRET = crypto.randomBytes(32).toString('hex');

const send_csrf_token = function(req, res, next) {
    res.set('x-csrf-token', req.csrfToken());
    res.cookie('x-csrf-token', req.csrfToken());
    res.locals._csrf = req.csrfToken();
    next();
};

export default {

    public: function(router, module) {
        module.configuration.readWithDefaults('web.public', ['public']).
        forEach(path => router.use(express.static(module.loader.join(path))));
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
        router.use(module.path, bodyParser.json());
        router.use(module.path, bodyParser.urlencoded({
            extended: true
        }));
    },
    'cookie-parser': function(router, module) {
        router.use(module.path, cookieParser(module.configuration.readWithDefaults('secret',
            process.env.SECRET || SECRET)));
    },
    session: function(router, module) {

        var sessionConfig = module.configuration.readAndMerge('web.session', {
            name: 'PHPSESSID',
            secret: module.configuration.readWithDefaults('secret',
                process.env.SECRET || SECRET),
            resave: false,
            saveUninitialized: true
        }, {});

        if (module.application.pool.session)
            sessionConfig.store = app.pool.session;

        router.use(module.path, session(sessionConfig));

    },
    csrf: function(router, module) {

        if (module.configuration.read('csrf')) {
            router.use(module.path, csrf());
            router.use(module.path, send_csrf_token);
        }

    }
};
