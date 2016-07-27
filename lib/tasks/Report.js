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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9SZXBvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUdNLE1BQU07QUFFRyxhQUZULE1BQU0sQ0FFSSxRQUFRLEVBQUU7OEJBRnBCLE1BQU07O0FBR0osWUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFDekIsWUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxFQUFDLENBQUM7S0FDakU7O2lCQUxDLE1BQU07O2VBT0cscUJBQUMsTUFBTSxFQUFFO0FBQ2hCLGdCQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDNUIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM5Qzs7O2VBRVksdUJBQUMsT0FBTyxFQUFFO0FBQ25CLGdCQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDekMsZ0JBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvRCxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQzVCLGdCQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRSxDQUFDLENBQUM7QUFDM0QsZ0JBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUM5QixnQkFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLGdCQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7OztlQUVxQixnQ0FBQyxHQUFHLEVBQUU7QUFDeEIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN6QyxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQy9ELGdCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQzlCLGdCQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFDN0IsZ0JBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDbEMsZ0JBQUksQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsR0FBQyxDQUFDLENBQUM7QUFDNUUsZ0JBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QyxnQkFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCOzs7ZUFFSSxpQkFBRztBQUNKLGdCQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNwQjs7O1dBbkNDLE1BQU07OztxQkF1Q0csTUFBTSIsImZpbGUiOiJSZXBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJlcG9ydFxuICovXG5jbGFzcyBSZXBvcnQge1xuXG4gICAgY29uc3RydWN0b3IocmVjb3JkZXIpIHtcbiAgICAgICAgdGhpcy5yZWNvcmRlciA9IHJlY29yZGVyO1xuICAgICAgICB0aGlzLnJlcG9ydCA9IHt0aW1lc0NvbXBsZXRlZDogMCwgdGltZXNDb21wbGV0ZWRXaXRoRXJyb3I6IDB9O1xuICAgIH1cblxuICAgIHRhc2tTdGFydGVkKHRhc2tJRCkge1xuICAgICAgICB0aGlzLnJlcG9ydC50YXNrSUQgPSB0YXNrSUQ7XG4gICAgICAgIHRoaXMucmVwb3J0LnRpbWVTdGFydGVkID0gcHJvY2Vzcy5ocnRpbWUoKTtcbiAgICB9XG5cbiAgICB0YXNrQ29tcGxldGVkKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5yZXBvcnQudGltZUVuZGVkID0gcHJvY2Vzcy5ocnRpbWUoKTtcbiAgICAgICAgdGhpcy5yZXBvcnQuZHVyYXRpb24gPSBwcm9jZXNzLmhydGltZSh0aGlzLnJlcG9ydC50aW1lU3RhcnRlZCk7XG4gICAgICAgIHRoaXMucmVwb3J0LnN0YXR1cyA9ICdHT09EJztcbiAgICAgICAgdGhpcy5yZXBvcnQudGltZXNDb21wbGV0ZWQgPSB0aGlzLnJlcG9ydC50aW1lc0NvbXBsZXRlZCArMTtcbiAgICAgICAgdGhpcy5yZXBvcnQubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMucmVjb3JkZXIudGFza0NvbXBsZXRlZCh0aGlzLnJlcG9ydCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICB0YXNrQ29tcGxldGVkV2l0aEVycm9yKGVycikge1xuICAgICAgICB0aGlzLnJlcG9ydC50aW1lRW5kZWQgPSBwcm9jZXNzLmhydGltZSgpO1xuICAgICAgICB0aGlzLnJlcG9ydC5kdXJhdGlvbiA9IHByb2Nlc3MuaHJ0aW1lKHRoaXMucmVwb3J0LnRpbWVTdGFydGVkKTtcbiAgICAgICAgdGhpcy5yZXBvcnQuc3RhY2sgPSBlcnIuc3RhY2s7XG4gICAgICAgIHRoaXMucmVwb3J0LnN0YXR1cyA9ICdFUlJPUic7XG4gICAgICAgIHRoaXMucmVwb3J0Lm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhpcy5yZXBvcnQudGltZXNDb21wbGV0ZWRXaXRoRXJyb3IgPSB0aGlzLnJlcG9ydC50aW1lc0NvbXBsZXRlZFdpdGhFcnJvcisxO1xuICAgICAgICB0aGlzLnJlY29yZGVyLnRhc2tDb21wbGV0ZWQodGhpcy5yZXBvcnQpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMucmVwb3J0ID0ge307XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlcG9ydFxuIl19