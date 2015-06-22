import Report from '../Report';
import must from 'must';

var report;
var recorder;

describe('Report', function() {

    beforeEach(function(){

        recorder = {
            taskCompleted: function (report) {
                this.report = report;
            }
        };

        report = new Report(recorder);

    });

    it('taskCompleted()', function() {

        report.taskStarted('testingTask1', 'The test has started!');
        report.taskCompleted('The task has completed!');

        must(recorder.report.timesCompleted).be(1);
        must(recorder.report.timesCompletedWithError).be(0);
        must(recorder.report.taskID).be('testingTask1');
        must(recorder.report.timeStarted).be.an.array();
        must(recorder.report.timeEnded).be.an.array();
        must(recorder.report.duration).be.an.array();
        must(recorder.report.status).be('GOOD');
        must(recorder.report.message).be('The task has completed!');

    });


    it('taskCompletedWithError()', function(done) {

        report.taskStarted('testingTask2', 'The test has started!');
        report.taskCompletedWithError(new Error('Phony Error'));
        must(recorder.report.timesCompleted).be(0);
        must(recorder.report.timesCompletedWithError).be(1);
        must(recorder.report.taskID).be('testingTask2');
        must(recorder.report.timeStarted).be.an.array();
        must(recorder.report.timeEnded).be.an.array();
        must(recorder.report.duration).be.an.array();
        must(recorder.report.status).be('ERROR');
        must(recorder.report.message).be('Phony Error');
        done();


    });


});
