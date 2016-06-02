/**
 * PropertyResource looks up a resource by querying an object.
 * @implements {Resource}
 * @param {object} o
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PropertyResource = (function () {
    function PropertyResource(o) {
        _classCallCheck(this, PropertyResource);

        this._o = o;
    }

    _createClass(PropertyResource, [{
        key: "find",
        value: function find(path) {

            return this._o[path];
        }
    }]);

    return PropertyResource;
})();

exports["default"] = PropertyResource;
module.exports = exports["default"];
//# sourceMappingURL=PropertyResource.js.map