'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _AbstractConnection2 = require('../AbstractConnection');

var _AbstractConnection3 = _interopRequireDefault(_AbstractConnection2);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _Connections = require('../Connections');

var _Connections2 = _interopRequireDefault(_Connections);

var ConnectMongoConnection = (function (_AbstractConnection) {
    _inherits(ConnectMongoConnection, _AbstractConnection);

    function ConnectMongoConnection(name, options) {
        _classCallCheck(this, ConnectMongoConnection);

        _get(Object.getPrototypeOf(ConnectMongoConnection.prototype), 'constructor', this).call(this, name, options);
        this.options.url = this.options.url || process.env.MONGO_URL || process.env.MONGO_URI;
    }

    _createClass(ConnectMongoConnection, [{
        key: '__open__',
        value: function __open__(resolve, reject) {

            var MongoConnection = (0, _connectMongo2['default'])(_expressSession2['default']);

            if (typeof this.options.store === 'string') this.options.store = _Connections2['default'].getConnection(this.options.store).getRaw();

            this.connection = new MongoConnection(this.options);
            resolve(this.connection);
        }
    }, {
        key: '__close__',
        value: function __close__(resolve, reject) {

            resolve(this.connection);
        }
    }]);

    return ConnectMongoConnection;
})(_AbstractConnection3['default']);

exports['default'] = ConnectMongoConnection;
module.exports = exports['default'];
//# sourceMappingURL=ConnectMongoConnection.js.map