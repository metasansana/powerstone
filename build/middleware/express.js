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

var _bodyParser2 = require('body-parser');

var _bodyParser3 = _interopRequireDefault(_bodyParser2);

var _cookieParser2 = require('cookie-parser');

var _cookieParser3 = _interopRequireDefault(_cookieParser2);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _csurf = require('csurf');

var _csurf2 = _interopRequireDefault(_csurf);

var SECRET = _crypto2['default'].randomBytes(32).toString('hex');

var send_csrf_token = function send_csrf_token(req, res, next) {
    res.set('x-csrf-token', req.csrfToken());
    res.cookie('x-csrf-token', req.csrfToken());
    res.locals._csrf = req.csrfToken();
    next();
};

exports['default'] = {

    'public': function _public(router, module) {
        module.configuration.readWithDefaults('web.public', ['public']).forEach(function (path) {
            return router.use(_express2['default']['static'](module.loader.join(path)));
        });
    },
    'method-override': function methodOverride(router, module) {
        router.use(module.path, (0, _methodOverride3['default'])());
    },
    morgan: function morgan(router, module) {

        if (module.configuration.read('morgan') === false) return;

        router.use(module.path, (0, _morgan3['default'])(module.configuration.readWithDefaults('morgan.format', process.env.LOG_FORMAT || 'dev', module.configuration.read('morgan.options'))));
    },
    'body-parser': function bodyParser(router, module) {
        router.use(module.path, _bodyParser3['default'].json());
        router.use(module.path, _bodyParser3['default'].urlencoded({
            extended: true
        }));
    },
    'cookie-parser': function cookieParser(router, module) {
        router.use(module.path, (0, _cookieParser3['default'])(module.configuration.readWithDefaults('secret', process.env.SECRET || SECRET)));
    },
    session: function session(router, module) {

        var sessionConfig = module.configuration.readAndMerge('web.session', {
            name: 'PHPSESSID',
            secret: module.configuration.readWithDefaults('secret', process.env.SECRET || SECRET),
            resave: false,
            saveUninitialized: true
        }, {});

        if (module.application.pool.session) sessionConfig.store = app.pool.session;

        router.use(module.path, (0, _expressSession2['default'])(sessionConfig));
    },
    csrf: function csrf(router, module) {

        if (module.configuration.read('csrf')) {
            router.use(module.path, (0, _csurf2['default'])());
            router.use(module.path, send_csrf_token);
        }
    }
};
module.exports = exports['default'];
//# sourceMappingURL=express.js.map