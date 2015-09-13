'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _expressJsonschema = require('express-jsonschema');

var _expressJsonschema2 = _interopRequireDefault(_expressJsonschema);

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

          router[_Routes2['default'].defaultMethod(route.method)].call(router, route.href, function (req, res, next) {
            return _ProjectRegistry2['default'].middleware[mware](req, res, next, route);
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
     * @deprecated
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

        var list = route.controller.split('.');
        var Constructor = _ProjectRegistry2['default'].controllers[list[0]];
        var method = list[1];
        var instance;

        router[_Routes2['default'].defaultMethod(route.method)](route.href, function (req, res) {
          instance = new Constructor(req, res, route);
          instance[method]();
        });
      }

      return this;
    }
  }]);

  return GeneralRouting;
})();

exports['default'] = GeneralRouting;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9HZW5lcmFsUm91dGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7aUNBQThCLG9CQUFvQjs7OzsrQkFDdEIsbUJBQW1COzs7O3NCQUM1QixVQUFVOzs7O0FBRTdCLElBQUksUUFBUSxHQUFHLCtCQUFrQixRQUFRLENBQUM7O0FBRTFDLElBQUksZ0JBQWdCLEdBQUcsU0FBbkIsZ0JBQWdCLENBQVksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOztBQUVuRCxNQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssc0JBQXNCLEVBQUU7O0FBRXZDLE9BQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWhCLFFBQUksWUFBWSxHQUFHO0FBQ2pCLGFBQU8sRUFBRSx5QkFBeUIsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUc7QUFDaEYsWUFBTSxFQUFFLEdBQUcsQ0FBQyxXQUFXO0tBQ3hCLENBQUM7O0FBRUYsUUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssa0JBQWtCLEVBQUU7QUFDN0QsU0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN4QixNQUFNO0FBQ0wsYUFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkIsU0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ1o7R0FFRixNQUFNO0FBQ0wsUUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ1g7Q0FDRixDQUFDOzs7Ozs7O0lBTUksY0FBYztXQUFkLGNBQWM7MEJBQWQsY0FBYzs7O2VBQWQsY0FBYzs7Ozs7Ozs7V0FPSCx5QkFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFOztBQUU3QixVQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDaEIsY0FBTSxDQUFDLG9CQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzVGLGNBQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztPQUU5Qjs7QUFFRCxhQUFPLElBQUksQ0FBQztLQUNiOzs7Ozs7Ozs7V0FPa0IsNkJBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTs7QUFFakMsVUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO0FBQ3BCLGFBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssRUFBSTs7QUFFM0MsY0FBSSxDQUFDLDZCQUFnQixVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixHQUFHLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxDQUFDOztBQUV6RSxnQkFBTSxDQUFDLG9CQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQ2hFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO21CQUFLLDZCQUFnQixVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDO1dBQUEsQ0FBQyxDQUFDO1NBRWpGLENBQUMsQ0FBQztPQUNKOztBQUVELGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7Ozs7V0FRZSwwQkFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFOztBQUU5QixVQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7QUFDZixjQUFNLENBQUMsb0JBQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUM5RSx1Q0FBZ0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsNkJBQWdCLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbEcsQ0FBQyxDQUFDO09BQ0o7O0FBRUQsYUFBTyxJQUFJLENBQUM7S0FDYjs7Ozs7Ozs7O1dBT21CLDhCQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0FBRWxDLFVBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTs7QUFFcEIsWUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkMsWUFBSSxXQUFXLEdBQUcsNkJBQWdCLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RCxZQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckIsWUFBSSxRQUFRLENBQUM7O0FBRWIsY0FBTSxDQUFDLG9CQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSztBQUNuRSxrQkFBUSxHQUFHLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDNUMsa0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1NBQ3BCLENBQUMsQ0FBQztPQUVKOztBQUVELGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztTQS9FRyxjQUFjOzs7cUJBb0ZMLGNBQWMiLCJmaWxlIjoiR2VuZXJhbFJvdXRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzc0pTT05TY2hlbWEgZnJvbSAnZXhwcmVzcy1qc29uc2NoZW1hJztcbmltcG9ydCBQcm9qZWN0UmVnaXN0cnkgZnJvbSAnLi9Qcm9qZWN0UmVnaXN0cnknO1xuaW1wb3J0IFJvdXRlcyBmcm9tICcuL1JvdXRlcyc7XG5cbnZhciB2YWxpZGF0ZSA9IGV4cHJlc3NKU09OU2NoZW1hLnZhbGlkYXRlO1xuXG52YXIgb25WYWxpZGF0b3JFcnJvciA9IGZ1bmN0aW9uKGVyciwgcmVxLCByZXMsIG5leHQpIHtcblxuICBpZiAoZXJyLm5hbWUgPT09ICdKc29uU2NoZW1hVmFsaWRhdGlvbicpIHtcblxuICAgIHJlcy5zdGF0dXMoNDAwKTtcblxuICAgIHZhciByZXNwb25zZURhdGEgPSB7XG4gICAgICBtZXNzYWdlOiAnRXJyb3JzIG9jY3VycmVkIGR1cmluZyAnICsgcmVxLm1ldGhvZCArICcgcmVxdWVzdCB0byAnICsgcmVxLnVybCArICcuJyxcbiAgICAgIGVycm9yczogZXJyLnZhbGlkYXRpb25zXG4gICAgfTtcblxuICAgIGlmIChyZXEueGhyIHx8IHJlcS5nZXQoJ0NvbnRlbnQtVHlwZScpID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgIHJlcy5qc29uKHJlc3BvbnNlRGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XG4gICAgICByZXMuc2VuZCgpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIG5leHQoZXJyKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHZW5lcmFsUm91dGluZyBwcm92aWRlcyBtZXRob2RzIGZvciBjb25maWd1cmluZ1xuICogZnJhbWV3b3JrIHJvdXRpbmcgZnJvbSB0aGUgcm91dGVzLmpzb24gZmlsZS5cbiAqL1xuY2xhc3MgR2VuZXJhbFJvdXRpbmcge1xuXG4gIC8qKlxuICAgKiBjb25maWd1cmVTY2hlbWEgc2V0cyB1cCBqc29uLXNjaGVtYSBvbiB0aGUgcm91dGUuXG4gICAqIEBwYXJhbSB7Um91dGVyfSByb3V0ZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IHJvdXRlXG4gICAqL1xuICBjb25maWd1cmVTY2hlbWEocm91dGVyLCByb3V0ZSkge1xuXG4gICAgaWYgKHJvdXRlLnNjaGVtYSkge1xuICAgICAgcm91dGVyW1JvdXRlcy5kZWZhdWx0TWV0aG9kKHJvdXRlLm1ldGhvZCldLmNhbGwocm91dGVyLCByb3V0ZS5ocmVmLCB2YWxpZGF0ZShyb3V0ZS5zY2hlbWEpKTtcbiAgICAgIHJvdXRlci51c2Uob25WYWxpZGF0b3JFcnJvcik7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBjb25maWd1cmVNaWRkbGVXYXJlIHNldHMgdXAgbWlkZGxld2FyZSBvbiB0aGUgcm91dGVcbiAgICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlclxuICAgKiBAcGFyYW0ge09iamVjdH0gcm91dGVcbiAgICovXG4gIGNvbmZpZ3VyZU1pZGRsZVdhcmUocm91dGVyLCByb3V0ZSkge1xuXG4gICAgaWYgKHJvdXRlLm1pZGRsZXdhcmUpIHtcbiAgICAgIHJvdXRlLm1pZGRsZXdhcmUuc3BsaXQoJywnKS5mb3JFYWNoKG13YXJlID0+IHtcblxuICAgICAgICBpZiAoIVByb2plY3RSZWdpc3RyeS5taWRkbGV3YXJlLmhhc093blByb3BlcnR5KG13YXJlKSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Z1bmNMaXN0VG9BcnJheTogRnVuYzogJyArIG13YXJlICsgJyB3YXMgbm90IGZvdW5kIScpO1xuXG4gICAgICAgIHJvdXRlcltSb3V0ZXMuZGVmYXVsdE1ldGhvZChyb3V0ZS5tZXRob2QpXS5jYWxsKHJvdXRlciwgcm91dGUuaHJlZixcbiAgICAgICAgICAocmVxLCByZXMsIG5leHQpID0+IFByb2plY3RSZWdpc3RyeS5taWRkbGV3YXJlW213YXJlXShyZXEsIHJlcywgbmV4dCwgcm91dGUpKTtcblxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogY29uZmlndXJlUXVlcmllcyBzZXRzIHVwIHF1ZXJpZXMgb24gdGhlIHJvdXRlLlxuICAgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByb3V0ZVxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgY29uZmlndXJlUXVlcmllcyhyb3V0ZXIsIHJvdXRlKSB7XG5cbiAgICBpZiAocm91dGUucXVlcnkpIHtcbiAgICAgIHJvdXRlcltSb3V0ZXMuZGVmYXVsdE1ldGhvZChyb3V0ZS5tZXRob2QpXShyb3V0ZS5ocmVmLCBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBQcm9qZWN0UmVnaXN0cnkucXVlcmllc1tyb3V0ZS5xdWVyeS5zY3JpcHRdKFByb2plY3RSZWdpc3RyeS5tb2RlbHMsIHJvdXRlLnF1ZXJ5LCByZXEsIHJlcywgbmV4dCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBjb25maWd1cmVDb250cm9sbGVycyBzZXRzIHVwIGNvbnRyb2xsZXJzIG9uIHRoZSByb3V0ZVxuICAgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByb3V0ZVxuICAgKi9cbiAgY29uZmlndXJlQ29udHJvbGxlcnMocm91dGVyLCByb3V0ZSkge1xuXG4gICAgaWYgKHJvdXRlLmNvbnRyb2xsZXIpIHtcblxuICAgICAgdmFyIGxpc3QgPSByb3V0ZS5jb250cm9sbGVyLnNwbGl0KCcuJyk7XG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSBQcm9qZWN0UmVnaXN0cnkuY29udHJvbGxlcnNbbGlzdFswXV07XG4gICAgICB2YXIgbWV0aG9kID0gbGlzdFsxXTtcbiAgICAgIHZhciBpbnN0YW5jZTtcblxuICAgICAgcm91dGVyW1JvdXRlcy5kZWZhdWx0TWV0aG9kKHJvdXRlLm1ldGhvZCldKHJvdXRlLmhyZWYsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcihyZXEsIHJlcywgcm91dGUpO1xuICAgICAgICBpbnN0YW5jZVttZXRob2RdKCk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuXG59XG5leHBvcnQgZGVmYXVsdCBHZW5lcmFsUm91dGluZztcbiJdfQ==