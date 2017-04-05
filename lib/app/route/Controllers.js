'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
            var filters = [];

            klass = pieces[0];
            method = String(pieces[1]).split('(').join('').split(')').join('');

            if (!klass) throw new TypeError('A class name must be specified in an action decleration!');

            Constructor = resource.find(klass);

            if (!Constructor) throw new ReferenceError('Unable to locate controller \'' + klass + '\'!');

            /* @todo cache created instances so they are reusable */

            instance = new Constructor(action, action.route.module, action.route.module.application);

            if (typeof instance[method] !== 'function') throw new ReferenceError('Controller \'' + instance.constructor.name + '\' ' + ('does not have a method \'' + method + '\'!'));

            if (_typeof(instance.filters) === 'object') if (instance.filters.hasOwnProperty(method)) filters = Array.isArray(instance.filters[method]) ? instance.filters[method] : [instance.filters[method]].filter(function (f) {
                return f;
            });

            action.callbacks.push.apply(action.callbacks, filters.map(function map_filters(f) {

                return function filter_handle_request(req, res, next) {

                    var preq = action.factory.request(req, res, action.output);
                    var pres = action.factory.response(req, res, action.output);

                    _bluebird2.default.try(function () {
                        return f.apply(preq, pres, next);
                    }).catch(function (e) {

                        return action.route.module.application.onRouteErrorListener.onRouteError(e, preq, pres, next);
                    });
                };
            }));

            action.callbacks.push(function (req, res, next) {

                var preq = action.factory.request(req, res, action.output);
                var pres = action.factory.response(req, res, action.output);

                preq.action = action;

                _bluebird2.default.try(function () {
                    return instance[method](preq, pres);
                }).catch(function (e) {

                    return action.route.module.application.onRouteErrorListener.onRouteError(e, preq, pres, next);
                });
            });
        }
    }]);

    return Controllers;
}();

