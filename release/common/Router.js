/**
 * Router
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = (function () {
    function Router(handler) {
        _classCallCheck(this, Router);

        this._handler = handler;
        this._routes = [];
    }

    /**
     * add a Route to this router
     * @param {string} path 
     * @param {Route} route 
     */

    _createClass(Router, [{
        key: "add",
        value: function add(path, route) {

            route.apply(this._handler);
            this._routes.push(route);
        }
    }]);

    return Router;
})();

exports["default"] = Router;
module.exports = exports["default"];
//# sourceMappingURL=Router.js.map