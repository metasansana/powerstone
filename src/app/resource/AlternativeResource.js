/**
 * AlternativeResource
 */
class AlternativeResource {

    constructor(left, right) {

        this._left = left;
        this._right = right;

    }

    find(path) {

        var result = this._left.find(path);

        if ((result === null) || (result === undefined))
            return this._right.find(path);

        return result;

    }

    or(r) {

        return new AlternativeResource(this, r);

    }

}

export default AlternativeResource
