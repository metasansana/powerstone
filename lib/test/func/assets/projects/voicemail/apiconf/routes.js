'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
global.messages = {
    kav: ['Your subscription has expired']
};

exports['default'] = {

    '/users/:user/messages': {
        get: {
            middleware: ['count'],
            action: function action(req, res) {
                res.send(global.messages[req.params.user]);
            }
        },
        post: {
            action: function action(req, res) {
                global.messages[req.params.user] = global.messages[req.params.user] || [];
                global.messages[req.params.user].push('id:' + req.body.id + ' ' + req.body.message);
                res.send(201);
            }

        }
    },
    '/users/count': {
        get: {
            action: 'Users.count()'
        }
    },
    '/users/messages': {
        get: {
            middleware: ['count'],
            action: 'Users.messages()'
        }
    }

};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy90ZXN0L2Z1bmMvYXNzZXRzL3Byb2plY3RzL3ZvaWNlbWFpbC9hcGljb25mL3JvdXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sQ0FBQyxRQUFRLEdBQUc7QUFDZCxPQUFHLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztDQUN6QyxDQUFDOztxQkFFYTs7QUFFWCwyQkFBdUIsRUFBRTtBQUNyQixXQUFHLEVBQUU7QUFDRCxzQkFBVSxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ3JCLGtCQUFNLEVBQUUsZ0JBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUN2QixtQkFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUM5QztTQUNKO0FBQ0QsWUFBSSxFQUFFO0FBQ0Ysa0JBQU0sRUFBRSxnQkFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3ZCLHNCQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUMxRSxzQkFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksU0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBRyxDQUFDO0FBQy9FLG1CQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2pCOztTQUVKO0tBQ0o7QUFDRCxrQkFBYyxFQUFFO0FBQ1osV0FBRyxFQUFFO0FBQ0Qsa0JBQU0sRUFBRSxlQUFlO1NBQzFCO0tBQ0o7QUFDRCxxQkFBaUIsRUFBRTtBQUNmLFdBQUcsRUFBRTtBQUNELHNCQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUM7QUFDckIsa0JBQU0sRUFBRSxrQkFBa0I7U0FDN0I7S0FDSjs7Q0FFSiIsImZpbGUiOiJyb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJnbG9iYWwubWVzc2FnZXMgPSB7XG4gICAga2F2OiBbJ1lvdXIgc3Vic2NyaXB0aW9uIGhhcyBleHBpcmVkJ11cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgICcvdXNlcnMvOnVzZXIvbWVzc2FnZXMnOiB7XG4gICAgICAgIGdldDoge1xuICAgICAgICAgICAgbWlkZGxld2FyZTogWydjb3VudCddLFxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihyZXEsIHJlcykge1xuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGdsb2JhbC5tZXNzYWdlc1tyZXEucGFyYW1zLnVzZXJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcG9zdDoge1xuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbihyZXEsIHJlcykge1xuICAgICAgICAgICAgICAgIGdsb2JhbC5tZXNzYWdlc1tyZXEucGFyYW1zLnVzZXJdID0gZ2xvYmFsLm1lc3NhZ2VzW3JlcS5wYXJhbXMudXNlcl0gfHwgW107XG4gICAgICAgICAgICAgICAgZ2xvYmFsLm1lc3NhZ2VzW3JlcS5wYXJhbXMudXNlcl0ucHVzaChgaWQ6JHtyZXEuYm9keS5pZH0gJHtyZXEuYm9keS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgICAgIHJlcy5zZW5kKDIwMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH0sXG4gICAgJy91c2Vycy9jb3VudCc6IHtcbiAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgICBhY3Rpb246ICdVc2Vycy5jb3VudCgpJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICAnL3VzZXJzL21lc3NhZ2VzJzoge1xuICAgICAgICBnZXQ6IHtcbiAgICAgICAgICAgIG1pZGRsZXdhcmU6IFsnY291bnQnXSxcbiAgICAgICAgICAgIGFjdGlvbjogJ1VzZXJzLm1lc3NhZ2VzKCknXG4gICAgICAgIH1cbiAgICB9XG5cbn07XG4iXX0=