'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ServerFactory = require('../ServerFactory');

var _ServerFactory2 = _interopRequireDefault(_ServerFactory);

/**
 * PowerstoneServer wraps around the frameworks server to provide
 * a simplified api.
 * @implements Server
 */

var PowerstoneServer = (function () {

    /**
     * @param {http.Server|https.Server} server
     * @param {Number} port
     * @param {String} host
     */

    function PowerstoneServer(server, port, host) {
        _classCallCheck(this, PowerstoneServer);

        this.server = server;
        this.port = port;
        this.host = host;
    }

    _createClass(PowerstoneServer, [{
        key: 'on',
        value: function on(event, fn) {
            this.server.on(event, fn);
            return this;
        }
    }, {
        key: 'listen',
        value: function listen(cb) {
            return this.server.listen(this.port, this.host, cb);
        }
    }, {
        key: 'close',
        value: function close(cb) {
            this.server.close(cb);
        }
    }, {
        key: 'toFrameworkServer',
        value: function toFrameworkServer() {
            return this.server;
        }
    }]);

    return PowerstoneServer;
})();

exports['default'] = PowerstoneServer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Qb3dlcnN0b25lU2VydmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt1QkFBb0IsU0FBUzs7Ozs2QkFDSCxrQkFBa0I7Ozs7Ozs7Ozs7SUFPdEMsZ0JBQWdCOzs7Ozs7OztBQU9QLGFBUFQsZ0JBQWdCLENBT04sTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7OEJBUDlCLGdCQUFnQjs7QUFRZCxZQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztLQUNwQjs7aUJBWEMsZ0JBQWdCOztlQWFoQixZQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7QUFDVixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFCLG1CQUFPLElBQUksQ0FBQztTQUNmOzs7ZUFFSyxnQkFBQyxFQUFFLEVBQUU7QUFDUCxtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDdkQ7OztlQUVJLGVBQUMsRUFBRSxFQUFDO0FBQ0wsZ0JBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pCOzs7ZUFFZ0IsNkJBQUU7QUFDZixtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCOzs7V0E1QkMsZ0JBQWdCOzs7cUJBZ0NQLGdCQUFnQiIsImZpbGUiOiJQb3dlcnN0b25lU2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgU2VydmVyRmFjdG9yeSBmcm9tICcuLi9TZXJ2ZXJGYWN0b3J5JztcblxuLyoqXG4gKiBQb3dlcnN0b25lU2VydmVyIHdyYXBzIGFyb3VuZCB0aGUgZnJhbWV3b3JrcyBzZXJ2ZXIgdG8gcHJvdmlkZVxuICogYSBzaW1wbGlmaWVkIGFwaS5cbiAqIEBpbXBsZW1lbnRzIFNlcnZlclxuICovXG5jbGFzcyBQb3dlcnN0b25lU2VydmVyIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aHR0cC5TZXJ2ZXJ8aHR0cHMuU2VydmVyfSBzZXJ2ZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcG9ydFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBob3N0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc2VydmVyLCBwb3J0LCBob3N0KSB7XG4gICAgICAgIHRoaXMuc2VydmVyID0gc2VydmVyO1xuICAgICAgICB0aGlzLnBvcnQgPSBwb3J0O1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgIH1cblxuICAgIG9uKGV2ZW50LCBmbikge1xuICAgICAgICB0aGlzLnNlcnZlci5vbihldmVudCwgZm4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBsaXN0ZW4oY2IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyLmxpc3Rlbih0aGlzLnBvcnQsIHRoaXMuaG9zdCwgY2IpO1xuICAgIH1cblxuICAgIGNsb3NlKGNiKXtcbiAgICAgICAgdGhpcy5zZXJ2ZXIuY2xvc2UoY2IpO1xuICAgIH1cblxuICAgIHRvRnJhbWV3b3JrU2VydmVyKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlcjtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG93ZXJzdG9uZVNlcnZlclxuIl19