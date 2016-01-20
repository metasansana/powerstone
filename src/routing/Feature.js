/**
 * Feature represents a feature of powerstone's routing framework.
 * @param {Application} application 
 */
class Feature {

    constructor(application) {

        /**
         * @property {Application} application 
         */
        this.application = application;

    }

    /**
     * install this feature
     * @param {string} method 
     * @param {string} path 
     * @param {object} definition 
     * @param {RouteQ} q 
     */
    install(method, path, definition, q) {
      
    }

}
export default Feature
