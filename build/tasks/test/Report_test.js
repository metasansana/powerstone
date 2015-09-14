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
//# sourceMappingURL=Report_test.js.map