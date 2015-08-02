'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Pool = require('./Pool');

var _Pool2 = _interopRequireDefault(_Pool);

var _mongoFactory = require('./mongo/Factory');

var _mongoFactory2 = _interopRequireDefault(_mongoFactory);

var _UnsupportedConnectionTypeError = require('./UnsupportedConnectionTypeError');

var _UnsupportedConnectionTypeError2 = _interopRequireDefault(_UnsupportedConnectionTypeError);

var _UnknownConnectionError = require('./UnknownConnectionError');

var _UnknownConnectionError2 = _interopRequireDefault(_UnknownConnectionError);

/**
 * Connections is a registry for connections
 */

var Connections = (function () {
    function Connections() {
        _classCallCheck(this, Connections);

        this.types = {};
        this.pool = _Pool2['default'];
    }

    _createClass(Connections, [{
        key: 'set',

        /**
         *
         * @param {String} name
         * @param {ConnectionFactory} factory
         */
        value: function set(name, factory) {
            this.types[name] = factory;
            return this;
        }
    }, {
        key: 'create',

        /**
         * create will return an instance of the desired connection if found.
         * @param {String} name
         * @param {String} type
         * @param {Object} options
         * @returns {AbstractConnection}
         */
        value: function create(name, type, options) {

            var conn;

            if (!this.types.hasOwnProperty(type)) throw new _UnsupportedConnectionTypeError2['default'](type);

            conn = this.types[type].create(name, type, options);
            this.pool[name] = conn;

            return conn;
        }
    }, {
        key: 'hasConnection',
        value: function hasConnection(name) {
            return this.pool.hasOwnProperty(name);
        }
    }, {
        key: 'getConnection',

        /**
         * getConnection
         * @param {String} name
         * @return {AbstractConnection}
         */
        value: function getConnection(name) {

            if (!this.pool.hasOwnProperty(name)) throw new _UnknownConnectionError2['default'](name);

            return this.pool[name];
        }
    }, {
        key: 'open',

        /**
         * open
         * @return {Promise}
         */
        value: function open() {
            var _this = this;

            return _bluebird2['default'].all(Object.keys(this.pool).map(function (key) {
                _this.pool[key].open();
            }));
        }
    }, {
        key: 'close',

        /**
         * close all the connections
         * @return {Promise}
         */
        value: function close() {
            return _bluebird2['default'].all(Object.keys(this.pool).map(function (connection) {
                return connection.close();
            }));
        }
    }]);

    return Connections;
})();

