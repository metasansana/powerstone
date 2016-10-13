'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controllers = function () {
    function Controllers() {
        _classCallCheck(this, Controllers);
    }

    _createClass(Controllers, null, [{
        key: 'prepare',
        value: function prepare(def, action, resource) {

            if (typeof def.action !== 'string') return;

            var klass;
            var method;
            var pieces = def.action.split('.');
            var Constructor;
            var instance;

            klass = pieces[0];
            method = String(pieces[1]).split('(').join('').split(')').join('');

            if (!klass) throw new TypeError('A class name must be specified in an action decleration!');

            Constructor = resource.find(klass);

            if (!Constructor) throw new ReferenceError('Unable to locate controller \'' + klass + '\'!');

            instance = new Constructor(action, action.route.module, action.route.module.application);

            if (typeof instance[method] !== 'function') throw new ReferenceError('Controller \'' + instance.constructor.name + '\' ' + ('does not have a method \'' + method + '\'!'));

            action.callbacks.push(function (req, res, next) {
                return _bluebird2.default.resolve(instance[method](action.factory.request(req, res, action), action.factory.response(req, res, action), next)).catch(function (e) {
                    return action.route.module.application.onRouteErrorListener.onRouteError(e, req, res, next);
                });
            });
        }
    }]);

    return Controllers;
}();

