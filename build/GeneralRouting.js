'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _expressJsonschema = require('express-jsonschema');

var _expressJsonschema2 = _interopRequireDefault(_expressJsonschema);

var _Strings = require('./Strings');

var _Strings2 = _interopRequireDefault(_Strings);

var _ProjectRegistry = require('./ProjectRegistry');

var _ProjectRegistry2 = _interopRequireDefault(_ProjectRegistry);

var _Routes = require('./Routes');

var _Routes2 = _interopRequireDefault(_Routes);

var validate = _expressJsonschema2['default'].validate;

var onValidatorError = function onValidatorError(err, req, res, next) {

	if (err.name === 'JsonSchemaValidation') {

		res.status(400);

		var responseData = {
			message: 'Errors occurred during ' + req.method + ' request to ' + req.url + '.',
			errors: err.validations
		};

		if (req.xhr || req.get('Content-Type') === 'application/json') {
			res.json(responseData);
		} else {
			console.log(err.stack);
			res.send();
		}
	} else {
		next(err);
	}
};

/**
 * GeneralRouting provides methods for configuring
 * framework routing from the routes.json file.
 */

var GeneralRouting = (function () {
	function GeneralRouting() {
		_classCallCheck(this, GeneralRouting);
	}

	_createClass(GeneralRouting, [{
		key: 'configureSchema',

		/**
   * configureSchema sets up json-schema on the route.
   * @param {Router} router
   * @param {Object} route
   */
		value: function configureSchema(router, route) {

			if (route.schema) {
				router[_Routes2['default'].defaultMethod(route.method)].call(router, route.href, validate(route.schema));
				router.use(onValidatorError);
			}

			return this;
		}
	}, {
		key: 'configureMiddleWare',

		/**
   * configureMiddleWare sets up middleware on the route
   * @param {Router} router
   * @param {Object} route
   */
		value: function configureMiddleWare(router, route) {

			if (route.middleware) {
				route.middleware.split(',').forEach(function (mware) {

					if (!_ProjectRegistry2['default'].middleware.hasOwnProperty(mware)) throw new Error('funcListToArray: Func: ' + mware + ' was not found!');

					router[_Routes2['default'].defaultMethod(route.method)](function (req, res, next) {
						return mware(req, res, next, route);
					});
				});
			}

			return this;
		}
	}, {
		key: 'configureQueries',

		/**
   * configureQueries sets up queries on the route.
   * @param {Router} router
   * @param {Object} route
   */
		value: function configureQueries(router, route) {

			if (route.query) {
				router[_Routes2['default'].defaultMethod(route.method)](route.href, function (req, res, next) {
					_ProjectRegistry2['default'].queries[route.query.script](_ProjectRegistry2['default'].models, route.query, req, res, next);
				});
			}

			return this;
		}
	}, {
		key: 'configureControllers',

		/**
   * configureControllers sets up controllers on the route
   * @param {Router} router
   * @param {Object} route
   */
		value: function configureControllers(router, route) {

			if (route.controller) {

				var args = _Strings2['default'].methodListToBoundFunctionArray(route.controller, _ProjectRegistry2['default'].controllers);
				args.unshift(route.href);

				router[_Routes2['default'].defaultMethod(route.method)].apply(router, args);
			}
			return this;
		}
	}]);

	return GeneralRouting;
})();

