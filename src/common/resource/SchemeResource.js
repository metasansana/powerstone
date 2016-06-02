/**
 * SchemeResource provides an api that lets client code determine which
 * ResourceDelegate to invoke to locate a piece of code we want to utilize.
 *
 * It works by utilizing a URL like string where the scheme tells us what 
 * delegate to use.
 * Example:
 * ```javascript
 *  
 *   'require://path-to-file-to-require'
 *
 * ```
 * @param {Resource} delegate The default ResourceDelegate to use if nothing else matches.
 * @implements {Resource}
 */
class SchemeResource {

    constructor(delegate) {

        this._default = delegate;
        this._delegates = {};

    }

    /**
     * add a delegate to the internal list
     * @param {string} name 
     * @param {ResourceDelegate} delegate
     */
    add(name, delegate) {

        this._delegates[name] = delegate;
        return this;

    }

    find(path) {

        if (typeof path !==  'string')
            throw new TypeError('Value supplied for resource string is invalid or empty!');

        var parts = path.split('://');
        var scheme = parts[0];
        var delegate = null;

        if (parts.length === 1) {
            delegate = this._default;
            path = parts[0];
        } else {
            delegate = this._delegates[scheme];
            path = parts[1];
        }

        return delegate.find(path);

    }

}

export default SchemeResource
