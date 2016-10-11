"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * AlternativeResource
 */
var AlternativeResource = function () {
    function AlternativeResource(left, right) {
        _classCallCheck(this, AlternativeResource);

        this._left = left;
        this._right = right;
    }

    _createClass(AlternativeResource, [{
        key: "find",
        value: function find(path) {

            var result = this._left.find(path);

            if (result === null || result === undefined) return this._right.find(path);

            return result;
        }
    }, {
        key: "or",
        value: function or(r) {

            return new AlternativeResource(this, r);
        }
    }]);

    return AlternativeResource;
}();

exports.default = AlternativeResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcmVzb3VyY2UvQWx0ZXJuYXRpdmVSZXNvdXJjZS5qcyJdLCJuYW1lcyI6WyJBbHRlcm5hdGl2ZVJlc291cmNlIiwibGVmdCIsInJpZ2h0IiwiX2xlZnQiLCJfcmlnaHQiLCJwYXRoIiwicmVzdWx0IiwiZmluZCIsInVuZGVmaW5lZCIsInIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7O0lBR01BLG1CO0FBRUYsaUNBQVlDLElBQVosRUFBa0JDLEtBQWxCLEVBQXlCO0FBQUE7O0FBRXJCLGFBQUtDLEtBQUwsR0FBYUYsSUFBYjtBQUNBLGFBQUtHLE1BQUwsR0FBY0YsS0FBZDtBQUVIOzs7OzZCQUVJRyxJLEVBQU07O0FBRVAsZ0JBQUlDLFNBQVMsS0FBS0gsS0FBTCxDQUFXSSxJQUFYLENBQWdCRixJQUFoQixDQUFiOztBQUVBLGdCQUFLQyxXQUFXLElBQVosSUFBc0JBLFdBQVdFLFNBQXJDLEVBQ0ksT0FBTyxLQUFLSixNQUFMLENBQVlHLElBQVosQ0FBaUJGLElBQWpCLENBQVA7O0FBRUosbUJBQU9DLE1BQVA7QUFFSDs7OzJCQUVFRyxDLEVBQUc7O0FBRUYsbUJBQU8sSUFBSVQsbUJBQUosQ0FBd0IsSUFBeEIsRUFBOEJTLENBQTlCLENBQVA7QUFFSDs7Ozs7O2tCQUlVVCxtQiIsImZpbGUiOiJBbHRlcm5hdGl2ZVJlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBbHRlcm5hdGl2ZVJlc291cmNlXG4gKi9cbmNsYXNzIEFsdGVybmF0aXZlUmVzb3VyY2Uge1xuXG4gICAgY29uc3RydWN0b3IobGVmdCwgcmlnaHQpIHtcblxuICAgICAgICB0aGlzLl9sZWZ0ID0gbGVmdDtcbiAgICAgICAgdGhpcy5fcmlnaHQgPSByaWdodDtcblxuICAgIH1cblxuICAgIGZpbmQocGF0aCkge1xuXG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9sZWZ0LmZpbmQocGF0aCk7XG5cbiAgICAgICAgaWYgKChyZXN1bHQgPT09IG51bGwpIHx8IChyZXN1bHQgPT09IHVuZGVmaW5lZCkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmlnaHQuZmluZChwYXRoKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgfVxuXG4gICAgb3Iocikge1xuXG4gICAgICAgIHJldHVybiBuZXcgQWx0ZXJuYXRpdmVSZXNvdXJjZSh0aGlzLCByKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBbHRlcm5hdGl2ZVJlc291cmNlXG4iXX0=