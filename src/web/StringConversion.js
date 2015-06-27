/**
 * StringConversion Convert arbitrary strings into useful objects.
 * @constructor
 */
function StringConversion(){}

/**
 * methodListToBoundFunctionArray
 * @param {String} strList
 * @param {Object} mapOfObjects
 * @param {Array}
 */
StringConversion.prototype.methodListToBoundFunctionArray = function (strList, mapOfObjects) {

    return strList.split(',').
        map(function(def) {

            var path = def.split('.');

            if (!mapOfObjects[path[0]])
                throw new Error('StringConversion.methodListToBoundFunctionArray(): The object '+
                    path[0]+' was not found!');

            if (!mapOfObjects[path[0]][path[1]])
                throw new Error('StringConversion.methodListToBoundFunctionArray():'+
            path[0] + ' has no method ' + path[1] + '!');

            return mapOfObjects[path[0]][path[1]].bind(mapOfObjects[path[0]]);


        });

};

/**
 * funcListToArray
 */
StringConversion.prototype.funcListToArray = function (strList, mapOfFuncs) {

    return strList.split(',').map(function (hit) {
        if (!mapOfFuncs.hasOwnProperty(hit))
            throw new Error('funcListToArray: Func: ' + hit + ' was not found!');
        return mapOfFuncs[hit];
    })
};

/**
 * pluck
 */
StringConversion.prototype.pluck = function (target, src) {

};

module.exports =  StringConversion;