'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
                return instance[method](action.factory.request(req, res, action), action.factory.response(req, res, action), next);
            });
        }
    }]);

    return Controllers;
}();

exports.default = Controllers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvQ29udHJvbGxlcnMuanMiXSwibmFtZXMiOlsiQ29udHJvbGxlcnMiLCJkZWYiLCJhY3Rpb24iLCJyZXNvdXJjZSIsImtsYXNzIiwibWV0aG9kIiwicGllY2VzIiwic3BsaXQiLCJDb25zdHJ1Y3RvciIsImluc3RhbmNlIiwiU3RyaW5nIiwiam9pbiIsIlR5cGVFcnJvciIsImZpbmQiLCJSZWZlcmVuY2VFcnJvciIsInJvdXRlIiwibW9kdWxlIiwiYXBwbGljYXRpb24iLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJjYWxsYmFja3MiLCJwdXNoIiwicmVxIiwicmVzIiwibmV4dCIsImZhY3RvcnkiLCJyZXF1ZXN0IiwicmVzcG9uc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsVzs7Ozs7OztnQ0FFYUMsRyxFQUFLQyxNLEVBQVFDLFEsRUFBVTs7QUFFbEMsZ0JBQUksT0FBT0YsSUFBSUMsTUFBWCxLQUFzQixRQUExQixFQUFvQzs7QUFFcEMsZ0JBQUlFLEtBQUo7QUFDQSxnQkFBSUMsTUFBSjtBQUNBLGdCQUFJQyxTQUFTTCxJQUFJQyxNQUFKLENBQVdLLEtBQVgsQ0FBaUIsR0FBakIsQ0FBYjtBQUNBLGdCQUFJQyxXQUFKO0FBQ0EsZ0JBQUlDLFFBQUo7O0FBRUFMLG9CQUFRRSxPQUFPLENBQVAsQ0FBUjtBQUNBRCxxQkFBU0ssT0FBT0osT0FBTyxDQUFQLENBQVAsRUFBa0JDLEtBQWxCLENBQXdCLEdBQXhCLEVBQTZCSSxJQUE3QixDQUFrQyxFQUFsQyxFQUFzQ0osS0FBdEMsQ0FBNEMsR0FBNUMsRUFBaURJLElBQWpELENBQXNELEVBQXRELENBQVQ7O0FBRUEsZ0JBQUksQ0FBQ1AsS0FBTCxFQUNJLE1BQU0sSUFBSVEsU0FBSixDQUFjLDBEQUFkLENBQU47O0FBRUpKLDBCQUFjTCxTQUFTVSxJQUFULENBQWNULEtBQWQsQ0FBZDs7QUFFQSxnQkFBSSxDQUFDSSxXQUFMLEVBQ0ksTUFBTSxJQUFJTSxjQUFKLG9DQUFtRFYsS0FBbkQsU0FBTjs7QUFFSkssdUJBQVcsSUFBSUQsV0FBSixDQUFnQk4sTUFBaEIsRUFBd0JBLE9BQU9hLEtBQVAsQ0FBYUMsTUFBckMsRUFBNkNkLE9BQU9hLEtBQVAsQ0FBYUMsTUFBYixDQUFvQkMsV0FBakUsQ0FBWDs7QUFFQSxnQkFBSSxPQUFPUixTQUFTSixNQUFULENBQVAsS0FBNEIsVUFBaEMsRUFDSSxNQUFNLElBQUlTLGNBQUosQ0FBbUIsa0JBQWVMLFNBQVNTLFdBQVQsQ0FBcUJDLElBQXBDLDBDQUNNZCxNQUROLFNBQW5CLENBQU47O0FBR0pILG1CQUFPa0IsU0FBUCxDQUFpQkMsSUFBakIsQ0FBc0IsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLElBQVg7QUFBQSx1QkFDbEJmLFNBQVNKLE1BQVQsRUFDSUgsT0FBT3VCLE9BQVAsQ0FBZUMsT0FBZixDQUF1QkosR0FBdkIsRUFBNEJDLEdBQTVCLEVBQWlDckIsTUFBakMsQ0FESixFQUVJQSxPQUFPdUIsT0FBUCxDQUFlRSxRQUFmLENBQXdCTCxHQUF4QixFQUE2QkMsR0FBN0IsRUFBa0NyQixNQUFsQyxDQUZKLEVBR0lzQixJQUhKLENBRGtCO0FBQUEsYUFBdEI7QUFNSDs7Ozs7O2tCQUlVeEIsVyIsImZpbGUiOiJDb250cm9sbGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENvbnRyb2xsZXJzIHtcblxuICAgIHN0YXRpYyBwcmVwYXJlKGRlZiwgYWN0aW9uLCByZXNvdXJjZSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGVmLmFjdGlvbiAhPT0gJ3N0cmluZycpIHJldHVybjtcblxuICAgICAgICB2YXIga2xhc3M7XG4gICAgICAgIHZhciBtZXRob2Q7XG4gICAgICAgIHZhciBwaWVjZXMgPSBkZWYuYWN0aW9uLnNwbGl0KCcuJyk7XG4gICAgICAgIHZhciBDb25zdHJ1Y3RvcjtcbiAgICAgICAgdmFyIGluc3RhbmNlO1xuXG4gICAgICAgIGtsYXNzID0gcGllY2VzWzBdO1xuICAgICAgICBtZXRob2QgPSBTdHJpbmcocGllY2VzWzFdKS5zcGxpdCgnKCcpLmpvaW4oJycpLnNwbGl0KCcpJykuam9pbignJyk7XG5cbiAgICAgICAgaWYgKCFrbGFzcylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgY2xhc3MgbmFtZSBtdXN0IGJlIHNwZWNpZmllZCBpbiBhbiBhY3Rpb24gZGVjbGVyYXRpb24hJyk7XG5cbiAgICAgICAgQ29uc3RydWN0b3IgPSByZXNvdXJjZS5maW5kKGtsYXNzKTtcblxuICAgICAgICBpZiAoIUNvbnN0cnVjdG9yKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGBVbmFibGUgdG8gbG9jYXRlIGNvbnRyb2xsZXIgJyR7a2xhc3N9JyFgKTtcblxuICAgICAgICBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcihhY3Rpb24sIGFjdGlvbi5yb3V0ZS5tb2R1bGUsIGFjdGlvbi5yb3V0ZS5tb2R1bGUuYXBwbGljYXRpb24pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaW5zdGFuY2VbbWV0aG9kXSAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgQ29udHJvbGxlciAnJHtpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lfScgYCArXG4gICAgICAgICAgICAgICAgYGRvZXMgbm90IGhhdmUgYSBtZXRob2QgJyR7bWV0aG9kfSchYCk7XG5cbiAgICAgICAgYWN0aW9uLmNhbGxiYWNrcy5wdXNoKChyZXEsIHJlcywgbmV4dCkgPT5cbiAgICAgICAgICAgIGluc3RhbmNlW21ldGhvZF0oXG4gICAgICAgICAgICAgICAgYWN0aW9uLmZhY3RvcnkucmVxdWVzdChyZXEsIHJlcywgYWN0aW9uKSxcbiAgICAgICAgICAgICAgICBhY3Rpb24uZmFjdG9yeS5yZXNwb25zZShyZXEsIHJlcywgYWN0aW9uKSxcbiAgICAgICAgICAgICAgICBuZXh0KSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcnNcbiJdfQ==