'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

/**
 * StateManager manages multiple StateChangeListener on behalf
 * of the Application.
 * @param {Application} app 
 * @param {string} state 
 */

var StateManager = (function () {
    function StateManager(app, state) {
        _classCallCheck(this, StateManager);

        this._app = app;
        this._list = [];
        this._state = state;
    }

    /**
     * addListener adds an StateChangeListener to the internal list
     * @param {StateChangeListener} l 
     * @returns {StateManager}
     */

    _createClass(StateManager, [{
        key: 'addListener',
        value: function addListener(l) {

            this._list.push(l);
            return this;
        }

        /**
         * setState sets and dispatches the change.
         * @param {string} state 
         * @returns {StateManager}
         */
    }, {
        key: 'setState',
        value: function setState(state) {
            var _this = this;

            this.state = state;
            return _bluebird2['default'].all([_bluebird2['default'].resolve()].concat(this._list.map(function (l) {
                return l.onStateChange(_this._app);
            })));
        }
    }]);

    return StateManager;
})();

exports['default'] = StateManager;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vU3RhdGVNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt3QkFBb0IsVUFBVTs7Ozs7Ozs7Ozs7SUFReEIsWUFBWTtBQUVILGFBRlQsWUFBWSxDQUVGLEdBQUcsRUFBRSxLQUFLLEVBQUU7OEJBRnRCLFlBQVk7O0FBSVYsWUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7QUFDaEIsWUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDaEIsWUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7S0FFdkI7Ozs7Ozs7O2lCQVJDLFlBQVk7O2VBZUgscUJBQUMsQ0FBQyxFQUFFOztBQUVYLGdCQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQixtQkFBTyxJQUFJLENBQUM7U0FFZjs7Ozs7Ozs7O2VBT08sa0JBQUMsS0FBSyxFQUFFOzs7QUFFWixnQkFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsbUJBQU8sc0JBQVEsR0FBRyxDQUFDLENBQUMsc0JBQVEsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO3VCQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBSyxJQUFJLENBQUM7YUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBRW5HOzs7V0FoQ0MsWUFBWTs7O3FCQW9DSCxZQUFZIiwiZmlsZSI6IlN0YXRlTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcblxuLyoqXG4gKiBTdGF0ZU1hbmFnZXIgbWFuYWdlcyBtdWx0aXBsZSBTdGF0ZUNoYW5nZUxpc3RlbmVyIG9uIGJlaGFsZlxuICogb2YgdGhlIEFwcGxpY2F0aW9uLlxuICogQHBhcmFtIHtBcHBsaWNhdGlvbn0gYXBwIFxuICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFxuICovXG5jbGFzcyBTdGF0ZU1hbmFnZXIge1xuXG4gICAgY29uc3RydWN0b3IoYXBwLCBzdGF0ZSkge1xuXG4gICAgICAgIHRoaXMuX2FwcCA9IGFwcDtcbiAgICAgICAgdGhpcy5fbGlzdCA9IFtdO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkTGlzdGVuZXIgYWRkcyBhbiBTdGF0ZUNoYW5nZUxpc3RlbmVyIHRvIHRoZSBpbnRlcm5hbCBsaXN0XG4gICAgICogQHBhcmFtIHtTdGF0ZUNoYW5nZUxpc3RlbmVyfSBsIFxuICAgICAqIEByZXR1cm5zIHtTdGF0ZU1hbmFnZXJ9XG4gICAgICovXG4gICAgYWRkTGlzdGVuZXIobCkge1xuXG4gICAgICAgIHRoaXMuX2xpc3QucHVzaChsKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRTdGF0ZSBzZXRzIGFuZCBkaXNwYXRjaGVzIHRoZSBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFxuICAgICAqIEByZXR1cm5zIHtTdGF0ZU1hbmFnZXJ9XG4gICAgICovXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcblxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbUHJvbWlzZS5yZXNvbHZlKCldLmNvbmNhdCh0aGlzLl9saXN0Lm1hcChsID0+IGwub25TdGF0ZUNoYW5nZSh0aGlzLl9hcHApKSkpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRlTWFuYWdlclxuIl19