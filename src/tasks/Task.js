/**
 * Task is the simplest form of a task.
 *
 * It simply executes its Task#run() method when asked to.
 * To implement a Task, extend this class and override the runTask method.
 */
class Task {

    /**
     * runTask contains the actual code for the task.
     * @param {TaskReport} report
     * @param {Function} cb
     * @abstract
     */
    runTask(report, cb) {
        throw new Error('Task#runTask() must be overridden!');
    }

    /**
     * taskWillRun is called to determine if the task should be ran or not.
     * @param {Function} yes
     * @param {Function} no
     * @param {TaskReport} report
     */
    taskWillRun(yes, no, report){
        yes();
    }

    /**
     * run this task
     * @param {TaskReport} report
     * @param {Function} cb
     */
    run(report, cb){
        report.taskStarted();
        this.runTask(report, function(err, message){
            if(err) return report.taskCompletedWithError(err);
            report.taskCompleted(message);
            cb();
        });
    }

}

export default Task;