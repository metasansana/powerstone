/**
 * Report
 */
class Report {

    constructor(recorder) {
        this.recorder = recorder;
        this.report = {timesCompleted: 0, timesCompletedWithError: 0};
    }

    taskStarted(taskID) {
        this.report.taskID = taskID;
        this.report.timeStarted = process.hrtime();
    }

    taskCompleted(message) {
        this.report.timeEnded = process.hrtime();
        this.report.duration = process.hrtime(this.report.timeStarted);
        this.report.status = 'GOOD';
        this.report.timesCompleted = this.report.timesCompleted +1;
        this.report.message = message;
        this.recorder.taskCompleted(this.report);
        this.reset();
    }

    taskCompletedWithError(err) {
        this.report.timeEnded = process.hrtime();
        this.report.duration = process.hrtime(this.report.timeStarted);
        this.report.stack = err.stack;
        this.report.status = 'ERROR';
        this.report.message = err.message;
        this.report.timesCompletedWithError = this.report.timesCompletedWithError+1;
        this.recorder.taskCompleted(this.report);
        this.reset();
    }

    reset() {
        this.report = {};
    }

}

export default Report
