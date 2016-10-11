"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * StateChangeListener is an interface for objects interested in 
 * reacting to changes in the runtime state of the main application.
 * @interface
 */
var StateChangeListener = function () {
  function StateChangeListener() {
    _classCallCheck(this, StateChangeListener);
  }

  _createClass(StateChangeListener, [{
    key: "onStateChange",


    /**
     * onStateChange is called when the application changes state
     * @param {Application} app 
     */
    value: function onStateChange(app) {}
  }]);

  return StateChangeListener;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vU3RhdGVDaGFuZ2VMaXN0ZW5lci5qcyJdLCJuYW1lcyI6WyJTdGF0ZUNoYW5nZUxpc3RlbmVyIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7SUFLTUEsbUI7Ozs7Ozs7OztBQUVGOzs7O2tDQUljQyxHLEVBQUssQ0FFbEIiLCJmaWxlIjoiU3RhdGVDaGFuZ2VMaXN0ZW5lci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU3RhdGVDaGFuZ2VMaXN0ZW5lciBpcyBhbiBpbnRlcmZhY2UgZm9yIG9iamVjdHMgaW50ZXJlc3RlZCBpbiBcbiAqIHJlYWN0aW5nIHRvIGNoYW5nZXMgaW4gdGhlIHJ1bnRpbWUgc3RhdGUgb2YgdGhlIG1haW4gYXBwbGljYXRpb24uXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIFN0YXRlQ2hhbmdlTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25TdGF0ZUNoYW5nZSBpcyBjYWxsZWQgd2hlbiB0aGUgYXBwbGljYXRpb24gY2hhbmdlcyBzdGF0ZVxuICAgICAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcCBcbiAgICAgKi9cbiAgICBvblN0YXRlQ2hhbmdlKGFwcCkge1xuXG4gICAgfVxuXG59XG4iXX0=