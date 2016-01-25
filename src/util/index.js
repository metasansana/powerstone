/**
 * isCall tells us if the string indicates a function call
 * @param {string} str 
 * @return {boolean} 
 */
export function isCall(str) {

    str = str || '';

    if (str.indexOf('(') > -1)
        if (str.indexOf(')') > -1)
            return true;
}
