'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _methodOverride2 = require('method-override');

var _methodOverride3 = _interopRequireDefault(_methodOverride2);

var _morgan2 = require('morgan');

var _morgan3 = _interopRequireDefault(_morgan2);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser2 = require('cookie-parser');

var _cookieParser3 = _interopRequireDefault(_cookieParser2);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _csurf = require('csurf');

var _csurf2 = _interopRequireDefault(_csurf);

var _serveIndex = require('serve-index');

var _serveIndex2 = _interopRequireDefault(_serveIndex);

var SECRET = _crypto2['default'].randomBytes(32).toString('hex');

var send_csrf_token = function send_csrf_token(req, res, next) {
    res.set('x-csrf-token', req.csrfToken());
    res.cookie('x-csrf-token', req.csrfToken());
    res.locals._csrf = req.csrfToken();
    next();
};

exports['default'] = {

    'public': function _public(router, module) {
        module.configuration.readWithDefaults('public', ['public']).forEach(function (path) {

            if (Array.isArray(path)) return router.use(path[0], _express2['default']['static'](module.loader.join(path[1])));

            router.use(_express2['default']['static'](module.loader.join(path)));
        });
    },
    'serve-index': function serveIndex(router, module) {
        module.configuration.readWithDefaults('directory', []).forEach(function (path) {

            if (Array.isArray(path)) return router.use(path[0], (0, _serveIndex2['default'])(module.loader.join(path[1])));

            router.use((0, _serveIndex2['default'])(module.loader.join(path)));
        });
    },
    'method-override': function methodOverride(router, module) {
        router.use((0, _methodOverride3['default'])());
    },
    morgan: function morgan(router, module) {

        if (module.configuration.read('morgan') === false) return;

        router.use((0, _morgan3['default'])(module.configuration.readWithDefaults('morgan.format', process.env.LOG_FORMAT || 'dev', module.configuration.read('morgan.options'))));
    },
    'body-parser': function bodyParser(router, module) {
        router.use(_bodyParser2['default'].json());
        router.use(_bodyParser2['default'].urlencoded({
            extended: true
        }));
    },
    'cookie-parser': function cookieParser(router, module) {
        router.use((0, _cookieParser3['default'])(module.configuration.readWithDefaults('secret', process.env.SECRET || SECRET)));
    },
    session: function session(router, module) {

        var sessionConfig = module.configuration.readAndMerge('session', {
            name: 'PHPSESSID',
            secret: module.configuration.readWithDefaults('secret', process.env.SECRET || SECRET),
            resave: false,
            saveUninitialized: true
        }, {});

        if (module.application.pool.session) sessionConfig.store = module.application.pool.session;

        router.use((0, _expressSession2['default'])(sessionConfig));
    },
    csrf: function csrf(router, module) {

        if (module.configuration.read('csrf')) {

            router.use((0, _csurf2['default'])({
                cookie: true
            }));
            router.use(send_csrf_token);
            router.use(function (err, req, res, next) {

                if (err.code !== 'EBADCSRFTOKEN') return next(err);
                res.status(403);
                res.send('INVALID TOKEN');
            });
        }
    }
};
module.exports = exports['default'];
//# sourceMappingURL=express.js.map