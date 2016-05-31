import UnknownResourceLookupError from './UnknownResourceLookupError';

/**
 * BulkLookup provides an api that lets client code determine which
 * lookup to invoke to locate a piece of code we want to utilize.
 *
 * It works by utilizing a URL like string where the scheme tells us what 
 * lookup to use.
 * Example:
 * ```javascript
 *  
 *   'require://path-to-file-to-require'
 *
 * ```
 * @param {ResourceLookup} lookup The default lookup to use if nothing else matches.
 * @implements {ResourceLookup}
 */
class BulkLookup {

    constructor(lookup) {

        this._default = lookup;
        this._lookups = {};

    }

    /**
     * add a lookup to the internal list
     * @param {string} name 
     * @param {ResourceLookup} lookup
     */
    add(name, lookup) {

        this._lookups[name] = lookup;
        return this;

    }

    lookup(path) {

        var parts = path.split('://');
        var scheme = parts[0]
        var lookup = null;

        if (parts.length === 1)
            lookup = this._default;

        lookup = this._lookups[scheme];

        if (!lookup)
            throw new UnknownResourceLookupError(scheme, parts[1]);

        return lookup.lookup(parts[1]);

    }

}

export default BulkLookup
