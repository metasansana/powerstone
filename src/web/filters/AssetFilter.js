import express from 'express';
import serve_index from 'serve-index';
/**
 * AssetFilter 
 * @implements {Filter}
 */
class AssetFilter {

    apply(app, config) {

        config.read(config.keys.FILTERS_ASSET_PATHS, [config.paths.public]).
        forEach(path => app.use(express.static(path)));

        config.read(config.keys.FILTERS.ASSET_DIRECTORY, []).
        forEach(path => app.use(serve_index(path)));

    }

}

export default new AssetFilter()
