/**
 * ViewAction
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewAction = (function () {
    function ViewAction(cb) {
        _classCallCheck(this, ViewAction);

        this._cb = cb;
    }

    _createClass(ViewAction, [{
        key: "create",
        value: function create(method, path, route) {

            if (route.view) {
                return this.cb(view);
            }
        }
    }]);

    return ViewAction;
})();

exports["default"] = ViewAction;
module.exports = exports["default"];
//# sourceMappingURL=ViewAction.js.map