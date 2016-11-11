/**
 * Throws provides helper methods for throwing Errors
 * with useful infromation.
 */
class Throws {

    /**
     * fromModule
     * @param {string} message
     * @param {Module} module
     * @param {function} [Cons]
     */
    fromModule(message, module, Cons = Error) {

        throw new Cons(`Error in module ${module.configuration.paths.root}: ${message}`);

    }

}

export default new Throws();
