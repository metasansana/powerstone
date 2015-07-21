'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Report = require('../Report');

var _Report2 = _interopRequireDefault(_Report);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var report;
var recorder;

describe('Report', function () {

    beforeEach(function () {

        recorder = {
            taskCompleted: function taskCompleted(report) {
                this.report = report;
            }
        };

        report = new _Report2['default'](recorder);
    });

    it('taskCompleted()', function () {

        report.taskStarted('testingTask1', 'The test has started!');
        report.taskCompleted('The task has completed!');

        (0, _must2['default'])(recorder.report.timesCompleted).be(1);
        (0, _must2['default'])(recorder.report.timesCompletedWithError).be(0);
        (0, _must2['default'])(recorder.report.taskID).be('testingTask1');
        (0, _must2['default'])(recorder.report.timeStarted).be.an.array();
        (0, _must2['default'])(recorder.report.timeEnded).be.an.array();
        (0, _must2['default'])(recorder.report.duration).be.an.array();
        (0, _must2['default'])(recorder.report.status).be('GOOD');
        (0, _must2['default'])(recorder.report.message).be('The task has completed!');
    });

    it('taskCompletedWithError()', function (done) {

        report.taskStarted('testingTask2', 'The test has started!');
        report.taskCompletedWithError(new Error('Phony Error'));
        (0, _must2['default'])(recorder.report.timesCompleted).be(0);
        (0, _must2['default'])(recorder.report.timesCompletedWithError).be(1);
        (0, _must2['default'])(recorder.report.taskID).be('testingTask2');
        (0, _must2['default'])(recorder.report.timeStarted).be.an.array();
        (0, _must2['default'])(recorder.report.timeEnded).be.an.array();
        (0, _must2['default'])(recorder.report.duration).be.an.array();
        (0, _must2['default'])(recorder.report.status).be('ERROR');
        (0, _must2['default'])(recorder.report.message).be('Phony Error');
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YXNrcy90ZXN0L1JlcG9ydF90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7c0JBQW1CLFdBQVc7Ozs7b0JBQ2IsTUFBTTs7OztBQUV2QixJQUFJLE1BQU0sQ0FBQztBQUNYLElBQUksUUFBUSxDQUFDOztBQUViLFFBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBVzs7QUFFMUIsY0FBVSxDQUFDLFlBQVU7O0FBRWpCLGdCQUFRLEdBQUc7QUFDUCx5QkFBYSxFQUFFLHVCQUFVLE1BQU0sRUFBRTtBQUM3QixvQkFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7YUFDeEI7U0FDSixDQUFDOztBQUVGLGNBQU0sR0FBRyx3QkFBVyxRQUFRLENBQUMsQ0FBQztLQUVqQyxDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLGlCQUFpQixFQUFFLFlBQVc7O0FBRTdCLGNBQU0sQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLHVCQUF1QixDQUFDLENBQUM7QUFDNUQsY0FBTSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOztBQUVoRCwrQkFBSyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQywrQkFBSyxRQUFRLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELCtCQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2hELCtCQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNoRCwrQkFBSyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDOUMsK0JBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzdDLCtCQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLCtCQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLHlCQUF5QixDQUFDLENBQUM7S0FFL0QsQ0FBQyxDQUFDOztBQUdILE1BQUUsQ0FBQywwQkFBMEIsRUFBRSxVQUFTLElBQUksRUFBRTs7QUFFMUMsY0FBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztBQUM1RCxjQUFNLENBQUMsc0JBQXNCLENBQUMsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUN4RCwrQkFBSyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQywrQkFBSyxRQUFRLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELCtCQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2hELCtCQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNoRCwrQkFBSyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDOUMsK0JBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzdDLCtCQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pDLCtCQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2hELFlBQUksRUFBRSxDQUFDO0tBR1YsQ0FBQyxDQUFDO0NBR04sQ0FBQyxDQUFDIiwiZmlsZSI6IlJlcG9ydF90ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlcG9ydCBmcm9tICcuLi9SZXBvcnQnO1xuaW1wb3J0IG11c3QgZnJvbSAnbXVzdCc7XG5cbnZhciByZXBvcnQ7XG52YXIgcmVjb3JkZXI7XG5cbmRlc2NyaWJlKCdSZXBvcnQnLCBmdW5jdGlvbigpIHtcblxuICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKXtcblxuICAgICAgICByZWNvcmRlciA9IHtcbiAgICAgICAgICAgIHRhc2tDb21wbGV0ZWQ6IGZ1bmN0aW9uIChyZXBvcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydCA9IHJlcG9ydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXBvcnQgPSBuZXcgUmVwb3J0KHJlY29yZGVyKTtcblxuICAgIH0pO1xuXG4gICAgaXQoJ3Rhc2tDb21wbGV0ZWQoKScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJlcG9ydC50YXNrU3RhcnRlZCgndGVzdGluZ1Rhc2sxJywgJ1RoZSB0ZXN0IGhhcyBzdGFydGVkIScpO1xuICAgICAgICByZXBvcnQudGFza0NvbXBsZXRlZCgnVGhlIHRhc2sgaGFzIGNvbXBsZXRlZCEnKTtcblxuICAgICAgICBtdXN0KHJlY29yZGVyLnJlcG9ydC50aW1lc0NvbXBsZXRlZCkuYmUoMSk7XG4gICAgICAgIG11c3QocmVjb3JkZXIucmVwb3J0LnRpbWVzQ29tcGxldGVkV2l0aEVycm9yKS5iZSgwKTtcbiAgICAgICAgbXVzdChyZWNvcmRlci5yZXBvcnQudGFza0lEKS5iZSgndGVzdGluZ1Rhc2sxJyk7XG4gICAgICAgIG11c3QocmVjb3JkZXIucmVwb3J0LnRpbWVTdGFydGVkKS5iZS5hbi5hcnJheSgpO1xuICAgICAgICBtdXN0KHJlY29yZGVyLnJlcG9ydC50aW1lRW5kZWQpLmJlLmFuLmFycmF5KCk7XG4gICAgICAgIG11c3QocmVjb3JkZXIucmVwb3J0LmR1cmF0aW9uKS5iZS5hbi5hcnJheSgpO1xuICAgICAgICBtdXN0KHJlY29yZGVyLnJlcG9ydC5zdGF0dXMpLmJlKCdHT09EJyk7XG4gICAgICAgIG11c3QocmVjb3JkZXIucmVwb3J0Lm1lc3NhZ2UpLmJlKCdUaGUgdGFzayBoYXMgY29tcGxldGVkIScpO1xuXG4gICAgfSk7XG5cblxuICAgIGl0KCd0YXNrQ29tcGxldGVkV2l0aEVycm9yKCknLCBmdW5jdGlvbihkb25lKSB7XG5cbiAgICAgICAgcmVwb3J0LnRhc2tTdGFydGVkKCd0ZXN0aW5nVGFzazInLCAnVGhlIHRlc3QgaGFzIHN0YXJ0ZWQhJyk7XG4gICAgICAgIHJlcG9ydC50YXNrQ29tcGxldGVkV2l0aEVycm9yKG5ldyBFcnJvcignUGhvbnkgRXJyb3InKSk7XG4gICAgICAgIG11c3QocmVjb3JkZXIucmVwb3J0LnRpbWVzQ29tcGxldGVkKS5iZSgwKTtcbiAgICAgICAgbXVzdChyZWNvcmRlci5yZXBvcnQudGltZXNDb21wbGV0ZWRXaXRoRXJyb3IpLmJlKDEpO1xuICAgICAgICBtdXN0KHJlY29yZGVyLnJlcG9ydC50YXNrSUQpLmJlKCd0ZXN0aW5nVGFzazInKTtcbiAgICAgICAgbXVzdChyZWNvcmRlci5yZXBvcnQudGltZVN0YXJ0ZWQpLmJlLmFuLmFycmF5KCk7XG4gICAgICAgIG11c3QocmVjb3JkZXIucmVwb3J0LnRpbWVFbmRlZCkuYmUuYW4uYXJyYXkoKTtcbiAgICAgICAgbXVzdChyZWNvcmRlci5yZXBvcnQuZHVyYXRpb24pLmJlLmFuLmFycmF5KCk7XG4gICAgICAgIG11c3QocmVjb3JkZXIucmVwb3J0LnN0YXR1cykuYmUoJ0VSUk9SJyk7XG4gICAgICAgIG11c3QocmVjb3JkZXIucmVwb3J0Lm1lc3NhZ2UpLmJlKCdQaG9ueSBFcnJvcicpO1xuICAgICAgICBkb25lKCk7XG5cblxuICAgIH0pO1xuXG5cbn0pO1xuIl19