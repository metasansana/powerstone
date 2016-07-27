import cron from 'node-cron';

/**
 *
 * Task provides a primitive we can use to schedule a Task for execution independant of 
 * http request.
 * @param {string} time - The time to run this task in cron format.
 * @param {function} cb - A function that will be run by this Task
 *
 */
class Task {

    constructor(time, cb) {

        this._time = time;
        this._cb = cb;
        this._task = null;

    }

    /**
     * convertTime normalizes a string to cron time.
     * @param {string} time 
     * @returns {string}
     */
    convertTime(time) {

        return time;

    }

    /**
     * run
     */
    run() {

        return this._cb();

    }

    /**
     * start this Task
     * @param {string} time 
     */
    start() {

        this._task = cron.schedule(this.convertTime(time), this._cb);
        this._task.start();

    }

    /**
     * cancel this Task
     * @return {Task}
     */
    cancel() {

        if (!this._task)
            throw new TypeError('This task has not been scheduled yet!');

        this._task.destroy();
        this._task = null;

    }


}

export default Task;
