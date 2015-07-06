/**
 * Server provides a normalized interface for interacting with
 * a framework's server implementation (express, restify).
 * @interface
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = (function () {
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
  }, {
    key: "listen",

    /***
     * open starts listening for connections
     * @param {Number} port
     * @param {String} [host]
     * @param {Function} [cb]
     */
    value: function listen(port, host, cb) {}
  }, {
    key: "close",

    /**
     * close calls the close method on the server
     * @param {Function} cb
     */
    value: function close(cb) {}
  }, {
    key: "toFrameworkServer",

    /**
     * toFrameworkServer returns the framework's server implementation.
     * @return {Object}
     */
    value: function toFrameworkServer() {}
  }]);

  return Server;
})();

exports["default"] = Server;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TZXJ2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBS00sTUFBTTtXQUFOLE1BQU07MEJBQU4sTUFBTTs7O2VBQU4sTUFBTTs7Ozs7Ozs7V0FPTixZQUFDLEtBQUssRUFBRSxPQUFPLEVBQUMsRUFBRTs7Ozs7Ozs7OztXQVFkLGdCQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLEVBQUU7Ozs7Ozs7O1dBTW5CLGVBQUMsRUFBRSxFQUFDLEVBQUU7Ozs7Ozs7O1dBTU0sNkJBQUUsRUFBRTs7O1NBM0JuQixNQUFNOzs7cUJBK0JHLE1BQU0iLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTZXJ2ZXIgcHJvdmlkZXMgYSBub3JtYWxpemVkIGludGVyZmFjZSBmb3IgaW50ZXJhY3Rpbmcgd2l0aFxuICogYSBmcmFtZXdvcmsncyBzZXJ2ZXIgaW1wbGVtZW50YXRpb24gKGV4cHJlc3MsIHJlc3RpZnkpLlxuICogQGludGVyZmFjZVxuICovXG5jbGFzcyBTZXJ2ZXIge1xuXG4gICAgLyoqXG4gICAgICogb24gYmluZHMgYSBoYW5kbGVyIHRvIGEgc3BlY2lmaWMgc2VydmVyIGV2ZW50LlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKi9cbiAgICBvbihldmVudCwgaGFuZGxlcil7fVxuXG4gICAgLyoqKlxuICAgICAqIG9wZW4gc3RhcnRzIGxpc3RlbmluZyBmb3IgY29ubmVjdGlvbnNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcG9ydFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbaG9zdF1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICovXG4gICAgbGlzdGVuKHBvcnQsIGhvc3QsIGNiKXt9XG5cbiAgICAvKipcbiAgICAgKiBjbG9zZSBjYWxscyB0aGUgY2xvc2UgbWV0aG9kIG9uIHRoZSBzZXJ2ZXJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgICAqL1xuICAgIGNsb3NlKGNiKXt9XG5cbiAgICAvKipcbiAgICAgKiB0b0ZyYW1ld29ya1NlcnZlciByZXR1cm5zIHRoZSBmcmFtZXdvcmsncyBzZXJ2ZXIgaW1wbGVtZW50YXRpb24uXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRvRnJhbWV3b3JrU2VydmVyKCl7fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZlclxuIl19