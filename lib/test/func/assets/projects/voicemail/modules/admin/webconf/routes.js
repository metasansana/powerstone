'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    '/controls': {
        get: {
            view: 'controls.html'
        }
    },
    '/panel': {
        get: {
            middleware: ['flag', 'demo_register'],
            action: function action(req, res) {
                res.status(403);
                res.send();
            }
        }
    }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy90ZXN0L2Z1bmMvYXNzZXRzL3Byb2plY3RzL3ZvaWNlbWFpbC9tb2R1bGVzL2FkbWluL3dlYmNvbmYvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUFlOztBQUVYLGVBQVcsRUFBRTtBQUNULFdBQUcsRUFBRTtBQUNELGdCQUFJLEVBQUUsZUFBZTtTQUN4QjtLQUNKO0FBQ0QsWUFBUSxFQUFFO0FBQ04sV0FBRyxFQUFFO0FBQ0Qsc0JBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUM7QUFDckMsa0JBQU0sRUFBRSxnQkFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3ZCLG1CQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLG1CQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZDtTQUNKO0tBQ0o7Q0FDSiIsImZpbGUiOiJyb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG5cbiAgICAnL2NvbnRyb2xzJzoge1xuICAgICAgICBnZXQ6IHtcbiAgICAgICAgICAgIHZpZXc6ICdjb250cm9scy5odG1sJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICAnL3BhbmVsJzoge1xuICAgICAgICBnZXQ6IHtcbiAgICAgICAgICAgIG1pZGRsZXdhcmU6IFsnZmxhZycsICdkZW1vX3JlZ2lzdGVyJ10sXG4gICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDMpO1xuICAgICAgICAgICAgICAgIHJlcy5zZW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuIl19