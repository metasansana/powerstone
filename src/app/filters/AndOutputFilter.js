import Promise from 'bluebird';

/**
 * AndOutputFilter
 */
class AndOutputFilter {

    constructor(first, next) {

        this._first = first;
        this._next = next;

    }

    and(filter) {

        return new AndOutputFilter(this, filter);

    }

    apply(out, req, res) {

        return Promise.resolve(this._first.apply(out, req, res)).
        then(out => this._next.apply(out, req, res));

    }

}

export default AndOutputFilter