exports.default = Controllers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvQ29udHJvbGxlcnMuanMiXSwibmFtZXMiOlsiQ29udHJvbGxlcnMiLCJkZWYiLCJhY3Rpb24iLCJyZXNvdXJjZSIsImtsYXNzIiwibWV0aG9kIiwicGllY2VzIiwic3BsaXQiLCJDb25zdHJ1Y3RvciIsImluc3RhbmNlIiwiZmlsdGVycyIsIlN0cmluZyIsImpvaW4iLCJUeXBlRXJyb3IiLCJmaW5kIiwiUmVmZXJlbmNlRXJyb3IiLCJyb3V0ZSIsIm1vZHVsZSIsImFwcGxpY2F0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiaGFzT3duUHJvcGVydHkiLCJBcnJheSIsImlzQXJyYXkiLCJmaWx0ZXIiLCJmIiwiY2FsbGJhY2tzIiwicHVzaCIsImFwcGx5IiwibWFwIiwibWFwX2ZpbHRlcnMiLCJmaWx0ZXJfaGFuZGxlX3JlcXVlc3QiLCJyZXEiLCJyZXMiLCJuZXh0IiwicHJlcSIsImZhY3RvcnkiLCJyZXF1ZXN0Iiwib3V0cHV0IiwicHJlcyIsInJlc3BvbnNlIiwidHJ5IiwiY2F0Y2giLCJlIiwib25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJvblJvdXRlRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFTUEsVzs7Ozs7OztnQ0FFYUMsRyxFQUFLQyxNLEVBQVFDLFEsRUFBVTs7QUFFbEMsZ0JBQUksT0FBT0YsSUFBSUMsTUFBWCxLQUFzQixRQUExQixFQUFvQzs7QUFFcEMsZ0JBQUlFLEtBQUo7QUFDQSxnQkFBSUMsTUFBSjtBQUNBLGdCQUFJQyxTQUFTTCxJQUFJQyxNQUFKLENBQVdLLEtBQVgsQ0FBaUIsR0FBakIsQ0FBYjtBQUNBLGdCQUFJQyxXQUFKO0FBQ0EsZ0JBQUlDLFFBQUo7QUFDQSxnQkFBSUMsVUFBVSxFQUFkOztBQUVBTixvQkFBUUUsT0FBTyxDQUFQLENBQVI7QUFDQUQscUJBQVNNLE9BQU9MLE9BQU8sQ0FBUCxDQUFQLEVBQWtCQyxLQUFsQixDQUF3QixHQUF4QixF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QUFSLENBQVksWUFBVztBQUFFLDJCQUFPaEMsU0FBU0osTUFBVCxFQUFpQjhCLElBQWpCLEVBQXVCSSxJQUF2QixDQUFQO0FBQXFDLGlCQUE5RCxFQUNBRyxLQURBLENBQ00sVUFBU0MsQ0FBVCxFQUFZOztBQUVkLDJCQUFPekMsT0FDUGMsS0FETyxDQUVQQyxNQUZPLENBR1BDLFdBSE8sQ0FJUDBCLG9CQUpPLENBSWNDLFlBSmQsQ0FJMkJGLENBSjNCLEVBSThCUixJQUo5QixFQUlvQ0ksSUFKcEMsRUFJMENMLElBSjFDLENBQVA7QUFNSCxpQkFURDtBQVdILGFBbEJEO0FBb0JIOzs7Ozs7a0JBSVVsQyxXIiwiZmlsZSI6IkNvbnRyb2xsZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG5jbGFzcyBDb250cm9sbGVycyB7XG5cbiAgICBzdGF0aWMgcHJlcGFyZShkZWYsIGFjdGlvbiwgcmVzb3VyY2UpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGRlZi5hY3Rpb24gIT09ICdzdHJpbmcnKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGtsYXNzO1xuICAgICAgICB2YXIgbWV0aG9kO1xuICAgICAgICB2YXIgcGllY2VzID0gZGVmLmFjdGlvbi5zcGxpdCgnLicpO1xuICAgICAgICB2YXIgQ29uc3RydWN0b3I7XG4gICAgICAgIHZhciBpbnN0YW5jZTtcbiAgICAgICAgdmFyIGZpbHRlcnMgPSBbXTtcblxuICAgICAgICBrbGFzcyA9IHBpZWNlc1swXTtcbiAgICAgICAgbWV0aG9kID0gU3RyaW5nKHBpZWNlc1sxXSkuc3BsaXQoJygnKS5qb2luKCcnKS5zcGxpdCgnKScpLmpvaW4oJycpO1xuXG4gICAgICAgIGlmICgha2xhc3MpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIGNsYXNzIG5hbWUgbXVzdCBiZSBzcGVjaWZpZWQgaW4gYW4gYWN0aW9uIGRlY2xlcmF0aW9uIScpO1xuXG4gICAgICAgIENvbnN0cnVjdG9yID0gcmVzb3VyY2UuZmluZChrbGFzcyk7XG5cbiAgICAgICAgaWYgKCFDb25zdHJ1Y3RvcilcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgVW5hYmxlIHRvIGxvY2F0ZSBjb250cm9sbGVyICcke2tsYXNzfSchYCk7XG5cbiAgICAgICAgLyogQHRvZG8gY2FjaGUgY3JlYXRlZCBpbnN0YW5jZXMgc28gdGhleSBhcmUgcmV1c2FibGUgKi9cblxuICAgICAgICBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcihhY3Rpb24sIGFjdGlvbi5yb3V0ZS5tb2R1bGUsIGFjdGlvbi5yb3V0ZS5tb2R1bGUuYXBwbGljYXRpb24pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaW5zdGFuY2VbbWV0aG9kXSAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgQ29udHJvbGxlciAnJHtpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lfScgYCArXG4gICAgICAgICAgICAgICAgYGRvZXMgbm90IGhhdmUgYSBtZXRob2QgJyR7bWV0aG9kfSchYCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbnN0YW5jZS5maWx0ZXJzID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5maWx0ZXJzLmhhc093blByb3BlcnR5KG1ldGhvZCkpXG4gICAgICAgICAgICAgICAgZmlsdGVycyA9IChBcnJheS5pc0FycmF5KGluc3RhbmNlLmZpbHRlcnNbbWV0aG9kXSkpID9cbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5maWx0ZXJzW21ldGhvZF0gOiBbaW5zdGFuY2UuZmlsdGVyc1ttZXRob2RdXS5maWx0ZXIoZnVuY3Rpb24oZikgeyByZXR1cm4gZjsgfSk7XG5cbiAgICAgICAgYWN0aW9uLmNhbGxiYWNrcy5wdXNoLmFwcGx5KGFjdGlvbi5jYWxsYmFja3MsXG4gICAgICAgICAgICBmaWx0ZXJzLm1hcChmdW5jdGlvbiBtYXBfZmlsdGVycyhmKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gZmlsdGVyX2hhbmRsZV9yZXF1ZXN0KHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXEgPSBhY3Rpb24uZmFjdG9yeS5yZXF1ZXN0KHJlcSwgcmVzLCBhY3Rpb24ub3V0cHV0KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXMgPSBhY3Rpb24uZmFjdG9yeS5yZXNwb25zZShyZXEsIHJlcywgYWN0aW9uLm91dHB1dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS50cnkoZnVuY3Rpb24oKSB7IHJldHVybiBmLmFwcGx5KHByZXEsIHByZXMsIG5leHQpIH0pLlxuICAgICAgICAgICAgICAgICAgICBjYXRjaChmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgb25Sb3V0ZUVycm9yTGlzdGVuZXIub25Sb3V0ZUVycm9yKGUsIHByZXEsIHByZXMsIG5leHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgYWN0aW9uLmNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgICAgICAgICAgIHZhciBwcmVxID0gYWN0aW9uLmZhY3RvcnkucmVxdWVzdChyZXEsIHJlcywgYWN0aW9uLm91dHB1dCk7XG4gICAgICAgICAgICB2YXIgcHJlcyA9IGFjdGlvbi5mYWN0b3J5LnJlc3BvbnNlKHJlcSwgcmVzLCBhY3Rpb24ub3V0cHV0KTtcblxuICAgICAgICAgICAgcHJlcS5hY3Rpb24gPSBhY3Rpb247XG5cbiAgICAgICAgICAgIFByb21pc2UudHJ5KGZ1bmN0aW9uKCkgeyByZXR1cm4gaW5zdGFuY2VbbWV0aG9kXShwcmVxLCBwcmVzKSB9KS5cbiAgICAgICAgICAgIGNhdGNoKGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb24uXG4gICAgICAgICAgICAgICAgcm91dGUuXG4gICAgICAgICAgICAgICAgbW9kdWxlLlxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLlxuICAgICAgICAgICAgICAgIG9uUm91dGVFcnJvckxpc3RlbmVyLm9uUm91dGVFcnJvcihlLCBwcmVxLCBwcmVzLCBuZXh0KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcnNcbiJdfQ==