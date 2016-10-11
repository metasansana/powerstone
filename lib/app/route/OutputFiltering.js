'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnknownOutputFilterError = function (_Error) {
    _inherits(UnknownOutputFilterError, _Error);

    function UnknownOutputFilterError(f, list) {
        _classCallCheck(this, UnknownOutputFilterError);

        return _possibleConstructorReturn(this, (UnknownOutputFilterError.__proto__ || Object.getPrototypeOf(UnknownOutputFilterError)).call(this, 'OutputFilter\'' + f + '\' was not found! Found: ' + Object.keys(list)));
    }

    return UnknownOutputFilterError;
}(_es6Error2.default);

/**
 *
 */


var OutputFiltering = function () {
    function OutputFiltering() {
        _classCallCheck(this, OutputFiltering);
    }

    _createClass(OutputFiltering, null, [{
        key: 'prepare',
        value: function prepare(def, action, resource) {

            if (typeof def.out !== 'string') return;

            def.out.split(',').forEach(function (o) {

                var Filter = resource.find(o);
                var filter;

                if (!Filter) throw new UnknownOutputFilteringError(m, action.route.module.application.context.outputFilters);

                if (typeof Filter !== 'function') throw new TypeError('OutputFiltering must be a constructor function! For \'' + m + '\'');

                action.outputs.push(new Filter(action, action.route.module, action.route.module.app));
            });
        }
    }]);

    return OutputFiltering;
}();

exports.default = OutputFiltering;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvT3V0cHV0RmlsdGVyaW5nLmpzIl0sIm5hbWVzIjpbIlVua25vd25PdXRwdXRGaWx0ZXJFcnJvciIsImYiLCJsaXN0IiwiT2JqZWN0Iiwia2V5cyIsIk91dHB1dEZpbHRlcmluZyIsImRlZiIsImFjdGlvbiIsInJlc291cmNlIiwib3V0Iiwic3BsaXQiLCJmb3JFYWNoIiwiRmlsdGVyIiwiZmluZCIsIm8iLCJmaWx0ZXIiLCJVbmtub3duT3V0cHV0RmlsdGVyaW5nRXJyb3IiLCJtIiwicm91dGUiLCJtb2R1bGUiLCJhcHBsaWNhdGlvbiIsImNvbnRleHQiLCJvdXRwdXRGaWx0ZXJzIiwiVHlwZUVycm9yIiwib3V0cHV0cyIsInB1c2giLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLHdCOzs7QUFFRixzQ0FBWUMsQ0FBWixFQUFlQyxJQUFmLEVBQXFCO0FBQUE7O0FBQUEsc0tBRUtELENBRkwsaUNBRWlDRSxPQUFPQyxJQUFQLENBQVlGLElBQVosQ0FGakM7QUFJcEI7Ozs7O0FBSUw7Ozs7O0lBR01HLGU7Ozs7Ozs7Z0NBRWFDLEcsRUFBS0MsTSxFQUFRQyxRLEVBQVU7O0FBRWxDLGdCQUFJLE9BQU9GLElBQUlHLEdBQVgsS0FBbUIsUUFBdkIsRUFBaUM7O0FBRWpDSCxnQkFBSUcsR0FBSixDQUFRQyxLQUFSLENBQWMsR0FBZCxFQUNBQyxPQURBLENBQ1EsYUFBSzs7QUFFVCxvQkFBSUMsU0FBU0osU0FBU0ssSUFBVCxDQUFjQyxDQUFkLENBQWI7QUFDQSxvQkFBSUMsTUFBSjs7QUFFQSxvQkFBSSxDQUFDSCxNQUFMLEVBQ0ksTUFBTSxJQUFJSSwyQkFBSixDQUFnQ0MsQ0FBaEMsRUFDRlYsT0FBT1csS0FBUCxDQUFhQyxNQUFiLENBQW9CQyxXQUFwQixDQUFnQ0MsT0FBaEMsQ0FBd0NDLGFBRHRDLENBQU47O0FBR0osb0JBQUksT0FBT1YsTUFBUCxLQUFrQixVQUF0QixFQUNJLE1BQU0sSUFBSVcsU0FBSiw0REFBc0VOLENBQXRFLFFBQU47O0FBRUpWLHVCQUFPaUIsT0FBUCxDQUFlQyxJQUFmLENBQW9CLElBQUliLE1BQUosQ0FBV0wsTUFBWCxFQUFtQkEsT0FBT1csS0FBUCxDQUFhQyxNQUFoQyxFQUF3Q1osT0FBT1csS0FBUCxDQUFhQyxNQUFiLENBQW9CTyxHQUE1RCxDQUFwQjtBQUVILGFBZkQ7QUFpQkg7Ozs7OztrQkFHVXJCLGUiLCJmaWxlIjoiT3V0cHV0RmlsdGVyaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yIGZyb20gJ2VzNi1lcnJvcic7XG5pbXBvcnQgcHJvcGVydHkgZnJvbSAncHJvcGVydHktc2Vlayc7XG5cbmNsYXNzIFVua25vd25PdXRwdXRGaWx0ZXJFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKGYsIGxpc3QpIHtcblxuICAgICAgICBzdXBlcihgT3V0cHV0RmlsdGVyJyR7Zn0nIHdhcyBub3QgZm91bmQhIEZvdW5kOiAke09iamVjdC5rZXlzKGxpc3QpfWApO1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgT3V0cHV0RmlsdGVyaW5nIHtcblxuICAgIHN0YXRpYyBwcmVwYXJlKGRlZiwgYWN0aW9uLCByZXNvdXJjZSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGVmLm91dCAhPT0gJ3N0cmluZycpIHJldHVybjtcblxuICAgICAgICBkZWYub3V0LnNwbGl0KCcsJykuXG4gICAgICAgIGZvckVhY2gobyA9PiB7XG5cbiAgICAgICAgICAgIHZhciBGaWx0ZXIgPSByZXNvdXJjZS5maW5kKG8pO1xuICAgICAgICAgICAgdmFyIGZpbHRlcjtcblxuICAgICAgICAgICAgaWYgKCFGaWx0ZXIpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25PdXRwdXRGaWx0ZXJpbmdFcnJvcihtLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ucm91dGUubW9kdWxlLmFwcGxpY2F0aW9uLmNvbnRleHQub3V0cHV0RmlsdGVycyk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgRmlsdGVyICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE91dHB1dEZpbHRlcmluZyBtdXN0IGJlIGEgY29uc3RydWN0b3IgZnVuY3Rpb24hIEZvciAnJHttfSdgKTtcblxuICAgICAgICAgICAgYWN0aW9uLm91dHB1dHMucHVzaChuZXcgRmlsdGVyKGFjdGlvbiwgYWN0aW9uLnJvdXRlLm1vZHVsZSwgYWN0aW9uLnJvdXRlLm1vZHVsZS5hcHApKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT3V0cHV0RmlsdGVyaW5nXG4iXX0=