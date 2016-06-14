'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

//TODO Someday we will parse the action string with arguments and all, until then,
//bare with me.
function resolveAction(action, controllers) {

    var split;
    var Controller;
    var path;
    var type;
    var method;
    var is_call = function is_call(str) {

        str = str || '';

        if (str.indexOf('(') > -1) if (str.indexOf(')') > -1) return true;
    };

    if (is_call(action)) {
        split = action.slice(0, -2).split('.');
        method = split.pop();
    } else {
        split = action.split('.');
    }

    path = split.join('.');
    Controller = _propertySeek2['default'].get(controllers, path);

    return function (req, res) {
        new Controller(req, res)[method]();
    };
    return Controller;
}

/**
 * ControllerAction configures handlers for controllers.
 * @param {object} controllers A map of known controllers
 */

var ControllerAction = (function () {
    function ControllerAction(controllers) {
        _classCallCheck(this, ControllerAction);

        this._controllers = controllers;
    }

    _createClass(ControllerAction, [{
        key: 'generate',
        value: function generate(method, path, route) {

            if (typeof route.action === 'string') return resolveAction(route.action, this._controllers);

            if (typeof route.action === 'function') return route.action;
        }
    }]);

    return ControllerAction;
})();

exports['default'] = ControllerAction;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvQ29udHJvbGxlckFjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7NEJBQXFCLGVBQWU7Ozs7OztBQUlwQyxTQUFTLGFBQWEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFOztBQUV4QyxRQUFJLEtBQUssQ0FBQztBQUNWLFFBQUksVUFBVSxDQUFDO0FBQ2YsUUFBSSxJQUFJLENBQUM7QUFDVCxRQUFJLElBQUksQ0FBQztBQUNULFFBQUksTUFBTSxDQUFDO0FBQ1gsUUFBSSxPQUFPLEdBQUcsU0FBVixPQUFPLENBQVksR0FBRyxFQUFFOztBQUV4QixXQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQzs7QUFFaEIsWUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUNyQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ3JCLE9BQU8sSUFBSSxDQUFDO0tBQ3ZCLENBQUE7O0FBRUQsUUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDakIsYUFBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLGNBQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDeEIsTUFBTTtBQUNILGFBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzdCOztBQUVELFFBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLGNBQVUsR0FBRywwQkFBUyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUU3QyxXQUFPLFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUN0QixBQUFDLFlBQUksVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBRSxNQUFNLENBQUMsRUFBRSxDQUFDO0tBQ3hDLENBQUE7QUFDRCxXQUFPLFVBQVUsQ0FBQztDQUNyQjs7Ozs7OztJQU1LLGdCQUFnQjtBQUVQLGFBRlQsZ0JBQWdCLENBRU4sV0FBVyxFQUFFOzhCQUZ2QixnQkFBZ0I7O0FBSWQsWUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7S0FFbkM7O2lCQU5DLGdCQUFnQjs7ZUFRVixrQkFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTs7QUFHMUIsZ0JBQUksT0FBTyxLQUFLLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFDaEMsT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRTFELGdCQUFJLE9BQU8sS0FBSyxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQ2xDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUUzQjs7O1dBakJDLGdCQUFnQjs7O3FCQXFCUCxnQkFBZ0IiLCJmaWxlIjoiQ29udHJvbGxlckFjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wZXJ0eSBmcm9tICdwcm9wZXJ0eS1zZWVrJztcblxuLy9UT0RPIFNvbWVkYXkgd2Ugd2lsbCBwYXJzZSB0aGUgYWN0aW9uIHN0cmluZyB3aXRoIGFyZ3VtZW50cyBhbmQgYWxsLCB1bnRpbCB0aGVuLFxuLy9iYXJlIHdpdGggbWUuXG5mdW5jdGlvbiByZXNvbHZlQWN0aW9uKGFjdGlvbiwgY29udHJvbGxlcnMpIHtcblxuICAgIHZhciBzcGxpdDtcbiAgICB2YXIgQ29udHJvbGxlcjtcbiAgICB2YXIgcGF0aDtcbiAgICB2YXIgdHlwZTtcbiAgICB2YXIgbWV0aG9kO1xuICAgIHZhciBpc19jYWxsID0gZnVuY3Rpb24oc3RyKSB7XG5cbiAgICAgICAgc3RyID0gc3RyIHx8ICcnO1xuXG4gICAgICAgIGlmIChzdHIuaW5kZXhPZignKCcpID4gLTEpXG4gICAgICAgICAgICBpZiAoc3RyLmluZGV4T2YoJyknKSA+IC0xKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChpc19jYWxsKGFjdGlvbikpIHtcbiAgICAgICAgc3BsaXQgPSBhY3Rpb24uc2xpY2UoMCwgLTIpLnNwbGl0KCcuJyk7XG4gICAgICAgIG1ldGhvZCA9IHNwbGl0LnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNwbGl0ID0gYWN0aW9uLnNwbGl0KCcuJyk7XG4gICAgfVxuXG4gICAgcGF0aCA9IHNwbGl0LmpvaW4oJy4nKTtcbiAgICBDb250cm9sbGVyID0gUHJvcGVydHkuZ2V0KGNvbnRyb2xsZXJzLCBwYXRoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihyZXEsIHJlcykge1xuICAgICAgICAobmV3IENvbnRyb2xsZXIocmVxLCByZXMpKVttZXRob2RdKCk7XG4gICAgfVxuICAgIHJldHVybiBDb250cm9sbGVyO1xufVxuXG4vKipcbiAqIENvbnRyb2xsZXJBY3Rpb24gY29uZmlndXJlcyBoYW5kbGVycyBmb3IgY29udHJvbGxlcnMuXG4gKiBAcGFyYW0ge29iamVjdH0gY29udHJvbGxlcnMgQSBtYXAgb2Yga25vd24gY29udHJvbGxlcnNcbiAqL1xuY2xhc3MgQ29udHJvbGxlckFjdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250cm9sbGVycykge1xuXG4gICAgICAgIHRoaXMuX2NvbnRyb2xsZXJzID0gY29udHJvbGxlcnM7XG5cbiAgICB9XG5cbiAgICBnZW5lcmF0ZShtZXRob2QsIHBhdGgsIHJvdXRlKSB7XG5cblxuICAgICAgICBpZiAodHlwZW9mIHJvdXRlLmFjdGlvbiA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZUFjdGlvbihyb3V0ZS5hY3Rpb24sIHRoaXMuX2NvbnRyb2xsZXJzKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJvdXRlLmFjdGlvbiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHJldHVybiByb3V0ZS5hY3Rpb247XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlckFjdGlvblxuIl19