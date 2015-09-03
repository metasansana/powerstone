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
				var args = _Strings2['default'].funcListToArray(route.middleware, _ProjectRegistry2['default'].middleware);
				args.unshift(route.href);
				router[_Routes2['default'].defaultMethod(route.method)].apply(router, args);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9HZW5lcmFsUm91dGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7aUNBQThCLG9CQUFvQjs7Ozt1QkFDOUIsV0FBVzs7OzsrQkFDSCxtQkFBbUI7Ozs7c0JBQzVCLFVBQVU7Ozs7QUFFN0IsSUFBSSxRQUFRLEdBQUcsK0JBQWtCLFFBQVEsQ0FBQzs7QUFFMUMsSUFBSSxnQkFBZ0IsR0FBRyxTQUFuQixnQkFBZ0IsQ0FBWSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBRXBELEtBQUksR0FBRyxDQUFDLElBQUksS0FBSyxzQkFBc0IsRUFBRTs7QUFFeEMsS0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFaEIsTUFBSSxZQUFZLEdBQUc7QUFDbEIsVUFBTyxFQUFFLHlCQUF5QixHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRztBQUNoRixTQUFNLEVBQUUsR0FBRyxDQUFDLFdBQVc7R0FDdkIsQ0FBQzs7QUFFRixNQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxrQkFBa0IsRUFBRTtBQUM5RCxNQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0dBQ3ZCLE1BQU07QUFDTixVQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QixNQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDWDtFQUVELE1BQU07QUFDTixNQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDVjtDQUNELENBQUM7Ozs7Ozs7SUFNSSxjQUFjO1VBQWQsY0FBYzt3QkFBZCxjQUFjOzs7Y0FBZCxjQUFjOzs7Ozs7OztTQU9KLHlCQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0FBRTlCLE9BQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNqQixVQUFNLENBQUMsb0JBQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDNUYsVUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRTdCOztBQUVELFVBQU8sSUFBSSxDQUFDO0dBQ1o7Ozs7Ozs7OztTQU9rQiw2QkFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFOztBQUVsQyxPQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDckIsUUFBSSxJQUFJLEdBQUcscUJBQVEsZUFBZSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsNkJBQWdCLFVBQVUsQ0FBQyxDQUFDO0FBQ2pGLFFBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLFVBQU0sQ0FBQyxvQkFBTyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUUvRDs7QUFFRCxVQUFPLElBQUksQ0FBQztHQUNaOzs7Ozs7Ozs7U0FPZSwwQkFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFOztBQUUvQixPQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7QUFDaEIsVUFBTSxDQUFDLG9CQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDL0Usa0NBQWdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUN6Qyw2QkFBZ0IsTUFBTSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN2RCxDQUFDLENBQUM7SUFDSDs7QUFFRCxVQUFPLElBQUksQ0FBQztHQUNaOzs7Ozs7Ozs7U0FPbUIsOEJBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTs7QUFFbkMsT0FBSSxLQUFLLENBQUMsVUFBVSxFQUFFOztBQUVyQixRQUFJLElBQUksR0FBRyxxQkFBUSw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUNqRSw2QkFBZ0IsV0FBVyxDQUFDLENBQUM7QUFDOUIsUUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRXpCLFVBQU0sQ0FBQyxvQkFBTyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUUvRDtBQUNELFVBQU8sSUFBSSxDQUFDO0dBQ1o7OztRQXJFSSxjQUFjOzs7cUJBMEVMLGNBQWMiLCJmaWxlIjoiR2VuZXJhbFJvdXRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzc0pTT05TY2hlbWEgZnJvbSAnZXhwcmVzcy1qc29uc2NoZW1hJztcbmltcG9ydCBTdHJpbmdzIGZyb20gJy4vU3RyaW5ncyc7XG5pbXBvcnQgUHJvamVjdFJlZ2lzdHJ5IGZyb20gJy4vUHJvamVjdFJlZ2lzdHJ5JztcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi9Sb3V0ZXMnO1xuXG52YXIgdmFsaWRhdGUgPSBleHByZXNzSlNPTlNjaGVtYS52YWxpZGF0ZTtcblxudmFyIG9uVmFsaWRhdG9yRXJyb3IgPSBmdW5jdGlvbihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG5cblx0aWYgKGVyci5uYW1lID09PSAnSnNvblNjaGVtYVZhbGlkYXRpb24nKSB7XG5cblx0XHRyZXMuc3RhdHVzKDQwMCk7XG5cblx0XHR2YXIgcmVzcG9uc2VEYXRhID0ge1xuXHRcdFx0bWVzc2FnZTogJ0Vycm9ycyBvY2N1cnJlZCBkdXJpbmcgJyArIHJlcS5tZXRob2QgKyAnIHJlcXVlc3QgdG8gJyArIHJlcS51cmwgKyAnLicsXG5cdFx0XHRlcnJvcnM6IGVyci52YWxpZGF0aW9uc1xuXHRcdH07XG5cblx0XHRpZiAocmVxLnhociB8fCByZXEuZ2V0KCdDb250ZW50LVR5cGUnKSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24nKSB7XG5cdFx0XHRyZXMuanNvbihyZXNwb25zZURhdGEpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnIuc3RhY2spO1xuXHRcdFx0cmVzLnNlbmQoKTtcblx0XHR9XG5cblx0fSBlbHNlIHtcblx0XHRuZXh0KGVycik7XG5cdH1cbn07XG5cbi8qKlxuICogR2VuZXJhbFJvdXRpbmcgcHJvdmlkZXMgbWV0aG9kcyBmb3IgY29uZmlndXJpbmdcbiAqIGZyYW1ld29yayByb3V0aW5nIGZyb20gdGhlIHJvdXRlcy5qc29uIGZpbGUuXG4gKi9cbmNsYXNzIEdlbmVyYWxSb3V0aW5nIHtcblxuXHQvKipcblx0ICogY29uZmlndXJlU2NoZW1hIHNldHMgdXAganNvbi1zY2hlbWEgb24gdGhlIHJvdXRlLlxuXHQgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSByb3V0ZVxuXHQgKi9cblx0Y29uZmlndXJlU2NoZW1hKHJvdXRlciwgcm91dGUpIHtcblxuXHRcdGlmIChyb3V0ZS5zY2hlbWEpIHtcblx0XHRcdHJvdXRlcltSb3V0ZXMuZGVmYXVsdE1ldGhvZChyb3V0ZS5tZXRob2QpXS5jYWxsKHJvdXRlciwgcm91dGUuaHJlZiwgdmFsaWRhdGUocm91dGUuc2NoZW1hKSk7XG5cdFx0XHRyb3V0ZXIudXNlKG9uVmFsaWRhdG9yRXJyb3IpO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogY29uZmlndXJlTWlkZGxlV2FyZSBzZXRzIHVwIG1pZGRsZXdhcmUgb24gdGhlIHJvdXRlXG5cdCAqIEBwYXJhbSB7Um91dGVyfSByb3V0ZXJcblx0ICogQHBhcmFtIHtPYmplY3R9IHJvdXRlXG5cdCAqL1xuXHRjb25maWd1cmVNaWRkbGVXYXJlKHJvdXRlciwgcm91dGUpIHtcblxuXHRcdGlmIChyb3V0ZS5taWRkbGV3YXJlKSB7XG5cdFx0XHR2YXIgYXJncyA9IFN0cmluZ3MuZnVuY0xpc3RUb0FycmF5KHJvdXRlLm1pZGRsZXdhcmUsIFByb2plY3RSZWdpc3RyeS5taWRkbGV3YXJlKTtcblx0XHRcdGFyZ3MudW5zaGlmdChyb3V0ZS5ocmVmKTtcblx0XHRcdHJvdXRlcltSb3V0ZXMuZGVmYXVsdE1ldGhvZChyb3V0ZS5tZXRob2QpXS5hcHBseShyb3V0ZXIsIGFyZ3MpO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogY29uZmlndXJlUXVlcmllcyBzZXRzIHVwIHF1ZXJpZXMgb24gdGhlIHJvdXRlLlxuXHQgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSByb3V0ZVxuXHQgKi9cblx0Y29uZmlndXJlUXVlcmllcyhyb3V0ZXIsIHJvdXRlKSB7XG5cblx0XHRpZiAocm91dGUucXVlcnkpIHtcblx0XHRcdHJvdXRlcltSb3V0ZXMuZGVmYXVsdE1ldGhvZChyb3V0ZS5tZXRob2QpXShyb3V0ZS5ocmVmLCBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuXHRcdFx0XHRQcm9qZWN0UmVnaXN0cnkucXVlcmllc1tyb3V0ZS5xdWVyeS5zY3JpcHRdXG5cdFx0XHRcdFx0KFByb2plY3RSZWdpc3RyeS5tb2RlbHMsIHJvdXRlLnF1ZXJ5LCByZXEsIHJlcywgbmV4dCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBjb25maWd1cmVDb250cm9sbGVycyBzZXRzIHVwIGNvbnRyb2xsZXJzIG9uIHRoZSByb3V0ZVxuXHQgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSByb3V0ZVxuXHQgKi9cblx0Y29uZmlndXJlQ29udHJvbGxlcnMocm91dGVyLCByb3V0ZSkge1xuXG5cdFx0aWYgKHJvdXRlLmNvbnRyb2xsZXIpIHtcblxuXHRcdFx0dmFyIGFyZ3MgPSBTdHJpbmdzLm1ldGhvZExpc3RUb0JvdW5kRnVuY3Rpb25BcnJheShyb3V0ZS5jb250cm9sbGVyLFxuXHRcdFx0XHRQcm9qZWN0UmVnaXN0cnkuY29udHJvbGxlcnMpO1xuXHRcdFx0YXJncy51bnNoaWZ0KHJvdXRlLmhyZWYpO1xuXG5cdFx0XHRyb3V0ZXJbUm91dGVzLmRlZmF1bHRNZXRob2Qocm91dGUubWV0aG9kKV0uYXBwbHkocm91dGVyLCBhcmdzKTtcblxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cblxufVxuZXhwb3J0IGRlZmF1bHQgR2VuZXJhbFJvdXRpbmc7XG5cbiJdfQ==