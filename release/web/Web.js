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

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _commonApplication = require('../common/Application');

var _commonApplication2 = _interopRequireDefault(_commonApplication);

var _commonConfiguration = require('../common/Configuration');

var _commonConfiguration2 = _interopRequireDefault(_commonConfiguration);

var _WebContext = require('./WebContext');

var _WebContext2 = _interopRequireDefault(_WebContext);

var _WebModule = require('./WebModule');

var _WebModule2 = _interopRequireDefault(_WebModule);

var _ServerFactory = require('./ServerFactory');

var _ServerFactory2 = _interopRequireDefault(_ServerFactory);

var Web = (function (_Application) {
    _inherits(Web, _Application);

    function Web(path) {
        _classCallCheck(this, Web);

        _get(Object.getPrototypeOf(Web.prototype), 'constructor', this).call(this, path);

        this.main = new _WebModule2['default']('', new _commonConfiguration2['default']('webconf', path), new _WebContext2['default'](), this);

        this.frameworkApp = (0, _express2['default'])();
    }

    _createClass(Web, [{
        key: '__createServer',
        value: function __createServer() {
            return _ServerFactory2['default'].createWebServer(this.frameworkApp, this.main);
        }
    }]);

    return Web;
})(_commonApplication2['default']);

exports['default'] = Web;
module.exports = exports['default'];
//# sourceMappingURL=Web.js.map