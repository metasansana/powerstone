'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _expressJsonschema = require('express-jsonschema');

var _Strings = require('../Strings');

var _Strings2 = _interopRequireDefault(_Strings);

var _ProjectRegistry = require('../ProjectRegistry');

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

var flattenRoutes = function flattenRoutes(routes) {

    var flat = [];

    if (Array.isArray(routes)) {
        routes.forEach(function (route) {
            if (!Array.isArray(route.routes)) return flat.push(route);
            route.routes.forEach(function (entry) {
                return flat.push(entry);
            });
        });
    } else {
        flat.push(routes);
    }

    return flat;
};

/**
 * WebRouting
 */

var WebRouting = (function () {
    function WebRouting() {
        _classCallCheck(this, WebRouting);
    }

    _createClass(WebRouting, [{
        key: 'configure',
        value: function configure(app, routes, config) {
            var _this = this;

            flattenRoutes(routes).forEach(function (route) {

                _this.configureSchema(app, route, config);
                _this.configureMiddleWare(app, route, config);
                _this.configureQueries(app, route, config);
                _this.configureControllers(app, route, config);
                _this.configureViews(app, route, config);
            });
        }
    }, {
        key: 'configureSchema',

        /**
         * configureSchema
         */
        value: function configureSchema(router, route) {

            if (route.schema) {
                router[route.method].call(router, route.href, (0, _expressJsonschema.validate)(route.schema));
                router.use(onValidatorError);
            }

            return this;
        }
    }, {
        key: 'configureMiddleWare',

        /**
         * configureMiddleWare
         */
        value: function configureMiddleWare(router, route) {

            if (route.middleware) {
                var args = _Strings2['default'].funcListToArray(route.middleware, _ProjectRegistry2['default'].middleware);
                args.unshift(route.href);
                router[route.method].apply(router, args);
            }

            return this;
        }
    }, {
        key: 'configureQueries',

        /**
         * configureQueries
         */
        value: function configureQueries(router, route) {

            if (route.query) {
                router[route.method](route.href, function (req, res, next) {
                    _ProjectRegistry2['default'].queries[route.query.script](_ProjectRegistry2['default'].models[route.query.model], req, res, next, route.query);
                });
            }

            return this;
        }
    }, {
        key: 'configureControllers',

        /**
         * configureControllers
         */
        value: function configureControllers(router, route) {

            if (route.controller) {

                var args = _Strings2['default'].methodListToBoundFunctionArray(route.controller, _ProjectRegistry2['default'].controllers);
                args.unshift(route.href);

                router[route.method ? route.method.toLowerCase() : 'get'].apply(router, args);
            }
            return this;
        }
    }, {
        key: 'configureViews',
        value: function configureViews(router, route) {

            if (route.view) router.get(route.href, function (req, res) {

                var locals = res.locals || {};
                var session = req.session || {};

                if (route.locals) locals = merge(locals, route.locals);

                if (route.session) {
                    route.session.forEach(function (key) {
                        locals[key] = session[key];
                    });
                }

                res.render(route.view, locals);
            });

            return this;
        }
    }]);

    return WebRouting;
})();

exports['default'] = new WebRouting();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViUm91dGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7aUNBQXdCLG9CQUFvQjs7dUJBQ3hCLFlBQVk7Ozs7K0JBQ0osb0JBQW9COzs7O0FBRWhELElBQUksZ0JBQWdCLEdBQUcsU0FBbkIsZ0JBQWdCLENBQWEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOztBQUVsRCxRQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssc0JBQXNCLEVBQUU7O0FBRXJDLFdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWhCLFlBQUksWUFBWSxHQUFHO0FBQ2YsbUJBQU8sRUFBRSx5QkFBeUIsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUc7QUFDaEYsa0JBQU0sRUFBRSxHQUFHLENBQUMsV0FBVztTQUMxQixDQUFDOztBQUVGLFlBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLGtCQUFrQixFQUFFO0FBQzNELGVBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDMUIsTUFBTTtBQUNILG1CQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QixlQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZDtLQUVKLE1BQU07QUFDSCxZQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDYjtDQUNKLENBQUM7O0FBRUYsSUFBSSxhQUFhLEdBQUcsU0FBaEIsYUFBYSxDQUFhLE1BQU0sRUFBRTs7QUFFbEMsUUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOztBQUVkLFFBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUN0QixjQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFJO0FBQ3JCLGdCQUFJ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OztxQkF5R0QsSUFBSSxVQUFVLEVBQUUiLCJmaWxlIjoiV2ViUm91dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmFsaWRhdGV9ICBmcm9tICdleHByZXNzLWpzb25zY2hlbWEnO1xuaW1wb3J0IFN0cmluZ3MgZnJvbSAnLi4vU3RyaW5ncyc7XG5pbXBvcnQgUHJvamVjdFJlZ2lzdHJ5IGZyb20gJy4uL1Byb2plY3RSZWdpc3RyeSc7XG5cbnZhciBvblZhbGlkYXRvckVycm9yID0gZnVuY3Rpb24gKGVyciwgcmVxLCByZXMsIG5leHQpIHtcblxuICAgIGlmIChlcnIubmFtZSA9PT0gJ0pzb25TY2hlbWFWYWxpZGF0aW9uJykge1xuXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKTtcblxuICAgICAgICB2YXIgcmVzcG9uc2VEYXRhID0ge1xuICAgICAgICAgICAgbWVzc2FnZTogJ0Vycm9ycyBvY2N1cnJlZCBkdXJpbmcgJyArIHJlcS5tZXRob2QgKyAnIHJlcXVlc3QgdG8gJyArIHJlcS51cmwgKyAnLicsXG4gICAgICAgICAgICBlcnJvcnM6IGVyci52YWxpZGF0aW9uc1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChyZXEueGhyIHx8IHJlcS5nZXQoJ0NvbnRlbnQtVHlwZScpID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgICAgICAgIHJlcy5qc29uKHJlc3BvbnNlRGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIuc3RhY2spO1xuICAgICAgICAgICAgcmVzLnNlbmQoKTtcbiAgICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgIH1cbn07XG5cbnZhciBmbGF0dGVuUm91dGVzID0gZnVuY3Rpb24gKHJvdXRlcykge1xuXG4gICAgdmFyIGZsYXQgPSBbXTtcblxuICAgIGlmKEFycmF5LmlzQXJyYXkocm91dGVzKSkge1xuICAgICAgICByb3V0ZXMuZm9yRWFjaCgocm91dGUpPT4ge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJvdXRlLnJvdXRlcykpIHJldHVybiBmbGF0LnB1c2gocm91dGUpO1xuICAgICAgICAgICAgcm91dGUucm91dGVzLmZvckVhY2goKGVudHJ5KT0+ZmxhdC5wdXNoKGVudHJ5KSk7XG4gICAgICAgIH0pO1xuICAgIH1lbHNle1xuICAgICAgICBmbGF0LnB1c2gocm91dGVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmxhdDtcblxufTtcblxuLyoqXG4gKiBXZWJSb3V0aW5nXG4gKi9cbmNsYXNzIFdlYlJvdXRpbmcge1xuXG4gICAgY29uZmlndXJlKGFwcCwgcm91dGVzLCBjb25maWcpIHtcblxuICAgICAgICBmbGF0dGVuUm91dGVzKHJvdXRlcykuZm9yRWFjaCgocm91dGUpPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZVNjaGVtYShhcHAsIHJvdXRlLCBjb25maWcpO1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmVNaWRkbGVXYXJlKGFwcCwgcm91dGUsIGNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZVF1ZXJpZXMoYXBwLCByb3V0ZSwgY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJlQ29udHJvbGxlcnMoYXBwLCByb3V0ZSwgY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJlVmlld3MoYXBwLCByb3V0ZSwgY29uZmlnKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbmZpZ3VyZVNjaGVtYVxuICAgICAqL1xuICAgIGNvbmZpZ3VyZVNjaGVtYShyb3V0ZXIsIHJvdXRlKSB7XG5cbiAgICAgICAgaWYgKHJvdXRlLnNjaGVtYSkge1xuICAgICAgICAgICAgcm91dGVyW3JvdXRlLm1ldGhvZF0uY2FsbChyb3V0ZXIsIHJvdXRlLmhyZWYsIHZhbGlkYXRlKHJvdXRlLnNjaGVtYSkpO1xuICAgICAgICAgICAgcm91dGVyLnVzZShvblZhbGlkYXRvckVycm9yKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29uZmlndXJlTWlkZGxlV2FyZVxuICAgICAqL1xuICAgIGNvbmZpZ3VyZU1pZGRsZVdhcmUocm91dGVyLCByb3V0ZSkge1xuXG4gICAgICAgIGlmIChyb3V0ZS5taWRkbGV3YXJlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFN0cmluZ3MuZnVuY0xpc3RUb0FycmF5KHJvdXRlLm1pZGRsZXdhcmUsIFByb2plY3RSZWdpc3RyeS5taWRkbGV3YXJlKTtcbiAgICAgICAgICAgIGFyZ3MudW5zaGlmdChyb3V0ZS5ocmVmKTtcbiAgICAgICAgICAgIHJvdXRlcltyb3V0ZS5tZXRob2RdLmFwcGx5KHJvdXRlciwgYXJncyk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbmZpZ3VyZVF1ZXJpZXNcbiAgICAgKi9cbiAgICBjb25maWd1cmVRdWVyaWVzKHJvdXRlciwgcm91dGUpIHtcblxuICAgICAgICBpZiAocm91dGUucXVlcnkpIHtcbiAgICAgICAgICAgIHJvdXRlcltyb3V0ZS5tZXRob2RdKHJvdXRlLmhyZWYsIGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICAgICAgICAgIFByb2plY3RSZWdpc3RyeS5xdWVyaWVzW3JvdXRlLnF1ZXJ5LnNjcmlwdF1cbiAgICAgICAgICAgICAgICAoUHJvamVjdFJlZ2lzdHJ5Lm1vZGVsc1tyb3V0ZS5xdWVyeS5tb2RlbF0sIHJlcSwgcmVzLCBuZXh0LCByb3V0ZS5xdWVyeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbmZpZ3VyZUNvbnRyb2xsZXJzXG4gICAgICovXG4gICAgY29uZmlndXJlQ29udHJvbGxlcnMocm91dGVyLCByb3V0ZSkge1xuXG4gICAgICAgIGlmIChyb3V0ZS5jb250cm9sbGVyKSB7XG5cbiAgICAgICAgICAgIHZhciBhcmdzID0gU3RyaW5ncy5tZXRob2RMaXN0VG9Cb3VuZEZ1bmN0aW9uQXJyYXkocm91dGUuY29udHJvbGxlcixcbiAgICAgICAgICAgICAgICBQcm9qZWN0UmVnaXN0cnkuY29udHJvbGxlcnMpO1xuICAgICAgICAgICAgYXJncy51bnNoaWZ0KHJvdXRlLmhyZWYpO1xuXG4gICAgICAgICAgICByb3V0ZXJbKHJvdXRlLm1ldGhvZCk/cm91dGUubWV0aG9kLnRvTG93ZXJDYXNlKCk6J2dldCddLmFwcGx5KHJvdXRlciwgYXJncyk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb25maWd1cmVWaWV3cyhyb3V0ZXIsIHJvdXRlKSB7XG5cbiAgICAgICAgaWYgKHJvdXRlLnZpZXcpXG4gICAgICAgICAgICByb3V0ZXIuZ2V0KHJvdXRlLmhyZWYsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuXG4gICAgICAgICAgICAgICAgdmFyIGxvY2FscyA9IHJlcy5sb2NhbHMgfHwge307XG4gICAgICAgICAgICAgICAgdmFyIHNlc3Npb24gPSByZXEuc2Vzc2lvbiB8fCB7fTtcblxuICAgICAgICAgICAgICAgIGlmIChyb3V0ZS5sb2NhbHMpXG4gICAgICAgICAgICAgICAgICAgIGxvY2FscyA9IG1lcmdlKGxvY2Fscywgcm91dGUubG9jYWxzKTtcblxuICAgICAgICAgICAgICAgIGlmIChyb3V0ZS5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLnNlc3Npb24uZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbHNba2V5XSA9IHNlc3Npb25ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzLnJlbmRlcihyb3V0ZS52aWV3LCBsb2NhbHMpO1xuXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBXZWJSb3V0aW5nKCkiXX0=