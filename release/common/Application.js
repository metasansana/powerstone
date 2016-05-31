'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

var _Module = require('./Module');

var _Module2 = _interopRequireDefault(_Module);

var _util = require('../util');

var util = _interopRequireWildcard(_util);

var _usrModels = require('../usr/models');

var _usrModels2 = _interopRequireDefault(_usrModels);

var _usrPool = require('../usr/pool');

var _usrPool2 = _interopRequireDefault(_usrPool);

var _usrEvents = require('../usr/events');

var _usrEvents2 = _interopRequireDefault(_usrEvents);

var _usrShared = require('../usr/shared');

var _usrShared2 = _interopRequireDefault(_usrShared);

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

var Application = (function () {
    function Application(path) {
        _classCallCheck(this, Application);

        this.path = path;
        this.name = 'main';
        this.server = null;
        this.modules = {};
        this.controllers = {};
        this.models = _usrModels2['default'];
        this.middleware = {};
        this.pool = _usrPool2['default'];
        this.shared = _usrShared2['default'];
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
        this._events = _usrEvents2['default'];
    }

    /**
     * on 
     */

    _createClass(Application, [{
        key: 'on',
        value: function on() {
            this._events.on.apply(this._events, arguments);
        }
    }, {
        key: 'emit',
        value: function emit() {
            return this._events.emit.apply(this._events, arguments);
        }

        /**
         * run this Application
         * @abstract
         * @return {Promise}
         */
    }, {
        key: 'run',
        value: function run() {}
    }]);

    return Application;
})();

exports['default'] = Application;
module.exports = exports['default'];
//# sourceMappingURL=Application.js.map