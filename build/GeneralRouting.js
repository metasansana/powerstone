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
                    instance = new Constructor(req, res, route.vars);
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
//# sourceMappingURL=GeneralRouting.js.map