exports.default = Controllers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvQ29udHJvbGxlcnMuanMiXSwibmFtZXMiOlsiQ29udHJvbGxlcnMiLCJkZWYiLCJhY3Rpb24iLCJyZXNvdXJjZSIsImtsYXNzIiwibWV0aG9kIiwicGllY2VzIiwic3BsaXQiLCJDb25zdHJ1Y3RvciIsImluc3RhbmNlIiwiU3RyaW5nIiwiam9pbiIsIlR5cGVFcnJvciIsImZpbmQiLCJSZWZlcmVuY2VFcnJvciIsInJvdXRlIiwibW9kdWxlIiwiYXBwbGljYXRpb24iLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJjYWxsYmFja3MiLCJwdXNoIiwicmVxIiwicmVzIiwibmV4dCIsInJlc29sdmUiLCJmYWN0b3J5IiwicmVxdWVzdCIsInJlc3BvbnNlIiwiY2F0Y2giLCJvblJvdXRlRXJyb3JMaXN0ZW5lciIsIm9uUm91dGVFcnJvciIsImUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBRU1BLFc7Ozs7Ozs7Z0NBRWFDLEcsRUFBS0MsTSxFQUFRQyxRLEVBQVU7O0FBRWxDLGdCQUFJLE9BQU9GLElBQUlDLE1BQVgsS0FBc0IsUUFBMUIsRUFBb0M7O0FBRXBDLGdCQUFJRSxLQUFKO0FBQ0EsZ0JBQUlDLE1BQUo7QUFDQSxnQkFBSUMsU0FBU0wsSUFBSUMsTUFBSixDQUFXSyxLQUFYLENBQWlCLEdBQWpCLENBQWI7QUFDQSxnQkFBSUMsV0FBSjtBQUNBLGdCQUFJQyxRQUFKOztBQUVBTCxvQkFBUUUsT0FBTyxDQUFQLENBQVI7QUFDQUQscUJBQVNLLE9BQU9KLE9BQU8sQ0FBUCxDQUFQLEVBQWtCQyxLQUFsQixDQUF3QixHQUF4QixFQUE2QkksSUFBN0IsQ0FBa0MsRUFBbEMsRUFBc0NKLEtBQXRDLENBQTRDLEdBQTVDLEVBQWlESSxJQUFqRCxDQUFzRCxFQUF0RCxDQUFUOztBQUVBLGdCQUFJLENBQUNQLEtBQUwsRUFDSSxNQUFNLElBQUlRLFNBQUosQ0FBYywwREFBZCxDQUFOOztBQUVKSiwwQkFBY0wsU0FBU1UsSUFBVCxDQUFjVCxLQUFkLENBQWQ7O0FBRUEsZ0JBQUksQ0FBQ0ksV0FBTCxFQUNJLE1BQU0sSUFBSU0sY0FBSixvQ0FBbURWLEtBQW5ELFNBQU47O0FBRUpLLHVCQUFXLElBQUlELFdBQUosQ0FBZ0JOLE1BQWhCLEVBQXdCQSxPQUFPYSxLQUFQLENBQWFDLE1BQXJDLEVBQTZDZCxPQUFPYSxLQUFQLENBQWFDLE1BQWIsQ0FBb0JDLFdBQWpFLENBQVg7O0FBRUEsZ0JBQUksT0FBT1IsU0FBU0osTUFBVCxDQUFQLEtBQTRCLFVBQWhDLEVBQ0ksTUFBTSxJQUFJUyxjQUFKLENBQW1CLGtCQUFlTCxTQUFTUyxXQUFULENBQXFCQyxJQUFwQywwQ0FDTWQsTUFETixTQUFuQixDQUFOOztBQUdKSCxtQkFBT2tCLFNBQVAsQ0FBaUJDLElBQWpCLENBQXNCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxJQUFYO0FBQUEsdUJBRWxCLG1CQUFRQyxPQUFSLENBQWdCaEIsU0FBU0osTUFBVCxFQUNaSCxPQUFPd0IsT0FBUCxDQUFlQyxPQUFmLENBQXVCTCxHQUF2QixFQUE0QkMsR0FBNUIsRUFBaUNyQixNQUFqQyxDQURZLEVBRVpBLE9BQU93QixPQUFQLENBQWVFLFFBQWYsQ0FBd0JOLEdBQXhCLEVBQTZCQyxHQUE3QixFQUFrQ3JCLE1BQWxDLENBRlksRUFHWnNCLElBSFksQ0FBaEIsRUFHV0ssS0FIWCxDQUdpQjtBQUFBLDJCQUNiM0IsT0FBT2EsS0FBUCxDQUFhQyxNQUFiLENBQW9CQyxXQUFwQixDQUFnQ2Esb0JBQWhDLENBQXFEQyxZQUFyRCxDQUFrRUMsQ0FBbEUsRUFBcUVWLEdBQXJFLEVBQTBFQyxHQUExRSxFQUErRUMsSUFBL0UsQ0FEYTtBQUFBLGlCQUhqQixDQUZrQjtBQUFBLGFBQXRCO0FBUUg7Ozs7OztrQkFJVXhCLFciLCJmaWxlIjoiQ29udHJvbGxlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbmNsYXNzIENvbnRyb2xsZXJzIHtcblxuICAgIHN0YXRpYyBwcmVwYXJlKGRlZiwgYWN0aW9uLCByZXNvdXJjZSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGVmLmFjdGlvbiAhPT0gJ3N0cmluZycpIHJldHVybjtcblxuICAgICAgICB2YXIga2xhc3M7XG4gICAgICAgIHZhciBtZXRob2Q7XG4gICAgICAgIHZhciBwaWVjZXMgPSBkZWYuYWN0aW9uLnNwbGl0KCcuJyk7XG4gICAgICAgIHZhciBDb25zdHJ1Y3RvcjtcbiAgICAgICAgdmFyIGluc3RhbmNlO1xuXG4gICAgICAgIGtsYXNzID0gcGllY2VzWzBdO1xuICAgICAgICBtZXRob2QgPSBTdHJpbmcocGllY2VzWzFdKS5zcGxpdCgnKCcpLmpvaW4oJycpLnNwbGl0KCcpJykuam9pbignJyk7XG5cbiAgICAgICAgaWYgKCFrbGFzcylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgY2xhc3MgbmFtZSBtdXN0IGJlIHNwZWNpZmllZCBpbiBhbiBhY3Rpb24gZGVjbGVyYXRpb24hJyk7XG5cbiAgICAgICAgQ29uc3RydWN0b3IgPSByZXNvdXJjZS5maW5kKGtsYXNzKTtcblxuICAgICAgICBpZiAoIUNvbnN0cnVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGBVbmFibGUgdG8gbG9jYXRlIGNvbnRyb2xsZXIgJyR7a2xhc3N9JyFgKTtcblxuICAgICAgICBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcihhY3Rpb24sIGFjdGlvbi5yb3V0ZS5tb2R1bGUsIGFjdGlvbi5yb3V0ZS5tb2R1bGUuYXBwbGljYXRpb24pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaW5zdGFuY2VbbWV0aG9kXSAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgQ29udHJvbGxlciAnJHtpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lfScgYCArXG4gICAgICAgICAgICAgICAgYGRvZXMgbm90IGhhdmUgYSBtZXRob2QgJyR7bWV0aG9kfSchYCk7XG5cbiAgICAgICAgYWN0aW9uLmNhbGxiYWNrcy5wdXNoKChyZXEsIHJlcywgbmV4dCkgPT5cblxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKGluc3RhbmNlW21ldGhvZF0oXG4gICAgICAgICAgICAgICAgYWN0aW9uLmZhY3RvcnkucmVxdWVzdChyZXEsIHJlcywgYWN0aW9uKSxcbiAgICAgICAgICAgICAgICBhY3Rpb24uZmFjdG9yeS5yZXNwb25zZShyZXEsIHJlcywgYWN0aW9uKSxcbiAgICAgICAgICAgICAgICBuZXh0KSkuY2F0Y2goZSA9PlxuICAgICAgICAgICAgICAgIGFjdGlvbi5yb3V0ZS5tb2R1bGUuYXBwbGljYXRpb24ub25Sb3V0ZUVycm9yTGlzdGVuZXIub25Sb3V0ZUVycm9yKGUsIHJlcSwgcmVzLCBuZXh0KSkpXG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcnNcbiJdfQ==