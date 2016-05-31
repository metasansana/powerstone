/**
 * Route
 * @param {string} path 
 * @param {string} method 
 * @param {HttpHandler} handler 
 */
class Route {

    constructor(path, method, handler) {

        this._path = path;
        this._method = method.toLowerCase();
        this._handler = handler;

        handler[this._method](path, this.onRoute.bind(this));

    }

    onRoute(req, res, next) {

        next();

    }

    /**
     * addDispatch
     * @param {function} f  
     * @return {Route}
     */
    addDispatch(f) {

      this._handler[this._method](this._path, f);
      return this;
      
    }


}

export default Route
