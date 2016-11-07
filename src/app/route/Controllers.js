import Promise from 'bluebird';

class Controllers {

    static prepare(def, action, resource) {

        if (typeof def.action !== 'string') return;

        var klass;
        var method;
        var pieces = def.action.split('.');
        var Constructor;
        var instance;
        var filters = [];

        klass = pieces[0];
        method = String(pieces[1]).split('(').join('').split(')').join('');

        if (!klass)
            throw new TypeError('A class name must be specified in an action decleration!');

        Constructor = resource.find(klass);

        if (!Constructor)
            throw new ReferenceError(`Unable to locate controller '${klass}'!`);

        /* @todo cache created instances so they are reusable */

        instance = new Constructor(action, action.route.module, action.route.module.application);

        if (typeof instance[method] !== 'function')
            throw new ReferenceError(`Controller '${instance.constructor.name}' ` +
                `does not have a method '${method}'!`);

        if (typeof instance.filters === 'object')
            if (instance.filters.hasOwnProperty(method))
                filters = (Array.isArray(instance.filters[method])) ?
                instance.filters[method] : [instance.filters[method]].filter(function(f) { return f; });

        action.callbacks.push.apply(action.callbacks,
            filters.map(function map_filters(f) {

                return function filter_handle_request(req, res, next) {

                    var preq = action.factory.request(req, res, action.output);
                    var pres = action.factory.response(req, res, action.output);

                    Promise.try(function() { return f.apply(preq, pres, next) }).
                    catch(function(e) {

                        return action.
                        route.
                        module.
                        application.
                        onRouteErrorListener.onRouteError(e, preq, pres, next);

                    });

                }

            }));

        action.callbacks.push(function(req, res, next) {

            var preq = action.factory.request(req, res, action.output);
            var pres = action.factory.response(req, res, action.output);

            Promise.try(function() { return instance[method](preq, pres) }).
            catch(function(e) {

                return action.
                route.
                module.
                application.
                onRouteErrorListener.onRouteError(e, preq, pres, next);

            });

        });

    }

}

export default Controllers
