/**
 * ConsoleRecorder logs the result of a completed tasks to console.
 * @implements Recorder
 */
class ConsoleRecorder {

    taskCompleted(report) {
        console.log('\n\n',report,'\n\n');
    }

}

export default ConsoleRecorder
