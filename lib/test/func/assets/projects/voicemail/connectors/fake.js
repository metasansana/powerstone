'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = null_connector;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function null_connector(options) {
    global.connected = true;
    return new _bluebird2['default'](function (r) {
        r('fake');
    });
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy90ZXN0L2Z1bmMvYXNzZXRzL3Byb2plY3RzL3ZvaWNlbWFpbC9jb25uZWN0b3JzL2Zha2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7cUJBRXdCLGNBQWM7Ozs7d0JBRmxCLFVBQVU7Ozs7QUFFZixTQUFTLGNBQWMsQ0FBQyxPQUFPLEVBQUU7QUFDNUMsVUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDeEIsV0FBTywwQkFBWSxVQUFTLENBQUMsRUFBRTtBQUMzQixTQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDYixDQUFDLENBQUM7Q0FDTiIsImZpbGUiOiJmYWtlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBudWxsX2Nvbm5lY3RvcihvcHRpb25zKSB7XG4gICAgZ2xvYmFsLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgcignZmFrZScpO1xuICAgIH0pO1xufVxuIl19