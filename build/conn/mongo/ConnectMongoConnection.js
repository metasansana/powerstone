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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25uL21vbmdvL0Nvbm5lY3RNb25nb0Nvbm5lY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OzttQ0FBK0IsdUJBQXVCOzs7OzhCQUNsQyxpQkFBaUI7Ozs7NEJBQ2pCLGVBQWU7Ozs7MkJBQ1gsZ0JBQWdCOzs7O0lBRWxDLHNCQUFzQjtjQUF0QixzQkFBc0I7O0FBRWIsYUFGVCxzQkFBc0IsQ0FFWixJQUFJLEVBQUUsT0FBTyxFQUFFOzhCQUZ6QixzQkFBc0I7O0FBR3BCLG1DQUhGLHNCQUFzQiw2Q0FHZCxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3JCLFlBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7S0FDN0I7O2lCQVBDLHNCQUFzQjs7ZUFTaEIsa0JBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTs7QUFFdEIsZ0JBQUksZUFBZSxHQUFHLDJEQUFlLENBQUM7O0FBRXRDLGdCQUFHLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyx5QkFBWSxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7QUFFNUUsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BELG1CQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBRTVCOzs7ZUFFUSxtQkFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFOztBQUV2QixtQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUU1Qjs7O1dBekJDLHNCQUFzQjs7O3FCQTRCYixzQkFBc0IiLCJmaWxlIjoiQ29ubmVjdE1vbmdvQ29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBYnN0cmFjdENvbm5lY3Rpb24gZnJvbSAnLi4vQWJzdHJhY3RDb25uZWN0aW9uJztcbmltcG9ydCBzZXNzaW9uIGZyb20gJ2V4cHJlc3Mtc2Vzc2lvbic7XG5pbXBvcnQgY21vbmdvIGZyb20gICdjb25uZWN0LW1vbmdvJztcbmltcG9ydCBDb25uZWN0aW9ucyBmcm9tICcuLi9Db25uZWN0aW9ucyc7XG5cbmNsYXNzIENvbm5lY3RNb25nb0Nvbm5lY3Rpb24gZXh0ZW5kcyBBYnN0cmFjdENvbm5lY3Rpb24ge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihuYW1lLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLnVybCA9IHRoaXMub3B0aW9ucy51cmwgfHxcbiAgICAgICAgICAgIHByb2Nlc3MuZW52Lk1PTkdPX1VSSSB8fFxuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTU9OR09fVVJJO1xuICAgIH1cblxuICAgIF9fb3Blbl9fKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHZhciBNb25nb0Nvbm5lY3Rpb24gPSBjbW9uZ28oc2Vzc2lvbik7XG5cbiAgICAgICAgaWYodHlwZW9mIHRoaXMub3B0aW9ucy5zdG9yZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHRoaXMub3B0aW9ucy5zdG9yZSA9IENvbm5lY3Rpb25zLmdldENvbm5lY3Rpb24odGhpcy5vcHRpb25zLnN0b3JlKS5nZXRSYXcoKTtcblxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgTW9uZ29Db25uZWN0aW9uKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHJlc29sdmUodGhpcy5jb25uZWN0aW9uKTtcblxuICAgIH1cblxuICAgIF9fY2xvc2VfXyhyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICByZXNvbHZlKHRoaXMuY29ubmVjdGlvbik7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbm5lY3RNb25nb0Nvbm5lY3Rpb24iXX0=