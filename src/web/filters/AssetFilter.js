import fs from 'fs';
import Path from 'path';
import express from 'express';
import serve_index from 'serve-index';
/**
 * AssetFilter
 * @implements {Filter}
 */
class AssetFilter {

    static apply(app, config) {

        config.read(config.keys.FILTERS_ASSET_PATHS, [config.paths.public]).
        forEach(path => {

            if (config.read(config.keys.FILTERS_ASSET_CHECK_PATHS, true))
                if (Path.basename(path) !== 'public')
                    fs.accessSync(path, fs.F_OK | fs.R_OK);

            app.use(express.static(path,
                config.read(config.keys.FILTERS_ASSET_PATH_OPTIONS, null)))

        });

        config.read(config.keys.FILTERS.ASSET_DIRECTORY, []).
        forEach(path => app.use(serve_index(path,
            config.read(config.keys.FILTERS_ASSET_DIRECTORY_OPTIONS, null))));

    }

}

export default AssetFilter
