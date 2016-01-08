
Routes are configured through a routing object located in a file `routes.js`.
This must be the only export of that file or alternatively the file
can be a json object.

This file can be located in the main aproject root, a [sub project](/project.html)
folder or both.

##Syntax

A route definition object has two main parts; the main object and its `routes` property.
The `routes` property is where the routes are actually defined. The rest of
the object contains values that will be merged into each `routes` entry.

###Route Definition Object

| Property | Type              | Default | Required | Description |
| -------- | ----------------- | ------- | -------- | ----------- |
| path     | string            |         |          | Will be appended to the path each route defines.
| method   | string            |         |          | The method decleared here is used for all routes that don't declare one.
| mware    | [string] or [function]|     |          | An array of middleware to  apply to all routes.
| locals   | object            |         |          | Various values that are consumed by the view framework.
| routes   | [object]          |         | Yes      | An array of actual route definitions, matching keys in the parent object are merged with into each child.

###Route Property

| Property | Type                  | Default | Required                   | Description |
| -------- | --------------------- | ------- | -------------------------- | ----------- |
| path     | string                |         |                            | The path for this route.
| method   | string                |         |                            | The http method this route will be activated on.
| mware    | [string] or [function]|         | If no action is present    | Middleware
| locals   | object                |         |                            | 
| action   | string or [function]  |         | If no middleware is present| An array of actual route definitions, matching keys in the parent object are merged with into each child.



Sample route file:

```javascript

export default {
 path: '/api',
 mware: ['timestamp'],
 locals:{brand:'XYZ'},
 routes:[
    {
      path: '/users',
      method:'get', 
      mware:['authenticated'], 
      action:'Users.search', 
      locals:{}
    },
    {
     path: '/users/:username',
     method: 'put',
     mware:['authenticated', 'can'],
     action: function(request, response, next, route) {
            res.status(409).send();
     }

    }
 ]

}

```
