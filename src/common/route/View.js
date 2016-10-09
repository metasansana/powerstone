/**
 * View
 * @implements {Action}
 */
class View {

    constructor(callback) {

      this._callback = callback;

    }

    generate(method, path, route, main) {

        if (typeof route.view === 'string')
          return this._callback(route.view, route.locals || {});

    }

}

export default View
