'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _expressJsonschema = require('express-jsonschema');

var _expressJsonschema2 = _interopRequireDefault(_expressJsonschema);

var _Converter = require('./Converter');

var _Converter2 = _interopRequireDefault(_Converter);

var _pipesBuildPipe = require('pipes/build/Pipe');

var _pipesBuildPipe2 = _interopRequireDefault(_pipesBuildPipe);

var validate = _expressJsonschema2['default'].validate;

var json_schema_error_handler = function json_schema_error_handler(err, req, res, next) {

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
 * @param {string} method string
 * @param {path} string 
 * @param {Framework} fw 
 * @param {object} definition 
 * @param {Converter} convert 
 */

var Route = (function () {
    function Route(method, path, fw, definition, convert) {
        _classCallCheck(this, Route);

        this.method = method;
        this.path = path;
        this.framework = fw;
        this.definition = definition;
        this.convert = convert;
        this._calls = [path];
    }

    /**
     * configurePipes uses the pipes library to 
     * squeeze the request bodythrough a pipeline
     * @param {string} target 
     * @param {object} pipe 
     */

    _createClass(Route, [{
        key: 'configurePipes',
        value: function configurePipes(target, pipe, pipes) {

            if (!pipe) return this;
            var p = new _pipesBuildPipe2['default'](pipe, pipes);
            this._calls.push(function (req, res, next) {
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

        /**
         * configureMiddleware sets up middleware on the route
         * @param {array} wares 
         */
    }, {
        key: 'configureMiddleware',
        value: function configureMiddleware(wares) {
            var _this = this;

            if (!wares) return this;

            this.convert.middleware(wares).forEach(function (mware) {
                _this._calls.push(function (req, res, next) {
                    mware(req, res, next, _this);
                    next();
                });
            });

            return this;
        }

        /**
         * configureAction sets up controllers on the route
         * @param {string} action
         */
    }, {
        key: 'configureAction',
        value: function configureAction(action) {
            if (action) this._calls.push(typeof action === 'function' ? action : this.convert.actions(action, this));
            return this;
        }

        /**
         * configureHandler
         * @param {function} f 
         */
    }, {
        key: 'configureHandler',
        value: function configureHandler(f) {
            if (typeof f === 'function') this._calls.push(f);
            return this;
        }
    }, {
        key: 'configureView',
        value: function configureView(view, locals) {

            if (!view) return this;
            this._calls.push(function (req, res) {
                return res.render(view, locals);
            });
            return this;
        }

        /**
         * configureOther 
         * @param {string} mode 
         * @param {object} definition 
         */
    }, {
        key: 'configureOther',
        value: function configureOther(mode, definition) {

            if (typeof definition === 'string') return this.configureAction(definition);

            if (typeof definition === 'function') this._calls.push(definition);

            return this;
        }

        /**
         * done queues up the routes
         */
    }, {
        key: 'done',
        value: function done() {
            this.framework[this.method].apply(this.framework, this._calls);
        }
    }]);

    return Route;
})();

exports['default'] = Route;
module.exports = exports['default'];
//# sourceMappingURL=Route.js.map