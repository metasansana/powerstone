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
//# sourceMappingURL=Task.js.map