'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

/**
 * ViewRegistry
 */
var WebViewRegistry = {

    engines: {},

    set: function set(name, provider) {
        this.engines[name] = provider;
    },

    get: function get(name) {
        if (!this.engines.hasOwnProperty(name)) throw new Error('Unknown view engine "' + name + '"! Did you register it with WebViewRegistry?');
        return this.engines[name];
    }

};

WebViewRegistry.set('nunjucks', function (app, config, loader, project) {

    _nunjucks2['default'].configure(loader.getPath() + '/' + config.readWithDefaults('views', 'views'), config.readAndMerge('view_options', {
        autoescape: true,
        express: app
    }));

    var opts = config.readWithDefaults('nunjucks', { filters: [], extensions: [], globals: [] });
});

WebViewRegistry.set('none', function (app, config, project) {});

exports['default'] = WebViewRegistry;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViVmlld1JlZ2lzdHJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O3dCQUFxQixVQUFVOzs7Ozs7O0FBSy9CLElBQUksZUFBZSxHQUFJOztBQUVuQixXQUFPLEVBQUUsRUFBRTs7QUFFWCxPQUFHLEVBQUEsYUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ2hCLFlBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO0tBQ2pDOztBQUVELE9BQUcsRUFBQSxhQUFDLElBQUksRUFBRTtBQUNOLFlBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsR0FBQyxJQUFJLEdBQUMsOENBQThDLENBQUMsQ0FBQztBQUM3RixlQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0I7O0NBRUosQ0FBQzs7QUFFRixlQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRTs7QUFFcEUsMEJBQVMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEdBQ3JDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQ3pDLE1BQU0sQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFO0FBQ3BDLGtCQUFVLEVBQUUsSUFBSTtBQUNoQixlQUFPLEVBQUUsR0FBRztLQUNmLENBQUMsQ0FBQyxDQUFDOztBQUVKLFFBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFFLFVBQVUsRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUM7Q0FFM0YsQ0FBQyxDQUFDOztBQUVILGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUMsRUFFMUQsQ0FBQyxDQUFDOztxQkFFWSxlQUFlIiwiZmlsZSI6IldlYlZpZXdSZWdpc3RyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBudW5qdWNrcyBmcm9tICdudW5qdWNrcyc7XG5cbi8qKlxuICogVmlld1JlZ2lzdHJ5XG4gKi9cbnZhciBXZWJWaWV3UmVnaXN0cnkgID0ge1xuXG4gICAgZW5naW5lczoge30sXG5cbiAgICBzZXQobmFtZSwgcHJvdmlkZXIpIHtcbiAgICAgICAgdGhpcy5lbmdpbmVzW25hbWVdID0gcHJvdmlkZXI7XG4gICAgfSxcblxuICAgIGdldChuYW1lKSB7XG4gICAgICAgIGlmKCF0aGlzLmVuZ2luZXMuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB2aWV3IGVuZ2luZSBcIicrbmFtZSsnXCIhIERpZCB5b3UgcmVnaXN0ZXIgaXQgd2l0aCBXZWJWaWV3UmVnaXN0cnk/Jyk7XG4gICAgICAgIHJldHVybiB0aGlzLmVuZ2luZXNbbmFtZV07XG4gICAgfVxuXG59O1xuXG5XZWJWaWV3UmVnaXN0cnkuc2V0KCdudW5qdWNrcycsIGZ1bmN0aW9uIChhcHAsIGNvbmZpZywgbG9hZGVyLCBwcm9qZWN0KSB7XG5cbiAgICBudW5qdWNrcy5jb25maWd1cmUobG9hZGVyLmdldFBhdGgoKSArICcvJytcbiAgICAgICAgY29uZmlnLnJlYWRXaXRoRGVmYXVsdHMoJ3ZpZXdzJywgJ3ZpZXdzJyksXG4gICAgICAgIGNvbmZpZy5yZWFkQW5kTWVyZ2UoJ3ZpZXdfb3B0aW9ucycsIHtcbiAgICAgICAgYXV0b2VzY2FwZTogdHJ1ZSxcbiAgICAgICAgZXhwcmVzczogYXBwXG4gICAgfSkpO1xuXG4gICAgdmFyIG9wdHMgPSBjb25maWcucmVhZFdpdGhEZWZhdWx0cygnbnVuanVja3MnLCB7ZmlsdGVyczpbXSwgZXh0ZW5zaW9uczpbXSwgZ2xvYmFsczpbXX0pO1xuXG59KTtcblxuV2ViVmlld1JlZ2lzdHJ5LnNldCgnbm9uZScsIGZ1bmN0aW9uIChhcHAsIGNvbmZpZywgcHJvamVjdCl7XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBXZWJWaWV3UmVnaXN0cnk7XG4iXX0=