export default {
    engine: 'nunjucks',
    connections: {
        connectors: {
            null: 'null'
        },
        open: {
            q: {
                connector: 'null',
                port: 1000
            }
        }
    },
    modules: {
        'admin': true
    }
};
