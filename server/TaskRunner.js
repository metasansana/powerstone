var Promise = require('bluebird');


/**
 * TaskRunner runs tasks one by one.
 */
function TaskRunner () {
        this.tasks = [];
}

TaskRunner.prototype.nextTask = function(cb) {

    var next = this.tasks.pop();
    var self = this;
    var ifErr = function(err){if (err) return cb(err); self.nextTask(cb);};

    if(!next) return cb();

    next.run(ifErr);

}

/**
 * run the tasks
 * @retturn {Promise}
 */
TaskRunner.prototype.run = function () {

    var self = this;

    return new Promise(function(resolve, reject) {

        self.nextTask(function(err) {

            if(err) return reject(err);

            resolve();

        })

    });

};

module.exports = new TaskRunner();

