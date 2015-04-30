var TaskRunner = require('./TaskRunner');

function Task () {
    TaskRunner.tasks.push(this);
}

module.exports = Task;