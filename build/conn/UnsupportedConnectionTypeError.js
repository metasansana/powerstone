'use strict';

function UnsupportedConnectionTypeError(type) {

    Error.apply(this, arguments);
    this.message = 'Connection type: ' + type;
}

UnsupportedConnectionTypeError.prototype = Object.create(Error.prototype);
UnsupportedConnectionTypeError.prototype.constructor = UnsupportedConnectionTypeError;
module.exports = UnsupportedConnectionTypeError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uL1Vuc3VwcG9ydGVkQ29ubmVjdGlvblR5cGVFcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLFNBQVMsOEJBQThCLENBQUMsSUFBSSxFQUFFOztBQUUxQyxTQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM3QixRQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixHQUFDLElBQUksQ0FBQztDQUUzQzs7QUFFRCw4QkFBOEIsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDMUUsOEJBQThCLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyw4QkFBOEIsQ0FBQztBQUN0RixNQUFNLENBQUMsT0FBTyxHQUFHLDhCQUE4QixDQUFDIiwiZmlsZSI6IlVuc3VwcG9ydGVkQ29ubmVjdGlvblR5cGVFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIFVuc3VwcG9ydGVkQ29ubmVjdGlvblR5cGVFcnJvcih0eXBlKSB7XG5cbiAgICBFcnJvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMubWVzc2FnZSA9ICdDb25uZWN0aW9uIHR5cGU6ICcrdHlwZTtcblxufVxuXG5VbnN1cHBvcnRlZENvbm5lY3Rpb25UeXBlRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuVW5zdXBwb3J0ZWRDb25uZWN0aW9uVHlwZUVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFVuc3VwcG9ydGVkQ29ubmVjdGlvblR5cGVFcnJvcjtcbm1vZHVsZS5leHBvcnRzID0gVW5zdXBwb3J0ZWRDb25uZWN0aW9uVHlwZUVycm9yOyJdfQ==