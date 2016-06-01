/**
 * Context is a class that stores a shared context between
 * modules and their submodules.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Context = function Context() {
    _classCallCheck(this, Context);

    this.middleware = {};
    this.connectors = {};
    this.controllers = {};
    this.filters = {};
};

exports["default"] = Context;
module.exports = exports["default"];
//# sourceMappingURL=Context.js.map