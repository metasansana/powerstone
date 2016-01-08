/**
 * ProjectRegistry
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ProjectRegistry = (function () {
    function ProjectRegistry() {
        _classCallCheck(this, ProjectRegistry);

        this.models = Object.create(null);
        this.controllers = Object.create(null);
        this.queries = Object.create(null);
        this.middleware = Object.create(null);
        this.pipes = Object.create(null);
    }

    _createClass(ProjectRegistry, [{
        key: 'convertMiddleware',

        /**
         * convertMiddleware turns an array of strings
         * into an array of executable middleware functions
         * @param {array} wares 
         * @returns {array<string>}
         */
        value: function convertMiddleware(wares) {
            var _this = this;

            return wares.map(function (w) {

                if (typeof w === 'function') return w;
                if (!_this.middleware[w]) throw new Error('Unknown middleware: \'' + w + '\' declared in route file!');
                return _this.middleware[w];
            });
        }
    }, {
        key: 'convertAction',

        /**
         * convertAction makes an executable of an action decleration
         */
        value: function convertAction(action, route) {

            var Controller;
            var method;

            if (typeof action === 'function') return action;
            action = action.split('.');
            Controller = this.controllers[action[0]];
            method = action[1];

            if (!Controller) throw new Error('Unknown controller: \'' + action[0] + '\' decleared in route file!');

            return function (req, res) {

                var i = new Controller(req, res, route);
                if (typeof i[method] !== 'function') {
                    res.send(500);
                    return res.send();
                }
                i[method]();
            };
        }
    }]);

    return ProjectRegistry;
})();

exports['default'] = new ProjectRegistry();
module.exports = exports['default'];
//# sourceMappingURL=ProjectRegistry.js.map