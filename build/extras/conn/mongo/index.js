'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _connConnections = require('../../../conn/Connections');

var _connConnections2 = _interopRequireDefault(_connConnections);

var _Factory = require('./Factory');

var _Factory2 = _interopRequireDefault(_Factory);

exports['default'] = function () {
    _connConnections2['default'].set('mongoose', _Factory2['default']);
    _connConnections2['default'].set('connect-mongo', _Factory2['default']);
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9leHRyYXMvY29ubi9tb25nby9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OzsrQkFBd0IsMkJBQTJCOzs7O3VCQUMvQixXQUFXOzs7O3FCQUVoQixZQUFZO0FBQ3ZCLGlDQUFZLEdBQUcsQ0FBQyxVQUFVLHVCQUFVLENBQUM7QUFDckMsaUNBQVksR0FBRyxDQUFDLGVBQWUsdUJBQVUsQ0FBQztDQUM3QyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb25uZWN0aW9ucyBmcm9tICcuLi8uLi8uLi9jb25uL0Nvbm5lY3Rpb25zJztcbmltcG9ydCBGYWN0b3J5IGZyb20gJy4vRmFjdG9yeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICBDb25uZWN0aW9ucy5zZXQoJ21vbmdvb3NlJywgRmFjdG9yeSk7XG4gICAgQ29ubmVjdGlvbnMuc2V0KCdjb25uZWN0LW1vbmdvJywgRmFjdG9yeSk7XG59Il19