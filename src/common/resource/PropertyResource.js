/**
 * PropertyResource looks up a resource by querying an object.
 * @implements {Resource}
 * @param {object} o
 *
 * @property {object} context
 */
class PropertyResource {

    constructor(o) {

        this.context = o;

    }

    find(path) {

        return this.context[path];

    }

}
export default PropertyResource
