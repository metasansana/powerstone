export default {
    'power.views.engine': 'module://lib/Nunjucks',
    'power.connections': {
        q: {
connector: '../../test/func/assets/projects/voicemail/connectors/fake',
            port: 1000
        }
    },
    'power.modules': ['admin', 'disabled']
};
