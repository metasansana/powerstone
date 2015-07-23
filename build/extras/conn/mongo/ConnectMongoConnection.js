'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _connAbstractConnection = require('../../../conn/AbstractConnection');

var _connAbstractConnection2 = _interopRequireDefault(_connAbstractConnection);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var ConnectMongoConnection = (function (_AbstractConnection) {
    _inherits(ConnectMongoConnection, _AbstractConnection);

    function ConnectMongoConnection(name, options) {
        _classCallCheck(this, ConnectMongoConnection);

        _get(Object.getPrototypeOf(ConnectMongoConnection.prototype), 'constructor', this).call(this, name, options);
        this.options.url = this.options.url || process.env.MONGO_URI || process.env.MONGO_URI;
    }

    _createClass(ConnectMongoConnection, [{
        key: '__open__',
        value: function __open__(resolve, reject) {
            var MongoConnection = (0, _connectMongo2['default'])(_expressSession2['default']);
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
})(_connAbstractConnection2['default']);

exports['default'] = ConnectMongoConnection;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9leHRyYXMvY29ubi9tb25nby9Db25uZWN0TW9uZ29Db25uZWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBQStCLGtDQUFrQzs7Ozs4QkFDN0MsaUJBQWlCOzs7OzRCQUNqQixlQUFlOzs7O0lBRTdCLHNCQUFzQjtjQUF0QixzQkFBc0I7O0FBRWIsYUFGVCxzQkFBc0IsQ0FFWixJQUFJLEVBQUUsT0FBTyxFQUFFOzhCQUZ6QixzQkFBc0I7O0FBR3BCLG1DQUhGLHNCQUFzQiw2Q0FHZCxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3JCLFlBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7S0FDN0I7O2lCQVBDLHNCQUFzQjs7ZUFTaEIsa0JBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUN0QixnQkFBSSxlQUFlLEdBQUcsMkRBQWUsQ0FBQztBQUN0QyxnQkFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEQsbUJBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDNUI7OztlQUVRLG1CQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUU7O0FBRXZCLG1CQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBRTVCOzs7V0FuQkMsc0JBQXNCOzs7cUJBc0JiLHNCQUFzQiIsImZpbGUiOiJDb25uZWN0TW9uZ29Db25uZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFic3RyYWN0Q29ubmVjdGlvbiBmcm9tICcuLi8uLi8uLi9jb25uL0Fic3RyYWN0Q29ubmVjdGlvbic7XG5pbXBvcnQgc2Vzc2lvbiBmcm9tICdleHByZXNzLXNlc3Npb24nO1xuaW1wb3J0IGNtb25nbyBmcm9tICAnY29ubmVjdC1tb25nbyc7XG5cbmNsYXNzIENvbm5lY3RNb25nb0Nvbm5lY3Rpb24gZXh0ZW5kcyBBYnN0cmFjdENvbm5lY3Rpb24ge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihuYW1lLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLnVybCA9IHRoaXMub3B0aW9ucy51cmwgfHxcbiAgICAgICAgICAgIHByb2Nlc3MuZW52Lk1PTkdPX1VSSSB8fFxuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTU9OR09fVVJJO1xuICAgIH1cblxuICAgIF9fb3Blbl9fKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgTW9uZ29Db25uZWN0aW9uID0gY21vbmdvKHNlc3Npb24pO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgTW9uZ29Db25uZWN0aW9uKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHJlc29sdmUodGhpcy5jb25uZWN0aW9uKTtcbiAgICB9XG5cbiAgICBfX2Nsb3NlX18ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzLmNvbm5lY3Rpb24pO1xuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb25uZWN0TW9uZ29Db25uZWN0aW9uIl19