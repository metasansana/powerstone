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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9Db25zb2xlUmVjb3JkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFJTSxlQUFlO2FBQWYsZUFBZTs4QkFBZixlQUFlOzs7aUJBQWYsZUFBZTs7ZUFFSix1QkFBQyxNQUFNLEVBQUU7QUFDbEIsbUJBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsQ0FBQztTQUNyQzs7O1dBSkMsZUFBZTs7O3FCQVFOLGVBQWUiLCJmaWxlIjoiQ29uc29sZVJlY29yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb25zb2xlUmVjb3JkZXIgbG9ncyB0aGUgcmVzdWx0IG9mIGEgY29tcGxldGVkIHRhc2tzIHRvIGNvbnNvbGUuXG4gKiBAaW1wbGVtZW50cyBSZWNvcmRlclxuICovXG5jbGFzcyBDb25zb2xlUmVjb3JkZXIge1xuXG4gICAgdGFza0NvbXBsZXRlZChyZXBvcnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1xcblxcbicscmVwb3J0LCdcXG5cXG4nKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29uc29sZVJlY29yZGVyXG4iXX0=