/**
 * ProjectRegistry
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectRegistry = (function () {
    function ProjectRegistry() {
        _classCallCheck(this, ProjectRegistry);

        this.models = {};
        this.controllers = {};
        this.tasks = {};
        this.queries = {};
        this.middleware = {};
    }

    _createClass(ProjectRegistry, [{
        key: "getTasks",
        value: function getTasks() {
            var _this = this;

            return Object.keys(this.tasks).map(function (key) {
                return _this.tasks[key];
            });
        }
    }, {
        key: "resolveController",
        value: function resolveController() {}
    }, {
        key: "resolveModel",
        value: function resolveModel() {}
    }]);

    return ProjectRegistry;
})();

exports["default"] = new ProjectRegistry();
module.exports = exports["default"];
//# sourceMappingURL=ProjectRegistry.js.map