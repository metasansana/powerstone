/**
 * ResourceDelegate is an interface used to locate code resources dynamically.
 * @interface
 *
 */
class ResourceDelegate {

    /**
     * resolve provides the expanded path of where this lookup will search.
     * @param {string} path 
     * @retuns {Resource}
     */
    resolve(path) {

    }

    /**
     * lookup looking up of a particular resource
     * @param {string} path A string that tells us how to find the resource
     * @returns {Resource}
     */
    lookup(path) {}

}

export default ResourceDelegate
