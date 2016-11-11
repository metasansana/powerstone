"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Throws provides helper methods for throwing Errors
 * with useful infromation.
 */
var Throws = function () {
  function Throws() {
    _classCallCheck(this, Throws);
  }

  _createClass(Throws, [{
    key: "fromModule",


    /**
     * fromModule
     * @param {string} message
     * @param {Module} module
     * @param {function} [Cons]
     */
    value: function fromModule(message, module) {
      var Cons = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Error;


      throw new Cons("Error in module " + module.configuration.paths.root + ": " + message);
    }
  }]);

  return Throws;
}();

exports.default = new Throws();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL1Rocm93cy5qcyJdLCJuYW1lcyI6WyJUaHJvd3MiLCJtZXNzYWdlIiwibW9kdWxlIiwiQ29ucyIsIkVycm9yIiwiY29uZmlndXJhdGlvbiIsInBhdGhzIiwicm9vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSU1BLE07Ozs7Ozs7OztBQUVGOzs7Ozs7K0JBTVdDLE8sRUFBU0MsTSxFQUFzQjtBQUFBLFVBQWRDLElBQWMsdUVBQVBDLEtBQU87OztBQUV0QyxZQUFNLElBQUlELElBQUosc0JBQTRCRCxPQUFPRyxhQUFQLENBQXFCQyxLQUFyQixDQUEyQkMsSUFBdkQsVUFBZ0VOLE9BQWhFLENBQU47QUFFSDs7Ozs7O2tCQUlVLElBQUlELE1BQUosRSIsImZpbGUiOiJUaHJvd3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRocm93cyBwcm92aWRlcyBoZWxwZXIgbWV0aG9kcyBmb3IgdGhyb3dpbmcgRXJyb3JzXG4gKiB3aXRoIHVzZWZ1bCBpbmZyb21hdGlvbi5cbiAqL1xuY2xhc3MgVGhyb3dzIHtcblxuICAgIC8qKlxuICAgICAqIGZyb21Nb2R1bGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7TW9kdWxlfSBtb2R1bGVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbQ29uc11cbiAgICAgKi9cbiAgICBmcm9tTW9kdWxlKG1lc3NhZ2UsIG1vZHVsZSwgQ29ucyA9IEVycm9yKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IENvbnMoYEVycm9yIGluIG1vZHVsZSAke21vZHVsZS5jb25maWd1cmF0aW9uLnBhdGhzLnJvb3R9OiAke21lc3NhZ2V9YCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFRocm93cygpO1xuIl19