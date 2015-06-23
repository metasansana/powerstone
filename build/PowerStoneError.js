'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var hasCaptureStackTrace = ('captureStackTrace' in Error);

/**
 * PowerStoneError
 */

var PowerStoneError = (function (_Error) {
    function PowerStoneError() {
        _classCallCheck(this, PowerStoneError);

        if (_Error != null) {
            _Error.apply(this, arguments);
        }
    }

    _inherits(PowerStoneError, _Error);

    return PowerStoneError;
})(Error);

PowerStoneError.setup = function (message) {
    var name = this.constructor.name;

    if (hasCaptureStackTrace) Error.captureStackTrace(this, this.constructor);else Object.defineProperty(this, 'stack', {
        value: new Error().stack
    });

    Object.defineProperties(this, {
        name: { value: name },
        message: { value: message }
    });
};

exports['default'] = PowerStoneError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Qb3dlclN0b25lRXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU0sb0JBQW9CLElBQUcsbUJBQW1CLElBQUksS0FBSyxDQUFBLENBQUM7Ozs7OztJQUtwRCxlQUFlO2FBQWYsZUFBZTs4QkFBZixlQUFlOzs7Ozs7O2NBQWYsZUFBZTs7V0FBZixlQUFlO0dBQVMsS0FBSzs7QUFJbkMsZUFBZSxDQUFDLEtBQUssR0FBRyxVQUFVLE9BQU8sRUFBRTtRQUMvQixJQUFJLEdBQUssSUFBSSxDQUFDLFdBQVcsQ0FBekIsSUFBSTs7QUFFWixRQUFJLG9CQUFvQixFQUNwQixLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUVoRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDakMsYUFBSyxFQUFFLElBQUksS0FBSyxFQUFFLENBQUMsS0FBSztLQUMzQixDQUFDLENBQUM7O0FBRVAsVUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRTtBQUMxQixZQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO0FBQ3JCLGVBQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7S0FDOUIsQ0FBQyxDQUFBO0NBQ0wsQ0FBQzs7cUJBRWEsZUFBZSIsImZpbGUiOiJQb3dlclN0b25lRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBoYXNDYXB0dXJlU3RhY2tUcmFjZSA9ICdjYXB0dXJlU3RhY2tUcmFjZScgaW4gRXJyb3I7XG5cbi8qKlxuICogUG93ZXJTdG9uZUVycm9yXG4gKi9cbmNsYXNzIFBvd2VyU3RvbmVFcnJvciBleHRlbmRzIEVycm9yIHtcblxufVxuXG5Qb3dlclN0b25lRXJyb3Iuc2V0dXAgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIGlmIChoYXNDYXB0dXJlU3RhY2tUcmFjZSlcbiAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgZWxzZVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3N0YWNrJywge1xuICAgICAgICAgICAgdmFsdWU6IG5ldyBFcnJvcigpLnN0YWNrXG4gICAgICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgICBuYW1lOiB7IHZhbHVlOiBuYW1lIH0sXG4gICAgICAgIG1lc3NhZ2U6IHsgdmFsdWU6IG1lc3NhZ2UgfVxuICAgIH0pXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQb3dlclN0b25lRXJyb3JcbiJdfQ==