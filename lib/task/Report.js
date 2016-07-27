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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL1JlcG9ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBR00sTUFBTTtBQUVHLGFBRlQsTUFBTSxDQUVJLFFBQVEsRUFBRTs4QkFGcEIsTUFBTTs7QUFHSixZQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN6QixZQUFJLENBQUMsTUFBTSxHQUFHLEVBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxDQUFDLEVBQUMsQ0FBQztLQUNqRTs7aUJBTEMsTUFBTTs7ZUFPRyxxQkFBQyxNQUFNLEVBQUU7QUFDaEIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUM1QixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzlDOzs7ZUFFWSx1QkFBQyxPQUFPLEVBQUU7QUFDbkIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN6QyxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQy9ELGdCQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDNUIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFFLENBQUMsQ0FBQztBQUMzRCxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQzlCLGdCQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsZ0JBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjs7O2VBRXFCLGdDQUFDLEdBQUcsRUFBRTtBQUN4QixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3pDLGdCQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDL0QsZ0JBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDOUIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUM3QixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUNsQyxnQkFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixHQUFDLENBQUMsQ0FBQztBQUM1RSxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLGdCQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7OztlQUVJLGlCQUFHO0FBQ0osZ0JBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ3BCOzs7V0FuQ0MsTUFBTTs7O3FCQXVDRyxNQUFNIiwiZmlsZSI6IlJlcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVwb3J0XG4gKi9cbmNsYXNzIFJlcG9ydCB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWNvcmRlcikge1xuICAgICAgICB0aGlzLnJlY29yZGVyID0gcmVjb3JkZXI7XG4gICAgICAgIHRoaXMucmVwb3J0ID0ge3RpbWVzQ29tcGxldGVkOiAwLCB0aW1lc0NvbXBsZXRlZFdpdGhFcnJvcjogMH07XG4gICAgfVxuXG4gICAgdGFza1N0YXJ0ZWQodGFza0lEKSB7XG4gICAgICAgIHRoaXMucmVwb3J0LnRhc2tJRCA9IHRhc2tJRDtcbiAgICAgICAgdGhpcy5yZXBvcnQudGltZVN0YXJ0ZWQgPSBwcm9jZXNzLmhydGltZSgpO1xuICAgIH1cblxuICAgIHRhc2tDb21wbGV0ZWQobWVzc2FnZSkge1xuICAgICAgICB0aGlzLnJlcG9ydC50aW1lRW5kZWQgPSBwcm9jZXNzLmhydGltZSgpO1xuICAgICAgICB0aGlzLnJlcG9ydC5kdXJhdGlvbiA9IHByb2Nlc3MuaHJ0aW1lKHRoaXMucmVwb3J0LnRpbWVTdGFydGVkKTtcbiAgICAgICAgdGhpcy5yZXBvcnQuc3RhdHVzID0gJ0dPT0QnO1xuICAgICAgICB0aGlzLnJlcG9ydC50aW1lc0NvbXBsZXRlZCA9IHRoaXMucmVwb3J0LnRpbWVzQ29tcGxldGVkICsxO1xuICAgICAgICB0aGlzLnJlcG9ydC5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5yZWNvcmRlci50YXNrQ29tcGxldGVkKHRoaXMucmVwb3J0KTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIHRhc2tDb21wbGV0ZWRXaXRoRXJyb3IoZXJyKSB7XG4gICAgICAgIHRoaXMucmVwb3J0LnRpbWVFbmRlZCA9IHByb2Nlc3MuaHJ0aW1lKCk7XG4gICAgICAgIHRoaXMucmVwb3J0LmR1cmF0aW9uID0gcHJvY2Vzcy5ocnRpbWUodGhpcy5yZXBvcnQudGltZVN0YXJ0ZWQpO1xuICAgICAgICB0aGlzLnJlcG9ydC5zdGFjayA9IGVyci5zdGFjaztcbiAgICAgICAgdGhpcy5yZXBvcnQuc3RhdHVzID0gJ0VSUk9SJztcbiAgICAgICAgdGhpcy5yZXBvcnQubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICAgICAgICB0aGlzLnJlcG9ydC50aW1lc0NvbXBsZXRlZFdpdGhFcnJvciA9IHRoaXMucmVwb3J0LnRpbWVzQ29tcGxldGVkV2l0aEVycm9yKzE7XG4gICAgICAgIHRoaXMucmVjb3JkZXIudGFza0NvbXBsZXRlZCh0aGlzLnJlcG9ydCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5yZXBvcnQgPSB7fTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVwb3J0XG4iXX0=