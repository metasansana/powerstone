/**
 * ConsoleRecorder logs the result of a completed tasks to console.
 * @implements Recorder
 */
class ConsoleRecorder {

    taskCompleted(report, cb) {
        console.log(report);
        cb();
    }

}

export default ConsoleRecorder
