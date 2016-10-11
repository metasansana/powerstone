"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * StringResource 
 * @implements {Resource}
 */
var StringResource = function () {
  function StringResource() {
    _classCallCheck(this, StringResource);
  }

  _createClass(StringResource, [{
    key: "find",
    value: function find(path) {

      return path;
    }
  }]);

  return StringResource;
}();

exports.default = StringResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVzb3VyY2UvU3RyaW5nUmVzb3VyY2UuanMiXSwibmFtZXMiOlsiU3RyaW5nUmVzb3VyY2UiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7Ozs7SUFJTUEsYzs7Ozs7Ozt5QkFFQ0MsSSxFQUFNOztBQUVULGFBQU9BLElBQVA7QUFFRDs7Ozs7O2tCQUlZRCxjIiwiZmlsZSI6IlN0cmluZ1Jlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIFN0cmluZ1Jlc291cmNlIFxuICogQGltcGxlbWVudHMge1Jlc291cmNlfVxuICovXG5jbGFzcyBTdHJpbmdSZXNvdXJjZSB7XG5cbiAgZmluZChwYXRoKSB7XG5cbiAgICByZXR1cm4gcGF0aDtcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RyaW5nUmVzb3VyY2VcblxuIl19