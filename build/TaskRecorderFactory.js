'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _tasks = require('./tasks');

var _tasks2 = _interopRequireDefault(_tasks);

/**
 * TaskRecorderFactory
 */

var TaskRecorderFactory = (function () {
    function TaskRecorderFactory() {
        _classCallCheck(this, TaskRecorderFactory);
    }

    _createClass(TaskRecorderFactory, [{
        key: 'create',
        value: function create() {
            return new _tasks2['default'].ConsoleRecorder();
        }
    }]);

    return TaskRecorderFactory;
})();

exports['default'] = new TaskRecorderFactory();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UYXNrUmVjb3JkZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztxQkFBa0IsU0FBUzs7Ozs7Ozs7SUFLckIsbUJBQW1CO2FBQW5CLG1CQUFtQjs4QkFBbkIsbUJBQW1COzs7aUJBQW5CLG1CQUFtQjs7ZUFFZixrQkFBRztBQUNMLG1CQUFPLElBQUksbUJBQU0sZUFBZSxFQUFFLENBQUM7U0FDdEM7OztXQUpDLG1CQUFtQjs7O3FCQU9WLElBQUksbUJBQW1CLEVBQUUiLCJmaWxlIjoiVGFza1JlY29yZGVyRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcblxuLyoqXG4gKiBUYXNrUmVjb3JkZXJGYWN0b3J5XG4gKi9cbmNsYXNzIFRhc2tSZWNvcmRlckZhY3Rvcnkge1xuXG4gICAgY3JlYXRlKCkge1xuICAgICAgICByZXR1cm4gbmV3IHRhc2tzLkNvbnNvbGVSZWNvcmRlcigpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFRhc2tSZWNvcmRlckZhY3RvcnkoKTsiXX0=