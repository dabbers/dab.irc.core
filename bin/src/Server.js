"use strict";
var BaseServer = (function () {
    function BaseServer(host) {
        this.host = host;
    }
    BaseServer.prototype.toString = function () {
        return "[" + this.display + " BaseServer]";
    };
    BaseServer.prototype.clone = function () {
        return this;
    };
    Object.defineProperty(BaseServer.prototype, "display", {
        get: function () {
            return this.host;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseServer.prototype, "target", {
        get: function () {
            return this.host;
        },
        enumerable: true,
        configurable: true
    });
    return BaseServer;
}());
exports.BaseServer = BaseServer;
//# sourceMappingURL=Server.js.map