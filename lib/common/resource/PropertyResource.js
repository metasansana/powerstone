/**
 * PropertyResource looks up a resource by querying an object.
 * @implements {Resource}
 * @param {object} o
 *
 * @property {object} context
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PropertyResource = (function () {
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
})();

exports["default"] = PropertyResource;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVzb3VyY2UvUHJvcGVydHlSZXNvdXJjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztJQU9NLGdCQUFnQjtBQUVQLGFBRlQsZ0JBQWdCLENBRU4sQ0FBQyxFQUFFOzhCQUZiLGdCQUFnQjs7QUFJZCxZQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztLQUVwQjs7aUJBTkMsZ0JBQWdCOztlQVFkLGNBQUMsSUFBSSxFQUFFOztBQUVQLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FFN0I7OztXQVpDLGdCQUFnQjs7O3FCQWVQLGdCQUFnQiIsImZpbGUiOiJQcm9wZXJ0eVJlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQcm9wZXJ0eVJlc291cmNlIGxvb2tzIHVwIGEgcmVzb3VyY2UgYnkgcXVlcnlpbmcgYW4gb2JqZWN0LlxuICogQGltcGxlbWVudHMge1Jlc291cmNlfVxuICogQHBhcmFtIHtvYmplY3R9IG9cbiAqXG4gKiBAcHJvcGVydHkge29iamVjdH0gY29udGV4dFxuICovXG5jbGFzcyBQcm9wZXJ0eVJlc291cmNlIHtcblxuICAgIGNvbnN0cnVjdG9yKG8pIHtcblxuICAgICAgICB0aGlzLmNvbnRleHQgPSBvO1xuXG4gICAgfVxuXG4gICAgZmluZChwYXRoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dFtwYXRoXTtcblxuICAgIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgUHJvcGVydHlSZXNvdXJjZVxuIl19