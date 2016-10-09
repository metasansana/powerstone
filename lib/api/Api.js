'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _commonApplication = require('../common/Application');

var _commonApplication2 = _interopRequireDefault(_commonApplication);

var _ApiModule = require('./ApiModule');

var _ApiModule2 = _interopRequireDefault(_ApiModule);

var _commonConfiguration = require('../common/Configuration');

var _commonConfiguration2 = _interopRequireDefault(_commonConfiguration);

var _apiApiContext = require('../api/ApiContext');

var _apiApiContext2 = _interopRequireDefault(_apiApiContext);

function handleException(req, res, next, err) {

    console.error(err.stack ? err.stack : err);
    res.status(500);
    res.end();
}

var Api = (function (_Application) {
    _inherits(Api, _Application);

    function Api(path) {
        _classCallCheck(this, Api);

        _get(Object.getPrototypeOf(Api.prototype), 'constructor', this).call(this, path);

        this.main = new _ApiModule2['default']('', new _commonConfiguration2['default']('apiconf', path), new _apiApiContext2['default'](), this);

        this.frameworkApp = _restify2['default'].createServer(this.main.configuration.read('restify', null));
        this.frameworkApp.on('uncaughtException', handleException);
    }

    _createClass(Api, [{
        key: '__createServer',
        value: function __createServer() {

            return this.frameworkApp;
        }
    }]);

    return Api;
})(_commonApplication2['default']);

exports['default'] = Api;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBQW9CLFVBQVU7Ozs7dUJBQ1YsU0FBUzs7Ozt5QkFDTixXQUFXOzs7O2lDQUNWLHVCQUF1Qjs7Ozt5QkFDekIsYUFBYTs7OzttQ0FDVCx5QkFBeUI7Ozs7NkJBQzVCLG1CQUFtQjs7OztBQUUxQyxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7O0FBRTFDLFdBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQzNDLE9BQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEIsT0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0NBRWI7O0lBRUssR0FBRztjQUFILEdBQUc7O0FBRU0sYUFGVCxHQUFHLENBRU8sSUFBSSxFQUFFOzhCQUZoQixHQUFHOztBQUlELG1DQUpGLEdBQUcsNkNBSUssSUFBSSxFQUFFOztBQUVaLFlBQUksQ0FBQyxJQUFJLEdBQUcsMkJBQWMsRUFBRSxFQUFFLHFDQUFrQixTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQzVELGdDQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDOztBQUU1QixZQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFRLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDeEYsWUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxDQUFDLENBQUM7S0FFOUQ7O2lCQVpDLEdBQUc7O2VBY1MsMEJBQUc7O0FBRWIsbUJBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUU1Qjs7O1dBbEJDLEdBQUc7OztxQkF1Qk0sR0FBRyIsImZpbGUiOiJBcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgcmVzdGlmeSBmcm9tICdyZXN0aWZ5JztcbmltcG9ydCBkZWVwX21lcmdlIGZyb20gJ2RlZXBtZXJnZSc7XG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi4vY29tbW9uL0FwcGxpY2F0aW9uJztcbmltcG9ydCBBcGlNb2R1bGUgZnJvbSAnLi9BcGlNb2R1bGUnO1xuaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi4vY29tbW9uL0NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IEFwaUNvbnRleHQgZnJvbSAnLi4vYXBpL0FwaUNvbnRleHQnO1xuXG5mdW5jdGlvbiBoYW5kbGVFeGNlcHRpb24ocmVxLCByZXMsIG5leHQsIGVycikge1xuXG4gICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2sgPyBlcnIuc3RhY2sgOiBlcnIpO1xuICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICByZXMuZW5kKCk7XG5cbn1cblxuY2xhc3MgQXBpIGV4dGVuZHMgQXBwbGljYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IocGF0aCkge1xuXG4gICAgICAgIHN1cGVyKHBhdGgpO1xuXG4gICAgICAgIHRoaXMubWFpbiA9IG5ldyBBcGlNb2R1bGUoJycsIG5ldyBDb25maWd1cmF0aW9uKCdhcGljb25mJywgcGF0aCksXG4gICAgICAgICAgICBuZXcgQXBpQ29udGV4dCgpLCB0aGlzKTtcblxuICAgICAgICB0aGlzLmZyYW1ld29ya0FwcCA9IHJlc3RpZnkuY3JlYXRlU2VydmVyKHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQoJ3Jlc3RpZnknLCBudWxsKSk7XG4gICAgICAgIHRoaXMuZnJhbWV3b3JrQXBwLm9uKCd1bmNhdWdodEV4Y2VwdGlvbicsIGhhbmRsZUV4Y2VwdGlvbik7XG5cbiAgICB9XG5cbiAgICBfX2NyZWF0ZVNlcnZlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZXdvcmtBcHA7XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBcGlcbiJdfQ==