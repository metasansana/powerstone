'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _expressJsonschema = require('express-jsonschema');

var _Strings = require('./Strings');

var _Strings2 = _interopRequireDefault(_Strings);

var _ProjectRegistry = require('./ProjectRegistry');

var _ProjectRegistry2 = _interopRequireDefault(_ProjectRegistry);

var _Routes = require('./Routes');

var _Routes2 = _interopRequireDefault(_Routes);

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
        router[_Routes2['default'].defaultMethod(route.method)].call(router, route.href, (0, _expressJsonschema.validate)(route.schema));
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
          _ProjectRegistry2['default'].queries[route.query.script](_ProjectRegistry2['default'].models[route.query.model], req, res, next, route.query);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9HZW5lcmFsUm91dGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7aUNBQXdCLG9CQUFvQjs7dUJBQ3hCLFdBQVc7Ozs7K0JBQ0gsbUJBQW1COzs7O3NCQUM1QixVQUFVOzs7O0FBRTdCLElBQUksZ0JBQWdCLEdBQUcsU0FBbkIsZ0JBQWdCLENBQWEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOztBQUVwRCxNQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssc0JBQXNCLEVBQUU7O0FBRXZDLE9BQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWhCLFFBQUksWUFBWSxHQUFHO0FBQ2pCLGFBQU8sRUFBRSx5QkFBeUIsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUc7QUFDaEYsWUFBTSxFQUFFLEdBQUcsQ0FBQyxXQUFXO0tBQ3hCLENBQUM7O0FBRUYsUUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssa0JBQWtCLEVBQUU7QUFDN0QsU0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN4QixNQUFNO0FBQ0wsYUFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkIsU0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ1o7R0FFRixNQUFNO0FBQ0wsUUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ1g7Q0FDRixDQUFDOzs7Ozs7O0lBTUssY0FBYztXQUFkLGNBQWM7MEJBQWQsY0FBYzs7O2VBQWQsY0FBYzs7Ozs7Ozs7V0FPRCx5QkFBQyxNQUFjLEVBQUUsS0FBYSxFQUFFOztBQUU5QyxVQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDaEIsY0FBTSxDQUFDLG9CQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsdUJBMUNwRSxRQUFRLEVBMENxRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM1RixjQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7T0FFOUI7O0FBRUQsYUFBTyxJQUFJLENBQUM7S0FDYjs7Ozs7Ozs7O1dBT21CLDZCQUFDLE1BQWMsRUFBRSxLQUFhLEVBQUU7O0FBRWxELFVBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTtBQUNwQixZQUFJLElBQUksR0FBRyxxQkFBUSxlQUFlLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSw2QkFBZ0IsVUFBVSxDQUFDLENBQUM7QUFDakYsWUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsY0FBTSxDQUFDLG9CQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO09BRWhFOztBQUVELGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7OztXQU9nQiwwQkFBQyxNQUFjLEVBQUUsS0FBYSxFQUFFOztBQUUvQyxVQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7QUFDZixjQUFNLENBQUMsb0JBQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUMvRSx1Q0FBZ0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQzFDLDZCQUFnQixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUUsQ0FBQyxDQUFDO09BQ0o7O0FBRUQsYUFBTyxJQUFJLENBQUM7S0FDYjs7Ozs7Ozs7O1dBT29CLDhCQUFDLE1BQWMsRUFBRSxLQUFhLEVBQUU7O0FBRW5ELFVBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTs7QUFFcEIsWUFBSSxJQUFJLEdBQUcscUJBQVEsOEJBQThCLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFDaEUsNkJBQWdCLFdBQVcsQ0FBQyxDQUFDO0FBQy9CLFlBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV6QixjQUFNLENBQUMsb0JBQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FFaEU7QUFDRCxhQUFPLElBQUksQ0FBQztLQUNiOzs7U0FyRUUsY0FBYzs7O3FCQTBFTixjQUFjIiwiZmlsZSI6IkdlbmVyYWxSb3V0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt2YWxpZGF0ZX0gIGZyb20gJ2V4cHJlc3MtanNvbnNjaGVtYSc7XG5pbXBvcnQgU3RyaW5ncyBmcm9tICcuL1N0cmluZ3MnO1xuaW1wb3J0IFByb2plY3RSZWdpc3RyeSBmcm9tICcuL1Byb2plY3RSZWdpc3RyeSc7XG5pbXBvcnQgUm91dGVzIGZyb20gJy4vUm91dGVzJztcblxudmFyIG9uVmFsaWRhdG9yRXJyb3IgPSBmdW5jdGlvbiAoZXJyLCByZXEsIHJlcywgbmV4dCkge1xuXG4gIGlmIChlcnIubmFtZSA9PT0gJ0pzb25TY2hlbWFWYWxpZGF0aW9uJykge1xuXG4gICAgcmVzLnN0YXR1cyg0MDApO1xuXG4gICAgdmFyIHJlc3BvbnNlRGF0YSA9IHtcbiAgICAgIG1lc3NhZ2U6ICdFcnJvcnMgb2NjdXJyZWQgZHVyaW5nICcgKyByZXEubWV0aG9kICsgJyByZXF1ZXN0IHRvICcgKyByZXEudXJsICsgJy4nLFxuICAgICAgZXJyb3JzOiBlcnIudmFsaWRhdGlvbnNcbiAgICB9O1xuXG4gICAgaWYgKHJlcS54aHIgfHwgcmVxLmdldCgnQ29udGVudC1UeXBlJykgPT09ICdhcHBsaWNhdGlvbi9qc29uJykge1xuICAgICAgcmVzLmpzb24ocmVzcG9uc2VEYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coZXJyLnN0YWNrKTtcbiAgICAgIHJlcy5zZW5kKCk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgbmV4dChlcnIpO1xuICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYWxSb3V0aW5nIHByb3ZpZGVzIG1ldGhvZHMgZm9yIGNvbmZpZ3VyaW5nXG4gKiBmcmFtZXdvcmsgcm91dGluZyBmcm9tIHRoZSByb3V0ZXMuanNvbiBmaWxlLlxuICovXG4gY2xhc3MgR2VuZXJhbFJvdXRpbmcge1xuXG4gICAgLyoqXG4gICAgICogY29uZmlndXJlU2NoZW1hIHNldHMgdXAganNvbi1zY2hlbWEgb24gdGhlIHJvdXRlLlxuICAgICAqIEBwYXJhbSB7Um91dGVyfSByb3V0ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcm91dGVcbiAgICAgKi9cbiAgICAgY29uZmlndXJlU2NoZW1hKHJvdXRlcjogUm91dGVyLCByb3V0ZTogT2JqZWN0KSB7XG5cbiAgICAgIGlmIChyb3V0ZS5zY2hlbWEpIHtcbiAgICAgICAgcm91dGVyW1JvdXRlcy5kZWZhdWx0TWV0aG9kKHJvdXRlLm1ldGhvZCldLmNhbGwocm91dGVyLCByb3V0ZS5ocmVmLCB2YWxpZGF0ZShyb3V0ZS5zY2hlbWEpKTtcbiAgICAgICAgcm91dGVyLnVzZShvblZhbGlkYXRvckVycm9yKTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb25maWd1cmVNaWRkbGVXYXJlIHNldHMgdXAgbWlkZGxld2FyZSBvbiB0aGUgcm91dGVcbiAgICAgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJvdXRlXG4gICAgICovXG4gICAgIGNvbmZpZ3VyZU1pZGRsZVdhcmUocm91dGVyOiBSb3V0ZXIsIHJvdXRlOiBPYmplY3QpIHtcblxuICAgICAgaWYgKHJvdXRlLm1pZGRsZXdhcmUpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBTdHJpbmdzLmZ1bmNMaXN0VG9BcnJheShyb3V0ZS5taWRkbGV3YXJlLCBQcm9qZWN0UmVnaXN0cnkubWlkZGxld2FyZSk7XG4gICAgICAgIGFyZ3MudW5zaGlmdChyb3V0ZS5ocmVmKTtcbiAgICAgICAgcm91dGVyW1JvdXRlcy5kZWZhdWx0TWV0aG9kKHJvdXRlLm1ldGhvZCldLmFwcGx5KHJvdXRlciwgYXJncyk7XG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29uZmlndXJlUXVlcmllcyBzZXRzIHVwIHF1ZXJpZXMgb24gdGhlIHJvdXRlLlxuICAgICAqIEBwYXJhbSB7Um91dGVyfSByb3V0ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcm91dGVcbiAgICAgKi9cbiAgICAgY29uZmlndXJlUXVlcmllcyhyb3V0ZXI6IFJvdXRlciwgcm91dGU6IE9iamVjdCkge1xuXG4gICAgICBpZiAocm91dGUucXVlcnkpIHtcbiAgICAgICAgcm91dGVyW1JvdXRlcy5kZWZhdWx0TWV0aG9kKHJvdXRlLm1ldGhvZCldKHJvdXRlLmhyZWYsIGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICAgIFByb2plY3RSZWdpc3RyeS5xdWVyaWVzW3JvdXRlLnF1ZXJ5LnNjcmlwdF1cbiAgICAgICAgICAoUHJvamVjdFJlZ2lzdHJ5Lm1vZGVsc1tyb3V0ZS5xdWVyeS5tb2RlbF0sIHJlcSwgcmVzLCBuZXh0LCByb3V0ZS5xdWVyeSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb25maWd1cmVDb250cm9sbGVycyBzZXRzIHVwIGNvbnRyb2xsZXJzIG9uIHRoZSByb3V0ZVxuICAgICAqIEBwYXJhbSB7Um91dGVyfSByb3V0ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcm91dGVcbiAgICAgKi9cbiAgICAgY29uZmlndXJlQ29udHJvbGxlcnMocm91dGVyOiBSb3V0ZXIsIHJvdXRlOiBPYmplY3QpIHtcblxuICAgICAgaWYgKHJvdXRlLmNvbnRyb2xsZXIpIHtcblxuICAgICAgICB2YXIgYXJncyA9IFN0cmluZ3MubWV0aG9kTGlzdFRvQm91bmRGdW5jdGlvbkFycmF5KHJvdXRlLmNvbnRyb2xsZXIsXG4gICAgICAgICAgUHJvamVjdFJlZ2lzdHJ5LmNvbnRyb2xsZXJzKTtcbiAgICAgICAgYXJncy51bnNoaWZ0KHJvdXRlLmhyZWYpO1xuXG4gICAgICAgIHJvdXRlcltSb3V0ZXMuZGVmYXVsdE1ldGhvZChyb3V0ZS5tZXRob2QpXS5hcHBseShyb3V0ZXIsIGFyZ3MpO1xuXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuXG4gIH1cbmV4cG9ydCBkZWZhdWx0IEdlbmVyYWxSb3V0aW5nXG4iXX0=