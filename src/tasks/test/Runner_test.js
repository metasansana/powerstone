import Runner from '../Runner';
import must from 'must';


var runner;
var tasks;
var recorder;

function makeRunnableTask() {
    return {
        count: 0,
        taskWillRun: function(yes, no){
            yes();
        },
        run: function(_, done){
            this.count++;
            done();
        }
    }
}

function makeUnRunnableTask() {
    return {
        count: 0,
        taskWillRun: function(yes, no){
            no();
        },
        run: function(done){
            this.count++;
            done();
        }
    }
}

describe('Runner', function() {

    beforeEach(function(){

    });

    it('will run tasks that should be run', function() {
        var repeatTask = makeRunnableTask();
        var repeatTask2 = makeUnRunnableTask();
        tasks = [
            makeRunnableTask(),
            repeatTask2,
            repeatTask2,
            makeUnRunnableTask(),
            repeatTask,
            repeatTask,
            makeRunnableTask()];

        runner = new Runner(tasks, {taskCompleted: function(){}});
        return runner.runAllTasks().
            then(function(){
                must(tasks[0].count).be(1);
                must(tasks[1].count).be(0);
                must(tasks[2].count).be(0);
                must(tasks[3].count).be(0);
                must(tasks[4].count).be(2);
                must(tasks[5].count).be(2);
                must(tasks[6].count).be(1);
            });
    })

});