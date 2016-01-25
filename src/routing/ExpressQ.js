/**
 * ExpressQ 
 */
class ExpressQ {

    constructor(path, app) {
        this.path = path;
        this.app = app;
    }

    enque(method, cb) {
            console.log('method=>', method, 'path=>', this.path);
        this.app[method](this.path, cb);
    }

    flush() {

    }

}
export default ExpressQ
