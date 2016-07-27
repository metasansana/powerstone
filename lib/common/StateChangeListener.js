/**
 * StateChangeListener is an interface for objects interested in 
 * reacting to changes in the runtime state of the main application.
 * @interface
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StateChangeListener = (function () {
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
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vU3RhdGVDaGFuZ2VMaXN0ZW5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUtNLG1CQUFtQjtXQUFuQixtQkFBbUI7MEJBQW5CLG1CQUFtQjs7O2VBQW5CLG1CQUFtQjs7Ozs7OztXQU1SLHVCQUFDLEdBQUcsRUFBRSxFQUVsQjs7O1NBUkMsbUJBQW1CIiwiZmlsZSI6IlN0YXRlQ2hhbmdlTGlzdGVuZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFN0YXRlQ2hhbmdlTGlzdGVuZXIgaXMgYW4gaW50ZXJmYWNlIGZvciBvYmplY3RzIGludGVyZXN0ZWQgaW4gXG4gKiByZWFjdGluZyB0byBjaGFuZ2VzIGluIHRoZSBydW50aW1lIHN0YXRlIG9mIHRoZSBtYWluIGFwcGxpY2F0aW9uLlxuICogQGludGVyZmFjZVxuICovXG5jbGFzcyBTdGF0ZUNoYW5nZUxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uU3RhdGVDaGFuZ2UgaXMgY2FsbGVkIHdoZW4gdGhlIGFwcGxpY2F0aW9uIGNoYW5nZXMgc3RhdGVcbiAgICAgKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHAgXG4gICAgICovXG4gICAgb25TdGF0ZUNoYW5nZShhcHApIHtcblxuICAgIH1cblxufVxuIl19