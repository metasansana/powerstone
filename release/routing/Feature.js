/**
 * Feature represents a feature of powerstone's routing framework.
 * @param {Application} application 
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Feature = (function () {
  function Feature(application) {
    _classCallCheck(this, Feature);

    /**
     * @property {Application} application 
     */
    this.application = application;
  }

  /**
   * install this feature
   * @param {string} method 
   * @param {string} path 
   * @param {object} definition 
   * @param {RouteQ} q 
   */

  _createClass(Feature, [{
    key: "install",
    value: function install(method, path, definition, q) {}
  }]);

  return Feature;
})();

exports["default"] = Feature;
module.exports = exports["default"];
//# sourceMappingURL=Feature.js.map