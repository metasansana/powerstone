
/**
 * PowerError is the parent class of all non-standard errors 
 * this framework throws
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PowerError = (function (_Error) {
  _inherits(PowerError, _Error);

  function PowerError(m) {
    _classCallCheck(this, PowerError);

    _get(Object.getPrototypeOf(PowerError.prototype), "constructor", this).call(this, m);
    this.name = this.constructor.name;
    this.message = m;
    Error.captureStackTrace(this, this.constructor);
  }

  return PowerError;
})(Error);

exports["default"] = PowerError;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vUG93ZXJFcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztJQUtNLFVBQVU7WUFBVixVQUFVOztBQUVILFdBRlAsVUFBVSxDQUVGLENBQUMsRUFBRTswQkFGWCxVQUFVOztBQUlaLCtCQUpFLFVBQVUsNkNBSU4sQ0FBQyxFQUFFO0FBQ1QsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztBQUNsQyxRQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNqQixTQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztHQUVqRDs7U0FURyxVQUFVO0dBQVMsS0FBSzs7cUJBWWYsVUFBVSIsImZpbGUiOiJQb3dlckVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIFBvd2VyRXJyb3IgaXMgdGhlIHBhcmVudCBjbGFzcyBvZiBhbGwgbm9uLXN0YW5kYXJkIGVycm9ycyBcbiAqIHRoaXMgZnJhbWV3b3JrIHRocm93c1xuICovXG5jbGFzcyBQb3dlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gIGNvbnN0cnVjdG9yKG0pIHtcblxuICAgIHN1cGVyKG0pO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtO1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuXG4gIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgUG93ZXJFcnJvclxuXG4iXX0=