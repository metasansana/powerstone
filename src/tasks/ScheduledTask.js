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

        new CronJob(this.schedule, function() {
            report.taskStarted();
            this.runTask(report, function(err, message){
                if(err) return report.taskCompletedWithError(err);
                report.taskCompleted(message);
            });
        }.bind(this),true);

        cb();

    }
}

export default ScheduledTask
