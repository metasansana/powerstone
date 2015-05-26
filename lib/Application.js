var Promise = require('bluebird');

var Loader = require('./Loader');
var Connections = require('./connections/Connections');
var TaskRunner = require('./TaskRunner');

var noop = function () {};

/**
 * flattenRoutes turns the conf/route.json file contents into one flat array.
 * @return {Array}
 */
var flattenRoutes = function (routes) {

    var flat = [];

    routes.forEach(function (route) {

        route.routes.forEach(function (entry) {

            flat.push(entry);

        })
    })

    return flat;

};

/**
 * Application
 * @param {String} path
 */
function Application(path) {

    this.name = 'default';
    this.path = path;
    this.controllers = {};
    this.models = {};
    this.routes = [];
    this.tasks = {};
    this.middleware = {};
    this.loader = new Loader(path);
    this.connections = new Connections();
    this.config = this.loader.loadFromConfWithDefaults('config.json', this._defaultConfig());

}

/** Interface implementations */

/**
 * httpServerCreated
 */
Application.prototype.httpServerCreated = noop;

/**
 * httpServerClosed
 */
Application.prototype.httpServerClosed = noop;

/**
 * defaultConfig
 */
Application.prototype._defaultConfig = function () {
    return {};
};

/**
 * getModelByName should be overwritten to provide models for queries.
 */
Application.prototype.getModelByName = function (name) {
    throw new Error('getModelByName() must be overwritten before a target can be provided. Target: ' + name + '.');
};

/**
 * run
 * @return {Promise}
 */
Application.prototype.run = function () {

    var self = this;

    self.routes = flattenRoutes(self.loader.loadFromConf('routes.json'));

    if (Array.isArray(self.config.connections))
        self.config.connections.forEach(function (con) {
            return self.connections.create(con.name, con.type, con.options);
        });

    return self.connections.open().
        then(function () {

            return Promise.reduce(['','models', 'controllers', 'tasks', 'queries', 'middleware'],
                function (agg, target) {
                    return self.loader.loadMap(target).
                        then(function (hash) {
                            self[target] = hash;
                        });

                });

        }).
        then(function () {
            return TaskRunner.run();

        });

};

module.exports = Application;
