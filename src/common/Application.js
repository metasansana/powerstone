import Property from 'property-seek';
import Module from './Module';
import * as util from '../util';
import models from '../usr/models';
import pool from '../usr/pool';
import events from '../usr/events';
import shared from '../usr/shared';

/**
 * Application is the main class of the framework.
 * @param {string} path The path to intialize this Application to. 
 *
 * @property {Module} main - The main Module for this Application.
 * @property {ManagedServer} server - The managed http server.  
 * @property {object} modules - Modules loaded into memory.
 * @property {object} controllers - Controllers loaded into memory.
 * @property {object} models - Models loaded into memory.
 * @property {object} middleware - Middleware loaded into memory.
 * @property {ManagedServer|null} server - The internal managed server that serves clients.
 * @property {object} pool - A pool of connections the Application has made.
 * @property {object} framework.express - Loaded modules for express
 * @property {object} framework.restify - Loaded modules for restify
 * @property {object} framework.pipes - Loaded modules for the pipes framework
 */
class Application {

    constructor(path) {

        this.path = path;
        this.name = 'main';
        this.server = null;
        this.modules = {};
        this.controllers = {};
        this.models = models;
        this.middleware = {};
        this.pool = pool;
        this.shared = shared;
        this.framework = {
            pipes: {
                filters: {},
                defines: {}
            },
            run: {},
            events: {},
            connectors: {},
            express: {
                engines: {},
                middleware: {}
            },
            restify: {
                plugins: {}
            }
        };
        this.events = {
            ERROR: 'error',
            STARTED: 'started',
            ROUTING: 'routing'
        };
        this._events = events;

    }

    /**
     * on 
     */
    on() {
        this._events.on.apply(this._events, arguments);
    }

    emit() {
        return this._events.emit.apply(this._events, arguments);
    }

    /**
     * run this Application
     * @abstract
     * @return {Promise}
     */
    run() {

    }

}

export default Application;
