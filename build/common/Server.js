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
//# sourceMappingURL=Server.js.map