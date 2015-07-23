/**
 * ConnectionFactory provides an api for creating Connection objects.
 * @interface
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionFactory = (function () {
  function ConnectionFactory() {
    _classCallCheck(this, ConnectionFactory);
  }

  _createClass(ConnectionFactory, [{
    key: "create",

    /**
     * create is called to create a new Connection implementation.
     * @param {String} name
     * @param {String} type
     * @param {Object}options
     * @return {AbstractConnection}
     */
    value: function create(name, type, options) {}
  }]);

  return ConnectionFactory;
})();

exports["default"] = ConnectionFactory;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uL0Nvbm5lY3Rpb25GYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBSU0saUJBQWlCO1dBQWpCLGlCQUFpQjswQkFBakIsaUJBQWlCOzs7ZUFBakIsaUJBQWlCOzs7Ozs7Ozs7O1dBU2IsZ0JBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFFM0I7OztTQVhDLGlCQUFpQjs7O3FCQWVSLGlCQUFpQiIsImZpbGUiOiJDb25uZWN0aW9uRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29ubmVjdGlvbkZhY3RvcnkgcHJvdmlkZXMgYW4gYXBpIGZvciBjcmVhdGluZyBDb25uZWN0aW9uIG9iamVjdHMuXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIENvbm5lY3Rpb25GYWN0b3J5IHtcblxuICAgIC8qKlxuICAgICAqIGNyZWF0ZSBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgbmV3IENvbm5lY3Rpb24gaW1wbGVtZW50YXRpb24uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fW9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtBYnN0cmFjdENvbm5lY3Rpb259XG4gICAgICovXG4gICAgY3JlYXRlKG5hbWUsIHR5cGUsIG9wdGlvbnMpIHtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb25uZWN0aW9uRmFjdG9yeSJdfQ==