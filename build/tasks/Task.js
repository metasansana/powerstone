/**
 * Task is the simplest form of a task.
 *
 * It simply executes its Task#run() method when asked to.
 * To implement a Task, extend this class and override the runTask method.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Task = (function () {
    function Task() {
        _classCallCheck(this, Task);
    }

    _createClass(Task, [{
        key: 'runTask',

        /**
         * runTask contains the actual code for the task.
         * @param {TaskReport} report
         * @param {Function} cb
         * @abstract
         */
        value: function runTask(report, cb) {
            throw new Error('Task#runTask() must be overridden!');
        }
    }, {
        key: 'taskWillRun',

        /**
         * taskWillRun is called to determine if the task should be ran or not.
         * @param {Function} yes
         * @param {Function} no
         * @param {TaskReport} report
         */
        value: function taskWillRun(yes, no, report) {
            yes();
        }
    }, {
        key: 'run',

        /**
         * run this task
         * @param {TaskReport} report
         * @param {Function} cb
         */
        value: function run(report, cb) {
            report.taskStarted(this.taskID || this.constructor.name);
            this.runTask(report, function (err, message) {
                err ? report.taskCompletedWithError(err) : report.taskCompleted(message);
                cb(err);
            });
        }
    }]);

    return Task;
})();

exports['default'] = Task;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9UYXNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNTSxJQUFJO2FBQUosSUFBSTs4QkFBSixJQUFJOzs7aUJBQUosSUFBSTs7Ozs7Ozs7O2VBUUMsaUJBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRTtBQUNoQixrQkFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQ3pEOzs7Ozs7Ozs7O2VBUVUscUJBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUM7QUFDeEIsZUFBRyxFQUFFLENBQUM7U0FDVDs7Ozs7Ozs7O2VBT0UsYUFBQyxNQUFNLEVBQUUsRUFBRSxFQUFDO0FBQ1gsa0JBQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pELGdCQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUM7QUFDdkMsQUFBQyxtQkFBRyxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFFLGtCQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDWCxDQUFDLENBQUM7U0FDTjs7O1dBakNDLElBQUk7OztxQkFxQ0ssSUFBSSIsImZpbGUiOiJUYXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUYXNrIGlzIHRoZSBzaW1wbGVzdCBmb3JtIG9mIGEgdGFzay5cbiAqXG4gKiBJdCBzaW1wbHkgZXhlY3V0ZXMgaXRzIFRhc2sjcnVuKCkgbWV0aG9kIHdoZW4gYXNrZWQgdG8uXG4gKiBUbyBpbXBsZW1lbnQgYSBUYXNrLCBleHRlbmQgdGhpcyBjbGFzcyBhbmQgb3ZlcnJpZGUgdGhlIHJ1blRhc2sgbWV0aG9kLlxuICovXG5jbGFzcyBUYXNrIHtcblxuICAgIC8qKlxuICAgICAqIHJ1blRhc2sgY29udGFpbnMgdGhlIGFjdHVhbCBjb2RlIGZvciB0aGUgdGFzay5cbiAgICAgKiBAcGFyYW0ge1Rhc2tSZXBvcnR9IHJlcG9ydFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgcnVuVGFzayhyZXBvcnQsIGNiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGFzayNydW5UYXNrKCkgbXVzdCBiZSBvdmVycmlkZGVuIScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRhc2tXaWxsUnVuIGlzIGNhbGxlZCB0byBkZXRlcm1pbmUgaWYgdGhlIHRhc2sgc2hvdWxkIGJlIHJhbiBvciBub3QuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0geWVzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbm9cbiAgICAgKiBAcGFyYW0ge1Rhc2tSZXBvcnR9IHJlcG9ydFxuICAgICAqL1xuICAgIHRhc2tXaWxsUnVuKHllcywgbm8sIHJlcG9ydCl7XG4gICAgICAgIHllcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJ1biB0aGlzIHRhc2tcbiAgICAgKiBAcGFyYW0ge1Rhc2tSZXBvcnR9IHJlcG9ydFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gICAgICovXG4gICAgcnVuKHJlcG9ydCwgY2Ipe1xuICAgICAgICByZXBvcnQudGFza1N0YXJ0ZWQodGhpcy50YXNrSUQgfHwgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgdGhpcy5ydW5UYXNrKHJlcG9ydCwgZnVuY3Rpb24oZXJyLCBtZXNzYWdlKXtcbiAgICAgICAgICAgIChlcnIpPyByZXBvcnQudGFza0NvbXBsZXRlZFdpdGhFcnJvcihlcnIpIDogcmVwb3J0LnRhc2tDb21wbGV0ZWQobWVzc2FnZSk7XG4gICAgICAgICAgICBjYihlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFzazsiXX0=