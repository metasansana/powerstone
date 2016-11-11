/**
 * copy the properties of one object into another.
 * @param {object} src
 * @param {object} dest
 */
export function copy(src, dest) {

    for (var key in src)
        dest[key] = src[key];

}

/**
 * merge all arguments passed into one object (shallow)
 * @param {object} {...o}
 */
export function merge() {

    var ret = {};

    for (var i = 0; i < arguments.length; ++i)
        copy(arguments[i], ret);

    return ret;

}
