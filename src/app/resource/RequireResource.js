import pathModule from 'path';
import Resource from './Resource';

/**
 * RequireResource locates a resource relative to the path it is
 * created with.
 * @param {string} [path='']
 */
class RequireResource extends Resource {

    constructor(path) {

        super();

        this._path = (path) ? '' + `${path}/` : '';

        if (typeof this._path !== 'string')
            throw new TypeError(`The argument 'path' must be a string, got '${typeof  path}'!`);

    }

    find(path) {

        var ret = require(`${this._path}${path}`);
        if (ret.default)
            return ret.default;

        return ret;

    }

}

export default RequireResource
