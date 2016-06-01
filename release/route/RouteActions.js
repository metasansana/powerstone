/**
 * BulkAction provides an api for grouping actions together
 * so that the Route class has an easier time utilizing them.
 * @param {array<Action>} actions 
 * @implments {Action}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BulkAction = (function () {
    function BulkAction(actions) {
        _classCallCheck(this, BulkAction);

        this._actions = actions;
    }

    _createClass(BulkAction, [{
        key: "generate",
        value: function generate(method, path, route) {

            var all = [];

            this._actions.forEach(function (a) {
                return all.push.apply(all, a.generate(method, path, route));
            });

            return all;
        }
    }]);

    return BulkAction;
})();

exports["default"] = BulkAction;
module.exports = exports["default"];
//# sourceMappingURL=RouteActions.js.map