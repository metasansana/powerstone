/**
 * Converter converts strings into their object counterparts.
 *
 * @param {object} mwares A map of middleware functions.
 * @param {object} controllers A map of controller objects.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Converter = (function () {
    function Converter(mwares, controllers) {
        _classCallCheck(this, Converter);

        this.mwares = mwares;
        this.controllers = controllers;
    }

    /**
     * middleware turns an array of strings
     * into an array of executable middleware functions
     * @param {array} wares 
     * @returns {array<function>}
     */

    _createClass(Converter, [{
        key: 'middleware',
        value: function middleware(wares) {
            var _this = this;

            return wares.map(function (w) {

                if (typeof w === 'function') return w;

                if (!_this.mwares[w]) throw new Error('Unknown middleware: \'' + w + '\' declared in route file!');

                return _this.mwares[w];
            });
        }

        /**
         * actions makes an executable of an action decleration
         * @param {string|function} action
         * @param {Route} route 
         */
    }, {
        key: 'actions',
        value: function actions(action, route) {

            var Controller;
            var method;

            if (typeof action === 'function') return function (req, res) {
                return action(req, res);
            };

            action = action.split('.');
            Controller = this.controllers[action[0]];
            method = action[1];

            if (!Controller) throw new Error('Unknown controller: \'' + action[0] + '\' decleared in route file!');

            return function (req, res) {

                var i = new Controller(req, res, route);
                if (typeof i[method] !== 'function') {
                    res.status(500);
                    return res.send('Unknown method \'' + method + '\' in route description for controller' + ('\'' + action[0] + '\'!'));
                }

                i[method]();
            };
        }
    }]);

    return Converter;
})();

exports['default'] = Converter;
module.exports = exports['default'];
//# sourceMappingURL=Converter.js.map