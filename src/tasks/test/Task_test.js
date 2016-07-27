import Task from '../Task';
import must from 'must';

class SomeTask extends Task {

    runTask(report, cb){

        setTimeout(function() {
            cb();
        }, 1000);

    }

}

describe('Task', function() {

    it('should work ', function(done) {

        var task = new SomeTask();
        var report = {
            taskStarted: function() {
                this.called = true;
            },
            taskCompleted: function() {
            }

        }

        task.run(report, function(){
            must(report.called).be.true();
            done();
        });

    });

});