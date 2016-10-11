'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _PowerError2 = require('./PowerError');

var _PowerError3 = _interopRequireDefault(_PowerError2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * UnknownConnectorError 
 */
var UnknownConnectorError = function (_PowerError) {
    _inherits(UnknownConnectorError, _PowerError);

    function UnknownConnectorError(key, connector, connectors) {
        _classCallCheck(this, UnknownConnectorError);

        return _possibleConstructorReturn(this, (UnknownConnectorError.__proto__ || Object.getPrototypeOf(UnknownConnectorError)).call(this, 'The connection \'' + key + '\' declares an unknown connector \'' + connector + '\'!' + ('Known connectors-> [' + Object.keys(connectors).join(',') + '].')));
    }

    return UnknownConnectorError;
}(_PowerError3.default);

exports.default = UnknownConnectorError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvVW5rbm93bkNvbm5lY3RvckVycm9yLmpzIl0sIm5hbWVzIjpbIlVua25vd25Db25uZWN0b3JFcnJvciIsImtleSIsImNvbm5lY3RvciIsImNvbm5lY3RvcnMiLCJPYmplY3QiLCJrZXlzIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEscUI7OztBQUVGLG1DQUFZQyxHQUFaLEVBQWlCQyxTQUFqQixFQUE0QkMsVUFBNUIsRUFBd0M7QUFBQTs7QUFBQSw2SUFFOUIsc0JBQW1CRixHQUFuQiwyQ0FBMERDLFNBQTFELHFDQUNxQkUsT0FBT0MsSUFBUCxDQUFZRixVQUFaLEVBQXdCRyxJQUF4QixDQUE2QixHQUE3QixDQURyQixRQUY4QjtBQUt2Qzs7Ozs7a0JBSVVOLHFCIiwiZmlsZSI6IlVua25vd25Db25uZWN0b3JFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb3dlckVycm9yIGZyb20gJy4vUG93ZXJFcnJvcic7XG5cbi8qKlxuICogVW5rbm93bkNvbm5lY3RvckVycm9yIFxuICovXG5jbGFzcyBVbmtub3duQ29ubmVjdG9yRXJyb3IgZXh0ZW5kcyBQb3dlckVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKGtleSwgY29ubmVjdG9yLCBjb25uZWN0b3JzKSB7XG5cbiAgICAgICAgc3VwZXIoYFRoZSBjb25uZWN0aW9uICcke2tleX0nIGRlY2xhcmVzIGFuIHVua25vd24gY29ubmVjdG9yICcke2Nvbm5lY3Rvcn0nIWAgK1xuICAgICAgICAgICAgYEtub3duIGNvbm5lY3RvcnMtPiBbJHtPYmplY3Qua2V5cyhjb25uZWN0b3JzKS5qb2luKCcsJyl9XS5gKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBVbmtub3duQ29ubmVjdG9yRXJyb3JcbiJdfQ==