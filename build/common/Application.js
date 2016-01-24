'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Module = require('./Module');

var _Module2 = _interopRequireDefault(_Module);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

/**
 * Application is the main class of the framework.
 * @param {String} path The path to intialize this Application to. 
 *
 * @property {string} path - The path this Application was initialized to.
 * @property {ManagedServer} server - The managed http server.  
 * @property {object} modules - Modules loaded into memory.
 * @property {object} controllers - Controllers loaded into memory.
 * @property {object} models - Models loaded into memory.
 * @property {object} middleware - Middleware loaded into memory.
 * @property {object} pool - A pool of connections the Application has made.
 * @property {object} framework.express - Loaded modules for express
 * @property {object} framework.restify - Loaded modules for restify
 * @property {object} framework.pipes - Loaded modules for the pipes framework
 */

var Application = (function () {
    function Application(path) {
        _classCallCheck(this, Application);

        this.path = path;
        this.server = null;
        this.modules = {};
        this.controllers = {};
        this.models = {};
        this.middleware = {};
        this.pool = {};
        this.framework = {
            pipes: {},
            run: {},
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
            STARTED: 'started'
        };
        this._events = new _events2['default'].EventEmitter();
    }

    /**
     * on 
     */

    _createClass(Application, [{
        key: 'on',
        value: function on() {
            this._events.on.apply(this._events, arguments);
        }

        /**
         * interpolate swaps a list of string for values
         * from a source.
         *
         * Use it to turn for example, a list of controller
         * strings into an object.
         * @param {object} source The source to swap from
         * @param {array|string} list The list or string to interpolate
         * @returns {object}
         */
    }, {
        key: 'interpolate',
        value: function interpolate(source, list) {

            var multi = Array.isArray(list);
            var result;
            list = multi ? list : [list];

            result = list.map(function (l) {

                if (!source[l]) throw new Error('Application#interpolate: The source does not\n            contain a member ' + l + '!');

                return source[l];
            });

            return multi ? result : result[0];
        }

        /**
         * resolveMiddleware resolves a list of strings into registered middleware.
         * @param {array<string|function>} list 
         * @returns {array<function>}
         * @throws Will throw if an unregistered string is encountered.
         */
    }, {
        key: 'resolveMiddleware',
        value: function resolveMiddleware(list) {
            var _this = this;

            return list.map(function (w) {

                if (typeof w === 'function') return w;

                if (!_this.middleware[w]) throw new Error('Unknown middleware: \'' + w + '\' declared in route file!');

                return _this.middleware[w];
            });
        }

        /**
         * resolveAction turns a string into a route action
         * @param {string} action 
         * @param {string} method 
         * @param {object} definition 
         * @throws Will throw if you specify an unknown controller
         */
    }, {
        key: 'resolveAction',
        value: function resolveAction(action, method, definition) {

            var split = action.split('.');
            var Controller;

            Controller = this.controllers[split[0]];
            method = split[1] || method;

            if (typeof Controller !== 'function') throw new Error('Controller \'' + split[0] + '\' must be a constructor not' + (' \'' + typeof Controller + '\'!'));

            return function (req, res) {
                var instance = new Controller(req, res, definition);
                if (typeof instance[method] !== 'function') {
                    res.status(500);
                    return res.send('\n                    Unknown method \'' + method + '\' in route description\n                    for controller ' + ('\n                    \'' + action[0] + '\'!'));
                }

                instance[method]();
            };
        }

        /**
         * run this Application
         * @return {Promise}
         */
    }, {
        key: 'run',
        value: function run() {
            var _this2 = this;

            var loader = this.getLoader();
            var m = new _Module2['default']('main', '', loader.getConfiguration(), loader, this);

            this.modules.main = m;

            m.modules(this.modules);
            m.framework(this.framework.connectors, this.framework.pipes);
            return Promise.all(m.connections(this.framework.connectors, this.pool)).then(function () {
                return m.userland(_this2.controllers, _this2.models, _this2.middleware);
            });
        }
    }]);

    return Application;
})();

exports['default'] = Application;
module.exports = exports['default'];
//# sourceMappingURL=Application.js.map