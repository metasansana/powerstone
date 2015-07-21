/**
 * ProjectRegistry
 */
class ProjectRegistry {

    constructor() {
        this.models = {};
        this.controllers = {};
        this.tasks = {};
        this.queries = {};
        this.middleware = {};
    }

    getTasks() {
        return Object.keys(this.tasks).
            map(key=>this.tasks[key])
    }

    resolveController(){

    }

    resolveModel() {

    }

}

export default new ProjectRegistry()