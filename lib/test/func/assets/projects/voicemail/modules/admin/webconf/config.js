'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

exports['default'] = {
    'power.web.views.engine': function powerWebViewsEngine(app, config) {
        _nunjucks2['default'].configure(config.read(config.paths.WEB_VIEWS_PATH, config.paths.views), {
            express: app
        });
    },
    'power.connections': {
        admin: {
            connector: 'fake',
            options: {}
        }
    },
    'power.modules': ['demo', 'demo1']
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy90ZXN0L2Z1bmMvYXNzZXRzL3Byb2plY3RzL3ZvaWNlbWFpbC9tb2R1bGVzL2FkbWluL3dlYmNvbmYvY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O3dCQUFxQixVQUFVOzs7O3FCQUVoQjtBQUNYLDRCQUF3QixFQUFFLDZCQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUU7QUFDNUMsOEJBQVMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM3RSxtQkFBTyxFQUFFLEdBQUc7U0FDZixDQUFDLENBQUM7S0FDTjtBQUNELHVCQUFtQixFQUFFO0FBQ2pCLGFBQUssRUFBRTtBQUNILHFCQUFTLEVBQUUsTUFBTTtBQUNqQixtQkFBTyxFQUFFLEVBQUU7U0FDZDtLQUNKO0FBQ0QsbUJBQWUsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7Q0FDckMiLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG51bmp1Y2tzIGZyb20gJ251bmp1Y2tzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgICdwb3dlci53ZWIudmlld3MuZW5naW5lJzogZnVuY3Rpb24oYXBwLCBjb25maWcpIHtcbiAgICAgICAgbnVuanVja3MuY29uZmlndXJlKGNvbmZpZy5yZWFkKGNvbmZpZy5wYXRocy5XRUJfVklFV1NfUEFUSCwgY29uZmlnLnBhdGhzLnZpZXdzKSwge1xuICAgICAgICAgICAgZXhwcmVzczogYXBwXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgJ3Bvd2VyLmNvbm5lY3Rpb25zJzoge1xuICAgICAgICBhZG1pbjoge1xuICAgICAgICAgICAgY29ubmVjdG9yOiAnZmFrZScsXG4gICAgICAgICAgICBvcHRpb25zOiB7fVxuICAgICAgICB9XG4gICAgfSxcbiAgICAncG93ZXIubW9kdWxlcyc6IFsnZGVtbycsICdkZW1vMSddXG59O1xuIl19