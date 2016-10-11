'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _AndOutputFilter = require('./AndOutputFilter');

var _AndOutputFilter2 = _interopRequireDefault(_AndOutputFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * OutputFilter provides a method to chain transformations of data being sent to the client
 * in an easy to identify way. Considered much easier to identify and keep track of
 * than a bunch of callback functions.
 * @param {Action} action
 * @param {Route} route
 * @param {Module} module
 */
var OutputFilter = function () {
    function OutputFilter(action, route, module) {
        _classCallCheck(this, OutputFilter);

        this.action = action;
        this.route = route;
        this.module = module;
    }

    /**
     * and chains another OutputFilter to this one.
     * @param {OutputFilter} filter
     * @returns {OutputFilter}
     */


    _createClass(OutputFilter, [{
        key: 'and',
        value: function and(filter) {

            (0, _beof2.default)({ filter: filter }).instance(OutputFilter);
            return new _AndOutputFilter2.default(this, filter);
        }

        /**
         * apply this OutputFilter
         * @param {*} out
         * @param {Request} req
         * @param {Response} res
         * @returns {Promise}
         */

    }, {
        key: 'apply',
        value: function apply(out, req, res) {

            return _bluebird2.default.resolve(out);
        }
    }]);

    return OutputFilter;
}();

exports.default = OutputFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvZmlsdGVycy9PdXRwdXRGaWx0ZXIuanMiXSwibmFtZXMiOlsiT3V0cHV0RmlsdGVyIiwiYWN0aW9uIiwicm91dGUiLCJtb2R1bGUiLCJmaWx0ZXIiLCJpbnN0YW5jZSIsIm91dCIsInJlcSIsInJlcyIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7Ozs7OztJQVFNQSxZO0FBRUYsMEJBQVlDLE1BQVosRUFBb0JDLEtBQXBCLEVBQTJCQyxNQUEzQixFQUFtQztBQUFBOztBQUUvQixhQUFLRixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFFSDs7QUFFRDs7Ozs7Ozs7OzRCQUtJQyxNLEVBQVE7O0FBRVIsZ0NBQUssRUFBRUEsY0FBRixFQUFMLEVBQWlCQyxRQUFqQixDQUEwQkwsWUFBMUI7QUFDQSxtQkFBTyw4QkFBb0IsSUFBcEIsRUFBMEJJLE1BQTFCLENBQVA7QUFFSDs7QUFFRDs7Ozs7Ozs7Ozs4QkFPTUUsRyxFQUFLQyxHLEVBQUtDLEcsRUFBSzs7QUFFakIsbUJBQU8sbUJBQVFDLE9BQVIsQ0FBZ0JILEdBQWhCLENBQVA7QUFFSDs7Ozs7O2tCQUlVTixZIiwiZmlsZSI6Ik91dHB1dEZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEFuZE91dHB1dEZpbHRlciBmcm9tICcuL0FuZE91dHB1dEZpbHRlcic7XG5cbi8qKlxuICogT3V0cHV0RmlsdGVyIHByb3ZpZGVzIGEgbWV0aG9kIHRvIGNoYWluIHRyYW5zZm9ybWF0aW9ucyBvZiBkYXRhIGJlaW5nIHNlbnQgdG8gdGhlIGNsaWVudFxuICogaW4gYW4gZWFzeSB0byBpZGVudGlmeSB3YXkuIENvbnNpZGVyZWQgbXVjaCBlYXNpZXIgdG8gaWRlbnRpZnkgYW5kIGtlZXAgdHJhY2sgb2ZcbiAqIHRoYW4gYSBidW5jaCBvZiBjYWxsYmFjayBmdW5jdGlvbnMuXG4gKiBAcGFyYW0ge0FjdGlvbn0gYWN0aW9uXG4gKiBAcGFyYW0ge1JvdXRlfSByb3V0ZVxuICogQHBhcmFtIHtNb2R1bGV9IG1vZHVsZVxuICovXG5jbGFzcyBPdXRwdXRGaWx0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoYWN0aW9uLCByb3V0ZSwgbW9kdWxlKSB7XG5cbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIHRoaXMucm91dGUgPSByb3V0ZTtcbiAgICAgICAgdGhpcy5tb2R1bGUgPSBtb2R1bGU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhbmQgY2hhaW5zIGFub3RoZXIgT3V0cHV0RmlsdGVyIHRvIHRoaXMgb25lLlxuICAgICAqIEBwYXJhbSB7T3V0cHV0RmlsdGVyfSBmaWx0ZXJcbiAgICAgKiBAcmV0dXJucyB7T3V0cHV0RmlsdGVyfVxuICAgICAqL1xuICAgIGFuZChmaWx0ZXIpIHtcblxuICAgICAgICBiZW9mKHsgZmlsdGVyIH0pLmluc3RhbmNlKE91dHB1dEZpbHRlcik7XG4gICAgICAgIHJldHVybiBuZXcgQW5kT3V0cHV0RmlsdGVyKHRoaXMsIGZpbHRlcik7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhcHBseSB0aGlzIE91dHB1dEZpbHRlclxuICAgICAqIEBwYXJhbSB7Kn0gb3V0XG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSByZXFcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBhcHBseShvdXQsIHJlcSwgcmVzKSB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShvdXQpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE91dHB1dEZpbHRlclxuIl19