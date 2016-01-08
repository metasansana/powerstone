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
//# sourceMappingURL=Factory.js.map