'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    Controller = _propertySeek2.default.get(controllers, path);

    return function (req, res) {
        new Controller(req, res, application, route)[method]();
    };

    return Controller;
}

/**
 * ControllerAction configures handlers for controllers.
 * @param {object} controllers A map of known controllers
 */

var ControllerAction = function () {
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
}();

exports.default = ControllerAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvQ29udHJvbGxlckFjdGlvbi5qcyJdLCJuYW1lcyI6WyJyZXNvbHZlQWN0aW9uIiwiYWN0aW9uIiwiY29udHJvbGxlcnMiLCJhcHBsaWNhdGlvbiIsInJvdXRlIiwic3BsaXQiLCJDb250cm9sbGVyIiwicGF0aCIsInR5cGUiLCJtZXRob2QiLCJpc19jYWxsIiwic3RyIiwiaW5kZXhPZiIsInNsaWNlIiwicG9wIiwiam9pbiIsImdldCIsInJlcSIsInJlcyIsIkNvbnRyb2xsZXJBY3Rpb24iLCJfY29udHJvbGxlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBLFNBQVNBLGFBQVQsQ0FBdUJDLE1BQXZCLEVBQStCQyxXQUEvQixFQUE0Q0MsV0FBNUMsRUFBeURDLEtBQXpELEVBQWdFOztBQUU1RCxRQUFJQyxLQUFKO0FBQ0EsUUFBSUMsVUFBSjtBQUNBLFFBQUlDLElBQUo7QUFDQSxRQUFJQyxJQUFKO0FBQ0EsUUFBSUMsTUFBSjtBQUNBLFFBQUlDLFVBQVUsU0FBVkEsT0FBVSxDQUFTQyxHQUFULEVBQWM7O0FBRXhCQSxjQUFNQSxPQUFPLEVBQWI7O0FBRUEsWUFBSUEsSUFBSUMsT0FBSixDQUFZLEdBQVosSUFBbUIsQ0FBQyxDQUF4QixFQUNJLElBQUlELElBQUlDLE9BQUosQ0FBWSxHQUFaLElBQW1CLENBQUMsQ0FBeEIsRUFDSSxPQUFPLElBQVA7QUFDWCxLQVBEOztBQVNBLFFBQUlGLFFBQVFULE1BQVIsQ0FBSixFQUFxQjtBQUNqQkksZ0JBQVFKLE9BQU9ZLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQUMsQ0FBakIsRUFBb0JSLEtBQXBCLENBQTBCLEdBQTFCLENBQVI7QUFDQUksaUJBQVNKLE1BQU1TLEdBQU4sRUFBVDtBQUNILEtBSEQsTUFHTztBQUNIVCxnQkFBUUosT0FBT0ksS0FBUCxDQUFhLEdBQWIsQ0FBUjtBQUNIOztBQUVERSxXQUFPRixNQUFNVSxJQUFOLENBQVcsR0FBWCxDQUFQO0FBQ0FULGlCQUFhLHVCQUFTVSxHQUFULENBQWFkLFdBQWIsRUFBMEJLLElBQTFCLENBQWI7O0FBRUEsV0FBTyxVQUFTVSxHQUFULEVBQWNDLEdBQWQsRUFBbUI7QUFDckIsWUFBSVosVUFBSixDQUFlVyxHQUFmLEVBQW9CQyxHQUFwQixFQUF5QmYsV0FBekIsRUFBc0NDLEtBQXRDLENBQUQsQ0FBK0NLLE1BQS9DO0FBQ0gsS0FGRDs7QUFJQSxXQUFPSCxVQUFQO0FBRUg7O0FBRUQ7Ozs7O0lBSU1hLGdCO0FBRUYsOEJBQVlqQixXQUFaLEVBQXlCO0FBQUE7O0FBRXJCLGFBQUtrQixZQUFMLEdBQW9CbEIsV0FBcEI7QUFFSDs7OztpQ0FFUU8sTSxFQUFRRixJLEVBQU1ILEssRUFBT0QsVyxFQUFhOztBQUV2QyxnQkFBSSxPQUFPQyxNQUFNSCxNQUFiLEtBQXdCLFFBQTVCLEVBQ0ksT0FBT0QsY0FBY0ksTUFBTUgsTUFBcEIsRUFDSCxLQUFLbUIsWUFERixFQUVIakIsV0FGRyxFQUdQQyxLQUhPLENBQVA7O0FBS0osZ0JBQUksT0FBT0EsTUFBTUgsTUFBYixLQUF3QixVQUE1QixFQUNJLE9BQU9HLE1BQU1ILE1BQWI7QUFFUDs7Ozs7O2tCQUlVa0IsZ0IiLCJmaWxlIjoiQ29udHJvbGxlckFjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wZXJ0eSBmcm9tICdwcm9wZXJ0eS1zZWVrJztcblxuLy9UT0RPIFNvbWVkYXkgd2Ugd2lsbCBwYXJzZSB0aGUgYWN0aW9uIHN0cmluZyB3aXRoIGFyZ3VtZW50cyBhbmQgYWxsLCB1bnRpbCB0aGVuLFxuLy9iYXJlIHdpdGggbWUuXG5mdW5jdGlvbiByZXNvbHZlQWN0aW9uKGFjdGlvbiwgY29udHJvbGxlcnMsIGFwcGxpY2F0aW9uLCByb3V0ZSkge1xuXG4gICAgdmFyIHNwbGl0O1xuICAgIHZhciBDb250cm9sbGVyO1xuICAgIHZhciBwYXRoO1xuICAgIHZhciB0eXBlO1xuICAgIHZhciBtZXRob2Q7XG4gICAgdmFyIGlzX2NhbGwgPSBmdW5jdGlvbihzdHIpIHtcblxuICAgICAgICBzdHIgPSBzdHIgfHwgJyc7XG5cbiAgICAgICAgaWYgKHN0ci5pbmRleE9mKCcoJykgPiAtMSlcbiAgICAgICAgICAgIGlmIChzdHIuaW5kZXhPZignKScpID4gLTEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGlzX2NhbGwoYWN0aW9uKSkge1xuICAgICAgICBzcGxpdCA9IGFjdGlvbi5zbGljZSgwLCAtMikuc3BsaXQoJy4nKTtcbiAgICAgICAgbWV0aG9kID0gc3BsaXQucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3BsaXQgPSBhY3Rpb24uc3BsaXQoJy4nKTtcbiAgICB9XG5cbiAgICBwYXRoID0gc3BsaXQuam9pbignLicpO1xuICAgIENvbnRyb2xsZXIgPSBQcm9wZXJ0eS5nZXQoY29udHJvbGxlcnMsIHBhdGgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gICAgICAgIChuZXcgQ29udHJvbGxlcihyZXEsIHJlcywgYXBwbGljYXRpb24sIHJvdXRlKSlbbWV0aG9kXSgpO1xuICAgIH1cblxuICAgIHJldHVybiBDb250cm9sbGVyO1xuXG59XG5cbi8qKlxuICogQ29udHJvbGxlckFjdGlvbiBjb25maWd1cmVzIGhhbmRsZXJzIGZvciBjb250cm9sbGVycy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBjb250cm9sbGVycyBBIG1hcCBvZiBrbm93biBjb250cm9sbGVyc1xuICovXG5jbGFzcyBDb250cm9sbGVyQWN0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXJzKSB7XG5cbiAgICAgICAgdGhpcy5fY29udHJvbGxlcnMgPSBjb250cm9sbGVycztcblxuICAgIH1cblxuICAgIGdlbmVyYXRlKG1ldGhvZCwgcGF0aCwgcm91dGUsIGFwcGxpY2F0aW9uKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByb3V0ZS5hY3Rpb24gPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVBY3Rpb24ocm91dGUuYWN0aW9uLCBcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250cm9sbGVycyxcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbixcbiAgICAgICAgICAgIHJvdXRlKTtcblxuICAgICAgICBpZiAodHlwZW9mIHJvdXRlLmFjdGlvbiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHJldHVybiByb3V0ZS5hY3Rpb247XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlckFjdGlvblxuIl19