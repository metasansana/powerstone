import expressJSONSchema from 'express-jsonschema';
import json_schema_error_handler from './json_schema_error_handler';
import ModuleRegistry from './ModuleRegistry';
import Pipe from 'pipes/build/Pipe';

var validate = expressJSONSchema.validate;

/**
 * @param {string} method string
 * @param {path} string 
 * @param {Framework} fw 
 * @param {Configuration} config 
 */
class Route {

    constructor(method, path, fw, config) {
        this.method = method;
        this.path = path;
        this.fw = fw;
        this.config = config;
    }

    /**
     * configureDefault 
     */
    configureDefault(spec) {

        if (typeof spec === 'string')
            return this.configureAction(spec);

        return this;

    }

    /**
     * configureSchema sets up json-schema on the route.
     * @param {object} schema 
     */
    configureSchema(schema) {

        if (!schema) return this;
        this.fw[this.method](this.path, validate(schema));
        this.fw.use(json_schema_error_handler);
        return this;

    }

    /**
     * configurePipes uses the pipes library to 
     * squeeze the request bodythrough a pipeline
     * @param {object} pipe 
     * @param {string} target 
     */
    configurePipes(pipe, target) {

        if (!pipe) return this;
        var p = new Pipe(pipe, ModuleRegistry.pipes);
        this.fw[this.method](this.path, function(req, res, next) {

            p.run(req[target], function(err, o) {
                if (err) {
                  res.status(400);
                  return res.send();
                }
                req[target] = o;
                next();
            });

        });
        return this;
    }

    /**
     * configureMiddleware sets up middleware on the route
     * @param {array} wares 
     */
    configureMiddleware(wares) {

        if (!wares) return this;

        ModuleRegistry.convertMiddleware(wares).
        forEach(mwares =>
            this.fw[this.method](this.path, (req, res, next) =>
                mwares(req, res, next, this)));

        return this;
    }

    /**
     * configureAction sets up controllers on the route
     * @param {string} action
     */
    configureAction(action) {
        if (!action) return this;
        this.fw[this.method](this.path, ModuleRegistry.convertAction(action));
        return this;
    }

    configureView(view) {

        if (!view) return this;

        this.fw[this.method](this.path, function(req, res) {

            res.render(route.view, locals);

        });

        return this;

    }


}
export default Route;
