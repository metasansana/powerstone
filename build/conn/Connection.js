/**
 * Connection needs to open to something remotely at application boot time.
 * @interface
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Connection = (function () {
  function Connection() {
    _classCallCheck(this, Connection);
  }

  _createClass(Connection, [{
    key: "open",

    /**
     * open the connection
     * @return {Promise}
     */
    value: function open() {}
  }, {
    key: "close",

    /**
     * close the connection
     * @return {Promise}
     */
    value: function close() {}
  }, {
    key: "getRaw",
    value: function getRaw() {}
  }]);

  return Connection;
})();

exports["default"] = Connection;
module.exports = exports["default"];
//# sourceMappingURL=Connection.js.map