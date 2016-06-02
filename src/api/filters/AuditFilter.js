import restify from 'restify';

/**
 * AuditFilter 
 * @implements {Filter}
 */
class AuditFilter {

    apply(app, config) {

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
