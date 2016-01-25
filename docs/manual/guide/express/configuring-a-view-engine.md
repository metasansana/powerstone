
Powerstone ships with no default view engine. To enable
views you must configure an engine yourself.

To configure a view engine, place a script in `framework/express/engines`.
The name of the script will be used to select a view engine in
the [config](config.md) file.

Example:

```javascript

//nunjucks.js

import nunjucks from 'nunjucks';

export default function (expressApp, module) {

 var filters = module.loader.require('framework/nunjucks/filters', {});
 var env = nunjucks.configure(module.loader.path+'/views');
 
 Object.keys(filters).
 forEach(key=>env.addFilter(key, filters[key]));

 expressApp.engine('html', env.render);

}

```

**Note** The above script will configure a new view engine for each
submodule you configure to use it. If this is undesirable, consider 
including logic to return the same instance each time the function is called.
