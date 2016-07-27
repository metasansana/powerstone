"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = count;

function count(req, res, next) {
    global.requests = global.requests + 1;
    next();
}

module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy90ZXN0L2Z1bmMvYXNzZXRzL3Byb2plY3RzL3ZvaWNlbWFpbC9hcHAvbWlkZGxld2FyZS9jb3VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztxQkFDd0IsS0FBSzs7QUFBZCxTQUFTLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUMxQyxVQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLFFBQUksRUFBRSxDQUFDO0NBQ1YiLCJmaWxlIjoiY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvdW50KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZ2xvYmFsLnJlcXVlc3RzID0gZ2xvYmFsLnJlcXVlc3RzICsgMTtcbiAgICBuZXh0KCk7XG59XG4iXX0=