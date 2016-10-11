'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * AndOutputFilter
 */
var AndOutputFilter = function () {
    function AndOutputFilter(first, next) {
        _classCallCheck(this, AndOutputFilter);

        this._first = first;
        this._next = next;
    }

    _createClass(AndOutputFilter, [{
        key: 'and',
        value: function and(filter) {

            return new AndOutputFilter(this, filter);
        }
    }, {
        key: 'apply',
        value: function apply(out, req, res) {
            var _this = this;

            return _bluebird2.default.resolve(this._first.apply(out, req, res)).then(function (out) {
                return _this._next.apply(out, req, res);
            });
        }
    }]);

    return AndOutputFilter;
}();

exports.default = AndOutputFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvZmlsdGVycy9BbmRPdXRwdXRGaWx0ZXIuanMiXSwibmFtZXMiOlsiQW5kT3V0cHV0RmlsdGVyIiwiZmlyc3QiLCJuZXh0IiwiX2ZpcnN0IiwiX25leHQiLCJmaWx0ZXIiLCJvdXQiLCJyZXEiLCJyZXMiLCJyZXNvbHZlIiwiYXBwbHkiLCJ0aGVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztBQUVBOzs7SUFHTUEsZTtBQUVGLDZCQUFZQyxLQUFaLEVBQW1CQyxJQUFuQixFQUF5QjtBQUFBOztBQUVyQixhQUFLQyxNQUFMLEdBQWNGLEtBQWQ7QUFDQSxhQUFLRyxLQUFMLEdBQWFGLElBQWI7QUFFSDs7Ozs0QkFFR0csTSxFQUFROztBQUVSLG1CQUFPLElBQUlMLGVBQUosQ0FBb0IsSUFBcEIsRUFBMEJLLE1BQTFCLENBQVA7QUFFSDs7OzhCQUVLQyxHLEVBQUtDLEcsRUFBS0MsRyxFQUFLO0FBQUE7O0FBRWpCLG1CQUFPLG1CQUFRQyxPQUFSLENBQWdCLEtBQUtOLE1BQUwsQ0FBWU8sS0FBWixDQUFrQkosR0FBbEIsRUFBdUJDLEdBQXZCLEVBQTRCQyxHQUE1QixDQUFoQixFQUNQRyxJQURPLENBQ0Y7QUFBQSx1QkFBTyxNQUFLUCxLQUFMLENBQVdNLEtBQVgsQ0FBaUJKLEdBQWpCLEVBQXNCQyxHQUF0QixFQUEyQkMsR0FBM0IsQ0FBUDtBQUFBLGFBREUsQ0FBUDtBQUdIOzs7Ozs7a0JBSVVSLGUiLCJmaWxlIjoiQW5kT3V0cHV0RmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG4vKipcbiAqIEFuZE91dHB1dEZpbHRlclxuICovXG5jbGFzcyBBbmRPdXRwdXRGaWx0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoZmlyc3QsIG5leHQpIHtcblxuICAgICAgICB0aGlzLl9maXJzdCA9IGZpcnN0O1xuICAgICAgICB0aGlzLl9uZXh0ID0gbmV4dDtcblxuICAgIH1cblxuICAgIGFuZChmaWx0ZXIpIHtcblxuICAgICAgICByZXR1cm4gbmV3IEFuZE91dHB1dEZpbHRlcih0aGlzLCBmaWx0ZXIpO1xuXG4gICAgfVxuXG4gICAgYXBwbHkob3V0LCByZXEsIHJlcykge1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fZmlyc3QuYXBwbHkob3V0LCByZXEsIHJlcykpLlxuICAgICAgICB0aGVuKG91dCA9PiB0aGlzLl9uZXh0LmFwcGx5KG91dCwgcmVxLCByZXMpKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBbmRPdXRwdXRGaWx0ZXJcbiJdfQ==