#Configuration

Configuration of a powerstone project is done through the `config.js` file.

Currently the folder can have to
main files:

* `config.json`
* `routes.json`

`config.json` is used to configure
various parts of the system.

`routes.json` is used to configure
application routing.


###config.json

Directive,Type,Description,Default

mount,string,The mount path of the application.,'' 

host,string,The host to to bind to,'0.0.0.0'

port,number,The port number to bind to.,3000,

  public, array<string>, An array of paths to serve static files from.,['public']

  connections, array<object>,An array of connection descriptions

  csrf,boolean,Enables CSRF protection, true

  session,object,Configuration passed to session middleware

  projects, array<string> An array of subprojects to include
