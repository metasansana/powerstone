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

                var preq = action.factory.request(req, res, action.output);
                var pres = action.factory.response(req, res, action.output);

                _bluebird2.default.resolve(instance[method](preq, pres, next)).catch(function (e) {
                    return action.route.module.application.onRouteErrorListener.onRouteError(e, preq, pres, next);
                });
            });
        }
    }]);

    return Controllers;
}();

exports.default = Controllers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvQ29udHJvbGxlcnMuanMiXSwibmFtZXMiOlsiQ29udHJvbGxlcnMiLCJkZWYiLCJhY3Rpb24iLCJyZXNvdXJjZSIsImtsYXNzIiwibWV0aG9kIiwicGllY2VzIiwic3BsaXQiLCJDb25zdHJ1Y3RvciIsImluc3RhbmNlIiwiU3RyaW5nIiwiam9pbiIsIlR5cGVFcnJvciIsImZpbmQiLCJSZWZlcmVuY2VFcnJvciIsInJvdXRlIiwibW9kdWxlIiwiYXBwbGljYXRpb24iLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJjYWxsYmFja3MiLCJwdXNoIiwicmVxIiwicmVzIiwibmV4dCIsInByZXEiLCJmYWN0b3J5IiwicmVxdWVzdCIsIm91dHB1dCIsInByZXMiLCJyZXNwb25zZSIsInJlc29sdmUiLCJjYXRjaCIsIm9uUm91dGVFcnJvckxpc3RlbmVyIiwib25Sb3V0ZUVycm9yIiwiZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFTUEsVzs7Ozs7OztnQ0FFYUMsRyxFQUFLQyxNLEVBQVFDLFEsRUFBVTs7QUFFbEMsZ0JBQUksT0FBT0YsSUFBSUMsTUFBWCxLQUFzQixRQUExQixFQUFvQzs7QUFFcEMsZ0JBQUlFLEtBQUo7QUFDQSxnQkFBSUMsTUFBSjtBQUNBLGdCQUFJQyxTQUFTTCxJQUFJQyxNQUFKLENBQVdLLEtBQVgsQ0FBaUIsR0FBakIsQ0FBYjtBQUNBLGdCQUFJQyxXQUFKO0FBQ0EsZ0JBQUlDLFFBQUo7O0FBRUFMLG9CQUFRRSxPQUFPLENBQVAsQ0FBUjtBQUNBRCxxQkFBU0ssT0FBT0osT0FBTyxDQUFQLENBQVAsRUFBa0JDLEtBQWxCLENBQXdCLEdBQXhCLEVBQTZCSSxJQUE3QixDQUFrQyxFQUFsQyxFQUFzQ0osS0FBdEMsQ0FBNEMsR0FBNUMsRUFBaURJLElBQWpELENBQXNELEVBQXRELENBQVQ7O0FBRUEsZ0JBQUksQ0FBQ1AsS0FBTCxFQUNJLE1BQU0sSUFBSVEsU0FBSixDQUFjLDBEQUFkLENBQU47O0FBRUpKLDBCQUFjTCxTQUFTVSxJQUFULENBQWNULEtBQWQsQ0FBZDs7QUFFQSxnQkFBSSxDQUFDSSxXQUFMLEVBQ0ksTUFBTSxJQUFJTSxjQUFKLG9DQUFtRFYsS0FBbkQsU0FBTjs7QUFFSkssdUJBQVcsSUFBSUQsV0FBSixDQUFnQk4sTUFBaEIsRUFBd0JBLE9BQU9hLEtBQVAsQ0FBYUMsTUFBckMsRUFBNkNkLE9BQU9hLEtBQVAsQ0FBYUMsTUFBYixDQUFvQkMsV0FBakUsQ0FBWDs7QUFFQSxnQkFBSSxPQUFPUixTQUFTSixNQUFULENBQVAsS0FBNEIsVUFBaEMsRUFDSSxNQUFNLElBQUlTLGNBQUosQ0FBbUIsa0JBQWVMLFNBQVNTLFdBQVQsQ0FBcUJDLElBQXBDLDBDQUNNZCxNQUROLFNBQW5CLENBQU47O0FBR0pILG1CQUFPa0IsU0FBUCxDQUFpQkMsSUFBakIsQ0FBc0IsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLElBQVgsRUFBb0I7O0FBRXRDLG9CQUFJQyxPQUFPdkIsT0FBT3dCLE9BQVAsQ0FBZUMsT0FBZixDQUF1QkwsR0FBdkIsRUFBNEJDLEdBQTVCLEVBQWlDckIsT0FBTzBCLE1BQXhDLENBQVg7QUFDQSxvQkFBSUMsT0FBTzNCLE9BQU93QixPQUFQLENBQWVJLFFBQWYsQ0FBd0JSLEdBQXhCLEVBQTZCQyxHQUE3QixFQUFrQ3JCLE9BQU8wQixNQUF6QyxDQUFYOztBQUVBLG1DQUFRRyxPQUFSLENBQWdCdEIsU0FBU0osTUFBVCxFQUFpQm9CLElBQWpCLEVBQXVCSSxJQUF2QixFQUE2QkwsSUFBN0IsQ0FBaEIsRUFBb0RRLEtBQXBELENBQTBEO0FBQUEsMkJBQ3REOUIsT0FBT2EsS0FBUCxDQUFhQyxNQUFiLENBQW9CQyxXQUFwQixDQUFnQ2dCLG9CQUFoQyxDQUFxREMsWUFBckQsQ0FBa0VDLENBQWxFLEVBQXFFVixJQUFyRSxFQUEyRUksSUFBM0UsRUFBaUZMLElBQWpGLENBRHNEO0FBQUEsaUJBQTFEO0FBR0gsYUFSRDtBQVVIOzs7Ozs7a0JBSVV4QixXIiwiZmlsZSI6IkNvbnRyb2xsZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG5jbGFzcyBDb250cm9sbGVycyB7XG5cbiAgICBzdGF0aWMgcHJlcGFyZShkZWYsIGFjdGlvbiwgcmVzb3VyY2UpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGRlZi5hY3Rpb24gIT09ICdzdHJpbmcnKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGtsYXNzO1xuICAgICAgICB2YXIgbWV0aG9kO1xuICAgICAgICB2YXIgcGllY2VzID0gZGVmLmFjdGlvbi5zcGxpdCgnLicpO1xuICAgICAgICB2YXIgQ29uc3RydWN0b3I7XG4gICAgICAgIHZhciBpbnN0YW5jZTtcblxuICAgICAgICBrbGFzcyA9IHBpZWNlc1swXTtcbiAgICAgICAgbWV0aG9kID0gU3RyaW5nKHBpZWNlc1sxXSkuc3BsaXQoJygnKS5qb2luKCcnKS5zcGxpdCgnKScpLmpvaW4oJycpO1xuXG4gICAgICAgIGlmICgha2xhc3MpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIGNsYXNzIG5hbWUgbXVzdCBiZSBzcGVjaWZpZWQgaW4gYW4gYWN0aW9uIGRlY2xlcmF0aW9uIScpO1xuXG4gICAgICAgIENvbnN0cnVjdG9yID0gcmVzb3VyY2UuZmluZChrbGFzcyk7XG5cbiAgICAgICAgaWYgKCFDb25zdHJ1Y3RvcilcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgVW5hYmxlIHRvIGxvY2F0ZSBjb250cm9sbGVyICcke2tsYXNzfSchYCk7XG5cbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoYWN0aW9uLCBhY3Rpb24ucm91dGUubW9kdWxlLCBhY3Rpb24ucm91dGUubW9kdWxlLmFwcGxpY2F0aW9uKTtcblxuICAgICAgICBpZiAodHlwZW9mIGluc3RhbmNlW21ldGhvZF0gIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYENvbnRyb2xsZXIgJyR7aW5zdGFuY2UuY29uc3RydWN0b3IubmFtZX0nIGAgK1xuICAgICAgICAgICAgICAgIGBkb2VzIG5vdCBoYXZlIGEgbWV0aG9kICcke21ldGhvZH0nIWApO1xuXG4gICAgICAgIGFjdGlvbi5jYWxsYmFja3MucHVzaCgocmVxLCByZXMsIG5leHQpID0+IHtcblxuICAgICAgICAgICAgdmFyIHByZXEgPSBhY3Rpb24uZmFjdG9yeS5yZXF1ZXN0KHJlcSwgcmVzLCBhY3Rpb24ub3V0cHV0KTtcbiAgICAgICAgICAgIHZhciBwcmVzID0gYWN0aW9uLmZhY3RvcnkucmVzcG9uc2UocmVxLCByZXMsIGFjdGlvbi5vdXRwdXQpO1xuXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoaW5zdGFuY2VbbWV0aG9kXShwcmVxLCBwcmVzLCBuZXh0KSkuY2F0Y2goZSA9PlxuICAgICAgICAgICAgICAgIGFjdGlvbi5yb3V0ZS5tb2R1bGUuYXBwbGljYXRpb24ub25Sb3V0ZUVycm9yTGlzdGVuZXIub25Sb3V0ZUVycm9yKGUsIHByZXEsIHByZXMsIG5leHQpKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyc1xuIl19