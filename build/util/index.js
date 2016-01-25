/**
 * isCall tells us if the string indicates a function call
 * @param {string} str 
 * @return {boolean} 
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.isCall = isCall;

function isCall(str) {

    str = str || '';

    if (str.indexOf('(') > -1) if (str.indexOf(')') > -1) return true;
}
//# sourceMappingURL=index.js.map