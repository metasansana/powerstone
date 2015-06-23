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
 * WrappedServer wraps around the frameworks server to provide
 * a simplified api.
 * @implements Server
 */

var WrappedServer = (function () {

    /**
     * @param {http.Server} server
     * @param {Number} port
     * @param {String} host
     */

    function WrappedServer(server, port, host) {
        _classCallCheck(this, WrappedServer);

        this.server = server;
        this.port = port;
        this.host = host;
    }

    _createClass(WrappedServer, [{
        key: 'on',
        value: function on(event, fn) {
            this.server.on(event, fn);
            return this;
        }
    }, {
        key: 'listen',
        value: function listen() {
            return this.server.listen(this.port, this.host);
        }
    }, {
        key: 'close',
        value: function close() {
            this.server.close();
        }
    }, {
        key: 'toServer',
        value: function toServer() {
            return this.server;
        }
    }]);

    return WrappedServer;
})();

exports['default'] = WrappedServer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9XcmFwcGVkU2VydmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt1QkFBb0IsU0FBUzs7Ozs2QkFDSCxrQkFBa0I7Ozs7Ozs7Ozs7SUFPdEMsYUFBYTs7Ozs7Ozs7QUFPSixhQVBULGFBQWEsQ0FPSCxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTs4QkFQOUIsYUFBYTs7QUFRWCxZQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztLQUNwQjs7aUJBWEMsYUFBYTs7ZUFhYixZQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7QUFDVixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFCLG1CQUFPLElBQUksQ0FBQztTQUNmOzs7ZUFFSyxrQkFBRztBQUNMLG1CQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25EOzs7ZUFFSSxpQkFBRTtBQUNILGdCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZCOzs7ZUFFTyxvQkFBRTtBQUNOLG1CQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7OztXQTVCQyxhQUFhOzs7cUJBZ0NKLGFBQWEiLCJmaWxlIjoiV3JhcHBlZFNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IFNlcnZlckZhY3RvcnkgZnJvbSAnLi4vU2VydmVyRmFjdG9yeSc7XG5cbi8qKlxuICogV3JhcHBlZFNlcnZlciB3cmFwcyBhcm91bmQgdGhlIGZyYW1ld29ya3Mgc2VydmVyIHRvIHByb3ZpZGVcbiAqIGEgc2ltcGxpZmllZCBhcGkuXG4gKiBAaW1wbGVtZW50cyBTZXJ2ZXJcbiAqL1xuY2xhc3MgV3JhcHBlZFNlcnZlciB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2h0dHAuU2VydmVyfSBzZXJ2ZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcG9ydFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBob3N0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc2VydmVyLCBwb3J0LCBob3N0KSB7XG4gICAgICAgIHRoaXMuc2VydmVyID0gc2VydmVyO1xuICAgICAgICB0aGlzLnBvcnQgPSBwb3J0O1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgIH1cblxuICAgIG9uKGV2ZW50LCBmbikge1xuICAgICAgICB0aGlzLnNlcnZlci5vbihldmVudCwgZm4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBsaXN0ZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlci5saXN0ZW4odGhpcy5wb3J0LCB0aGlzLmhvc3QpO1xuICAgIH1cblxuICAgIGNsb3NlKCl7XG4gICAgICAgIHRoaXMuc2VydmVyLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgdG9TZXJ2ZXIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXcmFwcGVkU2VydmVyXG4iXX0=