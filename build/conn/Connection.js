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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uL0Nvbm5lY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFJTSxVQUFVO1dBQVYsVUFBVTswQkFBVixVQUFVOzs7ZUFBVixVQUFVOzs7Ozs7O1dBTVIsZ0JBQUUsRUFBRTs7Ozs7Ozs7V0FNSCxpQkFBRSxFQUFFOzs7V0FFSCxrQkFBRSxFQUVQOzs7U0FoQkMsVUFBVTs7O3FCQW9CRCxVQUFVIiwiZmlsZSI6IkNvbm5lY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbm5lY3Rpb24gbmVlZHMgdG8gb3BlbiB0byBzb21ldGhpbmcgcmVtb3RlbHkgYXQgYXBwbGljYXRpb24gYm9vdCB0aW1lLlxuICogQGludGVyZmFjZVxuICovXG5jbGFzcyBDb25uZWN0aW9uIHtcblxuICAgIC8qKlxuICAgICAqIG9wZW4gdGhlIGNvbm5lY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIG9wZW4oKXt9XG5cbiAgICAvKipcbiAgICAgKiBjbG9zZSB0aGUgY29ubmVjdGlvblxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgY2xvc2UoKXt9XG5cbiAgICBnZXRSYXcoKXtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb25uZWN0aW9uIl19