"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Filter
 * @param {Action} action
 * @param {Module} module
 * @param {Application} application
 */
var Filter = function () {
    function Filter(action, module, application) {
        _classCallCheck(this, Filter);

        this.action = action;
        this.module = module;
        this.application = application;
    }

    /**
     * apply this Filter
     * @param {Request} req
     * @param {Response} res
     * @param {function} next
     */


    _createClass(Filter, [{
        key: "apply",
        value: function apply(req, res, next) {

            next();
        }
    }]);

    return Filter;
}();

exports.default = Filter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvZmlsdGVycy9GaWx0ZXIuanMiXSwibmFtZXMiOlsiRmlsdGVyIiwiYWN0aW9uIiwibW9kdWxlIiwiYXBwbGljYXRpb24iLCJyZXEiLCJyZXMiLCJuZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztJQU1NQSxNO0FBRUYsb0JBQVlDLE1BQVosRUFBb0JDLE1BQXBCLEVBQTRCQyxXQUE1QixFQUF5QztBQUFBOztBQUVyQyxhQUFLRixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUVIOztBQUVEOzs7Ozs7Ozs7OzhCQU1NQyxHLEVBQUtDLEcsRUFBS0MsSSxFQUFNOztBQUVsQkE7QUFFSDs7Ozs7O2tCQUlVTixNIiwiZmlsZSI6IkZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRmlsdGVyXG4gKiBAcGFyYW0ge0FjdGlvbn0gYWN0aW9uXG4gKiBAcGFyYW0ge01vZHVsZX0gbW9kdWxlXG4gKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBsaWNhdGlvblxuICovXG5jbGFzcyBGaWx0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoYWN0aW9uLCBtb2R1bGUsIGFwcGxpY2F0aW9uKSB7XG5cbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIHRoaXMubW9kdWxlID0gbW9kdWxlO1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb247XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhcHBseSB0aGlzIEZpbHRlclxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbmV4dFxuICAgICAqL1xuICAgIGFwcGx5KHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgICAgICAgbmV4dCgpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpbHRlclxuIl19