'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Pool = require('../net/Pool');

var _Pool2 = _interopRequireDefault(_Pool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    this.connections = _Pool2.default;
    this.filters = {};
};

exports.default = Context;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQ29udGV4dC5qcyJdLCJuYW1lcyI6WyJDb250ZXh0IiwibWlkZGxld2FyZSIsImNvbm5lY3RvcnMiLCJjb250cm9sbGVycyIsIm91dHB1dEZpbHRlcnMiLCJjb25uZWN0aW9ucyIsImZpbHRlcnMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7OztBQUVBOzs7OztJQUtNQSxPLEdBRUYsbUJBQWM7QUFBQTs7QUFFVixTQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsU0FBS0MsV0FBTDtBQUNBLFNBQUtDLE9BQUwsR0FBZSxFQUFmO0FBRUgsQzs7a0JBSVVOLE8iLCJmaWxlIjoiQ29udGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb29sIGZyb20gJy4uL25ldC9Qb29sJztcblxuLyoqXG4gKiBDb250ZXh0IHJlcHJlc2VudHMgdGhlIEFwcGxpY2F0aW9uIGNvbnRleHQsIGllIGFsbCB0aGUgdmFyaW91c1xuICogbW9kdWxlcyBhdXRvbG9hZGVkLlxuICogQGFic3RyYWN0XG4gKi9cbmNsYXNzIENvbnRleHQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5taWRkbGV3YXJlID0ge307XG4gICAgICAgIHRoaXMuY29ubmVjdG9ycyA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJzID0ge307XG4gICAgICAgIHRoaXMub3V0cHV0RmlsdGVycyA9IHt9O1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zID0gUG9vbDtcbiAgICAgICAgdGhpcy5maWx0ZXJzID0ge307XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGV4dFxuIl19