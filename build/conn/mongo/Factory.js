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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25uL21vbmdvL0ZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3NDQUFtQywwQkFBMEI7Ozs7a0NBQzlCLHNCQUFzQjs7Ozs7Ozs7SUFLL0MsT0FBTzthQUFQLE9BQU87OEJBQVAsT0FBTzs7O2lCQUFQLE9BQU87O2VBRUgsZ0JBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7O0FBRXhCLGdCQUFHLElBQUksS0FBSyxPQUFPLENBQUMsYUFBYSxFQUNqQyxPQUFPLHdDQUEyQixJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRWpELGdCQUFHLElBQUksS0FBSyxPQUFPLENBQUMsUUFBUSxFQUM1QixPQUFPLG9DQUF1QixJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRTdDLGtCQUFNLElBQUksS0FBSyxDQUFDLG1GQUFtRixHQUFDLElBQUksR0FBQyxJQUFJLENBQUMsQ0FBQztTQUVsSDs7O1dBWkMsT0FBTzs7O0FBZ0JiLE9BQU8sQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFDO0FBQ3hDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO3FCQUNmLElBQUksT0FBTyxFQUFFIiwiZmlsZSI6IkZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29ubmVjdE1vbmdvQ29ubmVjdGlvbiBmcm9tICcuL0Nvbm5lY3RNb25nb0Nvbm5lY3Rpb24nO1xuaW1wb3J0IE1vbmdvb3NlQ29ubmVjdGlvbiBmcm9tICcuL01vbmdvb3NlQ29ubmVjdGlvbic7XG5cbi8qKlxuICogRmFjdG9yeVxuICovXG5jbGFzcyBGYWN0b3J5IHtcblxuICAgIGNyZWF0ZShuYW1lLCB0eXBlLCBvcHRpb25zKSB7XG5cbiAgICAgICAgaWYodHlwZSA9PT0gRmFjdG9yeS5DT05ORUNUX01PTkdPKVxuICAgICAgICByZXR1cm4gbmV3IENvbm5lY3RNb25nb0Nvbm5lY3Rpb24obmFtZSwgb3B0aW9ucyk7XG5cbiAgICAgICAgaWYodHlwZSA9PT0gRmFjdG9yeS5NT05HT09TRSlcbiAgICAgICAgcmV0dXJuIG5ldyBNb25nb29zZUNvbm5lY3Rpb24obmFtZSwgb3B0aW9ucyk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbnRpb246IFRoZSBtb25nbyBGYWN0b3J5IG9ubHkgc3VwcG9ydHMgY29ubmVjdC1tb25nbyBhbmQgbW9uZ29vc2UhIE5vdCB0eXBlIFwiJyt0eXBlKydcIiEnKTtcblxuICAgIH1cblxufVxuXG5GYWN0b3J5LkNPTk5FQ1RfTU9OR08gPSAnY29ubmVjdC1tb25nbyc7XG5GYWN0b3J5Lk1PTkdPT1NFID0gJ21vbmdvb3NlJztcbmV4cG9ydCBkZWZhdWx0IG5ldyBGYWN0b3J5KCkiXX0=