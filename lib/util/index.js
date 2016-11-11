"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.copy = copy;
exports.merge = merge;
/**
 * copy the properties of one object into another.
 * @param {object} src
 * @param {object} dest
 */
function copy(src, dest) {

    for (var key in src) {
        dest[key] = src[key];
    }
}

/**
 * merge all arguments passed into one object (shallow)
 * @param {object} {...o}
 */
function merge() {

    var ret = {};

    for (var i = 0; i < arguments.length; ++i) {
        copy(arguments[i], ret);
    }return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2luZGV4LmpzIl0sIm5hbWVzIjpbImNvcHkiLCJtZXJnZSIsInNyYyIsImRlc3QiLCJrZXkiLCJyZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7OztRQUtnQkEsSSxHQUFBQSxJO1FBV0FDLEssR0FBQUEsSztBQWhCaEI7Ozs7O0FBS08sU0FBU0QsSUFBVCxDQUFjRSxHQUFkLEVBQW1CQyxJQUFuQixFQUF5Qjs7QUFFNUIsU0FBSyxJQUFJQyxHQUFULElBQWdCRixHQUFoQjtBQUNJQyxhQUFLQyxHQUFMLElBQVlGLElBQUlFLEdBQUosQ0FBWjtBQURKO0FBR0g7O0FBRUQ7Ozs7QUFJTyxTQUFTSCxLQUFULEdBQWlCOztBQUVwQixRQUFJSSxNQUFNLEVBQVY7O0FBRUEsU0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlDLFVBQVVDLE1BQTlCLEVBQXNDLEVBQUVGLENBQXhDO0FBQ0lOLGFBQUtPLFVBQVVELENBQVYsQ0FBTCxFQUFtQkQsR0FBbkI7QUFESixLQUdBLE9BQU9BLEdBQVA7QUFFSCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY29weSB0aGUgcHJvcGVydGllcyBvZiBvbmUgb2JqZWN0IGludG8gYW5vdGhlci5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzcmNcbiAqIEBwYXJhbSB7b2JqZWN0fSBkZXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KHNyYywgZGVzdCkge1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNyYylcbiAgICAgICAgZGVzdFtrZXldID0gc3JjW2tleV07XG5cbn1cblxuLyoqXG4gKiBtZXJnZSBhbGwgYXJndW1lbnRzIHBhc3NlZCBpbnRvIG9uZSBvYmplY3QgKHNoYWxsb3cpXG4gKiBAcGFyYW0ge29iamVjdH0gey4uLm99XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZSgpIHtcblxuICAgIHZhciByZXQgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgKytpKVxuICAgICAgICBjb3B5KGFyZ3VtZW50c1tpXSwgcmV0KTtcblxuICAgIHJldHVybiByZXQ7XG5cbn1cbiJdfQ==