'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _LameFilter = require('./filters/LameFilter');

var _LameFilter2 = _interopRequireDefault(_LameFilter);

var _Module = require('./Module');

var _Module2 = _interopRequireDefault(_Module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Response provides helper methods for http responses.
 */
var Response = function () {
    function Response(request, response, module) {
        var filter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new _LameFilter2.default();

        _classCallCheck(this, Response);

        (0, _beof2.default)({ request: request }).object();
        (0, _beof2.default)({ response: response }).object();
        (0, _beof2.default)({ module: module }).instance(_Module2.default);

        this.request = request;
        this.response = response;
        this.module = module;
        this.filter = filter;
    }

    _createClass(Response, [{
        key: 'status',
        value: function status() {

            this.response.status.apply(this.response, arguments);
        }
    }, {
        key: 'ok',
        value: function ok(body) {

            this.send(200, body);
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

        /**
         * render a view using the installed view engine.
         * @param {string} view
         * @param {object} context
         * @return {Promise}
         */

    }, {
        key: 'render',
        value: function render(view, context) {
            var _this = this;

            (0, _beof2.default)({ view: view }).string();
            (0, _beof2.default)({ context: context }).optional().object();

            if (!this.module.viewEngine) return this.error(new ReferenceError('No view engine installed!'));

            return _bluebird2.default.resolve(this.module.viewEngine.render(view, context)).then(function (result) {
                return _this.ok(result);
            }).catch(function (e) {
                return _this.module.application.onRouteErrorListener.onRouteError(e, _this.request, _this);
            });
        }
    }]);

    return Response;
}();

exports.default = Response;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvUmVzcG9uc2UuanMiXSwibmFtZXMiOlsiUmVzcG9uc2UiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJtb2R1bGUiLCJmaWx0ZXIiLCJvYmplY3QiLCJpbnN0YW5jZSIsInN0YXR1cyIsImFwcGx5IiwiYXJndW1lbnRzIiwiYm9keSIsInNlbmQiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGFjayIsInZpZXciLCJjb250ZXh0Iiwic3RyaW5nIiwib3B0aW9uYWwiLCJ2aWV3RW5naW5lIiwiUmVmZXJlbmNlRXJyb3IiLCJyZXNvbHZlIiwicmVuZGVyIiwidGhlbiIsIm9rIiwicmVzdWx0IiwiY2F0Y2giLCJhcHBsaWNhdGlvbiIsIm9uUm91dGVFcnJvckxpc3RlbmVyIiwib25Sb3V0ZUVycm9yIiwiZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7O0lBR01BLFE7QUFFRixzQkFBWUMsT0FBWixFQUFxQkMsUUFBckIsRUFBK0JDLE1BQS9CLEVBQWtFO0FBQUEsWUFBM0JDLE1BQTJCLHVFQUFsQiwwQkFBa0I7O0FBQUE7O0FBRTlELDRCQUFLLEVBQUVILGdCQUFGLEVBQUwsRUFBa0JJLE1BQWxCO0FBQ0EsNEJBQUssRUFBRUgsa0JBQUYsRUFBTCxFQUFtQkcsTUFBbkI7QUFDQSw0QkFBSyxFQUFFRixjQUFGLEVBQUwsRUFBaUJHLFFBQWpCOztBQUVBLGFBQUtMLE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsYUFBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsYUFBS0MsTUFBTCxHQUFjQSxNQUFkO0FBRUg7Ozs7aUNBRVE7O0FBRUwsaUJBQUtGLFFBQUwsQ0FBY0ssTUFBZCxDQUFxQkMsS0FBckIsQ0FBMkIsS0FBS04sUUFBaEMsRUFBMENPLFNBQTFDO0FBRUg7OzsyQkFFRUMsSSxFQUFNOztBQUVMLGlCQUFLQyxJQUFMLENBQVUsR0FBVixFQUFlRCxJQUFmO0FBRUg7OzttQ0FFVTs7QUFFUCxpQkFBS0MsSUFBTCxDQUFVLEdBQVY7QUFFSDs7O29DQUVXOztBQUVSLGlCQUFLQSxJQUFMLENBQVUsR0FBVjtBQUVIOzs7Z0NBRU9ELEksRUFBTTs7QUFFVixpQkFBS0MsSUFBTCxDQUFVLEdBQVYsRUFBZUQsSUFBZjtBQUVIOzs7bUNBRVVBLEksRUFBTTs7QUFFYixpQkFBS0MsSUFBTCxDQUFVLEdBQVYsRUFBZUQsSUFBZjtBQUVIOzs7a0NBRVNBLEksRUFBTTs7QUFFWixpQkFBS0MsSUFBTCxDQUFVLEdBQVYsRUFBZUQsSUFBZjtBQUVIOzs7aUNBRVFBLEksRUFBTTs7QUFFWCxpQkFBS0MsSUFBTCxDQUFVLEdBQVYsRUFBZUQsSUFBZjtBQUVIOzs7aUNBRVFBLEksRUFBTTs7QUFFWCxpQkFBS0MsSUFBTCxDQUFVLEdBQVYsRUFBZUQsSUFBZjtBQUVIOzs7OEJBRUtFLEcsRUFBSzs7QUFFUCxpQkFBS0QsSUFBTCxDQUFVLEdBQVY7QUFDQUUsb0JBQVFDLEtBQVIsQ0FBY0YsSUFBSUcsS0FBSixHQUFZSCxJQUFJRyxLQUFoQixHQUF3QkgsR0FBdEM7QUFFSDs7QUFFRDs7Ozs7Ozs7OytCQU1PSSxJLEVBQU1DLE8sRUFBUztBQUFBOztBQUVsQixnQ0FBSyxFQUFFRCxVQUFGLEVBQUwsRUFBZUUsTUFBZjtBQUNBLGdDQUFLLEVBQUVELGdCQUFGLEVBQUwsRUFBa0JFLFFBQWxCLEdBQTZCZCxNQUE3Qjs7QUFFQSxnQkFBSSxDQUFDLEtBQUtGLE1BQUwsQ0FBWWlCLFVBQWpCLEVBQ0ksT0FBTyxLQUFLTixLQUFMLENBQVcsSUFBSU8sY0FBSixDQUFtQiwyQkFBbkIsQ0FBWCxDQUFQOztBQUVKLG1CQUFPLG1CQUFRQyxPQUFSLENBQWdCLEtBQUtuQixNQUFMLENBQVlpQixVQUFaLENBQXVCRyxNQUF2QixDQUE4QlAsSUFBOUIsRUFBb0NDLE9BQXBDLENBQWhCLEVBQ1BPLElBRE8sQ0FDRjtBQUFBLHVCQUFVLE1BQUtDLEVBQUwsQ0FBUUMsTUFBUixDQUFWO0FBQUEsYUFERSxFQUVQQyxLQUZPLENBRUQ7QUFBQSx1QkFDRixNQUFLeEIsTUFBTCxDQUFZeUIsV0FBWixDQUF3QkMsb0JBQXhCLENBQTZDQyxZQUE3QyxDQUEwREMsQ0FBMUQsRUFBNkQsTUFBSzlCLE9BQWxFLFFBREU7QUFBQSxhQUZDLENBQVA7QUFLSDs7Ozs7O2tCQUlVRCxRIiwiZmlsZSI6IlJlc3BvbnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJlb2YgZnJvbSAnYmVvZic7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgTGFtZUZpbHRlciBmcm9tICcuL2ZpbHRlcnMvTGFtZUZpbHRlcic7XG5pbXBvcnQgTW9kdWxlIGZyb20gJy4vTW9kdWxlJztcblxuLyoqXG4gKiBSZXNwb25zZSBwcm92aWRlcyBoZWxwZXIgbWV0aG9kcyBmb3IgaHR0cCByZXNwb25zZXMuXG4gKi9cbmNsYXNzIFJlc3BvbnNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3QsIHJlc3BvbnNlLCBtb2R1bGUsIGZpbHRlciA9IG5ldyBMYW1lRmlsdGVyKCkpIHtcblxuICAgICAgICBiZW9mKHsgcmVxdWVzdCB9KS5vYmplY3QoKTtcbiAgICAgICAgYmVvZih7IHJlc3BvbnNlIH0pLm9iamVjdCgpO1xuICAgICAgICBiZW9mKHsgbW9kdWxlIH0pLmluc3RhbmNlKE1vZHVsZSk7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICB0aGlzLm1vZHVsZSA9IG1vZHVsZTtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSBmaWx0ZXI7XG5cbiAgICB9XG5cbiAgICBzdGF0dXMoKSB7XG5cbiAgICAgICAgdGhpcy5yZXNwb25zZS5zdGF0dXMuYXBwbHkodGhpcy5yZXNwb25zZSwgYXJndW1lbnRzKTtcblxuICAgIH1cblxuICAgIG9rKGJvZHkpIHtcblxuICAgICAgICB0aGlzLnNlbmQoMjAwLCBib2R5KTtcblxuICAgIH1cblxuICAgIGFjY2VwdGVkKCkge1xuXG4gICAgICAgIHRoaXMuc2VuZCgyMDIpO1xuXG4gICAgfVxuXG4gICAgbm9Db250ZW50KCkge1xuXG4gICAgICAgIHRoaXMuc2VuZCgyMDQpO1xuXG4gICAgfVxuXG4gICAgY3JlYXRlZChib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDIwMSwgYm9keSk7XG5cbiAgICB9XG5cbiAgICBiYWRSZXF1ZXN0KGJvZHkpIHtcblxuICAgICAgICB0aGlzLnNlbmQoNDAwLCBib2R5KTtcblxuICAgIH1cblxuICAgIGZvcmJpZGRlbihib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDQwMywgYm9keSk7XG5cbiAgICB9XG5cbiAgICBub3RGb3VuZChib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDQwNCwgYm9keSk7XG5cbiAgICB9XG5cbiAgICBjb25mbGljdChib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDQwOSwgYm9keSk7XG5cbiAgICB9XG5cbiAgICBlcnJvcihlcnIpIHtcblxuICAgICAgICB0aGlzLnNlbmQoNTAwKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2sgPyBlcnIuc3RhY2sgOiBlcnIpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIGEgdmlldyB1c2luZyB0aGUgaW5zdGFsbGVkIHZpZXcgZW5naW5lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHJlbmRlcih2aWV3LCBjb250ZXh0KSB7XG5cbiAgICAgICAgYmVvZih7IHZpZXcgfSkuc3RyaW5nKCk7XG4gICAgICAgIGJlb2YoeyBjb250ZXh0IH0pLm9wdGlvbmFsKCkub2JqZWN0KCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLm1vZHVsZS52aWV3RW5naW5lKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3IobmV3IFJlZmVyZW5jZUVycm9yKCdObyB2aWV3IGVuZ2luZSBpbnN0YWxsZWQhJykpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5tb2R1bGUudmlld0VuZ2luZS5yZW5kZXIodmlldywgY29udGV4dCkpLlxuICAgICAgICB0aGVuKHJlc3VsdCA9PiB0aGlzLm9rKHJlc3VsdCkpLlxuICAgICAgICBjYXRjaChlID0+XG4gICAgICAgICAgICB0aGlzLm1vZHVsZS5hcHBsaWNhdGlvbi5vblJvdXRlRXJyb3JMaXN0ZW5lci5vblJvdXRlRXJyb3IoZSwgdGhpcy5yZXF1ZXN0LCB0aGlzKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVzcG9uc2U7XG4iXX0=