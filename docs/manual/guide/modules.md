
Isolate concerns of your code base by splitting it into submodules.

Each module goes through the same bootstrap process
as the main module one by one and can have its own submodules as well.

To include a submodule in your project, specify them
in the [config.js](configuration.html) file of your project.

Modules are loaded relative to the current modules's `modules` folder.

Example:

Pretend this file lives at `$APP_ROOT/config.js`
or even `$APP_ROOT/modules/v1/config.js`.

```javascript

export default {

 web: {
   public: 'public.js'
 },
 modules:['auth', 'dashboard', 'reports']

}

```
Modules have the same project layout as described [here](project-layout.html).
