'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _expressJsonschema = require('express-jsonschema');

var _expressJsonschema2 = _interopRequireDefault(_expressJsonschema);

var _json_schema_error_handler = require('./json_schema_error_handler');

var _json_schema_error_handler2 = _interopRequireDefault(_json_schema_error_handler);

var _ProjectRegistry = require('./ProjectRegistry');

var _ProjectRegistry2 = _interopRequireDefault(_ProjectRegistry);

var _pipesBuildPipe = require('pipes/build/Pipe');

var _pipesBuildPipe2 = _interopRequireDefault(_pipesBuildPipe);

var validate = _expressJsonschema2['default'].validate;

/**
 * @param {string} method string
 * @param {path} string 
 * @param {Framework} fw 
 * @param {Configuration} config 
 */

var Route = (function () {
    function Route(method, path, fw, config) {
        _classCallCheck(this, Route);

        this.method = method;
        this.path = path;
        this.fw = fw;
        this.config = config;
    }

    _createClass(Route, [{
        key: 'configureDefault',

        /**
         * configureDefault 
         */
        value: function configureDefault(spec) {

            if (typeof spec === 'string') return this.configureAction(spec);

            return this;
        }
    }, {
        key: 'configureSchema',

        /**
         * configureSchema sets up json-schema on the route.
         * @param {object} schema 
         */
        value: function configureSchema(schema) {

            if (!schema) return this;
            this.fw[this.method](this.path, validate(schema));
            this.fw.use(_json_schema_error_handler2['default']);
            return this;
        }
    }, {
        key: 'configurePipes',

        /**
         * configurePipes uses the pipes library to 
         * squeeze the request bodythrough a pipeline
         * @param {object} pipe 
         * @param {string} target 
         */
        value: function configurePipes(pipe, target) {

            if (!pipe) return this;
            var p = new _pipesBuildPipe2['default'](pipe, _ProjectRegistry2['default'].pipes);
            this.fw[this.method](this.path, function (req, res, next) {

                p.run(req[target], function (err, o) {
                    if (err) {
                        res.status(400);
                        return res.send();
                    }
                    req[target] = o;
                    next();
                });
            });
            return this;
        }
    }, {
        key: 'configureMiddleware',

        /**
         * configureMiddleware sets up middleware on the route
         * @param {array} wares 
         */
        value: function configureMiddleware(wares) {
            var _this = this;

            if (!wares) return this;

            _ProjectRegistry2['default'].convertMiddleware(wares).forEach(function (mwares) {
                return _this.fw[_this.method](_this.path, function (req, res, next) {
                    return mwares(req, res, next, _this);
                });
            });

            return this;
        }
    }, {
        key: 'configureAction',

        /**
         * configureAction sets up controllers on the route
         * @param {string} action
         */
        value: function configureAction(action) {
            if (!action) return this;
            this.fw[this.method](this.path, _ProjectRegistry2['default'].convertAction(action));
            return this;
        }
    }, {
        key: 'configureView',
        value: function configureView(view) {

            if (!view) return this;

            this.fw[this.method](this.path, function (req, res) {

                res.render(route.view, locals);
            });

            return this;
        }
    }]);

    return Route;
})();

exports['default'] = Route;
module.exports = exports['default'];
//# sourceMappingURL=Route.js.map