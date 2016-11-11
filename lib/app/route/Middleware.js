'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

var _Throws = require('../../util/Throws');

var _Throws2 = _interopRequireDefault(_Throws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnknownMiddlewareError = function (_Error) {
    _inherits(UnknownMiddlewareError, _Error);

    function UnknownMiddlewareError(ware, list) {
        _classCallCheck(this, UnknownMiddlewareError);

        return _possibleConstructorReturn(this, (UnknownMiddlewareError.__proto__ || Object.getPrototypeOf(UnknownMiddlewareError)).call(this, 'Middleware \'' + ware + '\' was not found! Found: ' + Object.keys(list)));
    }

    return UnknownMiddlewareError;
}(_es6Error2.default);

/**
 *
 */


var Middleware = function () {
    function Middleware() {
        _classCallCheck(this, Middleware);
    }

    _createClass(Middleware, null, [{
        key: 'prepare',
        value: function prepare(def, action, resource) {

            if (!def.middleware) return;

            if (typeof def.middleware !== 'string') _Throws2.default.fromModule('Middleware must be a string!', action.route.module, TypeError);

            def.middleware.split(',').forEach(function (m) {

                var Mware = resource.find(m);
                var mware;

                if (!Mware) throw new UnknownMiddlewareError(m, action.route.module.application.context.middleware);

                if (typeof Mware !== 'function') throw new TypeError('Middleware must be constructor functions! For \'' + m + '\'');

                mware = new Mware(action, action.route.module, action.route.module.application);

                action.callbacks.push(function (req, res, next) {

                    var preq = action.factory.request(req, res, action.output);
                    var pres = action.factory.response(req, res, action.output);

                    Promise.resolve(mware.apply(preq, pres, next)).catch(function (e) {
                        return action.route.module.application.onRouteErrorListener.onRouteError(e, preq, pres, next);
                    });
                });
            });
        }
    }]);

    return Middleware;
}();

exports.default = Middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvTWlkZGxld2FyZS5qcyJdLCJuYW1lcyI6WyJVbmtub3duTWlkZGxld2FyZUVycm9yIiwid2FyZSIsImxpc3QiLCJPYmplY3QiLCJrZXlzIiwiTWlkZGxld2FyZSIsImRlZiIsImFjdGlvbiIsInJlc291cmNlIiwibWlkZGxld2FyZSIsImZyb21Nb2R1bGUiLCJyb3V0ZSIsIm1vZHVsZSIsIlR5cGVFcnJvciIsInNwbGl0IiwiZm9yRWFjaCIsIk13YXJlIiwiZmluZCIsIm0iLCJtd2FyZSIsImFwcGxpY2F0aW9uIiwiY29udGV4dCIsImNhbGxiYWNrcyIsInB1c2giLCJyZXEiLCJyZXMiLCJuZXh0IiwicHJlcSIsImZhY3RvcnkiLCJyZXF1ZXN0Iiwib3V0cHV0IiwicHJlcyIsInJlc3BvbnNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJhcHBseSIsImNhdGNoIiwib25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJvblJvdXRlRXJyb3IiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLHNCOzs7QUFFRixvQ0FBWUMsSUFBWixFQUFrQkMsSUFBbEIsRUFBd0I7QUFBQTs7QUFBQSxpS0FFQ0QsSUFGRCxpQ0FFZ0NFLE9BQU9DLElBQVAsQ0FBWUYsSUFBWixDQUZoQztBQUl2Qjs7Ozs7QUFJTDs7Ozs7SUFHTUcsVTs7Ozs7OztnQ0FFYUMsRyxFQUFLQyxNLEVBQVFDLFEsRUFBVTs7QUFFbEMsZ0JBQUcsQ0FBRUYsSUFBSUcsVUFBVCxFQUNBOztBQUVBLGdCQUFJLE9BQU9ILElBQUlHLFVBQVgsS0FBMEIsUUFBOUIsRUFDSSxpQkFBT0MsVUFBUCxDQUFrQiw4QkFBbEIsRUFBa0RILE9BQU9JLEtBQVAsQ0FBYUMsTUFBL0QsRUFBdUVDLFNBQXZFOztBQUVKUCxnQkFBSUcsVUFBSixDQUFlSyxLQUFmLENBQXFCLEdBQXJCLEVBQ0FDLE9BREEsQ0FDUSxhQUFLOztBQUVULG9CQUFJQyxRQUFRUixTQUFTUyxJQUFULENBQWNDLENBQWQsQ0FBWjtBQUNBLG9CQUFJQyxLQUFKOztBQUVBLG9CQUFJLENBQUNILEtBQUwsRUFDSSxNQUFNLElBQUloQixzQkFBSixDQUEyQmtCLENBQTNCLEVBQThCWCxPQUFPSSxLQUFQLENBQWFDLE1BQWIsQ0FBb0JRLFdBQXBCLENBQWdDQyxPQUFoQyxDQUF3Q1osVUFBdEUsQ0FBTjs7QUFFSixvQkFBSSxPQUFPTyxLQUFQLEtBQWlCLFVBQXJCLEVBQ0ksTUFBTSxJQUFJSCxTQUFKLHNEQUFnRUssQ0FBaEUsUUFBTjs7QUFFSkMsd0JBQVEsSUFBSUgsS0FBSixDQUFVVCxNQUFWLEVBQWtCQSxPQUFPSSxLQUFQLENBQWFDLE1BQS9CLEVBQXVDTCxPQUFPSSxLQUFQLENBQWFDLE1BQWIsQ0FBb0JRLFdBQTNELENBQVI7O0FBRUFiLHVCQUFPZSxTQUFQLENBQWlCQyxJQUFqQixDQUFzQixVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBV0MsSUFBWCxFQUFvQjs7QUFFdEMsd0JBQUlDLE9BQU9wQixPQUFPcUIsT0FBUCxDQUFlQyxPQUFmLENBQXVCTCxHQUF2QixFQUE0QkMsR0FBNUIsRUFBaUNsQixPQUFPdUIsTUFBeEMsQ0FBWDtBQUNBLHdCQUFJQyxPQUFPeEIsT0FBT3FCLE9BQVAsQ0FBZUksUUFBZixDQUF3QlIsR0FBeEIsRUFBNkJDLEdBQTdCLEVBQWtDbEIsT0FBT3VCLE1BQXpDLENBQVg7O0FBRUFHLDRCQUFRQyxPQUFSLENBQWdCZixNQUFNZ0IsS0FBTixDQUFZUixJQUFaLEVBQWtCSSxJQUFsQixFQUF3QkwsSUFBeEIsQ0FBaEIsRUFBK0NVLEtBQS9DLENBQXFEO0FBQUEsK0JBQ2pEN0IsT0FBT0ksS0FBUCxDQUFhQyxNQUFiLENBQW9CUSxXQUFwQixDQUFnQ2lCLG9CQUFoQyxDQUFxREMsWUFBckQsQ0FBa0VDLENBQWxFLEVBQ0laLElBREosRUFDVUksSUFEVixFQUNnQkwsSUFEaEIsQ0FEaUQ7QUFBQSxxQkFBckQ7QUFJSCxpQkFURDtBQVdILGFBekJEO0FBMkJIOzs7Ozs7a0JBR1VyQixVIiwiZmlsZSI6Ik1pZGRsZXdhcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJyb3IgZnJvbSAnZXM2LWVycm9yJztcbmltcG9ydCBwcm9wZXJ0eSBmcm9tICdwcm9wZXJ0eS1zZWVrJztcbmltcG9ydCBUaHJvd3MgZnJvbSAnLi4vLi4vdXRpbC9UaHJvd3MnO1xuXG5jbGFzcyBVbmtub3duTWlkZGxld2FyZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3Iod2FyZSwgbGlzdCkge1xuXG4gICAgICAgIHN1cGVyKGBNaWRkbGV3YXJlICcke3dhcmV9JyB3YXMgbm90IGZvdW5kISBGb3VuZDogJHtPYmplY3Qua2V5cyhsaXN0KX1gKTtcblxuICAgIH1cblxufVxuXG4vKipcbiAqXG4gKi9cbmNsYXNzIE1pZGRsZXdhcmUge1xuXG4gICAgc3RhdGljIHByZXBhcmUoZGVmLCBhY3Rpb24sIHJlc291cmNlKSB7XG5cbiAgICAgICAgaWYoISBkZWYubWlkZGxld2FyZSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGVmLm1pZGRsZXdhcmUgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgVGhyb3dzLmZyb21Nb2R1bGUoJ01pZGRsZXdhcmUgbXVzdCBiZSBhIHN0cmluZyEnLCBhY3Rpb24ucm91dGUubW9kdWxlLCBUeXBlRXJyb3IpO1xuXG4gICAgICAgIGRlZi5taWRkbGV3YXJlLnNwbGl0KCcsJykuXG4gICAgICAgIGZvckVhY2gobSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBNd2FyZSA9IHJlc291cmNlLmZpbmQobSk7XG4gICAgICAgICAgICB2YXIgbXdhcmU7XG5cbiAgICAgICAgICAgIGlmICghTXdhcmUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25NaWRkbGV3YXJlRXJyb3IobSwgYWN0aW9uLnJvdXRlLm1vZHVsZS5hcHBsaWNhdGlvbi5jb250ZXh0Lm1pZGRsZXdhcmUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIE13YXJlICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE1pZGRsZXdhcmUgbXVzdCBiZSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMhIEZvciAnJHttfSdgKTtcblxuICAgICAgICAgICAgbXdhcmUgPSBuZXcgTXdhcmUoYWN0aW9uLCBhY3Rpb24ucm91dGUubW9kdWxlLCBhY3Rpb24ucm91dGUubW9kdWxlLmFwcGxpY2F0aW9uKTtcblxuICAgICAgICAgICAgYWN0aW9uLmNhbGxiYWNrcy5wdXNoKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgdmFyIHByZXEgPSBhY3Rpb24uZmFjdG9yeS5yZXF1ZXN0KHJlcSwgcmVzLCBhY3Rpb24ub3V0cHV0KTtcbiAgICAgICAgICAgICAgICB2YXIgcHJlcyA9IGFjdGlvbi5mYWN0b3J5LnJlc3BvbnNlKHJlcSwgcmVzLCBhY3Rpb24ub3V0cHV0KTtcblxuICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShtd2FyZS5hcHBseShwcmVxLCBwcmVzLCBuZXh0KSkuY2F0Y2goZSA9PlxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ucm91dGUubW9kdWxlLmFwcGxpY2F0aW9uLm9uUm91dGVFcnJvckxpc3RlbmVyLm9uUm91dGVFcnJvcihlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlcSwgcHJlcywgbmV4dCkpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWlkZGxld2FyZVxuIl19