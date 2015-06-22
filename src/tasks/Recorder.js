/**
 * Recorder provides an interface for recording the result of a task.
 * @interface
 */
class Recorder {

    /**
     * taskCompleted is called by the Report when the task is completed.
     * @param {Object} report
     * @param {Function} cb
     */
    taskCompleted(report, cb){}

}

export default Recorder
