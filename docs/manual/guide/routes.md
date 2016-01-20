
Routes are configured through a object exported by `routes.js`.

To configure web routing, export a `web` object and `api` for apis.

Each key of this object is treated as a path to setup routing on which
is describe by the value at the key.

Example:

```javascript

export const web {

 '/users': {
    get: {view:'users.html'},
    put: {action:'Users.create'},
    post:{action:'Users.update'}
 },
 '/users/:id': {
   view: 'user.html'
 }
}

export const api {
'/users/:id': {
  get: 'Users.get'
 }
}

```
##Syntax 

The above sets up two paths `/users` and `/users/:id` which is parameterized.

`/users` is configured to respond to `GET`, `PUT`, and `POST` requests where as `/users/:id` 
will respond only to `GET` requests by rendering the `user.html` template.

