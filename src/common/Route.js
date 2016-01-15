import expressJSONSchema from 'express-jsonschema';
import Converter from './Converter';
import Pipe from 'pipes/build/Pipe';

var validate = expressJSONSchema.validate;

var json_schema_error_handler = function(err, req, res, next) {

    if (err.name === 'JsonSchemaValidation') {

        res.status(400);

        var responseData = {
            message: 'Errors occurred during ' + req.method + ' request to ' + req.url + '.',
            errors: err.validations
        };

        if (req.xhr || req.get('Content-Type') === 'application/json') {
            res.json(responseData);
        } else {
            console.log(err.stack);
            res.send();
        }

    } else {
        next(err);
    }
}

/**
 * @param {string} method string
 * @param {path} string 
 * @param {Framework} fw 
 * @param {object} definition 
 * @param {Converter} convert 
 */
class Route {

    constructor(method, path, fw, definition, convert) {
        this.method = method;
        this.path = path;
        this.framework = fw;
        this.definition = definition;
        this.convert = convert;
        this._calls = [];
    }

    /**
     * configureSchema sets up json-schema on the route.
     * @param {object} schema 
     */
    configureSchema(schema) {

        if (!schema) return this;
        this.framework[this.method](this.path, validate(schema));
        this.framework.use(json_schema_error_handler);
        return this;

    }

    /**
     * configurePipes uses the pipes library to 
     * squeeze the request bodythrough a pipeline
     * @param {string} target 
     * @param {object} pipe 
     */
    configurePipes(target, pipe, pipes) {

        if (!pipe) return this;
        var p = new Pipe(pipe, pipes);
        this.framework[this.method](this.path, (req, res, next) => {

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

        this.convert.
        middleware(wares).
        forEach(mware => {
            this.framework[this.method](this.path, (req, res, next) => {
                mware(req, res, next, this);
                next();
            });
        });

        return this;
    }

    /**
     * configureAction sets up controllers on the route
     * @param {string} action
     */
    configureAction(action) {
        if (action)
            this.framework[this.method](this.path, (typeof action === 'function') ?
                action : this.convert.actions(action, this));
        return this;
    }

    /**
     * configureHandler
     * @param {function} f 
     */
    configureHandler(f) {
        if (typeof f === 'function') this.framework[this.method](this.path, f);
        return this;
    }

    configureView(view, locals) {

        if (!view) return this;
        this.framework[this.method](this.path, (req, res) => res.render(view, locals));
        return this;

    }

    /**
     * configureOther 
     * @param {string} mode 
     * @param {object} definition 
     */
    configureOther(mode, definition) {

        if (typeof definition === 'string')
            return this.configureAction(definition);

        if (typeof definition === 'function')
            this.framework[this.method](this.path, definition);

        return this;

    }
}

export default Route;
