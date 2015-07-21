import tasks from './tasks';

/**
 * TaskRecorderRegistryFactory
 */
class TaskRecorders {

    constructor() {
        this.recorders = {};
    }

    register(name, recorder){
        this.recorders[name] = recorder;
        return this;
    }

    create(name) {
        if(this.recorders.hasOwnProperty(name))
        return this.recorders[name];
        return new tasks.ConsoleRecorder();
    }
}

export default new TaskRecorders();