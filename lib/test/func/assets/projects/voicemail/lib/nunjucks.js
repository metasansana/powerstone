'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

exports['default'] = function (app, config) {

    _nunjucks2['default'].configure(config.read(config.paths.WEB_VIEWS_PATH, config.paths.views), {
        express: app
    });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy90ZXN0L2Z1bmMvYXNzZXRzL3Byb2plY3RzL3ZvaWNlbWFpbC9saWIvbnVuanVja3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7d0JBQXFCLFVBQVU7Ozs7cUJBRWhCLFVBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRTs7QUFFakMsMEJBQVMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM3RSxlQUFPLEVBQUUsR0FBRztLQUNmLENBQUMsQ0FBQztDQUVOIiwiZmlsZSI6Im51bmp1Y2tzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG51bmp1Y2tzIGZyb20gJ251bmp1Y2tzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXBwLCBjb25maWcpIHtcblxuICAgIG51bmp1Y2tzLmNvbmZpZ3VyZShjb25maWcucmVhZChjb25maWcucGF0aHMuV0VCX1ZJRVdTX1BBVEgsIGNvbmZpZy5wYXRocy52aWV3cyksIHtcbiAgICAgICAgZXhwcmVzczogYXBwXG4gICAgfSk7XG5cbn1cbiJdfQ==