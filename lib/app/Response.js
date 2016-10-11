'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _Action = require('./route/Action');

var _Action2 = _interopRequireDefault(_Action);

var _Module = require('./Module');

var _Module2 = _interopRequireDefault(_Module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Response provides helper methods for http responses.
 */
var Response = function () {
    function Response(request, response, action, module) {
        _classCallCheck(this, Response);

        (0, _beof2.default)({ request: request }).object();
        (0, _beof2.default)({ response: response }).object();
        (0, _beof2.default)({ action: action }).instance(_Action2.default);
        (0, _beof2.default)({ module: module }).instance(_Module2.default);

        this.request = request;
        this.response = response;
        this.action = action;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvUmVzcG9uc2UuanMiXSwibmFtZXMiOlsiUmVzcG9uc2UiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJhY3Rpb24iLCJtb2R1bGUiLCJvYmplY3QiLCJpbnN0YW5jZSIsInNlbmQiLCJib2R5IiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwic3RhY2siLCJ2aWV3IiwibG9jYWxzIiwic3RyaW5nIiwib3B0aW9uYWwiLCJ2aWV3RW5naW5lIiwiUmVmZXJlbmNlRXJyb3IiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7SUFHTUEsUTtBQUVGLHNCQUFZQyxPQUFaLEVBQXFCQyxRQUFyQixFQUErQkMsTUFBL0IsRUFBdUNDLE1BQXZDLEVBQStDO0FBQUE7O0FBRTNDLDRCQUFLLEVBQUVILGdCQUFGLEVBQUwsRUFBa0JJLE1BQWxCO0FBQ0EsNEJBQUssRUFBRUgsa0JBQUYsRUFBTCxFQUFtQkcsTUFBbkI7QUFDQSw0QkFBSyxFQUFFRixjQUFGLEVBQUwsRUFBaUJHLFFBQWpCO0FBQ0EsNEJBQUssRUFBRUYsY0FBRixFQUFMLEVBQWlCRSxRQUFqQjs7QUFFQSxhQUFLTCxPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGFBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUVIOzs7OzZCQUVJOztBQUVELGlCQUFLRyxJQUFMLENBQVUsR0FBVjtBQUVIOzs7bUNBRVU7O0FBRVAsaUJBQUtBLElBQUwsQ0FBVSxHQUFWO0FBRUg7OztvQ0FFVzs7QUFFUixpQkFBS0EsSUFBTCxDQUFVLEdBQVY7QUFFSDs7O2dDQUVPQyxJLEVBQU07O0FBRVYsaUJBQUtELElBQUwsQ0FBVSxHQUFWLEVBQWVDLElBQWY7QUFFSDs7O21DQUVVQSxJLEVBQU07O0FBRWIsaUJBQUtELElBQUwsQ0FBVSxHQUFWLEVBQWVDLElBQWY7QUFFSDs7O2tDQUVTQSxJLEVBQU07O0FBRVosaUJBQUtELElBQUwsQ0FBVSxHQUFWLEVBQWVDLElBQWY7QUFFSDs7O2lDQUVRQSxJLEVBQU07O0FBRVgsaUJBQUtELElBQUwsQ0FBVSxHQUFWLEVBQWVDLElBQWY7QUFFSDs7O2lDQUVRQSxJLEVBQU07O0FBRVgsaUJBQUtELElBQUwsQ0FBVSxHQUFWLEVBQWVDLElBQWY7QUFFSDs7OzhCQUVLQyxHLEVBQUs7O0FBRVAsaUJBQUtGLElBQUwsQ0FBVSxHQUFWO0FBQ0FHLG9CQUFRQyxLQUFSLENBQWNGLElBQUlHLEtBQUosR0FBWUgsSUFBSUcsS0FBaEIsR0FBd0JILEdBQXRDO0FBRUg7OzsrQkFFTUksSSxFQUFNQyxNLEVBQVE7O0FBRWpCLGdDQUFLLEVBQUVELFVBQUYsRUFBTCxFQUFlRSxNQUFmO0FBQ0EsZ0NBQUssRUFBRUQsY0FBRixFQUFMLEVBQWlCRSxRQUFqQixHQUE0QlgsTUFBNUI7O0FBRUEsZ0JBQUksQ0FBQyxLQUFLRCxNQUFMLENBQVlhLFVBQWpCLEVBQ0ksT0FBTyxLQUFLTixLQUFMLENBQVcsSUFBSU8sY0FBSixDQUFtQiwyQkFBbkIsQ0FBWCxDQUFQOztBQUVKLGlCQUFLZCxNQUFMLENBQVlhLFVBQVosQ0FBdUJFLE1BQXZCLENBQThCTixJQUE5QixFQUFvQ0MsTUFBcEMsRUFBNEMsSUFBNUM7QUFFSDs7Ozs7O2tCQUlVZCxRIiwiZmlsZSI6IlJlc3BvbnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJlb2YgZnJvbSAnYmVvZic7XG5pbXBvcnQgQWN0aW9uIGZyb20gJy4vcm91dGUvQWN0aW9uJztcbmltcG9ydCBNb2R1bGUgZnJvbSAnLi9Nb2R1bGUnO1xuXG4vKipcbiAqIFJlc3BvbnNlIHByb3ZpZGVzIGhlbHBlciBtZXRob2RzIGZvciBodHRwIHJlc3BvbnNlcy5cbiAqL1xuY2xhc3MgUmVzcG9uc2Uge1xuXG4gICAgY29uc3RydWN0b3IocmVxdWVzdCwgcmVzcG9uc2UsIGFjdGlvbiwgbW9kdWxlKSB7XG5cbiAgICAgICAgYmVvZih7IHJlcXVlc3QgfSkub2JqZWN0KCk7XG4gICAgICAgIGJlb2YoeyByZXNwb25zZSB9KS5vYmplY3QoKTtcbiAgICAgICAgYmVvZih7IGFjdGlvbiB9KS5pbnN0YW5jZShBY3Rpb24pO1xuICAgICAgICBiZW9mKHsgbW9kdWxlIH0pLmluc3RhbmNlKE1vZHVsZSk7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgdGhpcy5tb2R1bGUgPSBtb2R1bGU7XG5cbiAgICB9XG5cbiAgICBvaygpIHtcblxuICAgICAgICB0aGlzLnNlbmQoMjAwKTtcblxuICAgIH1cblxuICAgIGFjY2VwdGVkKCkge1xuXG4gICAgICAgIHRoaXMuc2VuZCgyMDIpO1xuXG4gICAgfVxuXG4gICAgbm9Db250ZW50KCkge1xuXG4gICAgICAgIHRoaXMuc2VuZCgyMDQpO1xuXG4gICAgfVxuXG4gICAgY3JlYXRlZChib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDIwMSwgYm9keSk7XG5cbiAgICB9XG5cbiAgICBiYWRSZXF1ZXN0KGJvZHkpIHtcblxuICAgICAgICB0aGlzLnNlbmQoNDAwLCBib2R5KTtcblxuICAgIH1cblxuICAgIGZvcmJpZGRlbihib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDQwMywgYm9keSk7XG5cbiAgICB9XG5cbiAgICBub3RGb3VuZChib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDQwNCwgYm9keSk7XG5cbiAgICB9XG5cbiAgICBjb25mbGljdChib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDQwOSwgYm9keSk7XG5cbiAgICB9XG5cbiAgICBlcnJvcihlcnIpIHtcblxuICAgICAgICB0aGlzLnNlbmQoNTAwKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2sgPyBlcnIuc3RhY2sgOiBlcnIpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKHZpZXcsIGxvY2Fscykge1xuXG4gICAgICAgIGJlb2YoeyB2aWV3IH0pLnN0cmluZygpO1xuICAgICAgICBiZW9mKHsgbG9jYWxzIH0pLm9wdGlvbmFsKCkub2JqZWN0KCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLm1vZHVsZS52aWV3RW5naW5lKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3IobmV3IFJlZmVyZW5jZUVycm9yKCdObyB2aWV3IGVuZ2luZSBpbnN0YWxsZWQhJykpO1xuXG4gICAgICAgIHRoaXMubW9kdWxlLnZpZXdFbmdpbmUucmVuZGVyKHZpZXcsIGxvY2FscywgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVzcG9uc2U7XG4iXX0=