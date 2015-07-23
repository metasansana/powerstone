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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TdHJpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBSU0sT0FBTzthQUFQLE9BQU87OEJBQVAsT0FBTzs7O2lCQUFQLE9BQU87Ozs7Ozs7OztlQVFxQix3Q0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFOztBQUVsRCxtQkFBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNyQixHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUU7O0FBRWYsb0JBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTFCLG9CQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxHQUNuRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsQ0FBQzs7QUFFckMsb0JBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLEdBQ3ZELElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7O0FBRXJELHVCQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFHckUsQ0FBQyxDQUFDO1NBRVY7Ozs7Ozs7ZUFLYyx5QkFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFOztBQUVqQyxtQkFBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUN6QyxvQkFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLEdBQUcsR0FBRyxHQUFHLGlCQUFpQixDQUFDLENBQUM7QUFDekUsdUJBQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzFCLENBQUMsQ0FBQTtTQUNMOzs7V0F4Q0MsT0FBTzs7O3FCQTZDRSxJQUFJLE9BQU8sRUFBRSIsImZpbGUiOiJTdHJpbmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTdHJpbmdzIENvbnZlcnQgYXJiaXRyYXJ5IHN0cmluZ3MgaW50byB1c2VmdWwgb2JqZWN0cy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5jbGFzcyBTdHJpbmdzIHtcblxuICAgIC8qKlxuICAgICAqIG1ldGhvZExpc3RUb0JvdW5kRnVuY3Rpb25BcnJheVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJMaXN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1hcE9mT2JqZWN0c1xuICAgICAqIEBwYXJhbSB7QXJyYXl9XG4gICAgICovXG4gICAgbWV0aG9kTGlzdFRvQm91bmRGdW5jdGlvbkFycmF5KHN0ckxpc3QsIG1hcE9mT2JqZWN0cykge1xuXG4gICAgICAgIHJldHVybiBzdHJMaXN0LnNwbGl0KCcsJykuXG4gICAgICAgICAgICBtYXAoZnVuY3Rpb24gKGRlZikge1xuXG4gICAgICAgICAgICAgICAgdmFyIHBhdGggPSBkZWYuc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgICAgIGlmICghbWFwT2ZPYmplY3RzW3BhdGhbMF1dKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZ3MubWV0aG9kTGlzdFRvQm91bmRGdW5jdGlvbkFycmF5KCk6IFRoZSBvYmplY3QgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoWzBdICsgJyB3YXMgbm90IGZvdW5kIScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFtYXBPZk9iamVjdHNbcGF0aFswXV1bcGF0aFsxXV0pXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RyaW5ncy5tZXRob2RMaXN0VG9Cb3VuZEZ1bmN0aW9uQXJyYXkoKTonICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhbMF0gKyAnIGhhcyBubyBtZXRob2QgJyArIHBhdGhbMV0gKyAnIScpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcE9mT2JqZWN0c1twYXRoWzBdXVtwYXRoWzFdXS5iaW5kKG1hcE9mT2JqZWN0c1twYXRoWzBdXSk7XG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmdW5jTGlzdFRvQXJyYXlcbiAgICAgKi9cbiAgICBmdW5jTGlzdFRvQXJyYXkoc3RyTGlzdCwgbWFwT2ZGdW5jcykge1xuXG4gICAgICAgIHJldHVybiBzdHJMaXN0LnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIChoaXQpIHtcbiAgICAgICAgICAgIGlmICghbWFwT2ZGdW5jcy5oYXNPd25Qcm9wZXJ0eShoaXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZnVuY0xpc3RUb0FycmF5OiBGdW5jOiAnICsgaGl0ICsgJyB3YXMgbm90IGZvdW5kIScpO1xuICAgICAgICAgICAgcmV0dXJuIG1hcE9mRnVuY3NbaGl0XTtcbiAgICAgICAgfSlcbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgU3RyaW5ncygpIl19