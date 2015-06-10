var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var session = require('express-session');
var csrf = require('csurf');
var morgan = require('morgan');
var express= require('express');
var Builtin = require('./Builtin');

/**
 * WebAppFramework provides methods for setting up an express app in a powerstone application.
 * @param {express.Application} app
 * @constructor
 */
function WebAppFramework(app, config) {
    this.app = app;
    this.config = config;
}

/**
 * usePublic will set the public paths.
 * @param {String} root The root folder of the app.
 * @param {String|Array} paths
 */
WebAppFramework.prototype.usePublic = function (root) {

    var paths = this.config.public;
    var app = this.app;

    if (typeof paths === 'string')
        app.use(express.static(root + '/' + paths))


    if (Array.isArray(paths))
        paths.forEach(function (folder) {
            app.use(express.static(root + '/' + folder));
        });

    return this;

};

/**
 * useMethodOverride
 */
WebAppFramework.prototype.useMethodOverride = function () {
    this.app.use(methodOverride());
    return this;
};

/**
 * useBodyParser
 */
WebAppFramework.prototype.useBodyParser = function () {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    return this;
};

/**
 * useCookieParser
 */
WebAppFramework.prototype.useCookieParser = function () {
    this.app.use(cookieParser(this.config.secret));
    return this;
};

/**
 * useSessions
 */
WebAppFramework.prototype.useSessions = function (connections) {

    if (connections.hasName('session'))
        this.config.session.store = connections.getByName('session').store;

    this.app.use(session(this.config.session));

    return this;

};

/**
 * useCSRF
 */
WebAppFramework.prototype.useCSRF = function () {

    if (this.config.csrf.enabled) {
        this.app.use(csrf());
        this.app.use(Builtin.sendCSRFToken);
    }

    return this;
};

/**
 * useLogging
 */
WebAppFramework.prototype.useLogging = function () {

    if(!this.config.morgan) return this;

    this.app.use(
        morgan(this.config.morgan.format ||
            process.env.LOG_FORMAT || 'dev', this.config.morgan.options));

    return this;
};


/**
 * use simply calls the use method on the app.
 */
WebAppFramework.prototype.use = function (mware) {
    this.app.use(mware);
    return this;
};

/**
 * toApp
 * @returns {Express.Application}
 */
WebAppFramework.prototype.toApp = function () {
    return this.app;
};

module.exports = WebAppFramework;