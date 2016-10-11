'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * PowerstoneServer wraps around the frameworks server to provide
 * a simplified api.
 * @implements Server
 */
var PowerstoneServer = function () {

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
        key: 'toFramework',
        value: function toFramework() {
            return this.server;
        }
    }]);

    return PowerstoneServer;
}();

exports.default = PowerstoneServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vUG93ZXJzdG9uZVNlcnZlci5qcyJdLCJuYW1lcyI6WyJQb3dlcnN0b25lU2VydmVyIiwic2VydmVyIiwiZXZlbnQiLCJmbiIsIm9uIiwicG9ydCIsImhvc3QiLCJjYiIsImxpc3RlbiIsImNsb3NlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztBQUVBOzs7OztJQUtNQSxnQjs7QUFFRjs7O0FBR0EsOEJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDaEIsYUFBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7Ozs7MkJBRUVDLEssRUFBT0MsRSxFQUFJO0FBQ1YsaUJBQUtGLE1BQUwsQ0FBWUcsRUFBWixDQUFlRixLQUFmLEVBQXNCQyxFQUF0QjtBQUNBLG1CQUFPLElBQVA7QUFDSDs7OytCQUVNRSxJLEVBQU1DLEksRUFBTUMsRSxFQUFJO0FBQ25CLG1CQUFPLEtBQUtOLE1BQUwsQ0FBWU8sTUFBWixDQUFtQkgsSUFBbkIsRUFBeUJDLElBQXpCLEVBQStCQyxFQUEvQixDQUFQO0FBQ0g7Ozs4QkFFS0EsRSxFQUFHO0FBQ0wsaUJBQUtOLE1BQUwsQ0FBWVEsS0FBWixDQUFrQkYsRUFBbEI7QUFDSDs7O3NDQUVZO0FBQ1QsbUJBQU8sS0FBS04sTUFBWjtBQUNIOzs7Ozs7a0JBSVVELGdCIiwiZmlsZSI6IlBvd2Vyc3RvbmVTZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcblxuLyoqXG4gKiBQb3dlcnN0b25lU2VydmVyIHdyYXBzIGFyb3VuZCB0aGUgZnJhbWV3b3JrcyBzZXJ2ZXIgdG8gcHJvdmlkZVxuICogYSBzaW1wbGlmaWVkIGFwaS5cbiAqIEBpbXBsZW1lbnRzIFNlcnZlclxuICovXG5jbGFzcyBQb3dlcnN0b25lU2VydmVyIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aHR0cC5TZXJ2ZXJ8aHR0cHMuU2VydmVyfSBzZXJ2ZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gICAgfVxuXG4gICAgb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIHRoaXMuc2VydmVyLm9uKGV2ZW50LCBmbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxpc3Rlbihwb3J0LCBob3N0LCBjYikge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIubGlzdGVuKHBvcnQsIGhvc3QsIGNiKTtcbiAgICB9XG5cbiAgICBjbG9zZShjYil7XG4gICAgICAgIHRoaXMuc2VydmVyLmNsb3NlKGNiKTtcbiAgICB9XG5cbiAgICB0b0ZyYW1ld29yaygpe1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXI7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvd2Vyc3RvbmVTZXJ2ZXJcbiJdfQ==