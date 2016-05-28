import path from 'path';

/**
 * RequireLookup locates a resource relative to the path it is
 * created with.
 * @param {string} [path='']
 * @implements {ResourceHandler}
 */
class RequireLookup {

    constructor(path) {

        this._path = '';

        if (path)
            this._path = `${path}/`;

    }

    handle(path) {

        return require(`${this._path}${path}`);

    }

}

export default RequireLookup
