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
function resolveAction(action, controllers, application, route) {

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
        new Controller(req, res, application, route)[method]();
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
        value: function generate(method, path, route, application) {

            if (typeof route.action === 'string') return resolveAction(route.action, this._controllers, application, route);

            if (typeof route.action === 'function') return route.action;
        }
    }]);

    return ControllerAction;
})();

exports['default'] = ControllerAction;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvQ29udHJvbGxlckFjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7NEJBQXFCLGVBQWU7Ozs7OztBQUlwQyxTQUFTLGFBQWEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7O0FBRTVELFFBQUksS0FBSyxDQUFDO0FBQ1YsUUFBSSxVQUFVLENBQUM7QUFDZixRQUFJLElBQUksQ0FBQztBQUNULFFBQUksSUFBSSxDQUFDO0FBQ1QsUUFBSSxNQUFNLENBQUM7QUFDWCxRQUFJLE9BQU8sR0FBRyxTQUFWLE9BQU8sQ0FBWSxHQUFHLEVBQUU7O0FBRXhCLFdBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDOztBQUVoQixZQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ3JCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDckIsT0FBTyxJQUFJLENBQUM7S0FDdkIsQ0FBQTs7QUFFRCxRQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUNqQixhQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkMsY0FBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUN4QixNQUFNO0FBQ0gsYUFBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0I7O0FBRUQsUUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkIsY0FBVSxHQUFHLDBCQUFTLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRTdDLFdBQU8sVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3RCLEFBQUMsWUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUM1RCxDQUFBOztBQUVELFdBQU8sVUFBVSxDQUFDO0NBRXJCOzs7Ozs7O0lBTUssZ0JBQWdCO0FBRVAsYUFGVCxnQkFBZ0IsQ0FFTixXQUFXLEVBQUU7OEJBRnZCLGdCQUFnQjs7QUFJZCxZQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztLQUVuQzs7aUJBTkMsZ0JBQWdCOztlQVFWLGtCQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTs7QUFFdkMsZ0JBQUksT0FBTyxLQUFLLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFDaEMsT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDN0IsSUFBSSxDQUFDLFlBQVksRUFDakIsV0FBVyxFQUNmLEtBQUssQ0FBQyxDQUFDOztBQUVYLGdCQUFJLE9BQU8sS0FBSyxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQ2xDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUUzQjs7O1dBbkJDLGdCQUFnQjs7O3FCQXVCUCxnQkFBZ0IiLCJmaWxlIjoiQ29udHJvbGxlckFjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wZXJ0eSBmcm9tICdwcm9wZXJ0eS1zZWVrJztcblxuLy9UT0RPIFNvbWVkYXkgd2Ugd2lsbCBwYXJzZSB0aGUgYWN0aW9uIHN0cmluZyB3aXRoIGFyZ3VtZW50cyBhbmQgYWxsLCB1bnRpbCB0aGVuLFxuLy9iYXJlIHdpdGggbWUuXG5mdW5jdGlvbiByZXNvbHZlQWN0aW9uKGFjdGlvbiwgY29udHJvbGxlcnMsIGFwcGxpY2F0aW9uLCByb3V0ZSkge1xuXG4gICAgdmFyIHNwbGl0O1xuICAgIHZhciBDb250cm9sbGVyO1xuICAgIHZhciBwYXRoO1xuICAgIHZhciB0eXBlO1xuICAgIHZhciBtZXRob2Q7XG4gICAgdmFyIGlzX2NhbGwgPSBmdW5jdGlvbihzdHIpIHtcblxuICAgICAgICBzdHIgPSBzdHIgfHwgJyc7XG5cbiAgICAgICAgaWYgKHN0ci5pbmRleE9mKCcoJykgPiAtMSlcbiAgICAgICAgICAgIGlmIChzdHIuaW5kZXhPZignKScpID4gLTEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGlzX2NhbGwoYWN0aW9uKSkge1xuICAgICAgICBzcGxpdCA9IGFjdGlvbi5zbGljZSgwLCAtMikuc3BsaXQoJy4nKTtcbiAgICAgICAgbWV0aG9kID0gc3BsaXQucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3BsaXQgPSBhY3Rpb24uc3BsaXQoJy4nKTtcbiAgICB9XG5cbiAgICBwYXRoID0gc3BsaXQuam9pbignLicpO1xuICAgIENvbnRyb2xsZXIgPSBQcm9wZXJ0eS5nZXQoY29udHJvbGxlcnMsIHBhdGgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gICAgICAgIChuZXcgQ29udHJvbGxlcihyZXEsIHJlcywgYXBwbGljYXRpb24sIHJvdXRlKSlbbWV0aG9kXSgpO1xuICAgIH1cblxuICAgIHJldHVybiBDb250cm9sbGVyO1xuXG59XG5cbi8qKlxuICogQ29udHJvbGxlckFjdGlvbiBjb25maWd1cmVzIGhhbmRsZXJzIGZvciBjb250cm9sbGVycy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBjb250cm9sbGVycyBBIG1hcCBvZiBrbm93biBjb250cm9sbGVyc1xuICovXG5jbGFzcyBDb250cm9sbGVyQWN0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXJzKSB7XG5cbiAgICAgICAgdGhpcy5fY29udHJvbGxlcnMgPSBjb250cm9sbGVycztcblxuICAgIH1cblxuICAgIGdlbmVyYXRlKG1ldGhvZCwgcGF0aCwgcm91dGUsIGFwcGxpY2F0aW9uKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByb3V0ZS5hY3Rpb24gPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVBY3Rpb24ocm91dGUuYWN0aW9uLCBcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250cm9sbGVycyxcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbixcbiAgICAgICAgICAgIHJvdXRlKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJvdXRlLmFjdGlvbiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHJldHVybiByb3V0ZS5hY3Rpb247XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlckFjdGlvblxuIl19