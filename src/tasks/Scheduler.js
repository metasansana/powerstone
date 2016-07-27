/**
 * Scheduler is responsible for running tasks before the application
 * starts accepting client requests.
 */
class Scheduler {

    constructor() {

        this._tasks = {};

    }

    onStateChange(app) {

        if (app.getState() === 'connected')
            this.schedule();

    }

    /**
     * add a Task to the Scheduler
     * @param {string} id 
     * @param {Task} task 
     * @returns {Scheduler}
     */
    add(id, task) {

        if (this._tasks.hasOwnProperty(id))
            throw new Error(`The task ${id} has been registered already`);

        this._tasks[id] = task;

        return this;

    }

    /**
     * getTaskById returns a task specified by id
     * @param {string} id 
     * @returns {Task|null}
     */
    getTaskByName(id) {

        if (this._tasks[id])
            return this._tasks[id];

        return null;

    }

    /**
     * schedule all the tasks
     * @returns {Scheduler}
     */
    schedule() {

        Object.keys(this._tasks).forEach(k => this._tasks[k].start());
        return this;

    }

}

export default new Scheduler()
