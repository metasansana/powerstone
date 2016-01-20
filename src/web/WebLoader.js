import Loader from '../common/Loader';
import Configuration from '../common/Configuration';
import {
    paths
}
from '../common/properties';

class WebLoader extends Loader {
    getConfiguration() {
        return new Configuration(this.load(paths.WEB_CONFIG), this.join(paths.WEB_CONFIG));
    }
}

export default WebLoader;
