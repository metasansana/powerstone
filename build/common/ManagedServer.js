'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

/**
 * ManagedServer wraps around a Server to add additional features.
 *
 * By wrapping around the server implementation, we gain the ability
 * to shutdown and restart the server when needed. Each time
 * the server is stopped, we destroy all existing socket connections
 * so node does not wait on them to end before calling the close() callback.
 * @implements Server
 */

var ManagedServer = (function () {

    /**
     * @param Server server
     */

    function ManagedServer(port, host, server) {
        _classCallCheck(this, ManagedServer);

        this.port = port;
        this.host = host;
        this.server = server;
        this.connections = {};
        this.connectionId = 0;
    }

    _createClass(ManagedServer, [{
        key: '_store',
        value: function _store(socket) {

            var self = this;
            this.connectionId += 1;
            socket._serverId = self.connectionId;

            socket.on('close', function () {
                delete self.connections[this._serverId];
            });

            self.connections[socket._serverId] = socket;
        }

        /**
         * flush destroys all current open connections to the server.
         */
    }, {
        key: 'flush',
        value: function flush() {

            var self = this;

            Object.keys(self.connections).forEach(function (socketId) {
                var socket = self.connections[socketId];
                if (socket) socket.destroy();
            });
        }

        /**
         * start this server
         * @return {Promise}
         */
    }, {
        key: 'start',
        value: function start() {
            var self = this;
            return new _bluebird2['default'](function (resolve) {
                self.server.on('connection', self._store.bind(self));
                self.server.on('listening', function (x) {
                    return resolve(self.port, self.host, self);
                });
                self.server.listen(self.port, self.host);
            });
        }

        /**
         * shutdown this server
         * @return {Promise}
         */
    }, {
        key: 'shutdown',
        value: function shutdown() {
            var self = this;
            return new _bluebird2['default'](function (resolve) {
                self.server.close(function (x) {
                    return resolve(self);
                });
                self.flush();
            });
        }

        /**
         * restart this server
         * @returns {Promise}
         */
    }, {
        key: 'restart',
        value: function restart() {
            return this.shutdown().then(this.start.bind(this));
        }
    }, {
        key: 'on',
        value: function on(event, fn) {
            this.server.on(event, fn);
            return this;
        }
    }, {
        key: 'listen',
        value: function listen(port, hostname, callback) {
            console.log('lisetning pon  ', arguments);
            this.server.listen(port, hostname, callback);
        }
    }, {
        key: 'close',
        value: function close(cb) {
            this.server.close(cb);
        }
    }, {
        key: 'toFramework',
        value: function toFramework() {
            return this.server.toFramework();
        }
    }]);

    return ManagedServer;
})();

exports['default'] = ManagedServer;
module.exports = exports['default'];
//# sourceMappingURL=ManagedServer.js.map