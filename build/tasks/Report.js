/**
 * Report
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Report = (function () {
    function Report(recorder) {
        _classCallCheck(this, Report);

        this.recorder = recorder;
        this.report = { timesCompleted: 0, timesCompletedWithError: 0 };
    }

    _createClass(Report, [{
        key: 'taskStarted',
        value: function taskStarted(taskID) {
            this.report.taskID = taskID;
            this.report.timeStarted = process.hrtime();
        }
    }, {
        key: 'taskCompleted',
        value: function taskCompleted(message) {
            this.report.timeEnded = process.hrtime();
            this.report.duration = process.hrtime(this.report.timeStarted);
            this.report.status = 'GOOD';
            this.report.timesCompleted = this.report.timesCompleted + 1;
            this.report.message = message;
            this.recorder.taskCompleted(this.report);
            this.reset();
        }
    }, {
        key: 'taskCompletedWithError',
        value: function taskCompletedWithError(err) {
            this.report.timeEnded = process.hrtime();
            this.report.duration = process.hrtime(this.report.timeStarted);
            this.report.stack = err.stack;
            this.report.status = 'ERROR';
            this.report.message = err.message;
            this.report.timesCompletedWithError = this.report.timesCompletedWithError + 1;
            this.recorder.taskCompleted(this.report);
            this.reset();
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.report = {};
        }
    }]);

    return Report;
})();

exports['default'] = Report;
module.exports = exports['default'];