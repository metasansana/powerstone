'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Runtime = require('../Runtime');

var _Runtime2 = _interopRequireDefault(_Runtime);

/**
 * Controller
 */

var Controller = function Controller() {
    _classCallCheck(this, Controller);

    _Runtime2['default'].controllers[this.constructor] = this;
};

exports['default'] = Controller;
module.exports = exports['default'];