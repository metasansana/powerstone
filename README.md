Powerstone
==========

Powerstone is an MVC style, ES6 friendly application framework for building
data intensive, distributed applications.
  
It was inspired by [Keystone](http://keystonejs.com)'s simplicity in setup, [Playframework](http://playframework.com)'s
configuration flexibility and overall a desire to write less code when building
node apps.


###What is provides:
* Route configuration framework.
* Tasks system for boot time jobs.
* Framework for managing and pooling connections.
* Static configuration files.
* Query framework for more modular database requests.

###What it does not provide:
* Automatic Admin UI (yet)
* ORM/ODM - bring your own and 

###Concepts

####Deployment
Powerstone is targeted at apps that deploy to environments like [Heroku](https://heroku.com) or 
[Dokku](http://progrium.com/blog/2013/06/19/dokku-the-smallest-paas-implementation-youve-ever-seen).

####Routing
Currently it uses [express](http://expressjs.com) for its http framework but there are plans
to support [restify](http://mcavage.me/node-restify) as well.

####ES6 Classes
Powerstone apps are written preferably in ES6 because of the new `class` syntax. You may need
a transpiler, [babel](http://babeljs.com) works nicely.

####Directory Layout

A powerstone app has the following directory layout:

```sh
.
├── routes
│   └── users.json
├── conf
│   ├── conf.json
├── controllers
│   └── UserController.js
├── middleware
│   └── isAuthenticated.js
├── models
│   └── User.js
├── queries
│   ├── getOneUser.js
│   └── getUsersWithNameLike.js
├── tasks
│   └── CreateUserTask.js
├── views    
│   └── index.html
└── apps
    ├── reports
    └── monitor
     
```