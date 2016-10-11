'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ParserFilter = require('./ParserFilter');

var _ParserFilter2 = _interopRequireDefault(_ParserFilter);

var _AuthorizationFilter = require('./AuthorizationFilter');

var _AuthorizationFilter2 = _interopRequireDefault(_AuthorizationFilter);

var _AuditFilter = require('./AuditFilter');

var _AuditFilter2 = _interopRequireDefault(_AuditFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * DefaultFilters installs the default filters we
 * use for restify. It can be used as a shortcut in composing filter rules.
 */
var DefaultFilters = function () {
    function DefaultFilters() {
        _classCallCheck(this, DefaultFilters);
    }

    _createClass(DefaultFilters, [{
        key: 'apply',
        value: function apply(app, config) {

            _ParserFilter2.default.apply(app, config);
            _AuditFilter2.default.apply(app, config);
        }
    }]);

    return DefaultFilters;
}();

exports.default = new DefaultFilters();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9EZWZhdWx0RmlsdGVycy5qcyJdLCJuYW1lcyI6WyJEZWZhdWx0RmlsdGVycyIsImFwcCIsImNvbmZpZyIsImFwcGx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7OztJQUlNQSxjOzs7Ozs7OzhCQUVJQyxHLEVBQUtDLE0sRUFBUTs7QUFFZixtQ0FBYUMsS0FBYixDQUFtQkYsR0FBbkIsRUFBd0JDLE1BQXhCO0FBQ0Esa0NBQVlDLEtBQVosQ0FBa0JGLEdBQWxCLEVBQXVCQyxNQUF2QjtBQUVIOzs7Ozs7a0JBSVUsSUFBSUYsY0FBSixFIiwiZmlsZSI6IkRlZmF1bHRGaWx0ZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnNlckZpbHRlciBmcm9tICcuL1BhcnNlckZpbHRlcic7XG5pbXBvcnQgQXV0aG9yaXphdGlvbkZpbHRlciBmcm9tICcuL0F1dGhvcml6YXRpb25GaWx0ZXInO1xuaW1wb3J0IEF1ZGl0RmlsdGVyIGZyb20gJy4vQXVkaXRGaWx0ZXInO1xuXG4vKipcbiAqIERlZmF1bHRGaWx0ZXJzIGluc3RhbGxzIHRoZSBkZWZhdWx0IGZpbHRlcnMgd2VcbiAqIHVzZSBmb3IgcmVzdGlmeS4gSXQgY2FuIGJlIHVzZWQgYXMgYSBzaG9ydGN1dCBpbiBjb21wb3NpbmcgZmlsdGVyIHJ1bGVzLlxuICovXG5jbGFzcyBEZWZhdWx0RmlsdGVycyB7XG5cbiAgICBhcHBseShhcHAsIGNvbmZpZykge1xuXG4gICAgICAgIFBhcnNlckZpbHRlci5hcHBseShhcHAsIGNvbmZpZyk7XG4gICAgICAgIEF1ZGl0RmlsdGVyLmFwcGx5KGFwcCwgY29uZmlnKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgRGVmYXVsdEZpbHRlcnMoKTtcbiJdfQ==