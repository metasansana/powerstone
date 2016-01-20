import Loader from '../common/Loader';
import Configuration from '../common/Configuration';
import {
    paths
}
from '../common/properties';

class ApiLoader extends Loader {
    getConfiguration() {
        return new Configuration(this.load(paths.API_CONFIG), this.join(paths.API_CONFIG));
    }
}

export default ApiLoader;