exports['default'] = GeneralRouting;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9HZW5lcmFsUm91dGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7aUNBQThCLG9CQUFvQjs7Ozt1QkFDOUIsV0FBVzs7OzsrQkFDSCxtQkFBbUI7Ozs7c0JBQzVCLFVBQVU7Ozs7QUFFN0IsSUFBSSxRQUFRLEdBQUcsK0JBQWtCLFFBQVEsQ0FBQzs7QUFFMUMsSUFBSSxnQkFBZ0IsR0FBRyxTQUFuQixnQkFBZ0IsQ0FBWSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBRXBELEtBQUksR0FBRyxDQUFDLElBQUksS0FBSyxzQkFBc0IsRUFBRTs7QUFFeEMsS0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFaEIsTUFBSSxZQUFZLEdBQUc7QUFDbEIsVUFBTyxFQUFFLHlCQUF5QixHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRztBQUNoRixTQUFNLEVBQUUsR0FBRyxDQUFDLFdBQVc7R0FDdkIsQ0FBQzs7QUFFRixNQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxrQkFBa0IsRUFBRTtBQUM5RCxNQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0dBQ3ZCLE1BQU07QUFDTixVQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QixNQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDWDtFQUVELE1BQU07QUFDTixNQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDVjtDQUNELENBQUM7Ozs7Ozs7SUFNSSxjQUFjO1VBQWQsY0FBYzt3QkFBZCxjQUFjOzs7Y0FBZCxjQUFjOzs7Ozs7OztTQU9KLHlCQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0FBRTlCLE9BQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNqQixVQUFNLENBQUMsb0JBQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDNUYsVUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRTdCOztBQUVELFVBQU8sSUFBSSxDQUFDO0dBQ1o7Ozs7Ozs7OztTQU9rQiw2QkFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFOztBQUVsQyxPQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDTixTQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDekIsT0FBTyxDQUFDLFVBQUEsS0FBSyxFQUFFOztBQUViLFNBQUksQ0FBQyw2QkFBZ0IsVUFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsQ0FBQzs7QUFFMUUsV0FBTSxDQUFDLG9CQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUMsSUFBSTthQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxLQUFLLENBQUM7TUFBQSxDQUFDLENBQUM7S0FFdkYsQ0FBQyxDQUFDO0lBQ3BCOztBQUVELFVBQU8sSUFBSSxDQUFDO0dBQ1o7Ozs7Ozs7OztTQU9lLDBCQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0FBRS9CLE9BQUksS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNoQixVQUFNLENBQUMsb0JBQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUMvRSxrQ0FBZ0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQ3pDLDZCQUFnQixNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3ZELENBQUMsQ0FBQztJQUNIOztBQUVELFVBQU8sSUFBSSxDQUFDO0dBQ1o7Ozs7Ozs7OztTQU9tQiw4QkFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFOztBQUVuQyxPQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7O0FBRXJCLFFBQUksSUFBSSxHQUFHLHFCQUFRLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQ2pFLDZCQUFnQixXQUFXLENBQUMsQ0FBQztBQUM5QixRQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFekIsVUFBTSxDQUFDLG9CQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRS9EO0FBQ0QsVUFBTyxJQUFJLENBQUM7R0FDWjs7O1FBMUVJLGNBQWM7OztxQkErRUwsY0FBYyIsImZpbGUiOiJHZW5lcmFsUm91dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzSlNPTlNjaGVtYSBmcm9tICdleHByZXNzLWpzb25zY2hlbWEnO1xuaW1wb3J0IFN0cmluZ3MgZnJvbSAnLi9TdHJpbmdzJztcbmltcG9ydCBQcm9qZWN0UmVnaXN0cnkgZnJvbSAnLi9Qcm9qZWN0UmVnaXN0cnknO1xuaW1wb3J0IFJvdXRlcyBmcm9tICcuL1JvdXRlcyc7XG5cbnZhciB2YWxpZGF0ZSA9IGV4cHJlc3NKU09OU2NoZW1hLnZhbGlkYXRlO1xuXG52YXIgb25WYWxpZGF0b3JFcnJvciA9IGZ1bmN0aW9uKGVyciwgcmVxLCByZXMsIG5leHQpIHtcblxuXHRpZiAoZXJyLm5hbWUgPT09ICdKc29uU2NoZW1hVmFsaWRhdGlvbicpIHtcblxuXHRcdHJlcy5zdGF0dXMoNDAwKTtcblxuXHRcdHZhciByZXNwb25zZURhdGEgPSB7XG5cdFx0XHRtZXNzYWdlOiAnRXJyb3JzIG9jY3VycmVkIGR1cmluZyAnICsgcmVxLm1ldGhvZCArICcgcmVxdWVzdCB0byAnICsgcmVxLnVybCArICcuJyxcblx0XHRcdGVycm9yczogZXJyLnZhbGlkYXRpb25zXG5cdFx0fTtcblxuXHRcdGlmIChyZXEueGhyIHx8IHJlcS5nZXQoJ0NvbnRlbnQtVHlwZScpID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcblx0XHRcdHJlcy5qc29uKHJlc3BvbnNlRGF0YSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUubG9nKGVyci5zdGFjayk7XG5cdFx0XHRyZXMuc2VuZCgpO1xuXHRcdH1cblxuXHR9IGVsc2Uge1xuXHRcdG5leHQoZXJyKTtcblx0fVxufTtcblxuLyoqXG4gKiBHZW5lcmFsUm91dGluZyBwcm92aWRlcyBtZXRob2RzIGZvciBjb25maWd1cmluZ1xuICogZnJhbWV3b3JrIHJvdXRpbmcgZnJvbSB0aGUgcm91dGVzLmpzb24gZmlsZS5cbiAqL1xuY2xhc3MgR2VuZXJhbFJvdXRpbmcge1xuXG5cdC8qKlxuXHQgKiBjb25maWd1cmVTY2hlbWEgc2V0cyB1cCBqc29uLXNjaGVtYSBvbiB0aGUgcm91dGUuXG5cdCAqIEBwYXJhbSB7Um91dGVyfSByb3V0ZXJcblx0ICogQHBhcmFtIHtPYmplY3R9IHJvdXRlXG5cdCAqL1xuXHRjb25maWd1cmVTY2hlbWEocm91dGVyLCByb3V0ZSkge1xuXG5cdFx0aWYgKHJvdXRlLnNjaGVtYSkge1xuXHRcdFx0cm91dGVyW1JvdXRlcy5kZWZhdWx0TWV0aG9kKHJvdXRlLm1ldGhvZCldLmNhbGwocm91dGVyLCByb3V0ZS5ocmVmLCB2YWxpZGF0ZShyb3V0ZS5zY2hlbWEpKTtcblx0XHRcdHJvdXRlci51c2Uob25WYWxpZGF0b3JFcnJvcik7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBjb25maWd1cmVNaWRkbGVXYXJlIHNldHMgdXAgbWlkZGxld2FyZSBvbiB0aGUgcm91dGVcblx0ICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlclxuXHQgKiBAcGFyYW0ge09iamVjdH0gcm91dGVcblx0ICovXG5cdGNvbmZpZ3VyZU1pZGRsZVdhcmUocm91dGVyLCByb3V0ZSkge1xuXG5cdFx0aWYgKHJvdXRlLm1pZGRsZXdhcmUpIHtcbiAgICAgICAgICAgICAgICAgIHJvdXRlLm1pZGRsZXdhcmUuc3BsaXQoJywnKS5cbiAgICAgICAgICAgICAgICAgICAgZm9yRWFjaChtd2FyZT0+e1xuIFxuICAgICAgICAgICAgICAgICAgICAgIGlmICghUHJvamVjdFJlZ2lzdHJ5Lm1pZGRsZXdhcmUuaGFzT3duUHJvcGVydHkobXdhcmUpKVxuICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Z1bmNMaXN0VG9BcnJheTogRnVuYzogJyArIG13YXJlICsgJyB3YXMgbm90IGZvdW5kIScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlcltSb3V0ZXMuZGVmYXVsdE1ldGhvZChyb3V0ZS5tZXRob2QpXSgocmVxLCByZXMsbmV4dCk9PiBtd2FyZShyZXEscmVzLG5leHQscm91dGUpKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBjb25maWd1cmVRdWVyaWVzIHNldHMgdXAgcXVlcmllcyBvbiB0aGUgcm91dGUuXG5cdCAqIEBwYXJhbSB7Um91dGVyfSByb3V0ZXJcblx0ICogQHBhcmFtIHtPYmplY3R9IHJvdXRlXG5cdCAqL1xuXHRjb25maWd1cmVRdWVyaWVzKHJvdXRlciwgcm91dGUpIHtcblxuXHRcdGlmIChyb3V0ZS5xdWVyeSkge1xuXHRcdFx0cm91dGVyW1JvdXRlcy5kZWZhdWx0TWV0aG9kKHJvdXRlLm1ldGhvZCldKHJvdXRlLmhyZWYsIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG5cdFx0XHRcdFByb2plY3RSZWdpc3RyeS5xdWVyaWVzW3JvdXRlLnF1ZXJ5LnNjcmlwdF1cblx0XHRcdFx0XHQoUHJvamVjdFJlZ2lzdHJ5Lm1vZGVscywgcm91dGUucXVlcnksIHJlcSwgcmVzLCBuZXh0KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIGNvbmZpZ3VyZUNvbnRyb2xsZXJzIHNldHMgdXAgY29udHJvbGxlcnMgb24gdGhlIHJvdXRlXG5cdCAqIEBwYXJhbSB7Um91dGVyfSByb3V0ZXJcblx0ICogQHBhcmFtIHtPYmplY3R9IHJvdXRlXG5cdCAqL1xuXHRjb25maWd1cmVDb250cm9sbGVycyhyb3V0ZXIsIHJvdXRlKSB7XG5cblx0XHRpZiAocm91dGUuY29udHJvbGxlcikge1xuXG5cdFx0XHR2YXIgYXJncyA9IFN0cmluZ3MubWV0aG9kTGlzdFRvQm91bmRGdW5jdGlvbkFycmF5KHJvdXRlLmNvbnRyb2xsZXIsXG5cdFx0XHRcdFByb2plY3RSZWdpc3RyeS5jb250cm9sbGVycyk7XG5cdFx0XHRhcmdzLnVuc2hpZnQocm91dGUuaHJlZik7XG5cblx0XHRcdHJvdXRlcltSb3V0ZXMuZGVmYXVsdE1ldGhvZChyb3V0ZS5tZXRob2QpXS5hcHBseShyb3V0ZXIsIGFyZ3MpO1xuXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblxuXG59XG5leHBvcnQgZGVmYXVsdCBHZW5lcmFsUm91dGluZztcblxuIl19