import Promise from 'bluebird';
import Report from './Report';

/**
 * Runner is responsible for running tasks before the application
 * starts accepting client requests.
 */
class Runner {

    constructor(tasks, recorder){
        this.tasks = tasks;
        this.queue = null;
        this.recorder = recorder;
    }

    _nextTask(cb) {

        var self = this;
        var next = self.queue.pop();
        var report = new Report(self.recorder);

        var ifErr = function(err){
            if (err)  {
                return cb(err);
            }
            self._nextTask(cb);
        };

        var onYes = function() {
            next.run(ifErr, report);
        };

        var onNo = function() {
            self._nextTask(cb);
        };

        if(!next) return cb();

        next.taskWillRun(onYes, onNo, report);

    }

    runAllTasks() {

        this.queue = this.tasks.slice();

        return new Promise(function(resolve, reject) {

            this._nextTask(function(err) {

                if(err) return reject(err);

                resolve();

            })

        }.bind(this));
    }

}

export default Runner