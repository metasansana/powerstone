'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

/**
 * AuthorizationFilter
 * @implements {Filter}
 */

var AuthorizationFilter = (function () {
    function AuthorizationFilter() {
        _classCallCheck(this, AuthorizationFilter);
    }

    _createClass(AuthorizationFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            app.use(_restify2['default'].authorizationParser(config.read('power.filters.authorization', null)));
        }
    }]);

    return AuthorizationFilter;
})();

exports['default'] = new AuthorizationFilter();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9BdXRob3JpemF0aW9uRmlsdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt1QkFBb0IsU0FBUzs7Ozs7Ozs7O0lBTXZCLG1CQUFtQjthQUFuQixtQkFBbUI7OEJBQW5CLG1CQUFtQjs7O2lCQUFuQixtQkFBbUI7O2VBRWhCLGVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTs7QUFFZixlQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFRLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBRTFGOzs7V0FOQyxtQkFBbUI7OztxQkFVVixJQUFJLG1CQUFtQixFQUFFIiwiZmlsZSI6IkF1dGhvcml6YXRpb25GaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVzdGlmeSBmcm9tICdyZXN0aWZ5JztcblxuLyoqXG4gKiBBdXRob3JpemF0aW9uRmlsdGVyXG4gKiBAaW1wbGVtZW50cyB7RmlsdGVyfVxuICovXG5jbGFzcyBBdXRob3JpemF0aW9uRmlsdGVyIHtcblxuICAgIGFwcGx5KGFwcCwgY29uZmlnKSB7XG5cbiAgICAgICAgYXBwLnVzZShyZXN0aWZ5LmF1dGhvcml6YXRpb25QYXJzZXIoY29uZmlnLnJlYWQoJ3Bvd2VyLmZpbHRlcnMuYXV0aG9yaXphdGlvbicsIG51bGwpKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEF1dGhvcml6YXRpb25GaWx0ZXIoKVxuIl19