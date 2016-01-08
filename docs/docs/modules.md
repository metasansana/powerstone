
Isolate concerns of your code base by splitting it into submodules.

Each module goes through the same bootstrap process
as the main module one by one and can have its own submodules as well.

To include a submodule in your project, specify them
in the [config.js](config.html) file of your project.

Example:

```javascript

export default {

 web: {
   public: 'public.js'
 },
 modules:['users/auth', 'users/dashboard', 'users/reports']

}

```
