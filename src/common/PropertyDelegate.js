/**
 * PropertyDelegate looks up a resource by querying an object.
 * @implements {ResourceDelegate}
 * @param {object} o
 */
class PropertyDelegate {

    constructor(name, o) {

        this._o = o;
        this._name = name;

    }

    resolve(path) {

        if (!this._o.hasOwnProperty(path))
            throw new Error(`Unknown ${name} '${path}'!`);

        return {
            basename: path,
            dirname: null,
            path: path,
            module: null
        };


    }

    lookup(path) {

        if (!this._o.hasOwnProperty(path)) 
            throw new Error(`Unknown ${this._name} '${path}'!`);

        return {
            basename: path,
            dirname: null,
            path: path,
            module: this._o[path]
        };
    }

}
export default PropertyDelegate
