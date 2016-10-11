"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Resource is an interface used to locate code resources dynamically.
 * @interface
 */
var Resource = function () {
  function Resource() {
    _classCallCheck(this, Resource);
  }

  _createClass(Resource, [{
    key: "find",


    /**
     * find looking up of a particular resource
     * @param {string} path A string that tells us how to find the resource
     * @returns {Resource}
     */
    value: function find(path) {}
  }]);

  return Resource;
}();

exports.default = Resource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVzb3VyY2UvUmVzb3VyY2UuanMiXSwibmFtZXMiOlsiUmVzb3VyY2UiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJTUEsUTs7Ozs7Ozs7O0FBRUY7Ozs7O3lCQUtLQyxJLEVBQU0sQ0FBRTs7Ozs7O2tCQUlGRCxRIiwiZmlsZSI6IlJlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXNvdXJjZSBpcyBhbiBpbnRlcmZhY2UgdXNlZCB0byBsb2NhdGUgY29kZSByZXNvdXJjZXMgZHluYW1pY2FsbHkuXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIFJlc291cmNlIHtcblxuICAgIC8qKlxuICAgICAqIGZpbmQgbG9va2luZyB1cCBvZiBhIHBhcnRpY3VsYXIgcmVzb3VyY2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBBIHN0cmluZyB0aGF0IHRlbGxzIHVzIGhvdyB0byBmaW5kIHRoZSByZXNvdXJjZVxuICAgICAqIEByZXR1cm5zIHtSZXNvdXJjZX1cbiAgICAgKi9cbiAgICBmaW5kKHBhdGgpIHt9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVzb3VyY2VcbiJdfQ==