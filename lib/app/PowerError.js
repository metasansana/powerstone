"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * PowerError is the parent class of all non-standard errors 
 * this framework throws
 */
var PowerError = function (_Error) {
  _inherits(PowerError, _Error);

  function PowerError(m) {
    _classCallCheck(this, PowerError);

    var _this = _possibleConstructorReturn(this, (PowerError.__proto__ || Object.getPrototypeOf(PowerError)).call(this, m));

    _this.name = _this.constructor.name;
    _this.message = m;
    Error.captureStackTrace(_this, _this.constructor);

    return _this;
  }

  return PowerError;
}(Error);

exports.default = PowerError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvUG93ZXJFcnJvci5qcyJdLCJuYW1lcyI6WyJQb3dlckVycm9yIiwibSIsIm5hbWUiLCJjb25zdHJ1Y3RvciIsIm1lc3NhZ2UiLCJFcnJvciIsImNhcHR1cmVTdGFja1RyYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQTs7OztJQUlNQSxVOzs7QUFFSixzQkFBWUMsQ0FBWixFQUFlO0FBQUE7O0FBQUEsd0hBRVBBLENBRk87O0FBR2IsVUFBS0MsSUFBTCxHQUFZLE1BQUtDLFdBQUwsQ0FBaUJELElBQTdCO0FBQ0EsVUFBS0UsT0FBTCxHQUFlSCxDQUFmO0FBQ0FJLFVBQU1DLGlCQUFOLFFBQThCLE1BQUtILFdBQW5DOztBQUxhO0FBT2Q7OztFQVRzQkUsSzs7a0JBWVZMLFUiLCJmaWxlIjoiUG93ZXJFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiBQb3dlckVycm9yIGlzIHRoZSBwYXJlbnQgY2xhc3Mgb2YgYWxsIG5vbi1zdGFuZGFyZCBlcnJvcnMgXG4gKiB0aGlzIGZyYW1ld29yayB0aHJvd3NcbiAqL1xuY2xhc3MgUG93ZXJFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICBjb25zdHJ1Y3RvcihtKSB7XG5cbiAgICBzdXBlcihtKTtcbiAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgdGhpcy5tZXNzYWdlID0gbTtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcblxuICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IFBvd2VyRXJyb3JcblxuIl19