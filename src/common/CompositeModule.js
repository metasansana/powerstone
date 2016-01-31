/**
 * CompositeModule provides an api for calling the same
 * method on multiple Modules at once.
 * @param {array} modules 
 */
class CompositeModule {

    constructor(modules) {
        this.submodules = modules;
    }

    /**
     * modules 
     * @param {object} mods
     */
    modules(mods) {
        this.submodules.forEach(m => m.modules(mods));
    }

    /**
     * framework 
     * @param {object} connectors
     * @param {object} pipes 
     */
    framework(connectors, pipes) {
        this.submodules.forEach(m => m.framework(connectors, pipes));
    }

    /**
     * expressFramework
     * @param {object} middleware
     * @param {object} engines
     */
    expressFramework(middleware, engines) {
        this.submodules.forEach(m => m.expressFramework(middleware, engines));
    }

    /**
     * restifyFramework 
     * @param {object} plugins 
     */
    restifyFramework(plugins) {
        this.submodules.forEach(m => m.restifyFramework(plugins));
    }

    /**
     * connections 
     * @param {object} types 
     * @param {object} conns 
     */
    connections(types, conns) {
        return this.submodules.map(m => m.connections(types, conns));
    }

    /**
     * userland 
     * @param {object} registry 
     */
    userland(controllers, models, middleware) {
        this.submodules.forEach(m => m.userland(controllers, models, middleware));
    }

    /**
     * express 
     * @param {express.Application} app
     * @param {express} express 
     * @param {object} mware 
     */
    express(app, express, mware) {
        this.submodules.forEach(m => m.express(app, express, mware));
    }

    /**
     * restify 
     * @param {restify.Application} app 
     */
    restify(app, plugins) {
        this.submodules.forEach(m => m.restify(app, plugins));
    }

}

export default CompositeModule
