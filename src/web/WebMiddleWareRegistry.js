import crypto from 'crypto';
import express from 'express';
import methodOverride from 'method-override';
import morgan  from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import csrf from 'csurf';
import Connections from '../conn/Connections';

var secret = crypto.randomBytes(32).toString('hex');

var sendCSRFToken = function (req, res, next) {

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

    set(name, provider) {
        this.middleware[name] = provider;
        return this;
    },

    get(name) {
        if (!this.middleware.hasOwnProperty(name))
            throw new Error('Unknown web middleware "' + name + '"!');
        return this.middleware[name];
    }

};

WebMiddleWareRegistry.set('public', function _public_(mount, app, project) {
    var config = project.getConfiguration();
    config.readWithDefaults('public', ['public']).
        forEach(path=>app.use(express.static(project.getLoader().getPath() + '/' + path)));
});

WebMiddleWareRegistry.set('method-override', function _methodOverride_(mount, app, project) {
    app.use(mount, methodOverride());
});

WebMiddleWareRegistry.set('morgan', function _morgan_(mount, app, project) {
    var config = project.getConfiguration();

    if (config.read('morgan') === false) return;

    app.use(mount, morgan(config.readWithDefaults('morgan.format',
        process.env.LOG_FORMAT || 'dev', config.read('morgan.options'))));
});

WebMiddleWareRegistry.set('body-parser', function _bodyParser_(mount, app, project) {
    app.use(mount, bodyParser.json());
    app.use(mount, bodyParser.urlencoded({extended: true}));

});

WebMiddleWareRegistry.set('cookie-parser', function _cookieParser_(mount, app, project) {
    var config = project.getConfiguration();
    app.use(mount, cookieParser(config.readWithDefaults('secret',
        process.env.SECRET || secret)));

});

WebMiddleWareRegistry.set('session', function _session_(mount, app, project) {

    var config = project.getConfiguration();
    var sessionConfig = config.readAndMerge('session', {
        name: 'PHPSESSIONID',
        secret: secret,
        resave: false,
        saveUninitialized: true
    }, {});

    if (Connections.hasConnection('session'))
        sessionConfig.store = Connections.getConnection('session').getRaw();

    app.use(mount, session(sessionConfig));

});

WebMiddleWareRegistry.set('csrf', function _csrf_(mount, app, project) {

    var config = project.getConfiguration();

    if (config.read('csrf')) {
        app.use(mount, csrf());
        app.use(mount, sendCSRFToken);
    }

});

export default WebMiddleWareRegistry