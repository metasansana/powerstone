import Task from './Task';
import {CronJob} from 'cron';

/**
 * ScheduledTask runs a task at a specific time period.
 *
 * Uses node-cron behind the scenes to support a crontab like syntax.
 */
class ScheduledTask extends Task {

    constructor(schedule){
        super();
        this.schedule = schedule;
    }

    run(report, cb){

        var self = this;
        new CronJob(this.schedule, function() {
            report.taskStarted(self.taskID || self.constructor.name);
            self.runTask(report, function(err, message){
                (err)? report.taskCompletedWithError(err) : report.taskCompleted(message);
            });
        }, function(){console.log('me');}, true);

        cb();
    }
}

export default ScheduledTask
