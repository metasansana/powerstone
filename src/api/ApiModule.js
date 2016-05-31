import CompositeModule from './CompositeModule';
import Configuration from './Configuration';

/**
 * Module
 * @param {string} fqn The name of the module prefixed with its parent modules 
 * @param {string} path 
 * @param {Configuration} config 
 * @param {Loader} loader 
 * @param {Application} app 
 */
class Module {

    __submodule(resource, framework, app) {

        var config = new Configuration('apiconf.js', resource.path);
        return new WebModule(name, config, express(), app);

    }

    __framework() {


    }

}

export default Module
