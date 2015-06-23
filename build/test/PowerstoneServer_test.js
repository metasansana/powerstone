'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _PowerstoneServer = require('../PowerstoneServer');

var _PowerstoneServer2 = _interopRequireDefault(_PowerstoneServer);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var server;
var mockServer = {

    em: new _events2['default'].EventEmitter(),

    on: function on(event, cb) {
        this.em.on(event, cb);
    }

};

describe('PowerstoneServer', function () {

    beforeEach(function () {

        server = new _PowerstoneServer2['default']();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L1Bvd2Vyc3RvbmVTZXJ2ZXJfdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O2dDQUE2QixxQkFBcUI7Ozs7b0JBQ2pDLE1BQU07Ozs7c0JBQ0osUUFBUTs7OztBQUUzQixJQUFJLE1BQU0sQ0FBQztBQUNYLElBQUksVUFBVSxHQUFHOztBQUViLE1BQUUsRUFBRSxJQUFJLG9CQUFPLFlBQVksRUFBRTs7QUFFN0IsTUFBRSxFQUFFLFlBQVMsS0FBSyxFQUFFLEVBQUUsRUFBRTtBQUNwQixZQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDekI7O0NBTUosQ0FBQzs7QUFFRixRQUFRLENBQUMsa0JBQWtCLEVBQUUsWUFBVzs7QUFFcEMsY0FBVSxDQUFDLFlBQVU7O0FBRWpCLGNBQU0sR0FBRyxtQ0FBc0IsQ0FBQTtLQUVsQyxDQUFDLENBQUM7Q0FFTixDQUFDLENBQUMiLCJmaWxlIjoiUG93ZXJzdG9uZVNlcnZlcl90ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvd2Vyc3RvbmVTZXJ2ZXIgZnJvbSAnLi4vUG93ZXJzdG9uZVNlcnZlcic7XG5pbXBvcnQgbXVzdCBmcm9tICdtdXN0JztcbmltcG9ydCBldmVudHMgZnJvbSAnZXZlbnRzJztcblxudmFyIHNlcnZlcjtcbnZhciBtb2NrU2VydmVyID0ge1xuXG4gICAgZW06IG5ldyBldmVudHMuRXZlbnRFbWl0dGVyKCksXG5cbiAgICBvbjogZnVuY3Rpb24oZXZlbnQsIGNiKSB7XG4gICAgICAgIHRoaXMuZW0ub24oZXZlbnQsIGNiKTtcbiAgICB9XG5cblxuXG5cblxufTtcblxuZGVzY3JpYmUoJ1Bvd2Vyc3RvbmVTZXJ2ZXInLCBmdW5jdGlvbigpIHtcblxuICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKXtcblxuICAgICAgICBzZXJ2ZXIgPSBuZXcgUG93ZXJzdG9uZVNlcnZlcigpXG5cbiAgICB9KTtcblxufSk7Il19