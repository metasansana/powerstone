/**
 * CompositeModule provides an api for calling the same
 * method on multiple Modules at once.
 * @param {array} modules 
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CompositeModule = (function () {
    function CompositeModule(modules) {
        _classCallCheck(this, CompositeModule);

        this.submodules = modules;
    }

    _createClass(CompositeModule, [{
        key: "add",
        value: function add(m) {

            this.submodules.push(m);
            return this;
        }
    }, {
        key: "__init",
        value: function __init() {
            this.submodules.forEach(function (m) {
                return m.__init();
            });
        }
    }, {
        key: "__autoload",
        value: function __autoload() {
            this.submodules.forEach(function (m) {
                return m.__autoload();
            });
        }
    }, {
        key: "__framework",
        value: function __framework() {
            this.submodules.forEach(function (m) {
                return m.__framework();
            });
        }
    }, {
        key: "__connections",
        value: function __connections() {
            return this.submodules.map(function (m) {
                return m.__connections();
            });
        }
    }, {
        key: "__filters",
        value: function __filters(app, defaults) {
            return this.submodules.forEach(function (m) {
                return m.__filters(app, defaults);
            });
        }
    }, {
        key: "__routing",
        value: function __routing(path, app, actions) {
            return this.submodules.forEach(function (m) {
                return m.__routing(path, app, actions);
            });
        }
    }]);

    return CompositeModule;
})();

exports["default"] = CompositeModule;
module.exports = exports["default"];
//# sourceMappingURL=CompositeModule.js.map