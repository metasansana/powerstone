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
 * GzipFilter 
 * @implements {Filter}
 */
var GzipFilter = function () {
  function GzipFilter() {
    _classCallCheck(this, GzipFilter);
  }

  _createClass(GzipFilter, [{
    key: 'apply',
    value: function apply(app, config) {

      app.use(_restify2.default.gzipResponse());
    }
  }]);

  return GzipFilter;
}();

exports.default = new GzipFilter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9HemlwRmlsdGVyLmpzIl0sIm5hbWVzIjpbIkd6aXBGaWx0ZXIiLCJhcHAiLCJjb25maWciLCJ1c2UiLCJnemlwUmVzcG9uc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7Ozs7SUFJTUEsVTs7Ozs7OzswQkFFRUMsRyxFQUFLQyxNLEVBQVE7O0FBRWpCRCxVQUFJRSxHQUFKLENBQVEsa0JBQVFDLFlBQVIsRUFBUjtBQUVEOzs7Ozs7a0JBSVksSUFBSUosVUFBSixFIiwiZmlsZSI6Ikd6aXBGaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVzdGlmeSBmcm9tICdyZXN0aWZ5JztcblxuLyoqXG4gKiBHemlwRmlsdGVyIFxuICogQGltcGxlbWVudHMge0ZpbHRlcn1cbiAqL1xuY2xhc3MgR3ppcEZpbHRlciB7XG5cbiAgYXBwbHkoYXBwLCBjb25maWcpIHtcblxuICAgIGFwcC51c2UocmVzdGlmeS5nemlwUmVzcG9uc2UoKSk7XG5cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBHemlwRmlsdGVyKClcblxuIl19