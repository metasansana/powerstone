/**
 * ResourceLookup is an interface used to locate code resources.
 * @interface
 *
 */
class ResourceLookup {

    /**
     * lookup looking up of a particular resource
     * @param {string} path A string that tells us how to find the resource
     * @returns {Resource}
     */
    lookup(path) {}

}

export default ResourceLookup
