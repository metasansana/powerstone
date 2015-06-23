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

    /**
     * open starts listening for connections
     */
    value: function listen() {}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TZXJ2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBS00sTUFBTTtXQUFOLE1BQU07MEJBQU4sTUFBTTs7O2VBQU4sTUFBTTs7Ozs7Ozs7V0FPTixZQUFDLEtBQUssRUFBRSxPQUFPLEVBQUMsRUFBRTs7Ozs7OztXQUtkLGtCQUFFLEVBQUU7Ozs7Ozs7O1dBTUwsZUFBQyxFQUFFLEVBQUMsRUFBRTs7Ozs7Ozs7V0FNTSw2QkFBRSxFQUFFOzs7U0F4Qm5CLE1BQU07OztxQkE0QkcsTUFBTSIsImZpbGUiOiJTZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFNlcnZlciBwcm92aWRlcyBhIG5vcm1hbGl6ZWQgaW50ZXJmYWNlIGZvciBpbnRlcmFjdGluZyB3aXRoXG4gKiBhIGZyYW1ld29yaydzIHNlcnZlciBpbXBsZW1lbnRhdGlvbiAoZXhwcmVzcywgcmVzdGlmeSkuXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIFNlcnZlciB7XG5cbiAgICAvKipcbiAgICAgKiBvbiBiaW5kcyBhIGhhbmRsZXIgdG8gYSBzcGVjaWZpYyBzZXJ2ZXIgZXZlbnQuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgICAqL1xuICAgIG9uKGV2ZW50LCBoYW5kbGVyKXt9XG5cbiAgICAvKipcbiAgICAgKiBvcGVuIHN0YXJ0cyBsaXN0ZW5pbmcgZm9yIGNvbm5lY3Rpb25zXG4gICAgICovXG4gICAgbGlzdGVuKCl7fVxuXG4gICAgLyoqXG4gICAgICogY2xvc2UgY2FsbHMgdGhlIGNsb3NlIG1ldGhvZCBvbiB0aGUgc2VydmVyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICAgKi9cbiAgICBjbG9zZShjYil7fVxuXG4gICAgLyoqXG4gICAgICogdG9GcmFtZXdvcmtTZXJ2ZXIgcmV0dXJucyB0aGUgZnJhbWV3b3JrJ3Mgc2VydmVyIGltcGxlbWVudGF0aW9uLlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICB0b0ZyYW1ld29ya1NlcnZlcigpe31cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTZXJ2ZXJcbiJdfQ==