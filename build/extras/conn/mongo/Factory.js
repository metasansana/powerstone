'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ConnectMongoConnection = require('./ConnectMongoConnection');

var _ConnectMongoConnection2 = _interopRequireDefault(_ConnectMongoConnection);

var _MongooseConnection = require('./MongooseConnection');

var _MongooseConnection2 = _interopRequireDefault(_MongooseConnection);

/**
 * Factory
 */

var Factory = (function () {
    function Factory() {
        _classCallCheck(this, Factory);
    }

    _createClass(Factory, [{
        key: 'create',
        value: function create(name, type, options) {

            if (type === Factory.CONNECT_MONGO) return new _ConnectMongoConnection2['default'](name, options);

            if (type === Factory.MONGOOSE) return new _MongooseConnection2['default'](name, options);

            throw new Error('Attention: The mongo Factory only supports connect-mongo and mongoose! Not type "' + type + '"!');
        }
    }]);

    return Factory;
})();

Factory.CONNECT_MONGO = 'connect-mongo';
Factory.MONGOOSE = 'mongoose';
exports['default'] = new Factory();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9leHRyYXMvY29ubi9tb25nby9GYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQ0FBbUMsMEJBQTBCOzs7O2tDQUM5QixzQkFBc0I7Ozs7Ozs7O0lBSy9DLE9BQU87YUFBUCxPQUFPOzhCQUFQLE9BQU87OztpQkFBUCxPQUFPOztlQUVILGdCQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFOztBQUV4QixnQkFBRyxJQUFJLEtBQUssT0FBTyxDQUFDLGFBQWEsRUFDakMsT0FBTyx3Q0FBMkIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUVqRCxnQkFBRyxJQUFJLEtBQUssT0FBTyxDQUFDLFFBQVEsRUFDNUIsT0FBTyxvQ0FBdUIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUU3QyxrQkFBTSxJQUFJLEtBQUssQ0FBQyxtRkFBbUYsR0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLENBQUM7U0FFbEg7OztXQVpDLE9BQU87OztBQWdCYixPQUFPLENBQUMsYUFBYSxHQUFHLGVBQWUsQ0FBQztBQUN4QyxPQUFPLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztxQkFDZixJQUFJLE9BQU8sRUFBRSIsImZpbGUiOiJGYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbm5lY3RNb25nb0Nvbm5lY3Rpb24gZnJvbSAnLi9Db25uZWN0TW9uZ29Db25uZWN0aW9uJztcbmltcG9ydCBNb25nb29zZUNvbm5lY3Rpb24gZnJvbSAnLi9Nb25nb29zZUNvbm5lY3Rpb24nO1xuXG4vKipcbiAqIEZhY3RvcnlcbiAqL1xuY2xhc3MgRmFjdG9yeSB7XG5cbiAgICBjcmVhdGUobmFtZSwgdHlwZSwgb3B0aW9ucykge1xuXG4gICAgICAgIGlmKHR5cGUgPT09IEZhY3RvcnkuQ09OTkVDVF9NT05HTylcbiAgICAgICAgcmV0dXJuIG5ldyBDb25uZWN0TW9uZ29Db25uZWN0aW9uKG5hbWUsIG9wdGlvbnMpO1xuXG4gICAgICAgIGlmKHR5cGUgPT09IEZhY3RvcnkuTU9OR09PU0UpXG4gICAgICAgIHJldHVybiBuZXcgTW9uZ29vc2VDb25uZWN0aW9uKG5hbWUsIG9wdGlvbnMpO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW50aW9uOiBUaGUgbW9uZ28gRmFjdG9yeSBvbmx5IHN1cHBvcnRzIGNvbm5lY3QtbW9uZ28gYW5kIG1vbmdvb3NlISBOb3QgdHlwZSBcIicrdHlwZSsnXCIhJyk7XG5cbiAgICB9XG5cbn1cblxuRmFjdG9yeS5DT05ORUNUX01PTkdPID0gJ2Nvbm5lY3QtbW9uZ28nO1xuRmFjdG9yeS5NT05HT09TRSA9ICdtb25nb29zZSc7XG5leHBvcnQgZGVmYXVsdCBuZXcgRmFjdG9yeSgpIl19