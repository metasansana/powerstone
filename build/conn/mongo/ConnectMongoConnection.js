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
        this.options.url = this.options.url || process.env.MONGO_URI || process.env.MONGO_URI;
    }

    _createClass(ConnectMongoConnection, [{
        key: '__open__',
        value: function __open__(resolve, reject) {

            var MongoConnection = (0, _connectMongo2['default'])(_expressSession2['default']);

            if (typeof this.options.store === 'string') this.options.store = _Connections2['default'].getConnection(this.options.store).connection;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25uL21vbmdvL0Nvbm5lY3RNb25nb0Nvbm5lY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OzttQ0FBK0IsdUJBQXVCOzs7OzhCQUNsQyxpQkFBaUI7Ozs7NEJBQ2pCLGVBQWU7Ozs7MkJBQ1gsZ0JBQWdCOzs7O0lBRWxDLHNCQUFzQjtjQUF0QixzQkFBc0I7O0FBRWIsYUFGVCxzQkFBc0IsQ0FFWixJQUFJLEVBQUUsT0FBTyxFQUFFOzhCQUZ6QixzQkFBc0I7O0FBR3BCLG1DQUhGLHNCQUFzQiw2Q0FHZCxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3JCLFlBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7S0FDN0I7O2lCQVBDLHNCQUFzQjs7ZUFTaEIsa0JBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTs7QUFFdEIsZ0JBQUksZUFBZSxHQUFHLDJEQUFlLENBQUM7O0FBRXRDLGdCQUFHLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyx5QkFBWSxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUM7O0FBRTlFLGdCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwRCxtQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUU1Qjs7O2VBRVEsbUJBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTs7QUFFdkIsbUJBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FFNUI7OztXQXpCQyxzQkFBc0I7OztxQkE0QmIsc0JBQXNCIiwiZmlsZSI6IkNvbm5lY3RNb25nb0Nvbm5lY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWJzdHJhY3RDb25uZWN0aW9uIGZyb20gJy4uL0Fic3RyYWN0Q29ubmVjdGlvbic7XG5pbXBvcnQgc2Vzc2lvbiBmcm9tICdleHByZXNzLXNlc3Npb24nO1xuaW1wb3J0IGNtb25nbyBmcm9tICAnY29ubmVjdC1tb25nbyc7XG5pbXBvcnQgQ29ubmVjdGlvbnMgZnJvbSAnLi4vQ29ubmVjdGlvbnMnO1xuXG5jbGFzcyBDb25uZWN0TW9uZ29Db25uZWN0aW9uIGV4dGVuZHMgQWJzdHJhY3RDb25uZWN0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIobmFtZSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMub3B0aW9ucy51cmwgPSB0aGlzLm9wdGlvbnMudXJsIHx8XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5NT05HT19VUkkgfHxcbiAgICAgICAgICAgIHByb2Nlc3MuZW52Lk1PTkdPX1VSSTtcbiAgICB9XG5cbiAgICBfX29wZW5fXyhyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgTW9uZ29Db25uZWN0aW9uID0gY21vbmdvKHNlc3Npb24pO1xuXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLm9wdGlvbnMuc3RvcmUgPT09ICdzdHJpbmcnKVxuICAgICAgICB0aGlzLm9wdGlvbnMuc3RvcmUgPSBDb25uZWN0aW9ucy5nZXRDb25uZWN0aW9uKHRoaXMub3B0aW9ucy5zdG9yZSkuY29ubmVjdGlvbjtcblxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgTW9uZ29Db25uZWN0aW9uKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHJlc29sdmUodGhpcy5jb25uZWN0aW9uKTtcblxuICAgIH1cblxuICAgIF9fY2xvc2VfXyhyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICByZXNvbHZlKHRoaXMuY29ubmVjdGlvbik7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbm5lY3RNb25nb0Nvbm5lY3Rpb24iXX0=