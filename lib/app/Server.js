"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Server provides a normalized interface for interacting with
 * a framework's server implementation (express, restify).
 * @interface
 */
var Server = function () {
  function Server() {
    _classCallCheck(this, Server);
  }

  _createClass(Server, [{
    key: "on",


    /**
     * on binds a handler to a specific server event.
     * @param {String} event
     * @param {Function} handler
     */
    value: function on(event, handler) {}

    /***
     * open starts listening for connections
     * @param {Number} port
     * @param {String} [host]
     * @param {Function} [cb]
     */

  }, {
    key: "listen",
    value: function listen(port, host, cb) {}

    /**
     * close calls the close method on the server
     * @param {Function} cb
     */

  }, {
    key: "close",
    value: function close(cb) {}
  }]);

  return Server;
}();

exports.default = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvU2VydmVyLmpzIl0sIm5hbWVzIjpbIlNlcnZlciIsImV2ZW50IiwiaGFuZGxlciIsInBvcnQiLCJob3N0IiwiY2IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7SUFLTUEsTTs7Ozs7Ozs7O0FBRUY7Ozs7O3VCQUtHQyxLLEVBQU9DLE8sRUFBUSxDQUFFOztBQUVwQjs7Ozs7Ozs7OzJCQU1PQyxJLEVBQU1DLEksRUFBTUMsRSxFQUFHLENBQUU7O0FBRXhCOzs7Ozs7OzBCQUlNQSxFLEVBQUcsQ0FBRTs7Ozs7O2tCQUlBTCxNIiwiZmlsZSI6IlNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU2VydmVyIHByb3ZpZGVzIGEgbm9ybWFsaXplZCBpbnRlcmZhY2UgZm9yIGludGVyYWN0aW5nIHdpdGhcbiAqIGEgZnJhbWV3b3JrJ3Mgc2VydmVyIGltcGxlbWVudGF0aW9uIChleHByZXNzLCByZXN0aWZ5KS5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgU2VydmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uIGJpbmRzIGEgaGFuZGxlciB0byBhIHNwZWNpZmljIHNlcnZlciBldmVudC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gICAgICovXG4gICAgb24oZXZlbnQsIGhhbmRsZXIpe31cblxuICAgIC8qKipcbiAgICAgKiBvcGVuIHN0YXJ0cyBsaXN0ZW5pbmcgZm9yIGNvbm5lY3Rpb25zXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHBvcnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2hvc3RdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuICAgICAqL1xuICAgIGxpc3Rlbihwb3J0LCBob3N0LCBjYil7fVxuXG4gICAgLyoqXG4gICAgICogY2xvc2UgY2FsbHMgdGhlIGNsb3NlIG1ldGhvZCBvbiB0aGUgc2VydmVyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICAgKi9cbiAgICBjbG9zZShjYil7fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZlclxuIl19