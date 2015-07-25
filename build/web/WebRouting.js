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

var _Routes = require('../Routes');

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

            _Routes2['default'].flatten(routes).forEach(function (route) {

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
                router[_Routes2['default'].defaultMethod(route.method)].call(router, route.href, (0, _expressJsonschema.validate)(route.schema));
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
                router[_Routes2['default'].defaultMethod(route.method)].apply(router, args);
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
                router[_Routes2['default'].defaultMethod(route.method)](route.href, function (req, res, next) {
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

                router[_Routes2['default'].defaultMethod(route.method)].apply(router, args);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViUm91dGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7aUNBQXdCLG9CQUFvQjs7dUJBQ3hCLFlBQVk7Ozs7K0JBQ0osb0JBQW9COzs7O3NCQUM3QixXQUFXOzs7O0FBRTlCLElBQUksZ0JBQWdCLEdBQUcsU0FBbkIsZ0JBQWdCLENBQWEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOztBQUVsRCxRQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssc0JBQXNCLEVBQUU7O0FBRXJDLFdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWhCLFlBQUksWUFBWSxHQUFHO0FBQ2YsbUJBQU8sRUFBRSx5QkFBeUIsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUc7QUFDaEYsa0JBQU0sRUFBRSxHQUFHLENBQUMsV0FBVztTQUMxQixDQUFDOztBQUVGLFlBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLGtCQUFrQixFQUFFO0FBQzNELGVBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDMUIsTUFBTTtBQUNILG1CQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QixlQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZDtLQUVKLE1BQU07QUFDSCxZQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDYjtDQUNKLENBQUM7Ozs7OztJQUtJLFVBQVU7YUFBVixVQUFVOzhCQUFWLFVBQVU7OztpQkFBVixVQUFVOztlQUVILG1CQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFOzs7QUFFM0IsZ0NBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBSTs7QUFFckMs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R0FBRyxFQUFFOztBQUV2QyxvQkFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7QUFDOUIsb0JBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDOztBQUVoQyxvQkFBSSxLQUFLLENBQUMsTUFBTSxFQUNaLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFekMsb0JBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtBQUNmLHlCQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNqQyw4QkFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDOUIsQ0FBQyxDQUFDO2lCQUNOOztBQUVELG1CQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFFbEMsQ0FBQyxDQUFDOztBQUdQLG1CQUFPLElBQUksQ0FBQztTQUVmOzs7V0FyR0MsVUFBVTs7O3FCQXlHRCxJQUFJLFVBQVUsRUFBRSIsImZpbGUiOiJXZWJSb3V0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt2YWxpZGF0ZX0gIGZyb20gJ2V4cHJlc3MtanNvbnNjaGVtYSc7XG5pbXBvcnQgU3RyaW5ncyBmcm9tICcuLi9TdHJpbmdzJztcbmltcG9ydCBQcm9qZWN0UmVnaXN0cnkgZnJvbSAnLi4vUHJvamVjdFJlZ2lzdHJ5JztcbmltcG9ydCBSb3V0ZXMgZnJvbSAnLi4vUm91dGVzJztcblxudmFyIG9uVmFsaWRhdG9yRXJyb3IgPSBmdW5jdGlvbiAoZXJyLCByZXEsIHJlcywgbmV4dCkge1xuXG4gICAgaWYgKGVyci5uYW1lID09PSAnSnNvblNjaGVtYVZhbGlkYXRpb24nKSB7XG5cbiAgICAgICAgcmVzLnN0YXR1cyg0MDApO1xuXG4gICAgICAgIHZhciByZXNwb25zZURhdGEgPSB7XG4gICAgICAgICAgICBtZXNzYWdlOiAnRXJyb3JzIG9jY3VycmVkIGR1cmluZyAnICsgcmVxLm1ldGhvZCArICcgcmVxdWVzdCB0byAnICsgcmVxLnVybCArICcuJyxcbiAgICAgICAgICAgIGVycm9yczogZXJyLnZhbGlkYXRpb25zXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHJlcS54aHIgfHwgcmVxLmdldCgnQ29udGVudC1UeXBlJykgPT09ICdhcHBsaWNhdGlvbi9qc29uJykge1xuICAgICAgICAgICAgcmVzLmpzb24ocmVzcG9uc2VEYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XG4gICAgICAgICAgICByZXMuc2VuZCgpO1xuICAgICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBXZWJSb3V0aW5nXG4gKi9cbmNsYXNzIFdlYlJvdXRpbmcge1xuXG4gICAgY29uZmlndXJlKGFwcCwgcm91dGVzLCBjb25maWcpIHtcblxuICAgICAgICBSb3V0ZXMuZmxhdHRlbihyb3V0ZXMpLmZvckVhY2goKHJvdXRlKT0+IHtcblxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmVTY2hlbWEoYXBwLCByb3V0ZSwgY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJlTWlkZGxlV2FyZShhcHAsIHJvdXRlLCBjb25maWcpO1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmVRdWVyaWVzKGFwcCwgcm91dGUsIGNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZUNvbnRyb2xsZXJzKGFwcCwgcm91dGUsIGNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZVZpZXdzKGFwcCwgcm91dGUsIGNvbmZpZyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb25maWd1cmVTY2hlbWFcbiAgICAgKi9cbiAgICBjb25maWd1cmVTY2hlbWEocm91dGVyLCByb3V0ZSkge1xuXG4gICAgICAgIGlmIChyb3V0ZS5zY2hlbWEpIHtcbiAgICAgICAgICAgIHJvdXRlcltSb3V0ZXMuZGVmYXVsdE1ldGhvZChyb3V0ZS5tZXRob2QpXS5jYWxsKHJvdXRlciwgcm91dGUuaHJlZiwgdmFsaWRhdGUocm91dGUuc2NoZW1hKSk7XG4gICAgICAgICAgICByb3V0ZXIudXNlKG9uVmFsaWRhdG9yRXJyb3IpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb25maWd1cmVNaWRkbGVXYXJlXG4gICAgICovXG4gICAgY29uZmlndXJlTWlkZGxlV2FyZShyb3V0ZXIsIHJvdXRlKSB7XG5cbiAgICAgICAgaWYgKHJvdXRlLm1pZGRsZXdhcmUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gU3RyaW5ncy5mdW5jTGlzdFRvQXJyYXkocm91dGUubWlkZGxld2FyZSwgUHJvamVjdFJlZ2lzdHJ5Lm1pZGRsZXdhcmUpO1xuICAgICAgICAgICAgYXJncy51bnNoaWZ0KHJvdXRlLmhyZWYpO1xuICAgICAgICAgICAgcm91dGVyW1JvdXRlcy5kZWZhdWx0TWV0aG9kKHJvdXRlLm1ldGhvZCldLmFwcGx5KHJvdXRlciwgYXJncyk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbmZpZ3VyZVF1ZXJpZXNcbiAgICAgKi9cbiAgICBjb25maWd1cmVRdWVyaWVzKHJvdXRlciwgcm91dGUpIHtcblxuICAgICAgICBpZiAocm91dGUucXVlcnkpIHtcbiAgICAgICAgICAgIHJvdXRlcltSb3V0ZXMuZGVmYXVsdE1ldGhvZChyb3V0ZS5tZXRob2QpXShyb3V0ZS5ocmVmLCBmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgICAgICAgICBQcm9qZWN0UmVnaXN0cnkucXVlcmllc1tyb3V0ZS5xdWVyeS5zY3JpcHRdXG4gICAgICAgICAgICAgICAgKFByb2plY3RSZWdpc3RyeS5tb2RlbHNbcm91dGUucXVlcnkubW9kZWxdLCByZXEsIHJlcywgbmV4dCwgcm91dGUucXVlcnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb25maWd1cmVDb250cm9sbGVyc1xuICAgICAqL1xuICAgIGNvbmZpZ3VyZUNvbnRyb2xsZXJzKHJvdXRlciwgcm91dGUpIHtcblxuICAgICAgICBpZiAocm91dGUuY29udHJvbGxlcikge1xuXG4gICAgICAgICAgICB2YXIgYXJncyA9IFN0cmluZ3MubWV0aG9kTGlzdFRvQm91bmRGdW5jdGlvbkFycmF5KHJvdXRlLmNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgUHJvamVjdFJlZ2lzdHJ5LmNvbnRyb2xsZXJzKTtcbiAgICAgICAgICAgIGFyZ3MudW5zaGlmdChyb3V0ZS5ocmVmKTtcblxuICAgICAgICAgICAgcm91dGVyW1JvdXRlcy5kZWZhdWx0TWV0aG9kKHJvdXRlLm1ldGhvZCldLmFwcGx5KHJvdXRlciwgYXJncyk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb25maWd1cmVWaWV3cyhyb3V0ZXIsIHJvdXRlKSB7XG5cbiAgICAgICAgaWYgKHJvdXRlLnZpZXcpXG4gICAgICAgICAgICByb3V0ZXIuZ2V0KHJvdXRlLmhyZWYsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuXG4gICAgICAgICAgICAgICAgdmFyIGxvY2FscyA9IHJlcy5sb2NhbHMgfHwge307XG4gICAgICAgICAgICAgICAgdmFyIHNlc3Npb24gPSByZXEuc2Vzc2lvbiB8fCB7fTtcblxuICAgICAgICAgICAgICAgIGlmIChyb3V0ZS5sb2NhbHMpXG4gICAgICAgICAgICAgICAgICAgIGxvY2FscyA9IG1lcmdlKGxvY2Fscywgcm91dGUubG9jYWxzKTtcblxuICAgICAgICAgICAgICAgIGlmIChyb3V0ZS5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLnNlc3Npb24uZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbHNba2V5XSA9IHNlc3Npb25ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzLnJlbmRlcihyb3V0ZS52aWV3LCBsb2NhbHMpO1xuXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBXZWJSb3V0aW5nKCkiXX0=