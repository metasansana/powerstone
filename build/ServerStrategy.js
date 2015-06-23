/**
 * ServerStrategy provides an interface for interacting with
 * a framework's server implementation (express, restify).
 * @interface
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServerStrategy = (function () {
  function ServerStrategy() {
    _classCallCheck(this, ServerStrategy);
  }

  _createClass(ServerStrategy, [{
    key: "initialize",

    /**
     * initialize the server
     *
     * Any setup code that needs to be run to create the server should
     * happen here.
     */
    value: function initialize() {}
  }, {
    key: "on",

    /**
     * on binds a handler to a specific server event.
     * @param {String} event
     * @param {Function} handler
     */
    value: function on(event, handler) {}
  }, {
    key: "open",

    /**
     * open starts listening for connections
     */
    value: function open() {}
  }]);

  return ServerStrategy;
})();

exports["default"] = ServerStrategy;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TZXJ2ZXJTdHJhdGVneS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFLTSxjQUFjO1dBQWQsY0FBYzswQkFBZCxjQUFjOzs7ZUFBZCxjQUFjOzs7Ozs7Ozs7V0FRTixzQkFBRSxFQUFFOzs7Ozs7Ozs7V0FPWixZQUFDLEtBQUssRUFBRSxPQUFPLEVBQUMsRUFBRTs7Ozs7OztXQUtoQixnQkFBRSxFQUFFOzs7U0FwQk4sY0FBYzs7O3FCQXdCTCxjQUFjIiwiZmlsZSI6IlNlcnZlclN0cmF0ZWd5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTZXJ2ZXJTdHJhdGVneSBwcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIGludGVyYWN0aW5nIHdpdGhcbiAqIGEgZnJhbWV3b3JrJ3Mgc2VydmVyIGltcGxlbWVudGF0aW9uIChleHByZXNzLCByZXN0aWZ5KS5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgU2VydmVyU3RyYXRlZ3kge1xuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSB0aGUgc2VydmVyXG4gICAgICpcbiAgICAgKiBBbnkgc2V0dXAgY29kZSB0aGF0IG5lZWRzIHRvIGJlIHJ1biB0byBjcmVhdGUgdGhlIHNlcnZlciBzaG91bGRcbiAgICAgKiBoYXBwZW4gaGVyZS5cbiAgICAgKi9cbiAgICBpbml0aWFsaXplKCl7fVxuXG4gICAgLyoqXG4gICAgICogb24gYmluZHMgYSBoYW5kbGVyIHRvIGEgc3BlY2lmaWMgc2VydmVyIGV2ZW50LlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKi9cbiAgICBvbihldmVudCwgaGFuZGxlcil7fVxuXG4gICAgLyoqXG4gICAgICogb3BlbiBzdGFydHMgbGlzdGVuaW5nIGZvciBjb25uZWN0aW9uc1xuICAgICAqL1xuICAgIG9wZW4oKXt9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VydmVyU3RyYXRlZ3k7XG4iXX0=