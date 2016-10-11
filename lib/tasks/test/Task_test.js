'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Task2 = require('../Task');

var _Task3 = _interopRequireDefault(_Task2);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SomeTask = function (_Task) {
    _inherits(SomeTask, _Task);

    function SomeTask() {
        _classCallCheck(this, SomeTask);

        return _possibleConstructorReturn(this, (SomeTask.__proto__ || Object.getPrototypeOf(SomeTask)).apply(this, arguments));
    }

    _createClass(SomeTask, [{
        key: 'runTask',
        value: function runTask(report, cb) {

            setTimeout(function () {
                cb();
            }, 1000);
        }
    }]);

    return SomeTask;
}(_Task3.default);

describe('Task', function () {

    it('should work ', function (done) {

        var task = new SomeTask();
        var report = {
            taskStarted: function taskStarted() {
                this.called = true;
            },
            taskCompleted: function taskCompleted() {}

        };

        task.run(report, function () {
            (0, _must2.default)(report.called).be.true();
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YXNrcy90ZXN0L1Rhc2tfdGVzdC5qcyJdLCJuYW1lcyI6WyJTb21lVGFzayIsInJlcG9ydCIsImNiIiwic2V0VGltZW91dCIsImRlc2NyaWJlIiwiaXQiLCJkb25lIiwidGFzayIsInRhc2tTdGFydGVkIiwiY2FsbGVkIiwidGFza0NvbXBsZXRlZCIsInJ1biIsImJlIiwidHJ1ZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxROzs7Ozs7Ozs7OztnQ0FFTUMsTSxFQUFRQyxFLEVBQUc7O0FBRWZDLHVCQUFXLFlBQVc7QUFDbEJEO0FBQ0gsYUFGRCxFQUVHLElBRkg7QUFJSDs7Ozs7O0FBSUxFLFNBQVMsTUFBVCxFQUFpQixZQUFXOztBQUV4QkMsT0FBRyxjQUFILEVBQW1CLFVBQVNDLElBQVQsRUFBZTs7QUFFOUIsWUFBSUMsT0FBTyxJQUFJUCxRQUFKLEVBQVg7QUFDQSxZQUFJQyxTQUFTO0FBQ1RPLHlCQUFhLHVCQUFXO0FBQ3BCLHFCQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNILGFBSFE7QUFJVEMsMkJBQWUseUJBQVcsQ0FDekI7O0FBTFEsU0FBYjs7QUFTQUgsYUFBS0ksR0FBTCxDQUFTVixNQUFULEVBQWlCLFlBQVU7QUFDdkIsZ0NBQUtBLE9BQU9RLE1BQVosRUFBb0JHLEVBQXBCLENBQXVCQyxJQUF2QjtBQUNBUDtBQUNILFNBSEQ7QUFLSCxLQWpCRDtBQW1CSCxDQXJCRCIsImZpbGUiOiJUYXNrX3Rlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFzayBmcm9tICcuLi9UYXNrJztcbmltcG9ydCBtdXN0IGZyb20gJ211c3QnO1xuXG5jbGFzcyBTb21lVGFzayBleHRlbmRzIFRhc2sge1xuXG4gICAgcnVuVGFzayhyZXBvcnQsIGNiKXtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICB9XG5cbn1cblxuZGVzY3JpYmUoJ1Rhc2snLCBmdW5jdGlvbigpIHtcblxuICAgIGl0KCdzaG91bGQgd29yayAnLCBmdW5jdGlvbihkb25lKSB7XG5cbiAgICAgICAgdmFyIHRhc2sgPSBuZXcgU29tZVRhc2soKTtcbiAgICAgICAgdmFyIHJlcG9ydCA9IHtcbiAgICAgICAgICAgIHRhc2tTdGFydGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFza0NvbXBsZXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRhc2sucnVuKHJlcG9ydCwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIG11c3QocmVwb3J0LmNhbGxlZCkuYmUudHJ1ZSgpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTsiXX0=