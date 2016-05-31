import pathModule from 'path';

/**
 * RequireLookup locates a resource relative to the path it is
 * created with.
 * @param {string} [path='']
 * @implements {Resourcelookup}
 */
class RequireLookup {

    constructor(path) {

        this._path = '';

        if (path)
            this._path = `${path}/`;

    }

    lookup(path) {

      path = `${this._path}${path}`;
        return {
            basename: pathModule.basename(path, '.js'),
            dirname: pathModule.dirname(path),
            parameters: null,
            path: path,
            module: require(path)

        };

    }

}

export default RequireLookup
