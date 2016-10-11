"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Context represents the Application context, ie all the various
 * modules autoloaded.
 * @abstract
 */
var Context = function Context() {
    _classCallCheck(this, Context);

    this.middleware = {};
    this.connectors = {};
    this.controllers = {};
    this.outputFilters = {};
    this.filters = {};
};

exports.default = Context;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQ29udGV4dC5qcyJdLCJuYW1lcyI6WyJDb250ZXh0IiwibWlkZGxld2FyZSIsImNvbm5lY3RvcnMiLCJjb250cm9sbGVycyIsIm91dHB1dEZpbHRlcnMiLCJmaWx0ZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7OztJQUtNQSxPLEdBRUYsbUJBQWM7QUFBQTs7QUFFVixTQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFFSCxDOztrQkFJVUwsTyIsImZpbGUiOiJDb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb250ZXh0IHJlcHJlc2VudHMgdGhlIEFwcGxpY2F0aW9uIGNvbnRleHQsIGllIGFsbCB0aGUgdmFyaW91c1xuICogbW9kdWxlcyBhdXRvbG9hZGVkLlxuICogQGFic3RyYWN0XG4gKi9cbmNsYXNzIENvbnRleHQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5taWRkbGV3YXJlID0ge307XG4gICAgICAgIHRoaXMuY29ubmVjdG9ycyA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJzID0ge307XG4gICAgICAgIHRoaXMub3V0cHV0RmlsdGVycyA9IHt9O1xuICAgICAgICB0aGlzLmZpbHRlcnMgPSB7fTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250ZXh0XG4iXX0=