import ScheduledTask from '../ScheduledTask';
import must from 'must';

var report;
var task;

class SomeTask extends ScheduledTask {

    runTask(report, cb){

        setTimeout(cb, 1000);

    }

}

class ErrorTask extends ScheduledTask {

    runTask(report, cb){

        setTimeout(function() {
            cb(new Error('Some error'));
        }, 1000);

    }

}

describe('ScheduledTask', function(done) {

    beforeEach(function() {

        report = {
            called: false,
            completed: false,
            taskStarted: function() {
                this.called = true;
            },
            taskCompletedWithError(err){
            this.completed = err.message;
        },
            taskCompleted: function(){
                this.completed = true;
            }
        };

    });

    it('should run task at specified time ', function (done) {

        task = new SomeTask(new Date(Date.now()+6000));

        setTimeout(function() {
             must(report.completed).be.false();
        }, 5000);

        setTimeout(function() {
            must(report.completed).be('Some Error');
            done();
        }, 7000);

        task.run(report, function(){
            done();
        });

    });

    it('should run task at specified time and report errors ', function (done) {

        task = new ErrorTask(new Date(Date.now()+6000));

        setTimeout(function() {
            must(report.completed).be.false();
        }, 5000);

        setTimeout(function() {
            must(report.completed).be.true();
            done();
        }, 7000);

        task.run(report, function(){
            done();
        });

    });

});