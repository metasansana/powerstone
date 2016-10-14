'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = null_connector;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function null_connector(options) {
    global.connected = true;
    return new _bluebird2.default(function (r) {
        r('fake');
    });
}