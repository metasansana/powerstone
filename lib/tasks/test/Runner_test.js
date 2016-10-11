'use strict';

var _Runner = require('../Runner');

var _Runner2 = _interopRequireDefault(_Runner);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var runner;
var tasks;
var recorder;

function makeRunnableTask() {
    return {
        count: 0,
        taskWillRun: function taskWillRun(yes, no) {
            yes();
        },
        run: function run(_, done) {
            this.count++;
            done();
        }
    };
}

function makeUnRunnableTask() {
    return {
        count: 0,
        taskWillRun: function taskWillRun(yes, no) {
            no();
        },
        run: function run(done) {
            this.count++;
            done();
        }
    };
}

describe('Runner', function () {

    beforeEach(function () {});

    it('will run tasks that should be run', function () {
        var repeatTask = makeRunnableTask();
        var repeatTask2 = makeUnRunnableTask();
        tasks = [makeRunnableTask(), repeatTask2, repeatTask2, makeUnRunnableTask(), repeatTask, repeatTask, makeRunnableTask()];

        runner = new _Runner2.default(tasks, { taskCompleted: function taskCompleted() {} });
        return runner.runAllTasks().then(function () {
            (0, _must2.default)(tasks[0].count).be(1);
            (0, _must2.default)(tasks[1].count).be(0);
            (0, _must2.default)(tasks[2].count).be(0);
            (0, _must2.default)(tasks[3].count).be(0);
            (0, _must2.default)(tasks[4].count).be(2);
            (0, _must2.default)(tasks[5].count).be(2);
            (0, _must2.default)(tasks[6].count).be(1);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YXNrcy90ZXN0L1J1bm5lcl90ZXN0LmpzIl0sIm5hbWVzIjpbInJ1bm5lciIsInRhc2tzIiwicmVjb3JkZXIiLCJtYWtlUnVubmFibGVUYXNrIiwiY291bnQiLCJ0YXNrV2lsbFJ1biIsInllcyIsIm5vIiwicnVuIiwiXyIsImRvbmUiLCJtYWtlVW5SdW5uYWJsZVRhc2siLCJkZXNjcmliZSIsImJlZm9yZUVhY2giLCJpdCIsInJlcGVhdFRhc2siLCJyZXBlYXRUYXNrMiIsInRhc2tDb21wbGV0ZWQiLCJydW5BbGxUYXNrcyIsInRoZW4iLCJiZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7QUFHQSxJQUFJQSxNQUFKO0FBQ0EsSUFBSUMsS0FBSjtBQUNBLElBQUlDLFFBQUo7O0FBRUEsU0FBU0MsZ0JBQVQsR0FBNEI7QUFDeEIsV0FBTztBQUNIQyxlQUFPLENBREo7QUFFSEMscUJBQWEscUJBQVNDLEdBQVQsRUFBY0MsRUFBZCxFQUFpQjtBQUMxQkQ7QUFDSCxTQUpFO0FBS0hFLGFBQUssYUFBU0MsQ0FBVCxFQUFZQyxJQUFaLEVBQWlCO0FBQ2xCLGlCQUFLTixLQUFMO0FBQ0FNO0FBQ0g7QUFSRSxLQUFQO0FBVUg7O0FBRUQsU0FBU0Msa0JBQVQsR0FBOEI7QUFDMUIsV0FBTztBQUNIUCxlQUFPLENBREo7QUFFSEMscUJBQWEscUJBQVNDLEdBQVQsRUFBY0MsRUFBZCxFQUFpQjtBQUMxQkE7QUFDSCxTQUpFO0FBS0hDLGFBQUssYUFBU0UsSUFBVCxFQUFjO0FBQ2YsaUJBQUtOLEtBQUw7QUFDQU07QUFDSDtBQVJFLEtBQVA7QUFVSDs7QUFFREUsU0FBUyxRQUFULEVBQW1CLFlBQVc7O0FBRTFCQyxlQUFXLFlBQVUsQ0FFcEIsQ0FGRDs7QUFJQUMsT0FBRyxtQ0FBSCxFQUF3QyxZQUFXO0FBQy9DLFlBQUlDLGFBQWFaLGtCQUFqQjtBQUNBLFlBQUlhLGNBQWNMLG9CQUFsQjtBQUNBVixnQkFBUSxDQUNKRSxrQkFESSxFQUVKYSxXQUZJLEVBR0pBLFdBSEksRUFJSkwsb0JBSkksRUFLSkksVUFMSSxFQU1KQSxVQU5JLEVBT0paLGtCQVBJLENBQVI7O0FBU0FILGlCQUFTLHFCQUFXQyxLQUFYLEVBQWtCLEVBQUNnQixlQUFlLHlCQUFVLENBQUUsQ0FBNUIsRUFBbEIsQ0FBVDtBQUNBLGVBQU9qQixPQUFPa0IsV0FBUCxHQUNIQyxJQURHLENBQ0UsWUFBVTtBQUNYLGdDQUFLbEIsTUFBTSxDQUFOLEVBQVNHLEtBQWQsRUFBcUJnQixFQUFyQixDQUF3QixDQUF4QjtBQUNBLGdDQUFLbkIsTUFBTSxDQUFOLEVBQVNHLEtBQWQsRUFBcUJnQixFQUFyQixDQUF3QixDQUF4QjtBQUNBLGdDQUFLbkIsTUFBTSxDQUFOLEVBQVNHLEtBQWQsRUFBcUJnQixFQUFyQixDQUF3QixDQUF4QjtBQUNBLGdDQUFLbkIsTUFBTSxDQUFOLEVBQVNHLEtBQWQsRUFBcUJnQixFQUFyQixDQUF3QixDQUF4QjtBQUNBLGdDQUFLbkIsTUFBTSxDQUFOLEVBQVNHLEtBQWQsRUFBcUJnQixFQUFyQixDQUF3QixDQUF4QjtBQUNBLGdDQUFLbkIsTUFBTSxDQUFOLEVBQVNHLEtBQWQsRUFBcUJnQixFQUFyQixDQUF3QixDQUF4QjtBQUNBLGdDQUFLbkIsTUFBTSxDQUFOLEVBQVNHLEtBQWQsRUFBcUJnQixFQUFyQixDQUF3QixDQUF4QjtBQUNILFNBVEUsQ0FBUDtBQVVILEtBdkJEO0FBeUJILENBL0JEIiwiZmlsZSI6IlJ1bm5lcl90ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJ1bm5lciBmcm9tICcuLi9SdW5uZXInO1xuaW1wb3J0IG11c3QgZnJvbSAnbXVzdCc7XG5cblxudmFyIHJ1bm5lcjtcbnZhciB0YXNrcztcbnZhciByZWNvcmRlcjtcblxuZnVuY3Rpb24gbWFrZVJ1bm5hYmxlVGFzaygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb3VudDogMCxcbiAgICAgICAgdGFza1dpbGxSdW46IGZ1bmN0aW9uKHllcywgbm8pe1xuICAgICAgICAgICAgeWVzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bjogZnVuY3Rpb24oXywgZG9uZSl7XG4gICAgICAgICAgICB0aGlzLmNvdW50Kys7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VVblJ1bm5hYmxlVGFzaygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb3VudDogMCxcbiAgICAgICAgdGFza1dpbGxSdW46IGZ1bmN0aW9uKHllcywgbm8pe1xuICAgICAgICAgICAgbm8oKTtcbiAgICAgICAgfSxcbiAgICAgICAgcnVuOiBmdW5jdGlvbihkb25lKXtcbiAgICAgICAgICAgIHRoaXMuY291bnQrKztcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZGVzY3JpYmUoJ1J1bm5lcicsIGZ1bmN0aW9uKCkge1xuXG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbigpe1xuXG4gICAgfSk7XG5cbiAgICBpdCgnd2lsbCBydW4gdGFza3MgdGhhdCBzaG91bGQgYmUgcnVuJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXBlYXRUYXNrID0gbWFrZVJ1bm5hYmxlVGFzaygpO1xuICAgICAgICB2YXIgcmVwZWF0VGFzazIgPSBtYWtlVW5SdW5uYWJsZVRhc2soKTtcbiAgICAgICAgdGFza3MgPSBbXG4gICAgICAgICAgICBtYWtlUnVubmFibGVUYXNrKCksXG4gICAgICAgICAgICByZXBlYXRUYXNrMixcbiAgICAgICAgICAgIHJlcGVhdFRhc2syLFxuICAgICAgICAgICAgbWFrZVVuUnVubmFibGVUYXNrKCksXG4gICAgICAgICAgICByZXBlYXRUYXNrLFxuICAgICAgICAgICAgcmVwZWF0VGFzayxcbiAgICAgICAgICAgIG1ha2VSdW5uYWJsZVRhc2soKV07XG5cbiAgICAgICAgcnVubmVyID0gbmV3IFJ1bm5lcih0YXNrcywge3Rhc2tDb21wbGV0ZWQ6IGZ1bmN0aW9uKCl7fX0pO1xuICAgICAgICByZXR1cm4gcnVubmVyLnJ1bkFsbFRhc2tzKCkuXG4gICAgICAgICAgICB0aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbXVzdCh0YXNrc1swXS5jb3VudCkuYmUoMSk7XG4gICAgICAgICAgICAgICAgbXVzdCh0YXNrc1sxXS5jb3VudCkuYmUoMCk7XG4gICAgICAgICAgICAgICAgbXVzdCh0YXNrc1syXS5jb3VudCkuYmUoMCk7XG4gICAgICAgICAgICAgICAgbXVzdCh0YXNrc1szXS5jb3VudCkuYmUoMCk7XG4gICAgICAgICAgICAgICAgbXVzdCh0YXNrc1s0XS5jb3VudCkuYmUoMik7XG4gICAgICAgICAgICAgICAgbXVzdCh0YXNrc1s1XS5jb3VudCkuYmUoMik7XG4gICAgICAgICAgICAgICAgbXVzdCh0YXNrc1s2XS5jb3VudCkuYmUoMSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9KVxuXG59KTsiXX0=