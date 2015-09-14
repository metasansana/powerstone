/**
 * Strings Convert arbitrary strings into useful objects.
 * @constructor
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Strings = (function () {
    function Strings() {
        _classCallCheck(this, Strings);
    }

    _createClass(Strings, [{
        key: 'methodListToBoundFunctionArray',

        /**
         * methodListToBoundFunctionArray
         * @param {String} strList
         * @param {Object} mapOfObjects
         * @param {Array}
         */
        value: function methodListToBoundFunctionArray(strList, mapOfObjects) {

            return strList.split(',').map(function (def) {

                var path = def.split('.');

                if (!mapOfObjects[path[0]]) throw new Error('Strings.methodListToBoundFunctionArray(): The object ' + path[0] + ' was not found!');

                if (!mapOfObjects[path[0]][path[1]]) throw new Error('Strings.methodListToBoundFunctionArray():' + path[0] + ' has no method ' + path[1] + '!');

                return mapOfObjects[path[0]][path[1]].bind(mapOfObjects[path[0]]);
            });
        }
    }, {
        key: 'funcListToArray',

        /**
         * funcListToArray
         */
        value: function funcListToArray(strList, mapOfFuncs) {

            return strList.split(',').map(function (hit) {
                if (!mapOfFuncs.hasOwnProperty(hit)) throw new Error('funcListToArray: Func: ' + hit + ' was not found!');
                return mapOfFuncs[hit];
            });
        }
    }]);

    return Strings;
})();

exports['default'] = new Strings();
module.exports = exports['default'];