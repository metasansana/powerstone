/**
 * StringConversion Convert arbitrary strings into useful objects.
 * @constructor
 */
'use strict';

function StringConversion() {}

/**
 * methodListToBoundFunctionArray
 * @param {String} strList
 * @param {Object} mapOfObjects
 * @param {Array}
 */
StringConversion.prototype.methodListToBoundFunctionArray = function (strList, mapOfObjects) {

    return strList.split(',').map(function (def) {

        var path = def.split('.');

        if (!mapOfObjects[path[0]]) throw new Error('StringConversion.methodListToBoundFunctionArray(): The object ' + path[0] + ' was not found!');

        if (!mapOfObjects[path[0]][path[1]]) throw new Error('StringConversion.methodListToBoundFunctionArray():' + path[0] + ' has no method ' + path[1] + '!');

        return mapOfObjects[path[0]][path[1]].bind(mapOfObjects[path[0]]);
    });
};

/**
 * funcListToArray
 */
StringConversion.prototype.funcListToArray = function (strList, mapOfFuncs) {

    return strList.split(',').map(function (hit) {
        if (!mapOfFuncs.hasOwnProperty(hit)) throw new Error('funcListToArray: Func: ' + hit + ' was not found!');
        return mapOfFuncs[hit];
    });
};

/**
 * pluck
 */
StringConversion.prototype.pluck = function (target, src) {};

module.exports = StringConversion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvU3RyaW5nQ29udmVyc2lvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSxTQUFTLGdCQUFnQixHQUFFLEVBQUU7Ozs7Ozs7O0FBUTdCLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsR0FBRyxVQUFVLE9BQU8sRUFBRSxZQUFZLEVBQUU7O0FBRXpGLFdBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDckIsR0FBRyxDQUFDLFVBQVMsR0FBRyxFQUFFOztBQUVkLFlBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTFCLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0VBQWdFLEdBQzVFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztBQUVuQyxZQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxHQUN4RSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDOztBQUU3QyxlQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FHckUsQ0FBQyxDQUFDO0NBRVYsQ0FBQzs7Ozs7QUFLRixnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLFVBQVUsT0FBTyxFQUFFLFVBQVUsRUFBRTs7QUFFeEUsV0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUN6QyxZQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxHQUFHLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztBQUN6RSxlQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMxQixDQUFDLENBQUE7Q0FDTCxDQUFDOzs7OztBQUtGLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBRXpELENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBSSxnQkFBZ0IsQ0FBQyIsImZpbGUiOiJTdHJpbmdDb252ZXJzaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTdHJpbmdDb252ZXJzaW9uIENvbnZlcnQgYXJiaXRyYXJ5IHN0cmluZ3MgaW50byB1c2VmdWwgb2JqZWN0cy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTdHJpbmdDb252ZXJzaW9uKCl7fVxuXG4vKipcbiAqIG1ldGhvZExpc3RUb0JvdW5kRnVuY3Rpb25BcnJheVxuICogQHBhcmFtIHtTdHJpbmd9IHN0ckxpc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXBPZk9iamVjdHNcbiAqIEBwYXJhbSB7QXJyYXl9XG4gKi9cblN0cmluZ0NvbnZlcnNpb24ucHJvdG90eXBlLm1ldGhvZExpc3RUb0JvdW5kRnVuY3Rpb25BcnJheSA9IGZ1bmN0aW9uIChzdHJMaXN0LCBtYXBPZk9iamVjdHMpIHtcblxuICAgIHJldHVybiBzdHJMaXN0LnNwbGl0KCcsJykuXG4gICAgICAgIG1hcChmdW5jdGlvbihkZWYpIHtcblxuICAgICAgICAgICAgdmFyIHBhdGggPSBkZWYuc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgaWYgKCFtYXBPZk9iamVjdHNbcGF0aFswXV0pXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmdDb252ZXJzaW9uLm1ldGhvZExpc3RUb0JvdW5kRnVuY3Rpb25BcnJheSgpOiBUaGUgb2JqZWN0ICcrXG4gICAgICAgICAgICAgICAgICAgIHBhdGhbMF0rJyB3YXMgbm90IGZvdW5kIScpO1xuXG4gICAgICAgICAgICBpZiAoIW1hcE9mT2JqZWN0c1twYXRoWzBdXVtwYXRoWzFdXSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZ0NvbnZlcnNpb24ubWV0aG9kTGlzdFRvQm91bmRGdW5jdGlvbkFycmF5KCk6JytcbiAgICAgICAgICAgIHBhdGhbMF0gKyAnIGhhcyBubyBtZXRob2QgJyArIHBhdGhbMV0gKyAnIScpO1xuXG4gICAgICAgICAgICByZXR1cm4gbWFwT2ZPYmplY3RzW3BhdGhbMF1dW3BhdGhbMV1dLmJpbmQobWFwT2ZPYmplY3RzW3BhdGhbMF1dKTtcblxuXG4gICAgICAgIH0pO1xuXG59O1xuXG4vKipcbiAqIGZ1bmNMaXN0VG9BcnJheVxuICovXG5TdHJpbmdDb252ZXJzaW9uLnByb3RvdHlwZS5mdW5jTGlzdFRvQXJyYXkgPSBmdW5jdGlvbiAoc3RyTGlzdCwgbWFwT2ZGdW5jcykge1xuXG4gICAgcmV0dXJuIHN0ckxpc3Quc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKGhpdCkge1xuICAgICAgICBpZiAoIW1hcE9mRnVuY3MuaGFzT3duUHJvcGVydHkoaGl0KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZnVuY0xpc3RUb0FycmF5OiBGdW5jOiAnICsgaGl0ICsgJyB3YXMgbm90IGZvdW5kIScpO1xuICAgICAgICByZXR1cm4gbWFwT2ZGdW5jc1toaXRdO1xuICAgIH0pXG59O1xuXG4vKipcbiAqIHBsdWNrXG4gKi9cblN0cmluZ0NvbnZlcnNpb24ucHJvdG90eXBlLnBsdWNrID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjKSB7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gIFN0cmluZ0NvbnZlcnNpb247Il19