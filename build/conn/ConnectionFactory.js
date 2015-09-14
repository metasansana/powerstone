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