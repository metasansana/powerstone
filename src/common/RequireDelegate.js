import pathModule from 'path';

/**
 * RequireDelegate locates a resource relative to the path it is
 * created with.
 * @param {string} [path='']
 * @implements {ResourceDelegate}
 */
class RequireDelegate {

    constructor(path) {

        this._path = '';

        if (path)
            this._path = `${path}/`;

    }

    resolve(path) {

        path = `${this._path}${path}`;

        return {
            basename: pathModule.basename(path, '.js'),
            dirname: pathModule.dirname(path),
            path: path,
            module: null
        };

    }

    lookup(path) {

        path = `${this._path}${path}`;
        return {
            basename: pathModule.basename(path, '.js'),
            dirname: pathModule.dirname(path),
            path: path,
            module: require(path)
        };

    }

}

export default RequireDelegate
