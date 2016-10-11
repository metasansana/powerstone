class Controllers {

    static prepare(def, action, resource) {

        if (typeof def.action !== 'string') return;

        var klass;
        var method;
        var pieces = def.action.split('.');
        var Constructor;
        var instance;

        klass = pieces[0];
        method = String(pieces[1]).split('(').join('').split(')').join('');

        if (!klass)
            throw new TypeError('A class name must be specified in an action decleration!');

        Constructor = resource.find(klass);

        if (!Constructor)
            throw new ReferenceError(`Unable to locate controller '${klass}'!`);

        instance = new Constructor(action, action.route.module, action.route.module.application);

        if (typeof instance[method] !== 'function')
            throw new ReferenceError(`Controller '${instance.constructor.name}' ` +
                `does not have a method '${method}'!`);

        action.callbacks.push((req, res, next) =>
            instance[method](
                action.factory.request(req, action),
                action.factory.response(res, action),
                next));

    }

}

export default Controllers
