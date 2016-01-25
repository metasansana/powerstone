#Configuration

Configuration for your apps are stored in the `.web` or `.api` folders respectively.

Each module can have its own configuration folders, directives are applied
to the module in question or system wide depending on the circumstance.

The two main files of these folders are:

* `config.js`
* `routes.js`

`config.js` is used to configure
various parts of the system.

`routes.js` is used to configure
application routing.

~~ This document needs to be updated ~~

###config.js

Directive,Type,Description,Default

mount,string,The mount path of the application.,'' 

host,string,The host to to bind to,'0.0.0.0'

port,number,The port number to bind to.,3000,

  public, array<string>, An array of paths to serve static files from.,['public']

  connections, array<object>,An array of connection descriptions

  csrf,boolean,Enables CSRF protection, true

  session,object,Configuration passed to session middleware

  projects, array<string> An array of subprojects to include
