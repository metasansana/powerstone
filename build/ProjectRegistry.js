/**
 * ProjectRegistry
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectRegistry = (function () {
    function ProjectRegistry() {
        _classCallCheck(this, ProjectRegistry);

        this.models = {};
        this.controllers = {};
        this.tasks = {};
        this.queries = {};
        this.middleware = {};
    }

    _createClass(ProjectRegistry, [{
        key: "getTasks",
        value: function getTasks() {
            var _this = this;

            return Object.keys(this.tasks).map(function (key) {
                return _this.tasks[key];
            });
        }
    }, {
        key: "resolveController",
        value: function resolveController() {}
    }, {
        key: "resolveModel",
        value: function resolveModel() {}
    }]);

    return ProjectRegistry;
})();

exports["default"] = new ProjectRegistry();
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Qcm9qZWN0UmVnaXN0cnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUdNLGVBQWU7QUFFTixhQUZULGVBQWUsR0FFSDs4QkFGWixlQUFlOztBQUdiLFlBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLFlBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLFlBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLFlBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0tBQ3hCOztpQkFSQyxlQUFlOztlQVVULG9CQUFHOzs7QUFDUCxtQkFBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDMUIsR0FBRyxDQUFDLFVBQUEsR0FBRzt1QkFBRSxNQUFLLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFBQSxDQUFDLENBQUE7U0FDaEM7OztlQUVnQiw2QkFBRSxFQUVsQjs7O2VBRVcsd0JBQUcsRUFFZDs7O1dBckJDLGVBQWU7OztxQkF5Qk4sSUFBSSxlQUFlLEVBQUUiLCJmaWxlIjoiUHJvamVjdFJlZ2lzdHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQcm9qZWN0UmVnaXN0cnlcbiAqL1xuY2xhc3MgUHJvamVjdFJlZ2lzdHJ5IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm1vZGVscyA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJzID0ge307XG4gICAgICAgIHRoaXMudGFza3MgPSB7fTtcbiAgICAgICAgdGhpcy5xdWVyaWVzID0ge307XG4gICAgICAgIHRoaXMubWlkZGxld2FyZSA9IHt9O1xuICAgIH1cblxuICAgIGdldFRhc2tzKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy50YXNrcykuXG4gICAgICAgICAgICBtYXAoa2V5PT50aGlzLnRhc2tzW2tleV0pXG4gICAgfVxuXG4gICAgcmVzb2x2ZUNvbnRyb2xsZXIoKXtcblxuICAgIH1cblxuICAgIHJlc29sdmVNb2RlbCgpIHtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUHJvamVjdFJlZ2lzdHJ5KCkiXX0=