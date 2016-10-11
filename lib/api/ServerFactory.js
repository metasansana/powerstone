'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServerFactory = function () {
    function ServerFactory() {
        _classCallCheck(this, ServerFactory);
    }

    _createClass(ServerFactory, [{
        key: 'create',
        value: function create(main) {

            var s = _restify2.default.createServer(main.configuration.readOrDefault('api.options', null));

            s.on('uncaughtException', function (req, res, route, err) {
                res.status(500);
                res.send();
                events.emit('error', err);
            });

            return s;
        }
    }]);

    return ServerFactory;
}();

exports.default = new ServerFactory();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvU2VydmVyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJTZXJ2ZXJGYWN0b3J5IiwibWFpbiIsInMiLCJjcmVhdGVTZXJ2ZXIiLCJjb25maWd1cmF0aW9uIiwicmVhZE9yRGVmYXVsdCIsIm9uIiwicmVxIiwicmVzIiwicm91dGUiLCJlcnIiLCJzdGF0dXMiLCJzZW5kIiwiZXZlbnRzIiwiZW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFTUEsYTs7Ozs7OzsrQkFFSUMsSSxFQUFNOztBQUVSLGdCQUFJQyxJQUFJLGtCQUFRQyxZQUFSLENBQXFCRixLQUFLRyxhQUFMLENBQW1CQyxhQUFuQixDQUFpQyxhQUFqQyxFQUFnRCxJQUFoRCxDQUFyQixDQUFSOztBQUVBSCxjQUFFSSxFQUFGLENBQUssbUJBQUwsRUFBMEIsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLEtBQVgsRUFBa0JDLEdBQWxCLEVBQTBCO0FBQ2hERixvQkFBSUcsTUFBSixDQUFXLEdBQVg7QUFDQUgsb0JBQUlJLElBQUo7QUFDQUMsdUJBQU9DLElBQVAsQ0FBWSxPQUFaLEVBQXFCSixHQUFyQjtBQUNILGFBSkQ7O0FBTUEsbUJBQU9SLENBQVA7QUFDSDs7Ozs7O2tCQUlVLElBQUlGLGFBQUosRSIsImZpbGUiOiJTZXJ2ZXJGYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc3RpZnkgZnJvbSAncmVzdGlmeSc7XG5cbmNsYXNzIFNlcnZlckZhY3Rvcnkge1xuXG4gICBjcmVhdGUobWFpbikge1xuXG4gICAgICAgIHZhciBzID0gcmVzdGlmeS5jcmVhdGVTZXJ2ZXIobWFpbi5jb25maWd1cmF0aW9uLnJlYWRPckRlZmF1bHQoJ2FwaS5vcHRpb25zJywgbnVsbCkpO1xuXG4gICAgICAgIHMub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgKHJlcSwgcmVzLCByb3V0ZSwgZXJyKSA9PiB7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgICAgICAgICByZXMuc2VuZCgpO1xuICAgICAgICAgICAgZXZlbnRzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBTZXJ2ZXJGYWN0b3J5KCk7XG4iXX0=