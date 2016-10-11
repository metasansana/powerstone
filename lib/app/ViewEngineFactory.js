"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ViewEngineFactory is a factory interface that let's us know an object
 * is capable of creating a view engine for us.
 * @interface
 */
var ViewEngineFactory = function () {
  function ViewEngineFactory() {
    _classCallCheck(this, ViewEngineFactory);
  }

  _createClass(ViewEngineFactory, [{
    key: "create",


    /**
     * create the engine
     * @param {Module} module
     * @returns {ViewEngine}
     */
    value: function create() {}
  }]);

  return ViewEngineFactory;
}();

exports.ViewEngineFactory = ViewEngineFactory;

/**
 * ViewEngine is an interface that let's pwr render template views without
 * relying on the underlying framework.
 * @interface
 */

var ViewEngine = function () {
  function ViewEngine() {
    _classCallCheck(this, ViewEngine);
  }

  _createClass(ViewEngine, [{
    key: "render",


    /**
     * render a view
     * @param {string} view
     * @param {object} context
     * @param {Response} response
     */
    value: function render() {}
  }]);

  return ViewEngine;
}();

exports.default = ViewEngine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvVmlld0VuZ2luZUZhY3RvcnkuanMiXSwibmFtZXMiOlsiVmlld0VuZ2luZUZhY3RvcnkiLCJWaWV3RW5naW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7O0lBS01BLGlCOzs7Ozs7Ozs7QUFFRjs7Ozs7NkJBS1MsQ0FFUjs7Ozs7O1FBSTRCQSxpQixHQUFyQkEsaUI7O0FBRVI7Ozs7OztJQUtNQyxVOzs7Ozs7Ozs7QUFFRjs7Ozs7OzZCQU1TLENBRVI7Ozs7OztrQkFJVUEsVSIsImZpbGUiOiJWaWV3RW5naW5lRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVmlld0VuZ2luZUZhY3RvcnkgaXMgYSBmYWN0b3J5IGludGVyZmFjZSB0aGF0IGxldCdzIHVzIGtub3cgYW4gb2JqZWN0XG4gKiBpcyBjYXBhYmxlIG9mIGNyZWF0aW5nIGEgdmlldyBlbmdpbmUgZm9yIHVzLlxuICogQGludGVyZmFjZVxuICovXG5jbGFzcyBWaWV3RW5naW5lRmFjdG9yeSB7XG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGUgdGhlIGVuZ2luZVxuICAgICAqIEBwYXJhbSB7TW9kdWxlfSBtb2R1bGVcbiAgICAgKiBAcmV0dXJucyB7Vmlld0VuZ2luZX1cbiAgICAgKi9cbiAgICBjcmVhdGUoKSB7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IHsgICAgVmlld0VuZ2luZUZhY3RvcnkgYXMgVmlld0VuZ2luZUZhY3Rvcnl9XG5cbiAgICAvKipcbiAgICAgKiBWaWV3RW5naW5lIGlzIGFuIGludGVyZmFjZSB0aGF0IGxldCdzIHB3ciByZW5kZXIgdGVtcGxhdGUgdmlld3Mgd2l0aG91dFxuICAgICAqIHJlbHlpbmcgb24gdGhlIHVuZGVybHlpbmcgZnJhbWV3b3JrLlxuICAgICAqIEBpbnRlcmZhY2VcbiAgICAgKi9cbiAgICBjbGFzcyBWaWV3RW5naW5lIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVuZGVyIGEgdmlld1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmlld1xuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICAgICAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVuZGVyKCkge1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGV4cG9ydCBkZWZhdWx0IFZpZXdFbmdpbmVcbiJdfQ==