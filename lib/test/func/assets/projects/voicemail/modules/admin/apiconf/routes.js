'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {
    '/controls': {
        get: {
            action: function action(req, res) {
                res.send(200);
            }
        }
    },
    '/panel': {
        get: {
            middleware: ['flag', 'demo_register'],
            action: function action(req, res) {
                res.send(403);
            }
        }
    }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy90ZXN0L2Z1bmMvYXNzZXRzL3Byb2plY3RzL3ZvaWNlbWFpbC9tb2R1bGVzL2FkbWluL2FwaWNvbmYvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUFlO0FBQ1gsZUFBVyxFQUFFO0FBQ1QsV0FBRyxFQUFFO0FBQ0Qsa0JBQU0sRUFBRSxnQkFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3ZCLG1CQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2pCO1NBQ0o7S0FDSjtBQUNELFlBQVEsRUFBRTtBQUNOLFdBQUcsRUFBRTtBQUNELHNCQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDO0FBQ3JDLGtCQUFNLEVBQUUsZ0JBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUN2QixtQkFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqQjtTQUNKO0tBQ0o7Q0FDSiIsImZpbGUiOiJyb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gICAgJy9jb250cm9scyc6IHtcbiAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoMjAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgJy9wYW5lbCc6IHtcbiAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgICBtaWRkbGV3YXJlOiBbJ2ZsYWcnLCAnZGVtb19yZWdpc3RlciddLFxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihyZXEsIHJlcykge1xuICAgICAgICAgICAgICAgIHJlcy5zZW5kKDQwMyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuIl19