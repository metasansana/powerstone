import Configuration from '../Configuration';
/**
 * ModuleResource looks up a resource by querying an object.
 * @implements {Resource}
 * @param {Module} parent 
 */
class ModuleResource {

    constructor(parent) {

        this._parent = parent;

    }

    find(path) {

        return new this._parent.constructor(path,
            new Configuration(this._parent.configDirectory,
                `${this._parent.configuration.paths.modules}/${path}`),
            this._parent.context, this._parent.application);

    }

}

export default ModuleResource
