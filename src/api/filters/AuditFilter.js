import restify from 'restify';
import bunyan from 'bunyan';

/**
 * AuditFilter 
 * @implements {Filter}
 */
class AuditFilter {

    apply(app, config) {

        if (config.read(config.keys.FILTERS_LOG_ENABLED, true))
            app.on('after', restify.auditLogger(config.read('power.filters.audit', {
                body: true,
                log: bunyan.createLogger({
                    name: 'audit',
                    stream: process.stdout
                })
            })));

    }
}

export default new AuditFilter()
