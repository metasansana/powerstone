/**
 * View
 * @implements {Action}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var View = (function () {
  function View(callback) {
    _classCallCheck(this, View);

    this._callback = callback;
  }

  _createClass(View, [{
    key: 'generate',
    value: function generate(method, path, route, main) {

      if (typeof route.view === 'string') return this._callback(route.view, route.locals || {});
    }
  }]);

  return View;
})();

exports['default'] = View;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUlNLElBQUk7QUFFSyxXQUZULElBQUksQ0FFTSxRQUFRLEVBQUU7MEJBRnBCLElBQUk7O0FBSUosUUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7R0FFM0I7O2VBTkMsSUFBSTs7V0FRRSxrQkFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7O0FBRWhDLFVBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFDaEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQztLQUUzRDs7O1NBYkMsSUFBSTs7O3FCQWlCSyxJQUFJIiwiZmlsZSI6IlZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFZpZXdcbiAqIEBpbXBsZW1lbnRzIHtBY3Rpb259XG4gKi9cbmNsYXNzIFZpZXcge1xuXG4gICAgY29uc3RydWN0b3IoY2FsbGJhY2spIHtcblxuICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgIH1cblxuICAgIGdlbmVyYXRlKG1ldGhvZCwgcGF0aCwgcm91dGUsIG1haW4pIHtcblxuICAgICAgICBpZiAodHlwZW9mIHJvdXRlLnZpZXcgPT09ICdzdHJpbmcnKVxuICAgICAgICAgIHJldHVybiB0aGlzLl9jYWxsYmFjayhyb3V0ZS52aWV3LCByb3V0ZS5sb2NhbHMgfHwge30pO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFZpZXdcbiJdfQ==