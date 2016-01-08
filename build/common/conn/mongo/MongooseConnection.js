'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _AbstractConnection2 = require('../AbstractConnection');

var _AbstractConnection3 = _interopRequireDefault(_AbstractConnection2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var MongooseConnection = (function (_AbstractConnection) {
    _inherits(MongooseConnection, _AbstractConnection);

    function MongooseConnection(name, options) {
        _classCallCheck(this, MongooseConnection);

        _get(Object.getPrototypeOf(MongooseConnection.prototype), 'constructor', this).call(this, name, options);
        this.options.url = this.options.url || process.env.MONGO_URI || process.env.MONGO_URI;
    }

    _createClass(MongooseConnection, [{
        key: '__open__',
        value: function __open__(resolve, reject) {

            this.connection = _mongoose2['default'].createConnection(this.options.url, this.options);
            this.Schema = _mongoose2['default'].Schema;

            this.connection.on('open', function (err) {
                if (err) return reject(err);
                resolve(this.connection);
            });

            this.connection.on('error', function (err) {
                throw err;
            });
        }
    }, {
        key: '__close__',
        value: function __close__(resolve, reject) {
            this.connection.close(resolve);
        }
    }]);

    return MongooseConnection;
})(_AbstractConnection3['default']);

exports['default'] = MongooseConnection;
module.exports = exports['default'];
//# sourceMappingURL=MongooseConnection.js.map