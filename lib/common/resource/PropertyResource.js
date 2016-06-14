/**
 * PropertyResource looks up a resource by querying an object.
 * @implements {Resource}
 * @param {object} o
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

        this._o = o;
    }

    _createClass(PropertyResource, [{
        key: "find",
        value: function find(path) {

            return this._o[path];
        }
    }]);

    return PropertyResource;
})();

exports["default"] = PropertyResource;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVzb3VyY2UvUHJvcGVydHlSZXNvdXJjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFLTSxnQkFBZ0I7QUFFUCxhQUZULGdCQUFnQixDQUVOLENBQUMsRUFBRTs4QkFGYixnQkFBZ0I7O0FBSWQsWUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FFZjs7aUJBTkMsZ0JBQWdCOztlQVFkLGNBQUMsSUFBSSxFQUFFOztBQUVQLG1CQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7U0FFeEI7OztXQVpDLGdCQUFnQjs7O3FCQWVQLGdCQUFnQiIsImZpbGUiOiJQcm9wZXJ0eVJlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQcm9wZXJ0eVJlc291cmNlIGxvb2tzIHVwIGEgcmVzb3VyY2UgYnkgcXVlcnlpbmcgYW4gb2JqZWN0LlxuICogQGltcGxlbWVudHMge1Jlc291cmNlfVxuICogQHBhcmFtIHtvYmplY3R9IG9cbiAqL1xuY2xhc3MgUHJvcGVydHlSZXNvdXJjZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihvKSB7XG5cbiAgICAgICAgdGhpcy5fbyA9IG87XG5cbiAgICB9XG5cbiAgICBmaW5kKHBhdGgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb1twYXRoXTtcblxuICAgIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgUHJvcGVydHlSZXNvdXJjZVxuIl19