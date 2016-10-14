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

    __autoload() {
        this.submodules.forEach(m => m.__autoload());
    }

    __framework() {
        this.submodules.forEach(m => m.__framework());
    }

    __connections() {
        return this.submodules.map(m => m.__connections());
    }

    __viewEngine() {
        return this.submodules.forEach(m => m.__viewEngine());
    }

    __filters(app, defaults) {
        return this.submodules.forEach(m => m.__filters(app, defaults));
    }

    __routing(path, app, actions) {
        return this.submodules.forEach(m => m.__routing(path, app, actions));
    }

    path() {

        throw new ReferenceError('CompositeModule#path is not implemented!');

    }

    find(path) {

        var subs = this.submodules.slice();

        var next = function(sub) {

            if (!sub) return null;

            if ((sub.isChild(path)) || (sub.path() === path))
                return sub.find(path);

            return next(subs.pop());

        }

        return next(subs.pop());

    }

}

export default CompositeModule
