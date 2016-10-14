'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    'power.connections': {
        admin: {
            connector: 'fake',
            options: {}
        }
    },
    'power.modules': ['demo', 'demo1']
};