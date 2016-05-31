/**
 * CompositeModule provides an api for calling the same
 * method on multiple Modules at once.
 * @param {array} modules 
 */
class CompositeModule {

    constructor(modules) {
        this.submodules = modules;
    }

    add(m) {

      this.submodules.push(m);
      return this;

    }

    __init() {
        this.submodules.forEach(m => m.__init());
    }

    __framework() {

        this.submodules.forEach(m => m.__framework());
    }

    __connections() {
        return this.submodules.map(m => m.__connections());
    }

    __middleware() {
        return this.submodules.forEach(m => m.__middleware());
    }

    __routing() {
        return this.submodules.forEach(m => m.__routing());
    }

}

export default CompositeModule
