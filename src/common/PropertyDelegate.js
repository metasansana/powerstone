/**
 * PropertyDelegate looks up a resource by querying an object.
 * @implements {ResourceDelegate}
 * @param {object} o
 */
class PropertyDelegate {

    constructor(o) {

        this._o = o;

    }

    resolve(path) {

        return {
            basename: path,
            dirname: null,
            path: path,
            module: null
        };


    }

    lookup(path) {
        return {
            basename: path,
            dirname: null,
            path: path,
            module: this._o[path]
        };
    }

}
export default PropertyDelegate
