'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * AuthorizationFilter
 * @implements {Filter}
 */
var AuthorizationFilter = function () {
    function AuthorizationFilter() {
        _classCallCheck(this, AuthorizationFilter);
    }

    _createClass(AuthorizationFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            app.use(_restify2.default.authorizationParser(config.read('power.filters.authorization', null)));
        }
    }]);

    return AuthorizationFilter;
}();

exports.default = new AuthorizationFilter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9BdXRob3JpemF0aW9uRmlsdGVyLmpzIl0sIm5hbWVzIjpbIkF1dGhvcml6YXRpb25GaWx0ZXIiLCJhcHAiLCJjb25maWciLCJ1c2UiLCJhdXRob3JpemF0aW9uUGFyc2VyIiwicmVhZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTs7OztJQUlNQSxtQjs7Ozs7Ozs4QkFFSUMsRyxFQUFLQyxNLEVBQVE7O0FBRWZELGdCQUFJRSxHQUFKLENBQVEsa0JBQVFDLG1CQUFSLENBQTRCRixPQUFPRyxJQUFQLENBQVksNkJBQVosRUFBMkMsSUFBM0MsQ0FBNUIsQ0FBUjtBQUVIOzs7Ozs7a0JBSVUsSUFBSUwsbUJBQUosRSIsImZpbGUiOiJBdXRob3JpemF0aW9uRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc3RpZnkgZnJvbSAncmVzdGlmeSc7XG5cbi8qKlxuICogQXV0aG9yaXphdGlvbkZpbHRlclxuICogQGltcGxlbWVudHMge0ZpbHRlcn1cbiAqL1xuY2xhc3MgQXV0aG9yaXphdGlvbkZpbHRlciB7XG5cbiAgICBhcHBseShhcHAsIGNvbmZpZykge1xuXG4gICAgICAgIGFwcC51c2UocmVzdGlmeS5hdXRob3JpemF0aW9uUGFyc2VyKGNvbmZpZy5yZWFkKCdwb3dlci5maWx0ZXJzLmF1dGhvcml6YXRpb24nLCBudWxsKSkpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBBdXRob3JpemF0aW9uRmlsdGVyKClcbiJdfQ==