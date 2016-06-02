import morgan from 'morgan';

/**
 * LogFilter 
 * @implements {Filter}
 */
class LogFilter {

    apply(app, config) {

        if (config.read(config.keys.FILTERS_LOG_ENABLED, true))
            app.use(morgan(config.read(config.keys.FILTERS_LOG_FORMAT, 'dev'),
                config.read(config.keys.FILTERS_LOG_OPTIONS, {})));

    }

}

export default new LogFilter()
