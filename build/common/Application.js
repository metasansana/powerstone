'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

var _Module = require('./Module');

var _Module2 = _interopRequireDefault(_Module);

var isCall = function isCall(str) {

    str = str || '';

    if (str.indexOf('(') > -1) if (str.indexOf(')') > -1) return true;
};

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
            var hit;

            list = multi ? list : [list];

            result = list.map(function (l) {

                hit = _propertySeek2['default'].get(source, l);

                if (!hit) throw new Error('Application#interpolate: The source does not\n            contain a member at path  ' + l + '!');

                return hit;
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

            var m;

            return list.map(function (w) {

                if (typeof w === 'function') return w;

                m = _propertySeek2['default'].get(_this.middleware, w);
                console.log('mware-> ', _this.middleware);
                if (!m) throw new Error('Unknown middleware: \'' + w + '\' declared in route file!');

                return m;
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

            var split;
            var Controller;
            var path;
            var type;

            if (isCall(action)) {
                split = action.slice(0, -2).split('.');
                method = split.pop();
            } else {
                split = action.split('.');
            }

            path = split.join('.');
            Controller = _propertySeek2['default'].get(this.controllers, path);
            type = typeof Controller;

            switch (type) {

                case 'function':
                    break;

                case 'object':
                    break;

                default:
                    throw new Error('Controller \'' + path + '\' must be a constructor or instance not' + (' \'' + type + '\'!'));

            }

            return function (req, res) {

                var instance;

                if (type === 'function') {
                    instance = new Controller(req, res, definition);
                } else {
                    instance = Controller;
                    instance.request = req;
                    instance.response = res;
                    instance.route = definition;
                }

                if (typeof instance[method] !== 'function') {
                    res.status(500);
                    return console.error('\n                    Unknown method \'' + method + '\' in route description\n                    for controller ' + ('\n                    \'' + path + '\'!'));
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
            var m = new _Module2['default']('', '', loader.getConfiguration(), loader, this);

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