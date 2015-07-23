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

    _createClass(AbstractConnection, [{
        key: '__open__',

        /**
         * __open__ override this method to preform open/connect logic if the connection does
         * not support promises by default.
         *
         * It is wrapped in a promise for cleaner flow control.
         * @pararm {Function} resolve
         * @param {Function} reject
         */
        value: function __open__(reject, resolve) {
            resolve();
        }
    }, {
        key: '__close__',

        /**
         * __close__ override this method to preform close/disconnect logic if the connection does
         * not support promises by default.
         */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uL0Fic3RyYWN0Q29ubmVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7d0JBQW9CLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQVl4QixrQkFBa0I7QUFFVCxhQUZULGtCQUFrQixDQUVSLElBQUksRUFBRSxPQUFPLEVBQUU7OEJBRnpCLGtCQUFrQjs7QUFHaEIsWUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsWUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDMUI7O2lCQUxDLGtCQUFrQjs7Ozs7Ozs7Ozs7ZUFlWixrQkFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFO0FBQ3RCLG1CQUFPLEVBQUUsQ0FBQztTQUNiOzs7Ozs7OztlQU1RLG1CQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUU7QUFDdkIsbUJBQU8sRUFBRSxDQUFDO1NBQ2I7OztlQUdHLGdCQUFHO0FBQ0gsbUJBQU8sMEJBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNoRDs7O2VBRUksaUJBQUc7QUFDSixtQkFBTywwQkFBWSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2pEOzs7ZUFFSyxrQkFBRTtBQUNKLG1CQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDMUI7OztXQXRDQyxrQkFBa0I7OztxQkF5Q1Qsa0JBQWtCIiwiZmlsZSI6IkFic3RyYWN0Q29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcblxuLyoqXG4gKiBBIGNvbm5lY3Rpb24gaXMgYW4gb2JqZWN0IHRoYXQgbmVlZHMgdG8gb3BlbiB0byBzb21ldGhpbmcgcmVtb3RlbHkgb24gYXBwbGljYXRpb24gYm9vdCB0aW1lLlxuICpcbiAqIFRoaXMgdXN1YWxseSBpcyBhIGRhdGFiYXNlIG9yIHNvbWUga2luZCBvZiBxdWV1ZSBzeXN0ZW0uXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3RcbiAqIEBpbXBsZW1lbnRzIHtDb25uZWN0aW9ufVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmNsYXNzIEFic3RyYWN0Q29ubmVjdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX19vcGVuX18gb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcHJlZm9ybSBvcGVuL2Nvbm5lY3QgbG9naWMgaWYgdGhlIGNvbm5lY3Rpb24gZG9lc1xuICAgICAqIG5vdCBzdXBwb3J0IHByb21pc2VzIGJ5IGRlZmF1bHQuXG4gICAgICpcbiAgICAgKiBJdCBpcyB3cmFwcGVkIGluIGEgcHJvbWlzZSBmb3IgY2xlYW5lciBmbG93IGNvbnRyb2wuXG4gICAgICogQHBhcmFybSB7RnVuY3Rpb259IHJlc29sdmVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RcbiAgICAgKi9cbiAgICBfX29wZW5fXyhyZWplY3QsIHJlc29sdmUpIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9fY2xvc2VfXyBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwcmVmb3JtIGNsb3NlL2Rpc2Nvbm5lY3QgbG9naWMgaWYgdGhlIGNvbm5lY3Rpb24gZG9lc1xuICAgICAqIG5vdCBzdXBwb3J0IHByb21pc2VzIGJ5IGRlZmF1bHQuXG4gICAgICovXG4gICAgX19jbG9zZV9fKHJlamVjdCwgcmVzb2x2ZSkge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgfVxuXG5cbiAgICBvcGVuKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UodGhpcy5fX29wZW5fXy5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHRoaXMuX19jbG9zZV9fLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGdldFJhdygpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWJzdHJhY3RDb25uZWN0aW9uIl19