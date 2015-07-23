var TaskRunner = require('./TaskRunner');

function Task () {
    TaskRunner.members.push(this);
}

module.exports = Task;