/**
 * Route
 * @param {string} method 
 * @param {string} path 
 * @param {object} route 
 * @param {array<function>} actions 
 * @param {FrameworkApplication} app 
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route = (function () {
    function Route(method, path, actions, app) {
        _classCallCheck(this, Route);

        actions.unshift(this.handleRoute.bind(this));
        app[method.toLowerCase()].apply(app, [path].concat(actions));
    }

    _createClass(Route, [{
        key: "handleRoute",
        value: function handleRoute(req, res, next) {

            next();
        }
    }]);

    return Route;
})();

exports["default"] = Route;
module.exports = exports["default"];
//# sourceMappingURL=Route.js.map