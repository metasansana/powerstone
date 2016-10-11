"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * PropertyResource looks up a resource by querying an object.
 * @implements {Resource}
 * @param {object} o
 *
 * @property {object} context
 */
var PropertyResource = function () {
    function PropertyResource(o) {
        _classCallCheck(this, PropertyResource);

        this.context = o;
    }

    _createClass(PropertyResource, [{
        key: "find",
        value: function find(path) {

            return this.context[path];
        }
    }]);

    return PropertyResource;
}();

exports.default = PropertyResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVzb3VyY2UvUHJvcGVydHlSZXNvdXJjZS5qcyJdLCJuYW1lcyI6WyJQcm9wZXJ0eVJlc291cmNlIiwibyIsImNvbnRleHQiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7SUFPTUEsZ0I7QUFFRiw4QkFBWUMsQ0FBWixFQUFlO0FBQUE7O0FBRVgsYUFBS0MsT0FBTCxHQUFlRCxDQUFmO0FBRUg7Ozs7NkJBRUlFLEksRUFBTTs7QUFFUCxtQkFBTyxLQUFLRCxPQUFMLENBQWFDLElBQWIsQ0FBUDtBQUVIOzs7Ozs7a0JBR1VILGdCIiwiZmlsZSI6IlByb3BlcnR5UmVzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFByb3BlcnR5UmVzb3VyY2UgbG9va3MgdXAgYSByZXNvdXJjZSBieSBxdWVyeWluZyBhbiBvYmplY3QuXG4gKiBAaW1wbGVtZW50cyB7UmVzb3VyY2V9XG4gKiBAcGFyYW0ge29iamVjdH0gb1xuICpcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBjb250ZXh0XG4gKi9cbmNsYXNzIFByb3BlcnR5UmVzb3VyY2Uge1xuXG4gICAgY29uc3RydWN0b3Iobykge1xuXG4gICAgICAgIHRoaXMuY29udGV4dCA9IG87XG5cbiAgICB9XG5cbiAgICBmaW5kKHBhdGgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0W3BhdGhdO1xuXG4gICAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBQcm9wZXJ0eVJlc291cmNlXG4iXX0=