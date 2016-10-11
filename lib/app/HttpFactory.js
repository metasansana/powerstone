'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _Context = require('./Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * HttpFactory is a class for creating wrapped versions of request and response
 * passed to controllers and middleware.
 * @param {Context} context
 */
var HttpFactory = function () {
    function HttpFactory(context) {
        _classCallCheck(this, HttpFactory);

        (0, _beof2.default)({ context: context }).instance(_Context2.default);

        this._context = context;
    }

    /**
     * request returns a wrapped version of the Request object
     * @param {http.Request} req
     * @param {Action} action
     * @returns {Request}
     */


    _createClass(HttpFactory, [{
        key: 'request',
        value: function request(req, action) {

            return req;
        }

        /**
         * response returns a wrapped version of the Response object
         * @param {http.Response} res
         * @param {Action} action
         */

    }, {
        key: 'response',
        value: function response(res, action) {

            return res;
        }
    }]);

    return HttpFactory;
}();

exports.default = HttpFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvSHR0cEZhY3RvcnkuanMiXSwibmFtZXMiOlsiSHR0cEZhY3RvcnkiLCJjb250ZXh0IiwiaW5zdGFuY2UiLCJfY29udGV4dCIsInJlcSIsImFjdGlvbiIsInJlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7OztJQUtNQSxXO0FBRUYseUJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFFakIsNEJBQUssRUFBRUEsZ0JBQUYsRUFBTCxFQUFrQkMsUUFBbEI7O0FBRUEsYUFBS0MsUUFBTCxHQUFnQkYsT0FBaEI7QUFFSDs7QUFFRDs7Ozs7Ozs7OztnQ0FNUUcsRyxFQUFLQyxNLEVBQVE7O0FBRWpCLG1CQUFPRCxHQUFQO0FBRUg7O0FBRUQ7Ozs7Ozs7O2lDQUtTRSxHLEVBQUtELE0sRUFBUTs7QUFFbEIsbUJBQU9DLEdBQVA7QUFFSDs7Ozs7O2tCQUlVTixXIiwiZmlsZSI6Ikh0dHBGYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJlb2YgZnJvbSAnYmVvZic7XG5pbXBvcnQgQ29udGV4dCBmcm9tICcuL0NvbnRleHQnO1xuXG4vKipcbiAqIEh0dHBGYWN0b3J5IGlzIGEgY2xhc3MgZm9yIGNyZWF0aW5nIHdyYXBwZWQgdmVyc2lvbnMgb2YgcmVxdWVzdCBhbmQgcmVzcG9uc2VcbiAqIHBhc3NlZCB0byBjb250cm9sbGVycyBhbmQgbWlkZGxld2FyZS5cbiAqIEBwYXJhbSB7Q29udGV4dH0gY29udGV4dFxuICovXG5jbGFzcyBIdHRwRmFjdG9yeSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG5cbiAgICAgICAgYmVvZih7IGNvbnRleHQgfSkuaW5zdGFuY2UoQ29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1ZXN0IHJldHVybnMgYSB3cmFwcGVkIHZlcnNpb24gb2YgdGhlIFJlcXVlc3Qgb2JqZWN0XG4gICAgICogQHBhcmFtIHtodHRwLlJlcXVlc3R9IHJlcVxuICAgICAqIEBwYXJhbSB7QWN0aW9ufSBhY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7UmVxdWVzdH1cbiAgICAgKi9cbiAgICByZXF1ZXN0KHJlcSwgYWN0aW9uKSB7XG5cbiAgICAgICAgcmV0dXJuIHJlcTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlc3BvbnNlIHJldHVybnMgYSB3cmFwcGVkIHZlcnNpb24gb2YgdGhlIFJlc3BvbnNlIG9iamVjdFxuICAgICAqIEBwYXJhbSB7aHR0cC5SZXNwb25zZX0gcmVzXG4gICAgICogQHBhcmFtIHtBY3Rpb259IGFjdGlvblxuICAgICAqL1xuICAgIHJlc3BvbnNlKHJlcywgYWN0aW9uKSB7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBIdHRwRmFjdG9yeVxuIl19