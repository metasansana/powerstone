/**
 * FilterAction configures middleware specified by the 'filters'
 * key in a route declaration.
 * @implements {Action}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FilterAction = (function () {
    function FilterAction(resources) {
        _classCallCheck(this, FilterAction);

        this._resources = resources;
    }

    _createClass(FilterAction, [{
        key: 'generate',
        value: function generate(method, path, route) {
            var _this = this;

            if (Array.isArray(route.filters)) return route.filters.map(function (filter) {
                return typeof filter === 'function' ? filter : _this._resources.lookup(filter).module;
            });
        }
    }]);

    return FilterAction;
})();

exports['default'] = FilterAction;
module.exports = exports['default'];
//# sourceMappingURL=FilterAction.js.map