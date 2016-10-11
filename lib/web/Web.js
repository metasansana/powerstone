'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Application2 = require('../app/Application');

var _Application3 = _interopRequireDefault(_Application2);

var _Configuration = require('../app/Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

var _WebContext = require('./WebContext');

var _WebContext2 = _interopRequireDefault(_WebContext);

var _WebModule = require('./WebModule');

var _WebModule2 = _interopRequireDefault(_WebModule);

var _ServerFactory = require('./ServerFactory');

var _ServerFactory2 = _interopRequireDefault(_ServerFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Web = function (_Application) {
    _inherits(Web, _Application);

    function Web() {
        _classCallCheck(this, Web);

        return _possibleConstructorReturn(this, (Web.__proto__ || Object.getPrototypeOf(Web)).apply(this, arguments));
    }

    _createClass(Web, [{
        key: '__createServer',
        value: function __createServer() {
            return _ServerFactory2.default.createWebServer(this.framework, this.main);
        }
    }, {
        key: 'start',
        value: function start() {

            this.main = new _WebModule2.default('', new _Configuration2.default('webconf', this.path), this, null);
            this.framework = (0, _express2.default)();
            this.framework.use(this.onRouteErrorListener.onError.bind(this.onRouteErrorListener));
            this.context = new _WebContext2.default();
            return _get(Web.prototype.__proto__ || Object.getPrototypeOf(Web.prototype), 'start', this).call(this);
        }
    }]);

    return Web;
}(_Application3.default);

exports.default = Web;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViLmpzIl0sIm5hbWVzIjpbIldlYiIsImNyZWF0ZVdlYlNlcnZlciIsImZyYW1ld29yayIsIm1haW4iLCJwYXRoIiwidXNlIiwib25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJvbkVycm9yIiwiYmluZCIsImNvbnRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLEc7Ozs7Ozs7Ozs7O3lDQUVlO0FBQ2IsbUJBQU8sd0JBQWNDLGVBQWQsQ0FBOEIsS0FBS0MsU0FBbkMsRUFBOEMsS0FBS0MsSUFBbkQsQ0FBUDtBQUNIOzs7Z0NBRU87O0FBRUosaUJBQUtBLElBQUwsR0FBWSx3QkFBYyxFQUFkLEVBQWtCLDRCQUFrQixTQUFsQixFQUE2QixLQUFLQyxJQUFsQyxDQUFsQixFQUEyRCxJQUEzRCxFQUFpRSxJQUFqRSxDQUFaO0FBQ0EsaUJBQUtGLFNBQUwsR0FBaUIsd0JBQWpCO0FBQ0EsaUJBQUtBLFNBQUwsQ0FBZUcsR0FBZixDQUFtQixLQUFLQyxvQkFBTCxDQUEwQkMsT0FBMUIsQ0FBa0NDLElBQWxDLENBQXVDLEtBQUtGLG9CQUE1QyxDQUFuQjtBQUNBLGlCQUFLRyxPQUFMLEdBQWUsMEJBQWY7QUFDQTtBQUVIOzs7Ozs7a0JBSVVULEciLCJmaWxlIjoiV2ViLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi4vYXBwL0FwcGxpY2F0aW9uJztcbmltcG9ydCBDb25maWd1cmF0aW9uIGZyb20gJy4uL2FwcC9Db25maWd1cmF0aW9uJztcbmltcG9ydCBXZWJDb250ZXh0IGZyb20gJy4vV2ViQ29udGV4dCc7XG5pbXBvcnQgV2ViTW9kdWxlIGZyb20gJy4vV2ViTW9kdWxlJztcbmltcG9ydCBTZXJ2ZXJGYWN0b3J5IGZyb20gJy4vU2VydmVyRmFjdG9yeSc7XG5cbmNsYXNzIFdlYiBleHRlbmRzIEFwcGxpY2F0aW9uIHtcblxuICAgIF9fY3JlYXRlU2VydmVyKCkge1xuICAgICAgICByZXR1cm4gU2VydmVyRmFjdG9yeS5jcmVhdGVXZWJTZXJ2ZXIodGhpcy5mcmFtZXdvcmssIHRoaXMubWFpbik7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgdGhpcy5tYWluID0gbmV3IFdlYk1vZHVsZSgnJywgbmV3IENvbmZpZ3VyYXRpb24oJ3dlYmNvbmYnLCB0aGlzLnBhdGgpLCB0aGlzLCBudWxsKTtcbiAgICAgICAgdGhpcy5mcmFtZXdvcmsgPSBleHByZXNzKCk7XG4gICAgICAgIHRoaXMuZnJhbWV3b3JrLnVzZSh0aGlzLm9uUm91dGVFcnJvckxpc3RlbmVyLm9uRXJyb3IuYmluZCh0aGlzLm9uUm91dGVFcnJvckxpc3RlbmVyKSk7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBXZWJDb250ZXh0KCk7XG4gICAgICAgIHJldHVybiBzdXBlci5zdGFydCgpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYlxuIl19