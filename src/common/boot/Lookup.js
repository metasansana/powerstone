import UnknownHandlerError from './UnknownHandlerError';

/**
 * Handler is an interface used to locate code resources.
 * @interface
 *
 */
class ResourceHandler {

    /**
     * handle looking up of a particular resource
     * @param {string} path A string that tells us how to find the resource
     * @returns {*}
     */
    handle(path) {}

}


/**
 * Lookup provides an api that lets client code determine which
 * handler to invoke to locate a piece of code we want to utilize.
 *
 * It works by utilizing a URL like string where the scheme tells us what 
 * handler to use.
 * Example:
 * ```javascript
 *  
 *   'require://path-to-file-to-require'
 *
 * ```
 * @param {string} scheme The scheme for the default handler
 * @param {ResourceHandler} handler The default handler to use if nothing else matches.
 * @implements {ResourceHandler}
 */
class Lookup {

    constructor(scheme, handler) {

        this._defaultScheme = scheme;
        this._handlers = {};
        this._handlers[scheme] = handler;

    }

    /**
     * add a handler to the internal list
     * @param {string} name 
     * @param {ResourceHandler} handler
     */
    add(name, handler) {

        this._handlers[name] = handler;
        return this;

    }

    handle(path) {

        var parts = path.split('://');
        var handler = parts[0]

        if (parts.length === 1)
            handler = this._defaultScheme;

        if (!this._handlers.hasOwnProperty(handler))
            throw new UnknownHandlerError(handler, parts[1]);

        return this._handlers[handler].handle(parts[1]);

    }

}

export default Lookup
