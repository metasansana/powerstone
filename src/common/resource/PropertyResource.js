/**
 * PropertyResource looks up a resource by querying an object.
 * @implements {Resource}
 * @param {object} o
 */
class PropertyResource {

    constructor(o) {

        this._o = o;

    }

    find(path) {

        return this._o[path];

    }

}
export default PropertyResource
