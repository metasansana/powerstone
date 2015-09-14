/**
 * Routes is a utility class for parsing routes.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Routes = (function () {
    function Routes() {
        _classCallCheck(this, Routes);
    }

    _createClass(Routes, [{
        key: 'flatten',

        /**
         * flatten turns a list of routes into a single array of routes.
         * @param {Array|Object} routes
         * @returns Array
         */
        value: function flatten(routes) {

            if (Array.isArray(routes)) {

                var flat = [];

                routes.forEach(function (route) {
                    if (Array.isArray(route.routes)) {
                        flat.push.apply(flat, route.routes.map(function (entry) {
                            return entry;
                        }));
                    } else {
                        flat.push(route);
                    }
                });

                return flat;
            }

            return routes.routes;
        }
    }, {
        key: 'defaultMethod',
        value: function defaultMethod(method) {
            return method ? method.toLowerCase() : 'get';
        }
    }]);

    return Routes;
})();

exports['default'] = new Routes();
module.exports = exports['default'];