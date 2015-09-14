'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Pool = require('./Pool');

var _Pool2 = _interopRequireDefault(_Pool);

var _mongoFactory = require('./mongo/Factory');

var _mongoFactory2 = _interopRequireDefault(_mongoFactory);

var _UnsupportedConnectionTypeError = require('./UnsupportedConnectionTypeError');

var _UnsupportedConnectionTypeError2 = _interopRequireDefault(_UnsupportedConnectionTypeError);

var _UnknownConnectionError = require('./UnknownConnectionError');

var _UnknownConnectionError2 = _interopRequireDefault(_UnknownConnectionError);

/**
 * Connections is a registry for connections
 */

var Connections = (function () {
    function Connections() {
        _classCallCheck(this, Connections);

        this.types = {};
        this.pool = _Pool2['default'];
    }

    _createClass(Connections, [{
        key: 'set',

        /**
         *
         * @param {String} name
         * @param {ConnectionFactory} factory
         */
        value: function set(name, factory) {
            this.types[name] = factory;
            return this;
        }
    }, {
        key: 'create',

        /**
         * create will return an instance of the desired connection if found.
         * @param {String} name
         * @param {String} type
         * @param {Object} options
         * @returns {AbstractConnection}
         */
        value: function create(name, type, options) {

            var conn;

            if (!this.types.hasOwnProperty(type)) throw new _UnsupportedConnectionTypeError2['default'](type);

            conn = this.types[type].create(name, type, options);
            this.pool[name] = conn;

            return conn;
        }
    }, {
        key: 'hasConnection',
        value: function hasConnection(name) {
            return this.pool.hasOwnProperty(name);
        }
    }, {
        key: 'getConnection',

        /**
         * getConnection
         * @param {String} name
         * @return {AbstractConnection}
         */
        value: function getConnection(name) {

            if (!this.pool.hasOwnProperty(name)) throw new _UnknownConnectionError2['default'](name);

            return this.pool[name];
        }
    }, {
        key: 'open',

        /**
         * open
         * @return {Promise}
         */
        value: function open() {
            var _this = this;

            return _bluebird2['default'].all(Object.keys(this.pool).map(function (key) {
                _this.pool[key].open();
            }));
        }
    }, {
        key: 'close',

        /**
         * close all the connections
         * @return {Promise}
         */
        value: function close() {
            return _bluebird2['default'].all(Object.keys(this.pool).map(function (connection) {
                return connection.close();
            }));
        }
    }]);

    return Connections;
})();

var c = new Connections();
c.set('mongoose', _mongoFactory2['default']);
c.set('connect-mongo', _mongoFactory2['default']);
exports['default'] = c;
module.exports = exports['default'];
//# sourceMappingURL=Connections.js.map