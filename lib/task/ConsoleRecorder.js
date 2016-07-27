/**
 * ConsoleRecorder logs the result of a completed tasks to console.
 * @implements Recorder
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ConsoleRecorder = (function () {
    function ConsoleRecorder() {
        _classCallCheck(this, ConsoleRecorder);
    }

    _createClass(ConsoleRecorder, [{
        key: 'taskCompleted',
        value: function taskCompleted(report) {
            console.log('\n\n', report, '\n\n');
        }
    }]);

    return ConsoleRecorder;
})();

exports['default'] = ConsoleRecorder;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL0NvbnNvbGVSZWNvcmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUlNLGVBQWU7YUFBZixlQUFlOzhCQUFmLGVBQWU7OztpQkFBZixlQUFlOztlQUVKLHVCQUFDLE1BQU0sRUFBRTtBQUNsQixtQkFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JDOzs7V0FKQyxlQUFlOzs7cUJBUU4sZUFBZSIsImZpbGUiOiJDb25zb2xlUmVjb3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbnNvbGVSZWNvcmRlciBsb2dzIHRoZSByZXN1bHQgb2YgYSBjb21wbGV0ZWQgdGFza3MgdG8gY29uc29sZS5cbiAqIEBpbXBsZW1lbnRzIFJlY29yZGVyXG4gKi9cbmNsYXNzIENvbnNvbGVSZWNvcmRlciB7XG5cbiAgICB0YXNrQ29tcGxldGVkKHJlcG9ydCkge1xuICAgICAgICBjb25zb2xlLmxvZygnXFxuXFxuJyxyZXBvcnQsJ1xcblxcbicpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb25zb2xlUmVjb3JkZXJcbiJdfQ==