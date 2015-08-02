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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25uL21vbmdvL01vbmdvb3NlQ29ubmVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O21DQUErQix1QkFBdUI7Ozs7d0JBQ2pDLFVBQVU7Ozs7SUFFekIsa0JBQWtCO2NBQWxCLGtCQUFrQjs7QUFFVCxhQUZULGtCQUFrQixDQUVSLElBQUksRUFBRSxPQUFPLEVBQUU7OEJBRnpCLGtCQUFrQjs7QUFHaEIsbUNBSEYsa0JBQWtCLDZDQUdWLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDckIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztLQUM3Qjs7aUJBUEMsa0JBQWtCOztlQVNaLGtCQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUU7O0FBRXRCLGdCQUFJLENBQUMsVUFBVSxHQUFHLHNCQUFTLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RSxnQkFBSSxDQUFDLE1BQU0sR0FBRyxzQkFBUyxNQUFNLENBQUM7O0FBRTlCLGdCQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxHQUFHLEVBQUU7QUFDdEMsb0JBQUksR0FBRyxFQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLHVCQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzVCLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRyxFQUFFO0FBQ3ZDLHNCQUFNLEdBQUcsQ0FBQTthQUNaLENBQUMsQ0FBQztTQUdOOzs7ZUFFUSxtQkFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQ3ZCLGdCQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNsQzs7O1dBNUJDLGtCQUFrQjs7O3FCQWdDVCxrQkFBa0IiLCJmaWxlIjoiTW9uZ29vc2VDb25uZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFic3RyYWN0Q29ubmVjdGlvbiBmcm9tICcuLi9BYnN0cmFjdENvbm5lY3Rpb24nO1xuaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcblxuY2xhc3MgTW9uZ29vc2VDb25uZWN0aW9uIGV4dGVuZHMgQWJzdHJhY3RDb25uZWN0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIobmFtZSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMub3B0aW9ucy51cmwgPSB0aGlzLm9wdGlvbnMudXJsIHx8XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5NT05HT19VUkkgfHxcbiAgICAgICAgICAgIHByb2Nlc3MuZW52Lk1PTkdPX1VSSTtcbiAgICB9XG5cbiAgICBfX29wZW5fXyhyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBtb25nb29zZS5jcmVhdGVDb25uZWN0aW9uKHRoaXMub3B0aW9ucy51cmwsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuU2NoZW1hID0gbW9uZ29vc2UuU2NoZW1hO1xuXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbignb3BlbicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5jb25uZWN0aW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IGVyclxuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgX19jbG9zZV9fKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24uY2xvc2UocmVzb2x2ZSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vbmdvb3NlQ29ubmVjdGlvbjsiXX0=