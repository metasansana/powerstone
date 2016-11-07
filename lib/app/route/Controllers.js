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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvQ29udHJvbGxlcnMuanMiXSwibmFtZXMiOlsiQ29udHJvbGxlcnMiLCJkZWYiLCJhY3Rpb24iLCJyZXNvdXJjZSIsImtsYXNzIiwibWV0aG9kIiwicGllY2VzIiwic3BsaXQiLCJDb25zdHJ1Y3RvciIsImluc3RhbmNlIiwiZmlsdGVycyIsIlN0cmluZyIsImpvaW4iLCJUeXBlRXJyb3IiLCJmaW5kIiwiUmVmZXJlbmNlRXJyb3IiLCJyb3V0ZSIsIm1vZHVsZSIsImFwcGxpY2F0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiaGFzT3duUHJvcGVydHkiLCJBcnJheSIsImlzQXJyYXkiLCJmaWx0ZXIiLCJmIiwiY2FsbGJhY2tzIiwicHVzaCIsImFwcGx5IiwibWFwIiwibWFwX2ZpbHRlcnMiLCJmaWx0ZXJfaGFuZGxlX3JlcXVlc3QiLCJyZXEiLCJyZXMiLCJuZXh0IiwicHJlcSIsImZhY3RvcnkiLCJyZXF1ZXN0Iiwib3V0cHV0IiwicHJlcyIsInJlc3BvbnNlIiwidHJ5IiwiY2F0Y2giLCJlIiwib25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJvblJvdXRlRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFTUEsVzs7Ozs7OztnQ0FFYUMsRyxFQUFLQyxNLEVBQVFDLFEsRUFBVTs7QUFFbEMsZ0JBQUksT0FBT0YsSUFBSUMsTUFBWCxLQUFzQixRQUExQixFQUFvQzs7QUFFcEMsZ0JBQUlFLEtBQUo7QUFDQSxnQkFBSUMsTUFBSjtBQUNBLGdCQUFJQyxTQUFTTCxJQUFJQyxNQUFKLENBQVdLLEtBQVgsQ0FBaUIsR0FBakIsQ0FBYjtBQUNBLGdCQUFJQyxXQUFKO0FBQ0EsZ0JBQUlDLFFBQUo7QUFDQSxnQkFBSUMsVUFBVSxFQUFkOztBQUVBTixvQkFBUUUsT0FBTyxDQUFQLENBQVI7QUFDQUQscUJBQVNNLE9BQU9MLE9BQU8sQ0FBUCxDQUFQLEVBQWtCQyxLQUFsQixDQUF3QixHQUF4QixF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LE1BQVQsRUFBaUI4QixJQUFqQixFQUF1QkksSUFBdkIsQ0FBUDtBQUFxQyxpQkFBOUQsRUFDQUcsS0FEQSxDQUNNLFVBQVNDLENBQVQsRUFBWTs7QUFFZCwyQkFBT3pDLE9BQ1BjLEtBRE8sQ0FFUEMsTUFGTyxDQUdQQyxXQUhPLENBSVAwQixvQkFKTyxDQUljQyxZQUpkLENBSTJCRixDQUozQixFQUk4QlIsSUFKOUIsRUFJb0NJLElBSnBDLEVBSTBDTCxJQUoxQyxDQUFQO0FBTUgsaUJBVEQ7QUFXSCxhQWhCRDtBQWtCSDs7Ozs7O2tCQUlVbEMsVyIsImZpbGUiOiJDb250cm9sbGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcblxuY2xhc3MgQ29udHJvbGxlcnMge1xuXG4gICAgc3RhdGljIHByZXBhcmUoZGVmLCBhY3Rpb24sIHJlc291cmNlKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkZWYuYWN0aW9uICE9PSAnc3RyaW5nJykgcmV0dXJuO1xuXG4gICAgICAgIHZhciBrbGFzcztcbiAgICAgICAgdmFyIG1ldGhvZDtcbiAgICAgICAgdmFyIHBpZWNlcyA9IGRlZi5hY3Rpb24uc3BsaXQoJy4nKTtcbiAgICAgICAgdmFyIENvbnN0cnVjdG9yO1xuICAgICAgICB2YXIgaW5zdGFuY2U7XG4gICAgICAgIHZhciBmaWx0ZXJzID0gW107XG5cbiAgICAgICAga2xhc3MgPSBwaWVjZXNbMF07XG4gICAgICAgIG1ldGhvZCA9IFN0cmluZyhwaWVjZXNbMV0pLnNwbGl0KCcoJykuam9pbignJykuc3BsaXQoJyknKS5qb2luKCcnKTtcblxuICAgICAgICBpZiAoIWtsYXNzKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQSBjbGFzcyBuYW1lIG11c3QgYmUgc3BlY2lmaWVkIGluIGFuIGFjdGlvbiBkZWNsZXJhdGlvbiEnKTtcblxuICAgICAgICBDb25zdHJ1Y3RvciA9IHJlc291cmNlLmZpbmQoa2xhc3MpO1xuXG4gICAgICAgIGlmICghQ29uc3RydWN0b3IpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYFVuYWJsZSB0byBsb2NhdGUgY29udHJvbGxlciAnJHtrbGFzc30nIWApO1xuXG4gICAgICAgIC8qIEB0b2RvIGNhY2hlIGNyZWF0ZWQgaW5zdGFuY2VzIHNvIHRoZXkgYXJlIHJldXNhYmxlICovXG5cbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoYWN0aW9uLCBhY3Rpb24ucm91dGUubW9kdWxlLCBhY3Rpb24ucm91dGUubW9kdWxlLmFwcGxpY2F0aW9uKTtcblxuICAgICAgICBpZiAodHlwZW9mIGluc3RhbmNlW21ldGhvZF0gIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYENvbnRyb2xsZXIgJyR7aW5zdGFuY2UuY29uc3RydWN0b3IubmFtZX0nIGAgK1xuICAgICAgICAgICAgICAgIGBkb2VzIG5vdCBoYXZlIGEgbWV0aG9kICcke21ldGhvZH0nIWApO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaW5zdGFuY2UuZmlsdGVycyA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuZmlsdGVycy5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKVxuICAgICAgICAgICAgICAgIGZpbHRlcnMgPSAoQXJyYXkuaXNBcnJheShpbnN0YW5jZS5maWx0ZXJzW21ldGhvZF0pKSA/XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuZmlsdGVyc1ttZXRob2RdIDogW2luc3RhbmNlLmZpbHRlcnNbbWV0aG9kXV0uZmlsdGVyKGZ1bmN0aW9uKGYpIHsgcmV0dXJuIGY7IH0pO1xuXG4gICAgICAgIGFjdGlvbi5jYWxsYmFja3MucHVzaC5hcHBseShhY3Rpb24uY2FsbGJhY2tzLFxuICAgICAgICAgICAgZmlsdGVycy5tYXAoZnVuY3Rpb24gbWFwX2ZpbHRlcnMoZikge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGZpbHRlcl9oYW5kbGVfcmVxdWVzdChyZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmVxID0gYWN0aW9uLmZhY3RvcnkucmVxdWVzdChyZXEsIHJlcywgYWN0aW9uLm91dHB1dCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmVzID0gYWN0aW9uLmZhY3RvcnkucmVzcG9uc2UocmVxLCByZXMsIGFjdGlvbi5vdXRwdXQpO1xuXG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UudHJ5KGZ1bmN0aW9uKCkgeyByZXR1cm4gZi5hcHBseShwcmVxLCBwcmVzLCBuZXh0KSB9KS5cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2goZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUuXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUuXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUm91dGVFcnJvckxpc3RlbmVyLm9uUm91dGVFcnJvcihlLCBwcmVxLCBwcmVzLCBuZXh0KTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIGFjdGlvbi5jYWxsYmFja3MucHVzaChmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgICAgICB2YXIgcHJlcSA9IGFjdGlvbi5mYWN0b3J5LnJlcXVlc3QocmVxLCByZXMsIGFjdGlvbi5vdXRwdXQpO1xuICAgICAgICAgICAgdmFyIHByZXMgPSBhY3Rpb24uZmFjdG9yeS5yZXNwb25zZShyZXEsIHJlcywgYWN0aW9uLm91dHB1dCk7XG5cbiAgICAgICAgICAgIFByb21pc2UudHJ5KGZ1bmN0aW9uKCkgeyByZXR1cm4gaW5zdGFuY2VbbWV0aG9kXShwcmVxLCBwcmVzKSB9KS5cbiAgICAgICAgICAgIGNhdGNoKGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb24uXG4gICAgICAgICAgICAgICAgcm91dGUuXG4gICAgICAgICAgICAgICAgbW9kdWxlLlxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLlxuICAgICAgICAgICAgICAgIG9uUm91dGVFcnJvckxpc3RlbmVyLm9uUm91dGVFcnJvcihlLCBwcmVxLCBwcmVzLCBuZXh0KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcnNcbiJdfQ==