import pathModule from 'path';

/**
 * RequireResource locates a resource relative to the path it is
 * created with.
 * @param {string} [path='']
 * @implements {Resource}
 */
class RequireResource {

    constructor(path) {

            this._path = (path)? path : ''+`${path}/`;

        if (typeof this._path !== 'string')
            throw new TypeError(`The argument 'path' must be a string, got '${typeof  path}'!`);



    }

    find(path) {

        return require(`${this._path}${path}`);

    }

}

export default RequireResource
