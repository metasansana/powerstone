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

    /**
     * modules 
     * @param {object} mods
     */

    _createClass(CompositeModule, [{
        key: "modules",
        value: function modules(mods) {
            this.submodules.forEach(function (m) {
                return m.modules(mods);
            });
        }

        /**
         * framework 
         * @param {object} connectors
         * @param {pipes} pipes 
         */
    }, {
        key: "framework",
        value: function framework(connectors, pipes) {
            this.submodules.forEach(function (m) {
                return m.framework(connectors, pipes);
            });
        }

        /**
         * expressFramework
         * @param {object} middleware
         * @param {object} engines
         */
    }, {
        key: "expressFramework",
        value: function expressFramework(middleware, engines) {
            this.submodules.forEach(function (m) {
                return m.framework(middleware, engines);
            });
        }

        /**
         * restifyFramework 
         * @param {object} plugins 
         */
    }, {
        key: "restifyFramework",
        value: function restifyFramework(plugins) {
            this.submodules.forEach(function (m) {
                return m.restifyFramework(plugins);
            });
        }

        /**
         * connections 
         * @param {object} types 
         * @param {object} conns 
         */
    }, {
        key: "connections",
        value: function connections(types, conns) {
            return this.submodules.map(function (m) {
                return m.connections(types, conns);
            });
        }

        /**
         * userland 
         * @param {object} registry 
         */
    }, {
        key: "userland",
        value: function userland(controllers, models, middleware) {
            this.submodules.forEach(function (m) {
                return m.userland(controllers, models, middleware);
            });
        }

        /**
         * express 
         * @param {express.Application} app
         * @param {express} express 
         * @param {object} mware 
         */
    }, {
        key: "express",
        value: function express(app, _express, mware) {
            this.submodules.forEach(function (m) {
                return m.express(app, _express, mware);
            });
        }

        /**
         * restify 
         * @param {restify.Application} app 
         */
    }, {
        key: "restify",
        value: function restify(app, plugins) {
            this.submodules.forEach(function (m) {
                return m.restify(app, plugins);
            });
        }
    }]);

    return CompositeModule;
})();

exports["default"] = CompositeModule;
module.exports = exports["default"];
//# sourceMappingURL=CompositeModule.js.map