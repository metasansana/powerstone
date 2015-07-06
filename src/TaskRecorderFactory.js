import tasks from './tasks';

/**
 * TaskRecorderFactory
 */
class TaskRecorderFactory {

    create() {
        return new tasks.ConsoleRecorder();
    }
}

export default new TaskRecorderFactory();