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

        /**
         * taskWillRun is called to determine if the task should be ran or not.
         * @param {Function} yes
         * @param {Function} no
         * @param {TaskReport} report
         */
    }, {
        key: 'taskWillRun',
        value: function taskWillRun(yes, no, report) {
            yes();
        }

        /**
         * run this task
         * @param {TaskReport} report
         * @param {Function} cb
         */
    }, {
        key: 'run',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL1Rhc2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQU1NLElBQUk7YUFBSixJQUFJOzhCQUFKLElBQUk7OztpQkFBSixJQUFJOzs7Ozs7Ozs7ZUFRQyxpQkFBQyxNQUFNLEVBQUUsRUFBRSxFQUFFO0FBQ2hCLGtCQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7U0FDekQ7Ozs7Ozs7Ozs7ZUFRVSxxQkFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBQztBQUN4QixlQUFHLEVBQUUsQ0FBQztTQUNUOzs7Ozs7Ozs7ZUFPRSxhQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUM7QUFDWCxrQkFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekQsZ0JBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVMsR0FBRyxFQUFFLE9BQU8sRUFBQztBQUN2QyxBQUFDLG1CQUFHLEdBQUcsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUUsa0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNYLENBQUMsQ0FBQztTQUNOOzs7V0FqQ0MsSUFBSTs7O3FCQXFDSyxJQUFJIiwiZmlsZSI6IlRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRhc2sgaXMgdGhlIHNpbXBsZXN0IGZvcm0gb2YgYSB0YXNrLlxuICpcbiAqIEl0IHNpbXBseSBleGVjdXRlcyBpdHMgVGFzayNydW4oKSBtZXRob2Qgd2hlbiBhc2tlZCB0by5cbiAqIFRvIGltcGxlbWVudCBhIFRhc2ssIGV4dGVuZCB0aGlzIGNsYXNzIGFuZCBvdmVycmlkZSB0aGUgcnVuVGFzayBtZXRob2QuXG4gKi9cbmNsYXNzIFRhc2sge1xuXG4gICAgLyoqXG4gICAgICogcnVuVGFzayBjb250YWlucyB0aGUgYWN0dWFsIGNvZGUgZm9yIHRoZSB0YXNrLlxuICAgICAqIEBwYXJhbSB7VGFza1JlcG9ydH0gcmVwb3J0XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBydW5UYXNrKHJlcG9ydCwgY2IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUYXNrI3J1blRhc2soKSBtdXN0IGJlIG92ZXJyaWRkZW4hJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdGFza1dpbGxSdW4gaXMgY2FsbGVkIHRvIGRldGVybWluZSBpZiB0aGUgdGFzayBzaG91bGQgYmUgcmFuIG9yIG5vdC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB5ZXNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBub1xuICAgICAqIEBwYXJhbSB7VGFza1JlcG9ydH0gcmVwb3J0XG4gICAgICovXG4gICAgdGFza1dpbGxSdW4oeWVzLCBubywgcmVwb3J0KXtcbiAgICAgICAgeWVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcnVuIHRoaXMgdGFza1xuICAgICAqIEBwYXJhbSB7VGFza1JlcG9ydH0gcmVwb3J0XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAgICAgKi9cbiAgICBydW4ocmVwb3J0LCBjYil7XG4gICAgICAgIHJlcG9ydC50YXNrU3RhcnRlZCh0aGlzLnRhc2tJRCB8fCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICB0aGlzLnJ1blRhc2socmVwb3J0LCBmdW5jdGlvbihlcnIsIG1lc3NhZ2Upe1xuICAgICAgICAgICAgKGVycik/IHJlcG9ydC50YXNrQ29tcGxldGVkV2l0aEVycm9yKGVycikgOiByZXBvcnQudGFza0NvbXBsZXRlZChtZXNzYWdlKTtcbiAgICAgICAgICAgIGNiKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUYXNrOyJdfQ==