'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _Module = require('./Module');

var _Module2 = _interopRequireDefault(_Module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * HttpFactory is a class for creating wrapped versions of request and response
 * passed to controllers and middleware.
 * @param {Module} module
 */
var HttpFactory = function () {
    function HttpFactory(module) {
        _classCallCheck(this, HttpFactory);

        (0, _beof2.default)({ module: module }).instance(_Module2.default);

        this.module = module;
    }

    /**
     * request returns a wrapped version of the Request object
     * @param {http.Request} req
     * @param {http.Response} res
     * @param {OutputFilter} filter
     * @returns {Request}
     */


    _createClass(HttpFactory, [{
        key: 'request',
        value: function request(req, res) {

            return req;
        }

        /**
         * response returns a wrapped version of the Response object
         * @param {http.Request} req
         * @param {http.Response} res
         * @param {OutputFilter} filter
         * @returns {Response}
         */

    }, {
        key: 'response',
        value: function response(req, res) {

            return res;
        }
    }]);

    return HttpFactory;
}();

exports.default = HttpFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvSHR0cEZhY3RvcnkuanMiXSwibmFtZXMiOlsiSHR0cEZhY3RvcnkiLCJtb2R1bGUiLCJpbnN0YW5jZSIsInJlcSIsInJlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7OztJQUtNQSxXO0FBRUYseUJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFFaEIsNEJBQUssRUFBRUEsY0FBRixFQUFMLEVBQWlCQyxRQUFqQjs7QUFFQSxhQUFLRCxNQUFMLEdBQWNBLE1BQWQ7QUFFSDs7QUFFRDs7Ozs7Ozs7Ozs7Z0NBT1FFLEcsRUFBS0MsRyxFQUFLOztBQUVkLG1CQUFPRCxHQUFQO0FBRUg7O0FBRUQ7Ozs7Ozs7Ozs7aUNBT1NBLEcsRUFBS0MsRyxFQUFLOztBQUVmLG1CQUFPQSxHQUFQO0FBRUg7Ozs7OztrQkFJVUosVyIsImZpbGUiOiJIdHRwRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IE1vZHVsZSBmcm9tICcuL01vZHVsZSc7XG5cbi8qKlxuICogSHR0cEZhY3RvcnkgaXMgYSBjbGFzcyBmb3IgY3JlYXRpbmcgd3JhcHBlZCB2ZXJzaW9ucyBvZiByZXF1ZXN0IGFuZCByZXNwb25zZVxuICogcGFzc2VkIHRvIGNvbnRyb2xsZXJzIGFuZCBtaWRkbGV3YXJlLlxuICogQHBhcmFtIHtNb2R1bGV9IG1vZHVsZVxuICovXG5jbGFzcyBIdHRwRmFjdG9yeSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihtb2R1bGUpIHtcblxuICAgICAgICBiZW9mKHsgbW9kdWxlIH0pLmluc3RhbmNlKE1vZHVsZSk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGUgPSBtb2R1bGU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1ZXN0IHJldHVybnMgYSB3cmFwcGVkIHZlcnNpb24gb2YgdGhlIFJlcXVlc3Qgb2JqZWN0XG4gICAgICogQHBhcmFtIHtodHRwLlJlcXVlc3R9IHJlcVxuICAgICAqIEBwYXJhbSB7aHR0cC5SZXNwb25zZX0gcmVzXG4gICAgICogQHBhcmFtIHtPdXRwdXRGaWx0ZXJ9IGZpbHRlclxuICAgICAqIEByZXR1cm5zIHtSZXF1ZXN0fVxuICAgICAqL1xuICAgIHJlcXVlc3QocmVxLCByZXMpIHtcblxuICAgICAgICByZXR1cm4gcmVxO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVzcG9uc2UgcmV0dXJucyBhIHdyYXBwZWQgdmVyc2lvbiBvZiB0aGUgUmVzcG9uc2Ugb2JqZWN0XG4gICAgICogQHBhcmFtIHtodHRwLlJlcXVlc3R9IHJlcVxuICAgICAqIEBwYXJhbSB7aHR0cC5SZXNwb25zZX0gcmVzXG4gICAgICogQHBhcmFtIHtPdXRwdXRGaWx0ZXJ9IGZpbHRlclxuICAgICAqIEByZXR1cm5zIHtSZXNwb25zZX1cbiAgICAgKi9cbiAgICByZXNwb25zZShyZXEsIHJlcykge1xuXG4gICAgICAgIHJldHVybiByZXM7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSHR0cEZhY3RvcnlcbiJdfQ==