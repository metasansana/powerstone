'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Report
 */
var Report = function () {
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
}();

exports.default = Report;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9SZXBvcnQuanMiXSwibmFtZXMiOlsiUmVwb3J0IiwicmVjb3JkZXIiLCJyZXBvcnQiLCJ0aW1lc0NvbXBsZXRlZCIsInRpbWVzQ29tcGxldGVkV2l0aEVycm9yIiwidGFza0lEIiwidGltZVN0YXJ0ZWQiLCJwcm9jZXNzIiwiaHJ0aW1lIiwibWVzc2FnZSIsInRpbWVFbmRlZCIsImR1cmF0aW9uIiwic3RhdHVzIiwidGFza0NvbXBsZXRlZCIsInJlc2V0IiwiZXJyIiwic3RhY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7O0lBR01BLE07QUFFRixvQkFBWUMsUUFBWixFQUFzQjtBQUFBOztBQUNsQixhQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGFBQUtDLE1BQUwsR0FBYyxFQUFDQyxnQkFBZ0IsQ0FBakIsRUFBb0JDLHlCQUF5QixDQUE3QyxFQUFkO0FBQ0g7Ozs7b0NBRVdDLE0sRUFBUTtBQUNoQixpQkFBS0gsTUFBTCxDQUFZRyxNQUFaLEdBQXFCQSxNQUFyQjtBQUNBLGlCQUFLSCxNQUFMLENBQVlJLFdBQVosR0FBMEJDLFFBQVFDLE1BQVIsRUFBMUI7QUFDSDs7O3NDQUVhQyxPLEVBQVM7QUFDbkIsaUJBQUtQLE1BQUwsQ0FBWVEsU0FBWixHQUF3QkgsUUFBUUMsTUFBUixFQUF4QjtBQUNBLGlCQUFLTixNQUFMLENBQVlTLFFBQVosR0FBdUJKLFFBQVFDLE1BQVIsQ0FBZSxLQUFLTixNQUFMLENBQVlJLFdBQTNCLENBQXZCO0FBQ0EsaUJBQUtKLE1BQUwsQ0FBWVUsTUFBWixHQUFxQixNQUFyQjtBQUNBLGlCQUFLVixNQUFMLENBQVlDLGNBQVosR0FBNkIsS0FBS0QsTUFBTCxDQUFZQyxjQUFaLEdBQTRCLENBQXpEO0FBQ0EsaUJBQUtELE1BQUwsQ0FBWU8sT0FBWixHQUFzQkEsT0FBdEI7QUFDQSxpQkFBS1IsUUFBTCxDQUFjWSxhQUFkLENBQTRCLEtBQUtYLE1BQWpDO0FBQ0EsaUJBQUtZLEtBQUw7QUFDSDs7OytDQUVzQkMsRyxFQUFLO0FBQ3hCLGlCQUFLYixNQUFMLENBQVlRLFNBQVosR0FBd0JILFFBQVFDLE1BQVIsRUFBeEI7QUFDQSxpQkFBS04sTUFBTCxDQUFZUyxRQUFaLEdBQXVCSixRQUFRQyxNQUFSLENBQWUsS0FBS04sTUFBTCxDQUFZSSxXQUEzQixDQUF2QjtBQUNBLGlCQUFLSixNQUFMLENBQVljLEtBQVosR0FBb0JELElBQUlDLEtBQXhCO0FBQ0EsaUJBQUtkLE1BQUwsQ0FBWVUsTUFBWixHQUFxQixPQUFyQjtBQUNBLGlCQUFLVixNQUFMLENBQVlPLE9BQVosR0FBc0JNLElBQUlOLE9BQTFCO0FBQ0EsaUJBQUtQLE1BQUwsQ0FBWUUsdUJBQVosR0FBc0MsS0FBS0YsTUFBTCxDQUFZRSx1QkFBWixHQUFvQyxDQUExRTtBQUNBLGlCQUFLSCxRQUFMLENBQWNZLGFBQWQsQ0FBNEIsS0FBS1gsTUFBakM7QUFDQSxpQkFBS1ksS0FBTDtBQUNIOzs7Z0NBRU87QUFDSixpQkFBS1osTUFBTCxHQUFjLEVBQWQ7QUFDSDs7Ozs7O2tCQUlVRixNIiwiZmlsZSI6IlJlcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVwb3J0XG4gKi9cbmNsYXNzIFJlcG9ydCB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWNvcmRlcikge1xuICAgICAgICB0aGlzLnJlY29yZGVyID0gcmVjb3JkZXI7XG4gICAgICAgIHRoaXMucmVwb3J0ID0ge3RpbWVzQ29tcGxldGVkOiAwLCB0aW1lc0NvbXBsZXRlZFdpdGhFcnJvcjogMH07XG4gICAgfVxuXG4gICAgdGFza1N0YXJ0ZWQodGFza0lEKSB7XG4gICAgICAgIHRoaXMucmVwb3J0LnRhc2tJRCA9IHRhc2tJRDtcbiAgICAgICAgdGhpcy5yZXBvcnQudGltZVN0YXJ0ZWQgPSBwcm9jZXNzLmhydGltZSgpO1xuICAgIH1cblxuICAgIHRhc2tDb21wbGV0ZWQobWVzc2FnZSkge1xuICAgICAgICB0aGlzLnJlcG9ydC50aW1lRW5kZWQgPSBwcm9jZXNzLmhydGltZSgpO1xuICAgICAgICB0aGlzLnJlcG9ydC5kdXJhdGlvbiA9IHByb2Nlc3MuaHJ0aW1lKHRoaXMucmVwb3J0LnRpbWVTdGFydGVkKTtcbiAgICAgICAgdGhpcy5yZXBvcnQuc3RhdHVzID0gJ0dPT0QnO1xuICAgICAgICB0aGlzLnJlcG9ydC50aW1lc0NvbXBsZXRlZCA9IHRoaXMucmVwb3J0LnRpbWVzQ29tcGxldGVkICsxO1xuICAgICAgICB0aGlzLnJlcG9ydC5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5yZWNvcmRlci50YXNrQ29tcGxldGVkKHRoaXMucmVwb3J0KTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIHRhc2tDb21wbGV0ZWRXaXRoRXJyb3IoZXJyKSB7XG4gICAgICAgIHRoaXMucmVwb3J0LnRpbWVFbmRlZCA9IHByb2Nlc3MuaHJ0aW1lKCk7XG4gICAgICAgIHRoaXMucmVwb3J0LmR1cmF0aW9uID0gcHJvY2Vzcy5ocnRpbWUodGhpcy5yZXBvcnQudGltZVN0YXJ0ZWQpO1xuICAgICAgICB0aGlzLnJlcG9ydC5zdGFjayA9IGVyci5zdGFjaztcbiAgICAgICAgdGhpcy5yZXBvcnQuc3RhdHVzID0gJ0VSUk9SJztcbiAgICAgICAgdGhpcy5yZXBvcnQubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICAgICAgICB0aGlzLnJlcG9ydC50aW1lc0NvbXBsZXRlZFdpdGhFcnJvciA9IHRoaXMucmVwb3J0LnRpbWVzQ29tcGxldGVkV2l0aEVycm9yKzE7XG4gICAgICAgIHRoaXMucmVjb3JkZXIudGFza0NvbXBsZXRlZCh0aGlzLnJlcG9ydCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5yZXBvcnQgPSB7fTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVwb3J0XG4iXX0=