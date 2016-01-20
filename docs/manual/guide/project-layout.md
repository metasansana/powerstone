
The layout of a project is simillar for API and Web applications.
Web applications basically extend the API layout with consideration 
for the various configurable Web parts.

Use the project [generator](generator.html) to create the project layout you want.

```bash
.
├── controllers
├── framework
│   ├── connections
│   ├── express
│   │   └── middleware
│   ├── nunjucks
│   │   ├── extensions
│   │   └── filters
│   ├── pipes
│   └── run
├── middleware
├── models
├── modules
├── config.js
└── routes.js
```

Directory |Purpose 
--------- |-------
[controllers](controllers.html) | Files in here are loaded into memory to be used as controllers.
[framework](frameworks.html) | Folders in here are used to configure frameworks powerstone uses.
[frameworks/connections](connections.html) | The files in here are loaded in memory as connection types
frameworks/express | Folders in here are used to configure express.js
frameworks/express/middleware | Files here are loaded into memory to be used as express middleware
[frameworks/nunjucks](nunjucks.html) | Specify filters and extensions available to nunjucks here
models | Not yet implemented but still loaded into memory
[modules](modules.html) | Place submodules in here.
[config.js](configuration.html) | Configuration file.
[route.js](routing.html) | Routes file.
