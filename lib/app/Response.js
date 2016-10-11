'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _Action = require('./route/Action');

var _Action2 = _interopRequireDefault(_Action);

var _Route = require('./route/Route');

var _Route2 = _interopRequireDefault(_Route);

var _Module = require('./Module');

var _Module2 = _interopRequireDefault(_Module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Response provides helper methods for http responses.
 */
var Response = function () {
    function Response(response, action, route, module) {
        _classCallCheck(this, Response);

        (0, _beof2.default)({ response: response }).object();
        (0, _beof2.default)({ action: action }).instance(_Action2.default);
        (0, _beof2.default)({ route: route }).instance(_Route2.default);
        (0, _beof2.default)({ module: module }).instance(_Module2.default);

        this.response = response;
        this.action = action;
        this.route = route;
        this.module = module;
    }

    _createClass(Response, [{
        key: 'ok',
        value: function ok() {

            this.send(200);
        }
    }, {
        key: 'accepted',
        value: function accepted() {

            this.send(202);
        }
    }, {
        key: 'noContent',
        value: function noContent() {

            this.send(204);
        }
    }, {
        key: 'created',
        value: function created(body) {

            this.send(201, body);
        }
    }, {
        key: 'badRequest',
        value: function badRequest(body) {

            this.send(400, body);
        }
    }, {
        key: 'forbidden',
        value: function forbidden(body) {

            this.send(403, body);
        }
    }, {
        key: 'notFound',
        value: function notFound(body) {

            this.send(404, body);
        }
    }, {
        key: 'conflict',
        value: function conflict(body) {

            this.send(409, body);
        }
    }, {
        key: 'error',
        value: function error(err) {

            this.send(500);
            console.error(err.stack ? err.stack : err);
        }
    }, {
        key: 'render',
        value: function render(view, locals) {

            (0, _beof2.default)({ view: view }).string();
            (0, _beof2.default)({ locals: locals }).optional().object();

            if (!this.module.viewEngine) return this.error(new ReferenceError('No view engine installed!'));

            this.module.viewEngine.render(view, locals, this);
        }
    }]);

    return Response;
}();

exports.default = Response;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvUmVzcG9uc2UuanMiXSwibmFtZXMiOlsiUmVzcG9uc2UiLCJyZXNwb25zZSIsImFjdGlvbiIsInJvdXRlIiwibW9kdWxlIiwib2JqZWN0IiwiaW5zdGFuY2UiLCJzZW5kIiwiYm9keSIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsInN0YWNrIiwidmlldyIsImxvY2FscyIsInN0cmluZyIsIm9wdGlvbmFsIiwidmlld0VuZ2luZSIsIlJlZmVyZW5jZUVycm9yIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7SUFHTUEsUTtBQUVGLHNCQUFZQyxRQUFaLEVBQXNCQyxNQUF0QixFQUE4QkMsS0FBOUIsRUFBcUNDLE1BQXJDLEVBQTZDO0FBQUE7O0FBRXpDLDRCQUFLLEVBQUVILGtCQUFGLEVBQUwsRUFBbUJJLE1BQW5CO0FBQ0EsNEJBQUssRUFBRUgsY0FBRixFQUFMLEVBQWlCSSxRQUFqQjtBQUNBLDRCQUFLLEVBQUVILFlBQUYsRUFBTCxFQUFnQkcsUUFBaEI7QUFDQSw0QkFBSyxFQUFFRixjQUFGLEVBQUwsRUFBaUJFLFFBQWpCOztBQUVBLGFBQUtMLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsYUFBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsYUFBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBS0MsTUFBTCxHQUFjQSxNQUFkO0FBRUg7Ozs7NkJBRUk7O0FBRUQsaUJBQUtHLElBQUwsQ0FBVSxHQUFWO0FBRUg7OzttQ0FFVTs7QUFFUCxpQkFBS0EsSUFBTCxDQUFVLEdBQVY7QUFFSDs7O29DQUVXOztBQUVSLGlCQUFLQSxJQUFMLENBQVUsR0FBVjtBQUVIOzs7Z0NBRU9DLEksRUFBTTs7QUFFVixpQkFBS0QsSUFBTCxDQUFVLEdBQVYsRUFBZUMsSUFBZjtBQUVIOzs7bUNBRVVBLEksRUFBTTs7QUFFYixpQkFBS0QsSUFBTCxDQUFVLEdBQVYsRUFBZUMsSUFBZjtBQUVIOzs7a0NBRVNBLEksRUFBTTs7QUFFWixpQkFBS0QsSUFBTCxDQUFVLEdBQVYsRUFBZUMsSUFBZjtBQUVIOzs7aUNBRVFBLEksRUFBTTs7QUFFWCxpQkFBS0QsSUFBTCxDQUFVLEdBQVYsRUFBZUMsSUFBZjtBQUVIOzs7aUNBRVFBLEksRUFBTTs7QUFFWCxpQkFBS0QsSUFBTCxDQUFVLEdBQVYsRUFBZUMsSUFBZjtBQUVIOzs7OEJBRUtDLEcsRUFBSzs7QUFFUCxpQkFBS0YsSUFBTCxDQUFVLEdBQVY7QUFDQUcsb0JBQVFDLEtBQVIsQ0FBY0YsSUFBSUcsS0FBSixHQUFZSCxJQUFJRyxLQUFoQixHQUF3QkgsR0FBdEM7QUFFSDs7OytCQUVNSSxJLEVBQU1DLE0sRUFBUTs7QUFFakIsZ0NBQUssRUFBRUQsVUFBRixFQUFMLEVBQWVFLE1BQWY7QUFDQSxnQ0FBSyxFQUFFRCxjQUFGLEVBQUwsRUFBaUJFLFFBQWpCLEdBQTRCWCxNQUE1Qjs7QUFFQSxnQkFBSSxDQUFDLEtBQUtELE1BQUwsQ0FBWWEsVUFBakIsRUFDSSxPQUFPLEtBQUtOLEtBQUwsQ0FBVyxJQUFJTyxjQUFKLENBQW1CLDJCQUFuQixDQUFYLENBQVA7O0FBRUosaUJBQUtkLE1BQUwsQ0FBWWEsVUFBWixDQUF1QkUsTUFBdkIsQ0FBOEJOLElBQTlCLEVBQW9DQyxNQUFwQyxFQUE0QyxJQUE1QztBQUVIOzs7Ozs7a0JBSVVkLFEiLCJmaWxlIjoiUmVzcG9uc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCBBY3Rpb24gZnJvbSAnLi9yb3V0ZS9BY3Rpb24nO1xuaW1wb3J0IFJvdXRlIGZyb20gJy4vcm91dGUvUm91dGUnO1xuaW1wb3J0IE1vZHVsZSBmcm9tICcuL01vZHVsZSc7XG5cbi8qKlxuICogUmVzcG9uc2UgcHJvdmlkZXMgaGVscGVyIG1ldGhvZHMgZm9yIGh0dHAgcmVzcG9uc2VzLlxuICovXG5jbGFzcyBSZXNwb25zZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZXNwb25zZSwgYWN0aW9uLCByb3V0ZSwgbW9kdWxlKSB7XG5cbiAgICAgICAgYmVvZih7IHJlc3BvbnNlIH0pLm9iamVjdCgpO1xuICAgICAgICBiZW9mKHsgYWN0aW9uIH0pLmluc3RhbmNlKEFjdGlvbik7XG4gICAgICAgIGJlb2YoeyByb3V0ZSB9KS5pbnN0YW5jZShSb3V0ZSk7XG4gICAgICAgIGJlb2YoeyBtb2R1bGUgfSkuaW5zdGFuY2UoTW9kdWxlKTtcblxuICAgICAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICB0aGlzLnJvdXRlID0gcm91dGU7XG4gICAgICAgIHRoaXMubW9kdWxlID0gbW9kdWxlO1xuXG4gICAgfVxuXG4gICAgb2soKSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDIwMCk7XG5cbiAgICB9XG5cbiAgICBhY2NlcHRlZCgpIHtcblxuICAgICAgICB0aGlzLnNlbmQoMjAyKTtcblxuICAgIH1cblxuICAgIG5vQ29udGVudCgpIHtcblxuICAgICAgICB0aGlzLnNlbmQoMjA0KTtcblxuICAgIH1cblxuICAgIGNyZWF0ZWQoYm9keSkge1xuXG4gICAgICAgIHRoaXMuc2VuZCgyMDEsIGJvZHkpO1xuXG4gICAgfVxuXG4gICAgYmFkUmVxdWVzdChib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDQwMCwgYm9keSk7XG5cbiAgICB9XG5cbiAgICBmb3JiaWRkZW4oYm9keSkge1xuXG4gICAgICAgIHRoaXMuc2VuZCg0MDMsIGJvZHkpO1xuXG4gICAgfVxuXG4gICAgbm90Rm91bmQoYm9keSkge1xuXG4gICAgICAgIHRoaXMuc2VuZCg0MDQsIGJvZHkpO1xuXG4gICAgfVxuXG4gICAgY29uZmxpY3QoYm9keSkge1xuXG4gICAgICAgIHRoaXMuc2VuZCg0MDksIGJvZHkpO1xuXG4gICAgfVxuXG4gICAgZXJyb3IoZXJyKSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDUwMCk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrID8gZXJyLnN0YWNrIDogZXJyKTtcblxuICAgIH1cblxuICAgIHJlbmRlcih2aWV3LCBsb2NhbHMpIHtcblxuICAgICAgICBiZW9mKHsgdmlldyB9KS5zdHJpbmcoKTtcbiAgICAgICAgYmVvZih7IGxvY2FscyB9KS5vcHRpb25hbCgpLm9iamVjdCgpO1xuXG4gICAgICAgIGlmICghdGhpcy5tb2R1bGUudmlld0VuZ2luZSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVycm9yKG5ldyBSZWZlcmVuY2VFcnJvcignTm8gdmlldyBlbmdpbmUgaW5zdGFsbGVkIScpKTtcblxuICAgICAgICB0aGlzLm1vZHVsZS52aWV3RW5naW5lLnJlbmRlcih2aWV3LCBsb2NhbHMsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlc3BvbnNlO1xuIl19