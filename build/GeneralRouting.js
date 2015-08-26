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
        router[Routes.defaultMethod(route.method)].call(router, route.href, (0, _expressJsonschema.validate)(route.schema));
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
        router[Routes.defaultMethod(route.method)].apply(router, args);
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
        router[Routes.defaultMethod(route.method)](route.href, function (req, res, next) {
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

        router[Routes.defaultMethod(route.method)].apply(router, args);
      }
      return this;
    }
  }]);

  return GeneralRouting;
})();

exports['default'] = GeneralRouting;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9HZW5lcmFsUm91dGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7aUNBQXdCLG9CQUFvQjs7dUJBQ3hCLFdBQVc7Ozs7K0JBQ0gsbUJBQW1COzs7O0FBRS9DLElBQUksZ0JBQWdCLEdBQUcsU0FBbkIsZ0JBQWdCLENBQWEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOztBQUVwRCxNQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssc0JBQXNCLEVBQUU7O0FBRXZDLE9BQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWhCLFFBQUksWUFBWSxHQUFHO0FBQ2pCLGFBQU8sRUFBRSx5QkFBeUIsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUc7QUFDaEYsWUFBTSxFQUFFLEdBQUcsQ0FBQyxXQUFXO0tBQ3hCLENBQUM7O0FBRUYsUUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssa0JBQWtCLEVBQUU7QUFDN0QsU0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN4QixNQUFNO0FBQ0wsYUFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkIsU0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ1o7R0FFRixNQUFNO0FBQ0wsUUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ1g7Q0FDRixDQUFDOzs7Ozs7O0lBTUssY0FBYztXQUFkLGNBQWM7MEJBQWQsY0FBYzs7O2VBQWQsY0FBYzs7Ozs7Ozs7V0FPRCx5QkFBQyxNQUFjLEVBQUUsS0FBYSxFQUFFOztBQUU5QyxVQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDaEIsY0FBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLHVCQXpDcEUsUUFBUSxFQXlDcUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDNUYsY0FBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO09BRTlCOztBQUVELGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7OztXQU9tQiw2QkFBQyxNQUFjLEVBQUUsS0FBYSxFQUFFOztBQUVsRCxVQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDcEIsWUFBSSxJQUFJLEdBQUcscUJBQVEsZUFBZSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsNkJBQWdCLFVBQVUsQ0FBQyxDQUFDO0FBQ2pGLFlBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLGNBQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FFaEU7O0FBRUQsYUFBTyxJQUFJLENBQUM7S0FDYjs7Ozs7Ozs7O1dBT2dCLDBCQUFDLE1BQWMsRUFBRSxLQUFhLEVBQUU7O0FBRS9DLFVBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNmLGNBQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUMvRSx1Q0FBZ0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQzFDLDZCQUFnQixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUUsQ0FBQyxDQUFDO09BQ0o7O0FBRUQsYUFBTyxJQUFJLENBQUM7S0FDYjs7Ozs7Ozs7O1dBT29CLDhCQUFDLE1BQWMsRUFBRSxLQUFhLEVBQUU7O0FBRW5ELFVBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTs7QUFFcEIsWUFBSSxJQUFJLEdBQUcscUJBQVEsOEJBQThCLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFDaEUsNkJBQWdCLFdBQVcsQ0FBQyxDQUFDO0FBQy9CLFlBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV6QixjQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO09BRWhFO0FBQ0QsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1NBckVFLGNBQWM7OztxQkEwRU4sY0FBYyIsImZpbGUiOiJHZW5lcmFsUm91dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmFsaWRhdGV9ICBmcm9tICdleHByZXNzLWpzb25zY2hlbWEnO1xuaW1wb3J0IFN0cmluZ3MgZnJvbSAnLi9TdHJpbmdzJztcbmltcG9ydCBQcm9qZWN0UmVnaXN0cnkgZnJvbSAnLi9Qcm9qZWN0UmVnaXN0cnknO1xuXG52YXIgb25WYWxpZGF0b3JFcnJvciA9IGZ1bmN0aW9uIChlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgaWYgKGVyci5uYW1lID09PSAnSnNvblNjaGVtYVZhbGlkYXRpb24nKSB7XG5cbiAgICByZXMuc3RhdHVzKDQwMCk7XG5cbiAgICB2YXIgcmVzcG9uc2VEYXRhID0ge1xuICAgICAgbWVzc2FnZTogJ0Vycm9ycyBvY2N1cnJlZCBkdXJpbmcgJyArIHJlcS5tZXRob2QgKyAnIHJlcXVlc3QgdG8gJyArIHJlcS51cmwgKyAnLicsXG4gICAgICBlcnJvcnM6IGVyci52YWxpZGF0aW9uc1xuICAgIH07XG5cbiAgICBpZiAocmVxLnhociB8fCByZXEuZ2V0KCdDb250ZW50LVR5cGUnKSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24nKSB7XG4gICAgICByZXMuanNvbihyZXNwb25zZURhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIuc3RhY2spO1xuICAgICAgcmVzLnNlbmQoKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICBuZXh0KGVycik7XG4gIH1cbn07XG5cbi8qKlxuICogR2VuZXJhbFJvdXRpbmcgcHJvdmlkZXMgbWV0aG9kcyBmb3IgY29uZmlndXJpbmdcbiAqIGZyYW1ld29yayByb3V0aW5nIGZyb20gdGhlIHJvdXRlcy5qc29uIGZpbGUuXG4gKi9cbiBjbGFzcyBHZW5lcmFsUm91dGluZyB7XG5cbiAgICAvKipcbiAgICAgKiBjb25maWd1cmVTY2hlbWEgc2V0cyB1cCBqc29uLXNjaGVtYSBvbiB0aGUgcm91dGUuXG4gICAgICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByb3V0ZVxuICAgICAqL1xuICAgICBjb25maWd1cmVTY2hlbWEocm91dGVyOiBSb3V0ZXIsIHJvdXRlOiBPYmplY3QpIHtcblxuICAgICAgaWYgKHJvdXRlLnNjaGVtYSkge1xuICAgICAgICByb3V0ZXJbUm91dGVzLmRlZmF1bHRNZXRob2Qocm91dGUubWV0aG9kKV0uY2FsbChyb3V0ZXIsIHJvdXRlLmhyZWYsIHZhbGlkYXRlKHJvdXRlLnNjaGVtYSkpO1xuICAgICAgICByb3V0ZXIudXNlKG9uVmFsaWRhdG9yRXJyb3IpO1xuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbmZpZ3VyZU1pZGRsZVdhcmUgc2V0cyB1cCBtaWRkbGV3YXJlIG9uIHRoZSByb3V0ZVxuICAgICAqIEBwYXJhbSB7Um91dGVyfSByb3V0ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcm91dGVcbiAgICAgKi9cbiAgICAgY29uZmlndXJlTWlkZGxlV2FyZShyb3V0ZXI6IFJvdXRlciwgcm91dGU6IE9iamVjdCkge1xuXG4gICAgICBpZiAocm91dGUubWlkZGxld2FyZSkge1xuICAgICAgICB2YXIgYXJncyA9IFN0cmluZ3MuZnVuY0xpc3RUb0FycmF5KHJvdXRlLm1pZGRsZXdhcmUsIFByb2plY3RSZWdpc3RyeS5taWRkbGV3YXJlKTtcbiAgICAgICAgYXJncy51bnNoaWZ0KHJvdXRlLmhyZWYpO1xuICAgICAgICByb3V0ZXJbUm91dGVzLmRlZmF1bHRNZXRob2Qocm91dGUubWV0aG9kKV0uYXBwbHkocm91dGVyLCBhcmdzKTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb25maWd1cmVRdWVyaWVzIHNldHMgdXAgcXVlcmllcyBvbiB0aGUgcm91dGUuXG4gICAgICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByb3V0ZVxuICAgICAqL1xuICAgICBjb25maWd1cmVRdWVyaWVzKHJvdXRlcjogUm91dGVyLCByb3V0ZTogT2JqZWN0KSB7XG5cbiAgICAgIGlmIChyb3V0ZS5xdWVyeSkge1xuICAgICAgICByb3V0ZXJbUm91dGVzLmRlZmF1bHRNZXRob2Qocm91dGUubWV0aG9kKV0ocm91dGUuaHJlZiwgZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgICAgUHJvamVjdFJlZ2lzdHJ5LnF1ZXJpZXNbcm91dGUucXVlcnkuc2NyaXB0XVxuICAgICAgICAgIChQcm9qZWN0UmVnaXN0cnkubW9kZWxzW3JvdXRlLnF1ZXJ5Lm1vZGVsXSwgcmVxLCByZXMsIG5leHQsIHJvdXRlLnF1ZXJ5KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbmZpZ3VyZUNvbnRyb2xsZXJzIHNldHMgdXAgY29udHJvbGxlcnMgb24gdGhlIHJvdXRlXG4gICAgICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByb3V0ZVxuICAgICAqL1xuICAgICBjb25maWd1cmVDb250cm9sbGVycyhyb3V0ZXI6IFJvdXRlciwgcm91dGU6IE9iamVjdCkge1xuXG4gICAgICBpZiAocm91dGUuY29udHJvbGxlcikge1xuXG4gICAgICAgIHZhciBhcmdzID0gU3RyaW5ncy5tZXRob2RMaXN0VG9Cb3VuZEZ1bmN0aW9uQXJyYXkocm91dGUuY29udHJvbGxlcixcbiAgICAgICAgICBQcm9qZWN0UmVnaXN0cnkuY29udHJvbGxlcnMpO1xuICAgICAgICBhcmdzLnVuc2hpZnQocm91dGUuaHJlZik7XG5cbiAgICAgICAgcm91dGVyW1JvdXRlcy5kZWZhdWx0TWV0aG9kKHJvdXRlLm1ldGhvZCldLmFwcGx5KHJvdXRlciwgYXJncyk7XG5cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG5cbiAgfVxuZXhwb3J0IGRlZmF1bHQgR2VuZXJhbFJvdXRpbmdcbiJdfQ==