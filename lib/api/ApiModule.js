'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _commonConfiguration = require('../common/Configuration');

var _commonConfiguration2 = _interopRequireDefault(_commonConfiguration);

var _commonModule = require('../common/Module');

var _commonModule2 = _interopRequireDefault(_commonModule);

var _commonRouteRoute = require('../common/route/Route');

var _commonRouteRoute2 = _interopRequireDefault(_commonRouteRoute);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

/**
 * Module
 * @param {string} fqn The name of the module prefixed with its parent modules 
 * @param {string} path 
 * @param {Configuration} config 
 * @param {Loader} loader 
 * @param {Application} app 
 */

var ApiModule = (function (_Module) {
    _inherits(ApiModule, _Module);

    function ApiModule(name, config, context, app) {
        _classCallCheck(this, ApiModule);

        _get(Object.getPrototypeOf(ApiModule.prototype), 'constructor', this).call(this, name, config, context, app);

        this.viewEngine = function () {
            throw new Error('ApiModule does not support views!');
        };
    }

    _createClass(ApiModule, [{
        key: '__framework',
        value: function __framework() {}
    }, {
        key: '__routing',
        value: function __routing(point, app, actions) {
            var _this = this;

            var path = this.configuration.read(this.configuration.keys.PATH, point + '/' + this.name);
            var routes = this.configuration.routes;

            Object.keys(routes).forEach(function (route) {
                return _this.routes = Object.keys(routes[route]).map(function (method) {
                    return new _commonRouteRoute2['default'](method, path + '/' + route, routes[route][method], actions.generate(method, path + '/' + route, routes[route][method], _this.application), app);
                });
            });

            this.modules.__routing(path, app, actions);
        }
    }]);

    return ApiModule;
})(_commonModule2['default']);

exports['default'] = ApiModule;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpTW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBQTBCLHlCQUF5Qjs7Ozs0QkFDaEMsa0JBQWtCOzs7O2dDQUNuQix1QkFBdUI7Ozs7dUJBQ3JCLFNBQVM7Ozs7Ozs7Ozs7Ozs7SUFVdkIsU0FBUztjQUFULFNBQVM7O0FBRUEsYUFGVCxTQUFTLENBRUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFOzhCQUZ0QyxTQUFTOztBQUlQLG1DQUpGLFNBQVMsNkNBSUQsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFOztBQUVsQyxZQUFJLENBQUMsVUFBVSxHQUFHLFlBQVc7QUFDekIsa0JBQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztTQUN4RCxDQUFBO0tBRUo7O2lCQVZDLFNBQVM7O2VBWUEsdUJBQUcsRUFHYjs7O2VBRVEsbUJBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7OztBQUUzQixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFLLEtBQUssU0FBSSxJQUFJLENBQUMsSUFBSSxDQUFHLENBQUM7QUFDMUYsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDOztBQUV2QyxrQkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDbkIsT0FBTyxDQUFDLFVBQUEsS0FBSzt1QkFDVCxNQUFLLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07MkJBQy9DLGtDQUFVLE1BQU0sRUFBSyxJQUFJLFNBQUksS0FBSyxFQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFDdkQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUssSUFBSSxTQUFJLEtBQUssRUFDckMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQUssV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDO2lCQUFBLENBQUM7YUFBQSxDQUFDLENBQUM7O0FBRWpFLGdCQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBRTlDOzs7V0EvQkMsU0FBUzs7O3FCQW1DQSxTQUFTIiwiZmlsZSI6IkFwaU1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb25maWd1cmF0aW9uIGZyb20gJy4uL2NvbW1vbi9Db25maWd1cmF0aW9uJztcbmltcG9ydCBNb2R1bGUgZnJvbSAnLi4vY29tbW9uL01vZHVsZSc7XG5pbXBvcnQgUm91dGUgZnJvbSAnLi4vY29tbW9uL3JvdXRlL1JvdXRlJztcbmltcG9ydCByZXN0aWZ5IGZyb20gJ3Jlc3RpZnknO1xuXG4vKipcbiAqIE1vZHVsZVxuICogQHBhcmFtIHtzdHJpbmd9IGZxbiBUaGUgbmFtZSBvZiB0aGUgbW9kdWxlIHByZWZpeGVkIHdpdGggaXRzIHBhcmVudCBtb2R1bGVzIFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggXG4gKiBAcGFyYW0ge0NvbmZpZ3VyYXRpb259IGNvbmZpZyBcbiAqIEBwYXJhbSB7TG9hZGVyfSBsb2FkZXIgXG4gKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHAgXG4gKi9cbmNsYXNzIEFwaU1vZHVsZSBleHRlbmRzIE1vZHVsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjb25maWcsIGNvbnRleHQsIGFwcCkge1xuXG4gICAgICAgIHN1cGVyKG5hbWUsIGNvbmZpZywgY29udGV4dCwgYXBwKTtcblxuICAgICAgICB0aGlzLnZpZXdFbmdpbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXBpTW9kdWxlIGRvZXMgbm90IHN1cHBvcnQgdmlld3MhJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9fZnJhbWV3b3JrKCkge1xuXG5cbiAgICB9XG5cbiAgICBfX3JvdXRpbmcocG9pbnQsIGFwcCwgYWN0aW9ucykge1xuXG4gICAgICAgIHZhciBwYXRoID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuUEFUSCwgYCR7cG9pbnR9LyR7dGhpcy5uYW1lfWApO1xuICAgICAgICB2YXIgcm91dGVzID0gdGhpcy5jb25maWd1cmF0aW9uLnJvdXRlcztcblxuICAgICAgICBPYmplY3Qua2V5cyhyb3V0ZXMpLlxuICAgICAgICBmb3JFYWNoKHJvdXRlID0+XG4gICAgICAgICAgICB0aGlzLnJvdXRlcyA9IE9iamVjdC5rZXlzKHJvdXRlc1tyb3V0ZV0pLm1hcChtZXRob2QgPT5cbiAgICAgICAgICAgICAgICBuZXcgUm91dGUobWV0aG9kLCBgJHtwYXRofS8ke3JvdXRlfWAsIHJvdXRlc1tyb3V0ZV1bbWV0aG9kXSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9ucy5nZW5lcmF0ZShtZXRob2QsIGAke3BhdGh9LyR7cm91dGV9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlc1tyb3V0ZV1bbWV0aG9kXSwgdGhpcy5hcHBsaWNhdGlvbiksIGFwcCkpKTtcblxuICAgICAgICB0aGlzLm1vZHVsZXMuX19yb3V0aW5nKHBhdGgsIGFwcCwgYWN0aW9ucyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpTW9kdWxlXG4iXX0=