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

var _util = require('../util');

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
        key: 'unauthorized',
        value: function unauthorized(body) {

            this.send(401, body);
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
         * redirect
         * @param {string} url
         * @param {number} [status=302]
         */

    }, {
        key: 'redirect',
        value: function redirect() {
            var _response;

            (_response = this.response).redirect.apply(_response, arguments);
        }

        /**
         * render a view using the installed view engine.
         * @param {string} view
         * @param {object} [context...]
         * @return {Promise}
         */

    }, {
        key: 'render',
        value: function render(view) {
            var _this = this;

            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


            (0, _beof2.default)({ view: view }).string();
            (0, _beof2.default)({ context: context }).optional().object();

            var args = [];

            for (var i = 1; i < arguments.length; ++i) {
                args[i] = arguments[i];
            }if (this.response.locals) args.push(this.response.locals);
            context = _util.merge.apply(null, args);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvUmVzcG9uc2UuanMiXSwibmFtZXMiOlsiUmVzcG9uc2UiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJtb2R1bGUiLCJmaWx0ZXIiLCJvYmplY3QiLCJpbnN0YW5jZSIsInN0YXR1cyIsImFwcGx5IiwiYXJndW1lbnRzIiwiYm9keSIsInNlbmQiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGFjayIsInJlZGlyZWN0IiwidmlldyIsImNvbnRleHQiLCJzdHJpbmciLCJvcHRpb25hbCIsImFyZ3MiLCJpIiwibGVuZ3RoIiwibG9jYWxzIiwicHVzaCIsInZpZXdFbmdpbmUiLCJSZWZlcmVuY2VFcnJvciIsInJlc29sdmUiLCJyZW5kZXIiLCJ0aGVuIiwib2siLCJyZXN1bHQiLCJjYXRjaCIsImFwcGxpY2F0aW9uIiwib25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJvblJvdXRlRXJyb3IiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7SUFHTUEsUTtBQUVGLHNCQUFZQyxPQUFaLEVBQXFCQyxRQUFyQixFQUErQkMsTUFBL0IsRUFBa0U7QUFBQSxZQUEzQkMsTUFBMkIsdUVBQWxCLDBCQUFrQjs7QUFBQTs7QUFFOUQsNEJBQUssRUFBRUgsZ0JBQUYsRUFBTCxFQUFrQkksTUFBbEI7QUFDQSw0QkFBSyxFQUFFSCxrQkFBRixFQUFMLEVBQW1CRyxNQUFuQjtBQUNBLDRCQUFLLEVBQUVGLGNBQUYsRUFBTCxFQUFpQkcsUUFBakI7O0FBRUEsYUFBS0wsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFFSDs7OztpQ0FFUTs7QUFFTCxpQkFBS0YsUUFBTCxDQUFjSyxNQUFkLENBQXFCQyxLQUFyQixDQUEyQixLQUFLTixRQUFoQyxFQUEwQ08sU0FBMUM7QUFFSDs7OzJCQUVFQyxJLEVBQU07O0FBRUwsaUJBQUtDLElBQUwsQ0FBVSxHQUFWLEVBQWVELElBQWY7QUFFSDs7O21DQUVVOztBQUVQLGlCQUFLQyxJQUFMLENBQVUsR0FBVjtBQUVIOzs7b0NBRVc7O0FBRVIsaUJBQUtBLElBQUwsQ0FBVSxHQUFWO0FBRUg7OztnQ0FFT0QsSSxFQUFNOztBQUVWLGlCQUFLQyxJQUFMLENBQVUsR0FBVixFQUFlRCxJQUFmO0FBRUg7OzttQ0FFVUEsSSxFQUFNOztBQUViLGlCQUFLQyxJQUFMLENBQVUsR0FBVixFQUFlRCxJQUFmO0FBRUg7OztxQ0FFWUEsSSxFQUFNOztBQUVmLGlCQUFLQyxJQUFMLENBQVUsR0FBVixFQUFlRCxJQUFmO0FBRUg7OztrQ0FFU0EsSSxFQUFNOztBQUVaLGlCQUFLQyxJQUFMLENBQVUsR0FBVixFQUFlRCxJQUFmO0FBRUg7OztpQ0FFUUEsSSxFQUFNOztBQUVYLGlCQUFLQyxJQUFMLENBQVUsR0FBVixFQUFlRCxJQUFmO0FBRUg7OztpQ0FFUUEsSSxFQUFNOztBQUVYLGlCQUFLQyxJQUFMLENBQVUsR0FBVixFQUFlRCxJQUFmO0FBRUg7Ozs4QkFFS0UsRyxFQUFLOztBQUVQLGlCQUFLRCxJQUFMLENBQVUsR0FBVjtBQUNBRSxvQkFBUUMsS0FBUixDQUFjRixJQUFJRyxLQUFKLEdBQVlILElBQUlHLEtBQWhCLEdBQXdCSCxHQUF0QztBQUVIOztBQUVEOzs7Ozs7OzttQ0FLVztBQUFBOztBQUVQLDhCQUFLVixRQUFMLEVBQWNjLFFBQWQsa0JBQTBCUCxTQUExQjtBQUVIOztBQUVEOzs7Ozs7Ozs7K0JBTU9RLEksRUFBb0I7QUFBQTs7QUFBQSxnQkFBZEMsT0FBYyx1RUFBSixFQUFJOzs7QUFFdkIsZ0NBQUssRUFBRUQsVUFBRixFQUFMLEVBQWVFLE1BQWY7QUFDQSxnQ0FBSyxFQUFFRCxnQkFBRixFQUFMLEVBQWtCRSxRQUFsQixHQUE2QmYsTUFBN0I7O0FBRUEsZ0JBQUlnQixPQUFPLEVBQVg7O0FBRUEsaUJBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJYixVQUFVYyxNQUE5QixFQUFzQyxFQUFFRCxDQUF4QztBQUNJRCxxQkFBS0MsQ0FBTCxJQUFVYixVQUFVYSxDQUFWLENBQVY7QUFESixhQUdBLElBQUksS0FBS3BCLFFBQUwsQ0FBY3NCLE1BQWxCLEVBQ0lILEtBQUtJLElBQUwsQ0FBVSxLQUFLdkIsUUFBTCxDQUFjc0IsTUFBeEI7QUFDSk4sc0JBQVUsWUFBTVYsS0FBTixDQUFZLElBQVosRUFBa0JhLElBQWxCLENBQVY7O0FBRUEsZ0JBQUksQ0FBQyxLQUFLbEIsTUFBTCxDQUFZdUIsVUFBakIsRUFDSSxPQUFPLEtBQUtaLEtBQUwsQ0FBVyxJQUFJYSxjQUFKLENBQW1CLDJCQUFuQixDQUFYLENBQVA7O0FBRUosbUJBQU8sbUJBQVFDLE9BQVIsQ0FBZ0IsS0FBS3pCLE1BQUwsQ0FBWXVCLFVBQVosQ0FBdUJHLE1BQXZCLENBQThCWixJQUE5QixFQUFvQ0MsT0FBcEMsQ0FBaEIsRUFDUFksSUFETyxDQUNGO0FBQUEsdUJBQVUsTUFBS0MsRUFBTCxDQUFRQyxNQUFSLENBQVY7QUFBQSxhQURFLEVBRVBDLEtBRk8sQ0FFRDtBQUFBLHVCQUNGLE1BQUs5QixNQUFMLENBQVkrQixXQUFaLENBQXdCQyxvQkFBeEIsQ0FBNkNDLFlBQTdDLENBQTBEQyxDQUExRCxFQUE2RCxNQUFLcEMsT0FBbEUsUUFERTtBQUFBLGFBRkMsQ0FBUDtBQUtIOzs7Ozs7a0JBSVVELFEiLCJmaWxlIjoiUmVzcG9uc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBMYW1lRmlsdGVyIGZyb20gJy4vZmlsdGVycy9MYW1lRmlsdGVyJztcbmltcG9ydCBNb2R1bGUgZnJvbSAnLi9Nb2R1bGUnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICcuLi91dGlsJztcblxuLyoqXG4gKiBSZXNwb25zZSBwcm92aWRlcyBoZWxwZXIgbWV0aG9kcyBmb3IgaHR0cCByZXNwb25zZXMuXG4gKi9cbmNsYXNzIFJlc3BvbnNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3QsIHJlc3BvbnNlLCBtb2R1bGUsIGZpbHRlciA9IG5ldyBMYW1lRmlsdGVyKCkpIHtcblxuICAgICAgICBiZW9mKHsgcmVxdWVzdCB9KS5vYmplY3QoKTtcbiAgICAgICAgYmVvZih7IHJlc3BvbnNlIH0pLm9iamVjdCgpO1xuICAgICAgICBiZW9mKHsgbW9kdWxlIH0pLmluc3RhbmNlKE1vZHVsZSk7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICB0aGlzLm1vZHVsZSA9IG1vZHVsZTtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSBmaWx0ZXI7XG5cbiAgICB9XG5cbiAgICBzdGF0dXMoKSB7XG5cbiAgICAgICAgdGhpcy5yZXNwb25zZS5zdGF0dXMuYXBwbHkodGhpcy5yZXNwb25zZSwgYXJndW1lbnRzKTtcblxuICAgIH1cblxuICAgIG9rKGJvZHkpIHtcblxuICAgICAgICB0aGlzLnNlbmQoMjAwLCBib2R5KTtcblxuICAgIH1cblxuICAgIGFjY2VwdGVkKCkge1xuXG4gICAgICAgIHRoaXMuc2VuZCgyMDIpO1xuXG4gICAgfVxuXG4gICAgbm9Db250ZW50KCkge1xuXG4gICAgICAgIHRoaXMuc2VuZCgyMDQpO1xuXG4gICAgfVxuXG4gICAgY3JlYXRlZChib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDIwMSwgYm9keSk7XG5cbiAgICB9XG5cbiAgICBiYWRSZXF1ZXN0KGJvZHkpIHtcblxuICAgICAgICB0aGlzLnNlbmQoNDAwLCBib2R5KTtcblxuICAgIH1cblxuICAgIHVuYXV0aG9yaXplZChib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDQwMSwgYm9keSk7XG5cbiAgICB9XG5cbiAgICBmb3JiaWRkZW4oYm9keSkge1xuXG4gICAgICAgIHRoaXMuc2VuZCg0MDMsIGJvZHkpO1xuXG4gICAgfVxuXG4gICAgbm90Rm91bmQoYm9keSkge1xuXG4gICAgICAgIHRoaXMuc2VuZCg0MDQsIGJvZHkpO1xuXG4gICAgfVxuXG4gICAgY29uZmxpY3QoYm9keSkge1xuXG4gICAgICAgIHRoaXMuc2VuZCg0MDksIGJvZHkpO1xuXG4gICAgfVxuXG4gICAgZXJyb3IoZXJyKSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDUwMCk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrID8gZXJyLnN0YWNrIDogZXJyKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlZGlyZWN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhdHVzPTMwMl1cbiAgICAgKi9cbiAgICByZWRpcmVjdCgpIHtcblxuICAgICAgICB0aGlzLnJlc3BvbnNlLnJlZGlyZWN0KC4uLmFyZ3VtZW50cyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgYSB2aWV3IHVzaW5nIHRoZSBpbnN0YWxsZWQgdmlldyBlbmdpbmUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZpZXdcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW2NvbnRleHQuLi5dXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICByZW5kZXIodmlldywgY29udGV4dCA9IHt9KSB7XG5cbiAgICAgICAgYmVvZih7IHZpZXcgfSkuc3RyaW5nKCk7XG4gICAgICAgIGJlb2YoeyBjb250ZXh0IH0pLm9wdGlvbmFsKCkub2JqZWN0KCk7XG5cbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG5cbiAgICAgICAgaWYgKHRoaXMucmVzcG9uc2UubG9jYWxzKVxuICAgICAgICAgICAgYXJncy5wdXNoKHRoaXMucmVzcG9uc2UubG9jYWxzKTtcbiAgICAgICAgY29udGV4dCA9IG1lcmdlLmFwcGx5KG51bGwsIGFyZ3MpO1xuXG4gICAgICAgIGlmICghdGhpcy5tb2R1bGUudmlld0VuZ2luZSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVycm9yKG5ldyBSZWZlcmVuY2VFcnJvcignTm8gdmlldyBlbmdpbmUgaW5zdGFsbGVkIScpKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMubW9kdWxlLnZpZXdFbmdpbmUucmVuZGVyKHZpZXcsIGNvbnRleHQpKS5cbiAgICAgICAgdGhlbihyZXN1bHQgPT4gdGhpcy5vayhyZXN1bHQpKS5cbiAgICAgICAgY2F0Y2goZSA9PlxuICAgICAgICAgICAgdGhpcy5tb2R1bGUuYXBwbGljYXRpb24ub25Sb3V0ZUVycm9yTGlzdGVuZXIub25Sb3V0ZUVycm9yKGUsIHRoaXMucmVxdWVzdCwgdGhpcykpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlc3BvbnNlO1xuIl19