'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Controller2 = require('powerstone/app/Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Users
 */
var Users = function (_Controller) {
    _inherits(Users, _Controller);

    function Users() {
        _classCallCheck(this, Users);

        return _possibleConstructorReturn(this, (Users.__proto__ || Object.getPrototypeOf(Users)).apply(this, arguments));
    }

    _createClass(Users, [{
        key: 'ok',
        value: function ok(req, res) {

            res.send(200);
        }
    }, {
        key: 'nok',
        value: function nok(req, res) {

            res.send(403);
        }
    }, {
        key: 'sendUser',
        value: function sendUser(req, res) {

            res.send(200, global.messages[req.params.user]);
        }
    }, {
        key: 'createMessage',
        value: function createMessage(req, res) {

            global.messages[req.params.user] = global.messages[req.params.user] || [];
            global.messages[req.params.user].push('id:' + req.body.id + ' ' + req.body.message);
            res.send(201);
        }
    }, {
        key: 'count',
        value: function count(req, res) {

            res.send(200, {
                count: Object.keys(global.messages).length
            });
        }
    }, {
        key: 'messages',
        value: function messages(req, res) {
            res.send(200, {
                messages: 'Not enabled'
            });
        }
    }, {
        key: 'error',
        value: function error(req, res) {

            _bluebird2.default.reject(new Error('Some error'));
        }
    }]);

    return Users;
}(_Controller3.default);

exports.default = Users;