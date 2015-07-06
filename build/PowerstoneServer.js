'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ServerFactory = require('./ServerFactory');

var _ServerFactory2 = _interopRequireDefault(_ServerFactory);

/**
 * PowerstoneServer wraps around the frameworks server to provide
 * a simplified api.
 * @implements Server
 */

var PowerstoneServer = (function () {

    /**
     * @param {http.Server|https.Server} server
     */

    function PowerstoneServer(server) {
        _classCallCheck(this, PowerstoneServer);

        this.server = server;
    }

    _createClass(PowerstoneServer, [{
        key: 'on',
        value: function on(event, fn) {
            this.server.on(event, fn);
            return this;
        }
    }, {
        key: 'listen',
        value: function listen(port, host, cb) {
            return this.server.listen(port, host, cb);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Qb3dlcnN0b25lU2VydmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt1QkFBb0IsU0FBUzs7Ozs2QkFDSCxpQkFBaUI7Ozs7Ozs7Ozs7SUFPckMsZ0JBQWdCOzs7Ozs7QUFLUCxhQUxULGdCQUFnQixDQUtOLE1BQU0sRUFBRTs4QkFMbEIsZ0JBQWdCOztBQU1kLFlBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3hCOztpQkFQQyxnQkFBZ0I7O2VBU2hCLFlBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRTtBQUNWLGdCQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUIsbUJBQU8sSUFBSSxDQUFDO1NBQ2Y7OztlQUVLLGdCQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO0FBQ25CLG1CQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDN0M7OztlQUVJLGVBQUMsRUFBRSxFQUFDO0FBQ0wsZ0JBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pCOzs7ZUFFZ0IsNkJBQUU7QUFDZixtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCOzs7V0F4QkMsZ0JBQWdCOzs7cUJBNEJQLGdCQUFnQiIsImZpbGUiOiJQb3dlcnN0b25lU2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgU2VydmVyRmFjdG9yeSBmcm9tICcuL1NlcnZlckZhY3RvcnknO1xuXG4vKipcbiAqIFBvd2Vyc3RvbmVTZXJ2ZXIgd3JhcHMgYXJvdW5kIHRoZSBmcmFtZXdvcmtzIHNlcnZlciB0byBwcm92aWRlXG4gKiBhIHNpbXBsaWZpZWQgYXBpLlxuICogQGltcGxlbWVudHMgU2VydmVyXG4gKi9cbmNsYXNzIFBvd2Vyc3RvbmVTZXJ2ZXIge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtodHRwLlNlcnZlcnxodHRwcy5TZXJ2ZXJ9IHNlcnZlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNlcnZlcikge1xuICAgICAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcbiAgICB9XG5cbiAgICBvbihldmVudCwgZm4pIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIub24oZXZlbnQsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGlzdGVuKHBvcnQsIGhvc3QsIGNiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlci5saXN0ZW4ocG9ydCwgaG9zdCwgY2IpO1xuICAgIH1cblxuICAgIGNsb3NlKGNiKXtcbiAgICAgICAgdGhpcy5zZXJ2ZXIuY2xvc2UoY2IpO1xuICAgIH1cblxuICAgIHRvRnJhbWV3b3JrU2VydmVyKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlcjtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG93ZXJzdG9uZVNlcnZlclxuIl19