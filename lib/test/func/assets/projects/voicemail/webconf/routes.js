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
            view: 'users/messages.html'
        },
        post: {
            action: function action(req, res) {
                global.messages[req.params.user] = global.messages[req.params.user] || [];
                global.messages[req.params.user].push('id:' + req.body.id + ' ' + req.body.message);
                res.status(201);
                res.send();
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
            action: 'Users.messages()',
            middleware: ['count']
        }
    }

};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy90ZXN0L2Z1bmMvYXNzZXRzL3Byb2plY3RzL3ZvaWNlbWFpbC93ZWJjb25mL3JvdXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sQ0FBQyxRQUFRLEdBQUc7QUFDZCxPQUFHLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztDQUN6QyxDQUFDOztxQkFFYTs7QUFFWCwyQkFBdUIsRUFBRTtBQUNyQixXQUFHLEVBQUU7QUFDRCxzQkFBVSxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ3JCLGdCQUFJLEVBQUUscUJBQXFCO1NBQzlCO0FBQ0QsWUFBSSxFQUFFO0FBQ0Ysa0JBQU0sRUFBRSxnQkFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3ZCLHNCQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUMxRSxzQkFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksU0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBRyxDQUFDO0FBQy9FLG1CQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLG1CQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZDs7U0FFSjtLQUNKO0FBQ0Qsa0JBQWMsRUFBRTtBQUNaLFdBQUcsRUFBRTtBQUNELGtCQUFNLEVBQUUsZUFBZTtTQUMxQjtLQUNKO0FBQ0QscUJBQWlCLEVBQUU7QUFDZixXQUFHLEVBQUU7QUFDRCxrQkFBTSxFQUFFLGtCQUFrQjtBQUMxQixzQkFBVSxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQ3hCO0tBQ0o7O0NBRUoiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZ2xvYmFsLm1lc3NhZ2VzID0ge1xuICAgIGthdjogWydZb3VyIHN1YnNjcmlwdGlvbiBoYXMgZXhwaXJlZCddXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICAnL3VzZXJzLzp1c2VyL21lc3NhZ2VzJzoge1xuICAgICAgICBnZXQ6IHtcbiAgICAgICAgICAgIG1pZGRsZXdhcmU6IFsnY291bnQnXSxcbiAgICAgICAgICAgIHZpZXc6ICd1c2Vycy9tZXNzYWdlcy5odG1sJ1xuICAgICAgICB9LFxuICAgICAgICBwb3N0OiB7XG4gICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsLm1lc3NhZ2VzW3JlcS5wYXJhbXMudXNlcl0gPSBnbG9iYWwubWVzc2FnZXNbcmVxLnBhcmFtcy51c2VyXSB8fCBbXTtcbiAgICAgICAgICAgICAgICBnbG9iYWwubWVzc2FnZXNbcmVxLnBhcmFtcy51c2VyXS5wdXNoKGBpZDoke3JlcS5ib2R5LmlkfSAke3JlcS5ib2R5Lm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDEpO1xuICAgICAgICAgICAgICAgIHJlcy5zZW5kKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH0sXG4gICAgJy91c2Vycy9jb3VudCc6IHtcbiAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgICBhY3Rpb246ICdVc2Vycy5jb3VudCgpJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICAnL3VzZXJzL21lc3NhZ2VzJzoge1xuICAgICAgICBnZXQ6IHtcbiAgICAgICAgICAgIGFjdGlvbjogJ1VzZXJzLm1lc3NhZ2VzKCknLFxuICAgICAgICAgICAgbWlkZGxld2FyZTogWydjb3VudCddXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==