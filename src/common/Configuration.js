import Property from 'property-seek';
import merge from 'merge';

/**
 * Configuration
 */
class Configuration {

    constructor(config, path) {
        this.config = config;
        this.path = path;
    }

    read(key) {
        return Property.get(this.config, key);
    }

    readWithDefaults(key, defaults) {
        var ret = Property.get(this.config, key);
        if (ret) return ret;
        return defaults;
    }

    readAndMerge(key, target, defaults) {
        var ret = this.readWithDefaults(key, defaults);
        return merge(target, ret);
    }

}

export default Configuration
