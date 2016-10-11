/**
 * ViewEngineFactory is a factory interface that let's us know an object
 * is capable of creating a view engine for us.
 * @interface
 */
class ViewEngineFactory {

    /**
     * create the engine
     * @param {Module} module
     * @returns {ViewEngine}
     */
    create() {

    }

}

export {    ViewEngineFactory as ViewEngineFactory}

    /**
     * ViewEngine is an interface that let's pwr render template views without
     * relying on the underlying framework.
     * @interface
     */
    class ViewEngine {

        /**
         * render a view
         * @param {string} view
         * @param {object} context
         * @param {Response} response
         */
        render() {

        }

    }

    export default ViewEngine
