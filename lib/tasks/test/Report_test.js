'use strict';

var _Report = require('../Report');

var _Report2 = _interopRequireDefault(_Report);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var report;
var recorder;

describe('Report', function () {

    beforeEach(function () {

        recorder = {
            taskCompleted: function taskCompleted(report) {
                this.report = report;
            }
        };

        report = new _Report2.default(recorder);
    });

    it('taskCompleted()', function () {

        report.taskStarted('testingTask1', 'The test has started!');
        report.taskCompleted('The task has completed!');

        (0, _must2.default)(recorder.report.timesCompleted).be(1);
        (0, _must2.default)(recorder.report.timesCompletedWithError).be(0);
        (0, _must2.default)(recorder.report.taskID).be('testingTask1');
        (0, _must2.default)(recorder.report.timeStarted).be.an.array();
        (0, _must2.default)(recorder.report.timeEnded).be.an.array();
        (0, _must2.default)(recorder.report.duration).be.an.array();
        (0, _must2.default)(recorder.report.status).be('GOOD');
        (0, _must2.default)(recorder.report.message).be('The task has completed!');
    });

    it('taskCompletedWithError()', function (done) {

        report.taskStarted('testingTask2', 'The test has started!');
        report.taskCompletedWithError(new Error('Phony Error'));
        (0, _must2.default)(recorder.report.timesCompleted).be(0);
        (0, _must2.default)(recorder.report.timesCompletedWithError).be(1);
        (0, _must2.default)(recorder.report.taskID).be('testingTask2');
        (0, _must2.default)(recorder.report.timeStarted).be.an.array();
        (0, _must2.default)(recorder.report.timeEnded).be.an.array();
        (0, _must2.default)(recorder.report.duration).be.an.array();
        (0, _must2.default)(recorder.report.status).be('ERROR');
        (0, _must2.default)(recorder.report.message).be('Phony Error');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YXNrcy90ZXN0L1JlcG9ydF90ZXN0LmpzIl0sIm5hbWVzIjpbInJlcG9ydCIsInJlY29yZGVyIiwiZGVzY3JpYmUiLCJiZWZvcmVFYWNoIiwidGFza0NvbXBsZXRlZCIsIml0IiwidGFza1N0YXJ0ZWQiLCJ0aW1lc0NvbXBsZXRlZCIsImJlIiwidGltZXNDb21wbGV0ZWRXaXRoRXJyb3IiLCJ0YXNrSUQiLCJ0aW1lU3RhcnRlZCIsImFuIiwiYXJyYXkiLCJ0aW1lRW5kZWQiLCJkdXJhdGlvbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJkb25lIiwidGFza0NvbXBsZXRlZFdpdGhFcnJvciIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLE1BQUo7QUFDQSxJQUFJQyxRQUFKOztBQUVBQyxTQUFTLFFBQVQsRUFBbUIsWUFBVzs7QUFFMUJDLGVBQVcsWUFBVTs7QUFFakJGLG1CQUFXO0FBQ1BHLDJCQUFlLHVCQUFVSixNQUFWLEVBQWtCO0FBQzdCLHFCQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDSDtBQUhNLFNBQVg7O0FBTUFBLGlCQUFTLHFCQUFXQyxRQUFYLENBQVQ7QUFFSCxLQVZEOztBQVlBSSxPQUFHLGlCQUFILEVBQXNCLFlBQVc7O0FBRTdCTCxlQUFPTSxXQUFQLENBQW1CLGNBQW5CLEVBQW1DLHVCQUFuQztBQUNBTixlQUFPSSxhQUFQLENBQXFCLHlCQUFyQjs7QUFFQSw0QkFBS0gsU0FBU0QsTUFBVCxDQUFnQk8sY0FBckIsRUFBcUNDLEVBQXJDLENBQXdDLENBQXhDO0FBQ0EsNEJBQUtQLFNBQVNELE1BQVQsQ0FBZ0JTLHVCQUFyQixFQUE4Q0QsRUFBOUMsQ0FBaUQsQ0FBakQ7QUFDQSw0QkFBS1AsU0FBU0QsTUFBVCxDQUFnQlUsTUFBckIsRUFBNkJGLEVBQTdCLENBQWdDLGNBQWhDO0FBQ0EsNEJBQUtQLFNBQVNELE1BQVQsQ0FBZ0JXLFdBQXJCLEVBQWtDSCxFQUFsQyxDQUFxQ0ksRUFBckMsQ0FBd0NDLEtBQXhDO0FBQ0EsNEJBQUtaLFNBQVNELE1BQVQsQ0FBZ0JjLFNBQXJCLEVBQWdDTixFQUFoQyxDQUFtQ0ksRUFBbkMsQ0FBc0NDLEtBQXRDO0FBQ0EsNEJBQUtaLFNBQVNELE1BQVQsQ0FBZ0JlLFFBQXJCLEVBQStCUCxFQUEvQixDQUFrQ0ksRUFBbEMsQ0FBcUNDLEtBQXJDO0FBQ0EsNEJBQUtaLFNBQVNELE1BQVQsQ0FBZ0JnQixNQUFyQixFQUE2QlIsRUFBN0IsQ0FBZ0MsTUFBaEM7QUFDQSw0QkFBS1AsU0FBU0QsTUFBVCxDQUFnQmlCLE9BQXJCLEVBQThCVCxFQUE5QixDQUFpQyx5QkFBakM7QUFFSCxLQWREOztBQWlCQUgsT0FBRywwQkFBSCxFQUErQixVQUFTYSxJQUFULEVBQWU7O0FBRTFDbEIsZUFBT00sV0FBUCxDQUFtQixjQUFuQixFQUFtQyx1QkFBbkM7QUFDQU4sZUFBT21CLHNCQUFQLENBQThCLElBQUlDLEtBQUosQ0FBVSxhQUFWLENBQTlCO0FBQ0EsNEJBQUtuQixTQUFTRCxNQUFULENBQWdCTyxjQUFyQixFQUFxQ0MsRUFBckMsQ0FBd0MsQ0FBeEM7QUFDQSw0QkFBS1AsU0FBU0QsTUFBVCxDQUFnQlMsdUJBQXJCLEVBQThDRCxFQUE5QyxDQUFpRCxDQUFqRDtBQUNBLDRCQUFLUCxTQUFTRCxNQUFULENBQWdCVSxNQUFyQixFQUE2QkYsRUFBN0IsQ0FBZ0MsY0FBaEM7QUFDQSw0QkFBS1AsU0FBU0QsTUFBVCxDQUFnQlcsV0FBckIsRUFBa0NILEVBQWxDLENBQXFDSSxFQUFyQyxDQUF3Q0MsS0FBeEM7QUFDQSw0QkFBS1osU0FBU0QsTUFBVCxDQUFnQmMsU0FBckIsRUFBZ0NOLEVBQWhDLENBQW1DSSxFQUFuQyxDQUFzQ0MsS0FBdEM7QUFDQSw0QkFBS1osU0FBU0QsTUFBVCxDQUFnQmUsUUFBckIsRUFBK0JQLEVBQS9CLENBQWtDSSxFQUFsQyxDQUFxQ0MsS0FBckM7QUFDQSw0QkFBS1osU0FBU0QsTUFBVCxDQUFnQmdCLE1BQXJCLEVBQTZCUixFQUE3QixDQUFnQyxPQUFoQztBQUNBLDRCQUFLUCxTQUFTRCxNQUFULENBQWdCaUIsT0FBckIsRUFBOEJULEVBQTlCLENBQWlDLGFBQWpDO0FBQ0FVO0FBR0gsS0FmRDtBQWtCSCxDQWpERCIsImZpbGUiOiJSZXBvcnRfdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXBvcnQgZnJvbSAnLi4vUmVwb3J0JztcbmltcG9ydCBtdXN0IGZyb20gJ211c3QnO1xuXG52YXIgcmVwb3J0O1xudmFyIHJlY29yZGVyO1xuXG5kZXNjcmliZSgnUmVwb3J0JywgZnVuY3Rpb24oKSB7XG5cbiAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgcmVjb3JkZXIgPSB7XG4gICAgICAgICAgICB0YXNrQ29tcGxldGVkOiBmdW5jdGlvbiAocmVwb3J0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnQgPSByZXBvcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVwb3J0ID0gbmV3IFJlcG9ydChyZWNvcmRlcik7XG5cbiAgICB9KTtcblxuICAgIGl0KCd0YXNrQ29tcGxldGVkKCknLCBmdW5jdGlvbigpIHtcblxuICAgICAgICByZXBvcnQudGFza1N0YXJ0ZWQoJ3Rlc3RpbmdUYXNrMScsICdUaGUgdGVzdCBoYXMgc3RhcnRlZCEnKTtcbiAgICAgICAgcmVwb3J0LnRhc2tDb21wbGV0ZWQoJ1RoZSB0YXNrIGhhcyBjb21wbGV0ZWQhJyk7XG5cbiAgICAgICAgbXVzdChyZWNvcmRlci5yZXBvcnQudGltZXNDb21wbGV0ZWQpLmJlKDEpO1xuICAgICAgICBtdXN0KHJlY29yZGVyLnJlcG9ydC50aW1lc0NvbXBsZXRlZFdpdGhFcnJvcikuYmUoMCk7XG4gICAgICAgIG11c3QocmVjb3JkZXIucmVwb3J0LnRhc2tJRCkuYmUoJ3Rlc3RpbmdUYXNrMScpO1xuICAgICAgICBtdXN0KHJlY29yZGVyLnJlcG9ydC50aW1lU3RhcnRlZCkuYmUuYW4uYXJyYXkoKTtcbiAgICAgICAgbXVzdChyZWNvcmRlci5yZXBvcnQudGltZUVuZGVkKS5iZS5hbi5hcnJheSgpO1xuICAgICAgICBtdXN0KHJlY29yZGVyLnJlcG9ydC5kdXJhdGlvbikuYmUuYW4uYXJyYXkoKTtcbiAgICAgICAgbXVzdChyZWNvcmRlci5yZXBvcnQuc3RhdHVzKS5iZSgnR09PRCcpO1xuICAgICAgICBtdXN0KHJlY29yZGVyLnJlcG9ydC5tZXNzYWdlKS5iZSgnVGhlIHRhc2sgaGFzIGNvbXBsZXRlZCEnKTtcblxuICAgIH0pO1xuXG5cbiAgICBpdCgndGFza0NvbXBsZXRlZFdpdGhFcnJvcigpJywgZnVuY3Rpb24oZG9uZSkge1xuXG4gICAgICAgIHJlcG9ydC50YXNrU3RhcnRlZCgndGVzdGluZ1Rhc2syJywgJ1RoZSB0ZXN0IGhhcyBzdGFydGVkIScpO1xuICAgICAgICByZXBvcnQudGFza0NvbXBsZXRlZFdpdGhFcnJvcihuZXcgRXJyb3IoJ1Bob255IEVycm9yJykpO1xuICAgICAgICBtdXN0KHJlY29yZGVyLnJlcG9ydC50aW1lc0NvbXBsZXRlZCkuYmUoMCk7XG4gICAgICAgIG11c3QocmVjb3JkZXIucmVwb3J0LnRpbWVzQ29tcGxldGVkV2l0aEVycm9yKS5iZSgxKTtcbiAgICAgICAgbXVzdChyZWNvcmRlci5yZXBvcnQudGFza0lEKS5iZSgndGVzdGluZ1Rhc2syJyk7XG4gICAgICAgIG11c3QocmVjb3JkZXIucmVwb3J0LnRpbWVTdGFydGVkKS5iZS5hbi5hcnJheSgpO1xuICAgICAgICBtdXN0KHJlY29yZGVyLnJlcG9ydC50aW1lRW5kZWQpLmJlLmFuLmFycmF5KCk7XG4gICAgICAgIG11c3QocmVjb3JkZXIucmVwb3J0LmR1cmF0aW9uKS5iZS5hbi5hcnJheSgpO1xuICAgICAgICBtdXN0KHJlY29yZGVyLnJlcG9ydC5zdGF0dXMpLmJlKCdFUlJPUicpO1xuICAgICAgICBtdXN0KHJlY29yZGVyLnJlcG9ydC5tZXNzYWdlKS5iZSgnUGhvbnkgRXJyb3InKTtcbiAgICAgICAgZG9uZSgpO1xuXG5cbiAgICB9KTtcblxuXG59KTtcbiJdfQ==