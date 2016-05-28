/**
 * RestifyQ
 **/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RestifyQ = (function () {
    function RestifyQ(path, server) {
        _classCallCheck(this, RestifyQ);

        this.path = path;
        this.server = server;
        this.methods = Object.create(null);
    }

    _createClass(RestifyQ, [{
        key: "enque",
        value: function enque(method, cb) {

            this.methods[method] = this.methods[method] || [];
            this.methods[method].push(cb);
        }
    }, {
        key: "flush",
        value: function flush() {
            var _this = this;

            Object.keys(this.methods).forEach(function (method) {
                return _this.server[method](_this.path, _this.methods[method]);
            });
        }
    }]);

    return RestifyQ;
})();

exports["default"] = RestifyQ;
module.exports = exports["default"];
//# sourceMappingURL=RestifyQ.js.map