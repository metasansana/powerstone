import DotAccess from 'dot-access';
import merge from 'merge';

/**
 * Configuration
 */
class Configuration {

    constructor(config) {
        this.config = config;
    }

    read(key, defaults){
        return DotAccess.get(this.config, key);
    }

    readWithDefaults(key, defaults){
         var ret = DotAccess.get(this.config, key);
        if(ret) return ret;
        return defaults;
    }

    readAndMerge(key, target, defaults) {
        var ret = this.readWithDefaults(key, defaults);
        return merge(target, ret);
    }



}

export default Configuration