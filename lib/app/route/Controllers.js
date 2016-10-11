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
                return instance[method](action.factory.request(req, action), action.factory.response(res, action), next);
            });
        }
    }]);

    return Controllers;
}();

exports.default = Controllers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvQ29udHJvbGxlcnMuanMiXSwibmFtZXMiOlsiQ29udHJvbGxlcnMiLCJkZWYiLCJhY3Rpb24iLCJyZXNvdXJjZSIsImtsYXNzIiwibWV0aG9kIiwicGllY2VzIiwic3BsaXQiLCJDb25zdHJ1Y3RvciIsImluc3RhbmNlIiwiU3RyaW5nIiwiam9pbiIsIlR5cGVFcnJvciIsImZpbmQiLCJSZWZlcmVuY2VFcnJvciIsInJvdXRlIiwibW9kdWxlIiwiYXBwbGljYXRpb24iLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJjYWxsYmFja3MiLCJwdXNoIiwicmVxIiwicmVzIiwibmV4dCIsImZhY3RvcnkiLCJyZXF1ZXN0IiwicmVzcG9uc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsVzs7Ozs7OztnQ0FFYUMsRyxFQUFLQyxNLEVBQVFDLFEsRUFBVTs7QUFFbEMsZ0JBQUksT0FBT0YsSUFBSUMsTUFBWCxLQUFzQixRQUExQixFQUFvQzs7QUFFcEMsZ0JBQUlFLEtBQUo7QUFDQSxnQkFBSUMsTUFBSjtBQUNBLGdCQUFJQyxTQUFTTCxJQUFJQyxNQUFKLENBQVdLLEtBQVgsQ0FBaUIsR0FBakIsQ0FBYjtBQUNBLGdCQUFJQyxXQUFKO0FBQ0EsZ0JBQUlDLFFBQUo7O0FBRUFMLG9CQUFRRSxPQUFPLENBQVAsQ0FBUjtBQUNBRCxxQkFBU0ssT0FBT0osT0FBTyxDQUFQLENBQVAsRUFBa0JDLEtBQWxCLENBQXdCLEdBQXhCLEVBQTZCSSxJQUE3QixDQUFrQyxFQUFsQyxFQUFzQ0osS0FBdEMsQ0FBNEMsR0FBNUMsRUFBaURJLElBQWpELENBQXNELEVBQXRELENBQVQ7O0FBRUEsZ0JBQUksQ0FBQ1AsS0FBTCxFQUNJLE1BQU0sSUFBSVEsU0FBSixDQUFjLDBEQUFkLENBQU47O0FBRUpKLDBCQUFjTCxTQUFTVSxJQUFULENBQWNULEtBQWQsQ0FBZDs7QUFFQSxnQkFBSSxDQUFDSSxXQUFMLEVBQ0ksTUFBTSxJQUFJTSxjQUFKLG9DQUFtRFYsS0FBbkQsU0FBTjs7QUFFSkssdUJBQVcsSUFBSUQsV0FBSixDQUFnQk4sTUFBaEIsRUFBd0JBLE9BQU9hLEtBQVAsQ0FBYUMsTUFBckMsRUFBNkNkLE9BQU9hLEtBQVAsQ0FBYUMsTUFBYixDQUFvQkMsV0FBakUsQ0FBWDs7QUFFQSxnQkFBSSxPQUFPUixTQUFTSixNQUFULENBQVAsS0FBNEIsVUFBaEMsRUFDSSxNQUFNLElBQUlTLGNBQUosQ0FBbUIsa0JBQWVMLFNBQVNTLFdBQVQsQ0FBcUJDLElBQXBDLDBDQUNNZCxNQUROLFNBQW5CLENBQU47O0FBR0pILG1CQUFPa0IsU0FBUCxDQUFpQkMsSUFBakIsQ0FBc0IsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLElBQVg7QUFBQSx1QkFDbEJmLFNBQVNKLE1BQVQsRUFDSUgsT0FBT3VCLE9BQVAsQ0FBZUMsT0FBZixDQUF1QkosR0FBdkIsRUFBNEJwQixNQUE1QixDQURKLEVBRUlBLE9BQU91QixPQUFQLENBQWVFLFFBQWYsQ0FBd0JKLEdBQXhCLEVBQTZCckIsTUFBN0IsQ0FGSixFQUdJc0IsSUFISixDQURrQjtBQUFBLGFBQXRCO0FBTUg7Ozs7OztrQkFJVXhCLFciLCJmaWxlIjoiQ29udHJvbGxlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDb250cm9sbGVycyB7XG5cbiAgICBzdGF0aWMgcHJlcGFyZShkZWYsIGFjdGlvbiwgcmVzb3VyY2UpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGRlZi5hY3Rpb24gIT09ICdzdHJpbmcnKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGtsYXNzO1xuICAgICAgICB2YXIgbWV0aG9kO1xuICAgICAgICB2YXIgcGllY2VzID0gZGVmLmFjdGlvbi5zcGxpdCgnLicpO1xuICAgICAgICB2YXIgQ29uc3RydWN0b3I7XG4gICAgICAgIHZhciBpbnN0YW5jZTtcblxuICAgICAgICBrbGFzcyA9IHBpZWNlc1swXTtcbiAgICAgICAgbWV0aG9kID0gU3RyaW5nKHBpZWNlc1sxXSkuc3BsaXQoJygnKS5qb2luKCcnKS5zcGxpdCgnKScpLmpvaW4oJycpO1xuXG4gICAgICAgIGlmICgha2xhc3MpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIGNsYXNzIG5hbWUgbXVzdCBiZSBzcGVjaWZpZWQgaW4gYW4gYWN0aW9uIGRlY2xlcmF0aW9uIScpO1xuXG4gICAgICAgIENvbnN0cnVjdG9yID0gcmVzb3VyY2UuZmluZChrbGFzcyk7XG5cbiAgICAgICAgaWYgKCFDb25zdHJ1Y3RvcilcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgVW5hYmxlIHRvIGxvY2F0ZSBjb250cm9sbGVyICcke2tsYXNzfSchYCk7XG5cbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoYWN0aW9uLCBhY3Rpb24ucm91dGUubW9kdWxlLCBhY3Rpb24ucm91dGUubW9kdWxlLmFwcGxpY2F0aW9uKTtcblxuICAgICAgICBpZiAodHlwZW9mIGluc3RhbmNlW21ldGhvZF0gIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYENvbnRyb2xsZXIgJyR7aW5zdGFuY2UuY29uc3RydWN0b3IubmFtZX0nIGAgK1xuICAgICAgICAgICAgICAgIGBkb2VzIG5vdCBoYXZlIGEgbWV0aG9kICcke21ldGhvZH0nIWApO1xuXG4gICAgICAgIGFjdGlvbi5jYWxsYmFja3MucHVzaCgocmVxLCByZXMsIG5leHQpID0+XG4gICAgICAgICAgICBpbnN0YW5jZVttZXRob2RdKFxuICAgICAgICAgICAgICAgIGFjdGlvbi5mYWN0b3J5LnJlcXVlc3QocmVxLCBhY3Rpb24pLFxuICAgICAgICAgICAgICAgIGFjdGlvbi5mYWN0b3J5LnJlc3BvbnNlKHJlcywgYWN0aW9uKSxcbiAgICAgICAgICAgICAgICBuZXh0KSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcnNcbiJdfQ==