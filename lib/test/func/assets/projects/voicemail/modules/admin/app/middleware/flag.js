'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = flag;

function flag(req, res, next) {
    global.flag = 'set';
    next();
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy90ZXN0L2Z1bmMvYXNzZXRzL3Byb2plY3RzL3ZvaWNlbWFpbC9tb2R1bGVzL2FkbWluL2FwcC9taWRkbGV3YXJlL2ZsYWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7cUJBQXdCLElBQUk7O0FBQWIsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDekMsVUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7QUFDcEIsUUFBSSxFQUFFLENBQUM7Q0FDViIsImZpbGUiOiJmbGFnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmxhZyhyZXEsIHJlcywgbmV4dCkge1xuICAgIGdsb2JhbC5mbGFnID0gJ3NldCc7XG4gICAgbmV4dCgpO1xufVxuIl19