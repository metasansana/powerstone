/**
 * ResourceLookup is an interface used to locate code resources.
 * @interface
 *
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResourceLookup = (function () {
  function ResourceLookup() {
    _classCallCheck(this, ResourceLookup);
  }

  _createClass(ResourceLookup, [{
    key: "lookup",

    /**
     * lookup looking up of a particular resource
     * @param {string} path A string that tells us how to find the resource
     * @returns {Resource}
     */
    value: function lookup(path) {}
  }]);

  return ResourceLookup;
})();

exports["default"] = ResourceLookup;
module.exports = exports["default"];
//# sourceMappingURL=ResourceLookup.js.map