'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _csurf = require('csurf');

var _csurf2 = _interopRequireDefault(_csurf);

var _connConnections = require('../conn/Connections');

var _connConnections2 = _interopRequireDefault(_connConnections);

var secret = _crypto2['default'].randomBytes(32).toString('hex');

var sendCSRFToken = function sendCSRFToken(req, res, next) {

    res.set('x-csrf-token', req.csrfToken());
    res.cookie('x-csrf-token', req.csrfToken());
    res.locals._csrf = req.csrfToken();
    next();
};

/**
 * WebMiddleWareRegistry
 */
var WebMiddleWareRegistry = {

    middleware: {},

    set: function set(name, provider) {
        this.middleware[name] = provider;
        return this;
    },

    get: function get(name) {
        if (!this.middleware.hasOwnProperty(name)) throw new Error('Unknown web middleware "' + name + '"!');
        return this.middleware[name];
    }

};

WebMiddleWareRegistry.set('public', function _public_(mount, app, config, loader, project) {
    config.readWithDefaults('public', ['public']).forEach(function (path) {
        return app.use(_express2['default']['static'](loader.getPath() + '/' + path));
    });
});

WebMiddleWareRegistry.set('method-override', function _methodOverride_(mount, app, config, loader, project) {
    app.use(mount, (0, _methodOverride2['default'])());
});

WebMiddleWareRegistry.set('morgan', function _morgan_(mount, app, config, loader, project) {

    if (config.read('morgan') === false) return;

    app.use(mount, (0, _morgan2['default'])(config.readWithDefaults('morgan.format', process.env.LOG_FORMAT || 'dev', config.read('morgan.options'))));
});

WebMiddleWareRegistry.set('body-parser', function _bodyParser_(mount, app, config, loader, project) {
    app.use(mount, _bodyParser2['default'].json());
    app.use(mount, _bodyParser2['default'].urlencoded({ extended: true }));
});

WebMiddleWareRegistry.set('cookie-parser', function _cookieParser_(mount, app, config, loader, project) {
    app.use(mount, (0, _cookieParser2['default'])(config.readWithDefaults('secret', process.env.SECRET || secret)));
});

WebMiddleWareRegistry.set('session', function _session_(mount, app, config, loader, project) {

    var sessionConfig = config.readAndMerge('session', {
        name: 'PHPSESSIONID',
        secret: config.readWithDefaults('secret', process.env.SECRET || secret),
        resave: false,
        saveUninitialized: true
    }, {});

    if (_connConnections2['default'].hasConnection('session')) sessionConfig.store = _connConnections2['default'].getConnection('session').getRaw();

    app.use(mount, (0, _expressSession2['default'])(sessionConfig));
});

WebMiddleWareRegistry.set('csrf', function _csrf_(mount, app, config, loader, project) {

    if (config.read('csrf')) {
        app.use(mount, (0, _csurf2['default'])());
        app.use(mount, sendCSRFToken);
    }
});

exports['default'] = WebMiddleWareRegistry;
module.exports = exports['default'];
//# sourceMappingURL=WebMiddleWareRegistry.js.map