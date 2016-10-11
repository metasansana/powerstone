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
 * StateManager manages multiple StateChangeListener on behalf
 * of the Application.
 * @param {Application} app 
 * @param {string} state 
 */
var StateManager = function () {
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
            return _bluebird2.default.all([_bluebird2.default.resolve()].concat(this._list.map(function (l) {
                return l.onStateChange(_this._app);
            })));
        }
    }]);

    return StateManager;
}();

exports.default = StateManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vU3RhdGVNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIlN0YXRlTWFuYWdlciIsImFwcCIsInN0YXRlIiwiX2FwcCIsIl9saXN0IiwiX3N0YXRlIiwibCIsInB1c2giLCJhbGwiLCJyZXNvbHZlIiwiY29uY2F0IiwibWFwIiwib25TdGF0ZUNoYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTs7Ozs7O0lBTU1BLFk7QUFFRiwwQkFBWUMsR0FBWixFQUFpQkMsS0FBakIsRUFBd0I7QUFBQTs7QUFFcEIsYUFBS0MsSUFBTCxHQUFZRixHQUFaO0FBQ0EsYUFBS0csS0FBTCxHQUFhLEVBQWI7QUFDQSxhQUFLQyxNQUFMLEdBQWNILEtBQWQ7QUFFSDs7QUFFRDs7Ozs7Ozs7O29DQUtZSSxDLEVBQUc7O0FBRVgsaUJBQUtGLEtBQUwsQ0FBV0csSUFBWCxDQUFnQkQsQ0FBaEI7QUFDQSxtQkFBTyxJQUFQO0FBRUg7O0FBRUQ7Ozs7Ozs7O2lDQUtTSixLLEVBQU87QUFBQTs7QUFFWixpQkFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsbUJBQU8sbUJBQVFNLEdBQVIsQ0FBWSxDQUFDLG1CQUFRQyxPQUFSLEVBQUQsRUFBb0JDLE1BQXBCLENBQTJCLEtBQUtOLEtBQUwsQ0FBV08sR0FBWCxDQUFlO0FBQUEsdUJBQUtMLEVBQUVNLGFBQUYsQ0FBZ0IsTUFBS1QsSUFBckIsQ0FBTDtBQUFBLGFBQWYsQ0FBM0IsQ0FBWixDQUFQO0FBRUg7Ozs7OztrQkFJVUgsWSIsImZpbGUiOiJTdGF0ZU1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbi8qKlxuICogU3RhdGVNYW5hZ2VyIG1hbmFnZXMgbXVsdGlwbGUgU3RhdGVDaGFuZ2VMaXN0ZW5lciBvbiBiZWhhbGZcbiAqIG9mIHRoZSBBcHBsaWNhdGlvbi5cbiAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcCBcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBcbiAqL1xuY2xhc3MgU3RhdGVNYW5hZ2VyIHtcblxuICAgIGNvbnN0cnVjdG9yKGFwcCwgc3RhdGUpIHtcblxuICAgICAgICB0aGlzLl9hcHAgPSBhcHA7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZExpc3RlbmVyIGFkZHMgYW4gU3RhdGVDaGFuZ2VMaXN0ZW5lciB0byB0aGUgaW50ZXJuYWwgbGlzdFxuICAgICAqIEBwYXJhbSB7U3RhdGVDaGFuZ2VMaXN0ZW5lcn0gbCBcbiAgICAgKiBAcmV0dXJucyB7U3RhdGVNYW5hZ2VyfVxuICAgICAqL1xuICAgIGFkZExpc3RlbmVyKGwpIHtcblxuICAgICAgICB0aGlzLl9saXN0LnB1c2gobCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0U3RhdGUgc2V0cyBhbmQgZGlzcGF0Y2hlcyB0aGUgY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBcbiAgICAgKiBAcmV0dXJucyB7U3RhdGVNYW5hZ2VyfVxuICAgICAqL1xuICAgIHNldFN0YXRlKHN0YXRlKSB7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1Byb21pc2UucmVzb2x2ZSgpXS5jb25jYXQodGhpcy5fbGlzdC5tYXAobCA9PiBsLm9uU3RhdGVDaGFuZ2UodGhpcy5fYXBwKSkpKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0ZU1hbmFnZXJcbiJdfQ==