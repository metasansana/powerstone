/**
 * PropertyDelegate looks up a resource by querying an object.
 * @implements {ResourceDelegate}
 * @param {object} o
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PropertyDelegate = (function () {
    function PropertyDelegate(name, o) {
        _classCallCheck(this, PropertyDelegate);

        this._o = o;
        this._name = name;
    }

    _createClass(PropertyDelegate, [{
        key: "resolve",
        value: function resolve(path) {

            if (!this._o.hasOwnProperty(path)) throw new Error("Unknown " + name + " '" + path + "'!");

            return {
                basename: path,
                dirname: null,
                path: path,
                module: null
            };
        }
    }, {
        key: "lookup",
        value: function lookup(path) {

            if (!this._o.hasOwnProperty(path)) throw new Error("Unknown " + this._name + " '" + path + "'!");

            return {
                basename: path,
                dirname: null,
                path: path,
                module: this._o[path]
            };
        }
    }]);

    return PropertyDelegate;
})();

exports["default"] = PropertyDelegate;
module.exports = exports["default"];
//# sourceMappingURL=PropertyDelegate.js.map