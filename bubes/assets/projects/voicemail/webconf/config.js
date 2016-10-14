'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    'power.views.engine': 'module://lib/Nunjucks',
    'power.connections': {
        q: {
            connector: 'fake',
            port: 1000
        }
    },
    'power.modules': ['admin', 'disabled']
};