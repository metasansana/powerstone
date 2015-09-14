'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Plugins = require('./Plugins');

var _Plugins2 = _interopRequireDefault(_Plugins);

var _RESTApplication = require('./RESTApplication');

var _RESTApplication2 = _interopRequireDefault(_RESTApplication);

exports['default'] = {

  Plugins: _Plugins2['default'],
  Application: _RESTApplication2['default']

};
module.exports = exports['default'];