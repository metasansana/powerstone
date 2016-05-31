/**
 * Route
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route = (function () {
    function Route(path, method, handler) {
        _classCallCheck(this, Route);

        this._path = path;
        this._method = method.toLowerCase();
        this._handler = handler;

        handler[this._method](path, this.onRoute.bind(this));
    }

    _createClass(Route, [{
        key: "onRoute",
        value: function onRoute(req, res, next) {

            next();
        }

        /**
         * addDispatch
         * @param {function} f  
         * @return {Route}
         */
    }, {
        key: "addDispatch",
        value: function addDispatch(f) {

            this._handler[this._method](this._path, f);
            return this;
        }
    }]);

    return Route;
})();

exports["default"] = Route;
module.exports = exports["default"];
//# sourceMappingURL=WebRoute.js.map