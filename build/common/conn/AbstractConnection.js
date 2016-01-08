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
 * A connection is an object that needs to open to something remotely on application boot time.
 *
 * This usually is a database or some kind of queue system.
 * @param {String} name
 * @param {Object} options
 * @param {Array} list
 * @implements {Connection}
 * @constructor
 */

var AbstractConnection = (function () {
    function AbstractConnection(name, options) {
        _classCallCheck(this, AbstractConnection);

        this.name = name;
        this.options = options;
    }

    /**
     * __open__ override this method to preform open/connect logic if the connection does
     * not support promises by default.
     *
     * It is wrapped in a promise for cleaner flow control.
     * @pararm {Function} resolve
     * @param {Function} reject
     */

    _createClass(AbstractConnection, [{
        key: '__open__',
        value: function __open__(reject, resolve) {
            resolve();
        }

        /**
         * __close__ override this method to preform close/disconnect logic if the connection does
         * not support promises by default.
         */
    }, {
        key: '__close__',
        value: function __close__(reject, resolve) {
            resolve();
        }
    }, {
        key: 'open',
        value: function open() {
            return new _bluebird2['default'](this.__open__.bind(this));
        }
    }, {
        key: 'close',
        value: function close() {
            return new _bluebird2['default'](this.__close__.bind(this));
        }
    }, {
        key: 'getRaw',
        value: function getRaw() {
            return this.connection;
        }
    }]);

    return AbstractConnection;
})();

exports['default'] = AbstractConnection;
module.exports = exports['default'];
//# sourceMappingURL=AbstractConnection.js.map