var c = new Connections();
c.set('mongoose', _mongoFactory2['default']);
c.set('connect-mongo', _mongoFactory2['default']);
exports['default'] = c;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uL0Nvbm5lY3Rpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt3QkFBb0IsVUFBVTs7OztvQkFDYixRQUFROzs7OzRCQUNMLGlCQUFpQjs7Ozs4Q0FDTyxrQ0FBa0M7Ozs7c0NBQzNDLDBCQUEwQjs7Ozs7Ozs7SUFLdkQsV0FBVztBQUVGLGFBRlQsV0FBVyxHQUVDOzhCQUZaLFdBQVc7O0FBR1QsWUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDaEIsWUFBSSxDQUFDLElBQUksb0JBQU8sQ0FBQztLQUNwQjs7aUJBTEMsV0FBVzs7Ozs7Ozs7ZUFZVixhQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDZixnQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7QUFDM0IsbUJBQU8sSUFBSSxDQUFDO1NBQ2Y7Ozs7Ozs7Ozs7O2VBU0ssZ0JBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7O0FBRXhCLGdCQUFJLElBQUksQ0FBQzs7QUFFVCxnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUNoQyxNQUFNLGdEQUFtQyxJQUFJLENBQUMsQ0FBQzs7QUFFbkQsZ0JBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3BELGdCQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQzs7QUFFdkIsbUJBQU8sSUFBSSxDQUFDO1NBRWY7OztlQUVZLHVCQUFDLElBQUksRUFBRTtBQUNoQixtQkFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQzs7Ozs7Ozs7O2VBT1ksdUJBQUMsSUFBSSxFQUFFOztBQUVoQixnQkFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUMvQixNQUFNLHdDQUEyQixJQUFJLENBQUMsQ0FBQzs7QUFFM0MsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQjs7Ozs7Ozs7ZUFNRyxnQkFBRzs7O0FBQ0gsbUJBQU8sc0JBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsRUFBRztBQUNoRCxzQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDekIsQ0FBQyxDQUFDLENBQUM7U0FDUDs7Ozs7Ozs7ZUFNSSxpQkFBRztBQUNKLG1CQUFPLHNCQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxVQUFVLEVBQUU7QUFDaEUsdUJBQU8sVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFBO2FBQzVCLENBQUMsQ0FBQyxDQUFDO1NBQ1A7OztXQXpFQyxXQUFXOzs7QUE0RWpCLElBQUksQ0FBQyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFDMUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLDRCQUFVLENBQUM7QUFDM0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLDRCQUFVLENBQUM7cUJBQ2pCLENBQUMiLCJmaWxlIjoiQ29ubmVjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgUG9vbCBmcm9tICcuL1Bvb2wnO1xuaW1wb3J0IEZhY3RvcnkgZnJvbSAnLi9tb25nby9GYWN0b3J5JztcbmltcG9ydCBVbnN1cHBvcnRlZENvbm5lY3Rpb25UeXBlRXJyb3IgZnJvbSAgJy4vVW5zdXBwb3J0ZWRDb25uZWN0aW9uVHlwZUVycm9yJztcbmltcG9ydCBVbmtub3duQ29ubmVjdGlvbkVycm9yIGZyb20gJy4vVW5rbm93bkNvbm5lY3Rpb25FcnJvcic7XG5cbi8qKlxuICogQ29ubmVjdGlvbnMgaXMgYSByZWdpc3RyeSBmb3IgY29ubmVjdGlvbnNcbiAqL1xuY2xhc3MgQ29ubmVjdGlvbnMge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy5wb29sID0gUG9vbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtDb25uZWN0aW9uRmFjdG9yeX0gZmFjdG9yeVxuICAgICAqL1xuICAgIHNldChuYW1lLCBmYWN0b3J5KSB7XG4gICAgICAgIHRoaXMudHlwZXNbbmFtZV0gPSBmYWN0b3J5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGUgd2lsbCByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgdGhlIGRlc2lyZWQgY29ubmVjdGlvbiBpZiBmb3VuZC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7QWJzdHJhY3RDb25uZWN0aW9ufVxuICAgICAqL1xuICAgIGNyZWF0ZShuYW1lLCB0eXBlLCBvcHRpb25zKSB7XG5cbiAgICAgICAgdmFyIGNvbm47XG5cbiAgICAgICAgaWYgKCF0aGlzLnR5cGVzLmhhc093blByb3BlcnR5KHR5cGUpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFVuc3VwcG9ydGVkQ29ubmVjdGlvblR5cGVFcnJvcih0eXBlKTtcblxuICAgICAgICBjb25uID0gdGhpcy50eXBlc1t0eXBlXS5jcmVhdGUobmFtZSwgdHlwZSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMucG9vbFtuYW1lXSA9IGNvbm47XG5cbiAgICAgICAgcmV0dXJuIGNvbm47XG5cbiAgICB9XG5cbiAgICBoYXNDb25uZWN0aW9uKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnBvb2wuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0Q29ubmVjdGlvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7QWJzdHJhY3RDb25uZWN0aW9ufVxuICAgICAqL1xuICAgIGdldENvbm5lY3Rpb24obmFtZSkge1xuXG4gICAgICAgIGlmICghdGhpcy5wb29sLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25Db25uZWN0aW9uRXJyb3IobmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucG9vbFtuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvcGVuXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBvcGVuKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXModGhpcy5wb29sKS5tYXAoa2V5PT4ge1xuICAgICAgICAgICAgdGhpcy5wb29sW2tleV0ub3BlbigpO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2xvc2UgYWxsIHRoZSBjb25uZWN0aW9uc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyh0aGlzLnBvb2wpLm1hcChmdW5jdGlvbiAoY29ubmVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uY2xvc2UoKVxuICAgICAgICB9KSk7XG4gICAgfVxufVxuXG52YXIgYyA9IG5ldyBDb25uZWN0aW9ucygpO1xuYy5zZXQoJ21vbmdvb3NlJywgRmFjdG9yeSk7XG5jLnNldCgnY29ubmVjdC1tb25nbycsIEZhY3RvcnkpO1xuZXhwb3J0IGRlZmF1bHQgYyJdfQ==