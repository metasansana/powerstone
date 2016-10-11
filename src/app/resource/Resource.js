import AlternativeResource from './AlternativeResource';
/**
 * Resource is an interface used to locate code resources dynamically.
 */
class Resource {

    /**
     * find looking up of a particular resource
     * @param {string} path A string that tells us how to find the resource
     * @returns {Resource}
     */
    find(path) {}

    /**
     * or triggers a search in a connected Resource if it is not found
     * on this one.
     * @param {Resource} r
     * @returns {Resource};
     */
    or(r) {

        return new AlternativeResource(this, r);

    }

}

export default Resource
