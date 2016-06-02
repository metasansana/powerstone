/**
 * Resource is an interface used to locate code resources dynamically.
 * @interface
 */
class Resource {

    /**
     * find looking up of a particular resource
     * @param {string} path A string that tells us how to find the resource
     * @returns {Resource}
     */
    find(path) {}

}

export default Resource
