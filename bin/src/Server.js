"use strict";
var Server = (function () {
    function Server(host) {
        this.host = host;
    }
    Server.prototype.toString = function () {
        return "[" + this.display + " User]";
    };
    Server.prototype.clone = function () {
        return this;
    };
    Object.defineProperty(Server.prototype, "display", {
        get: function () {
            return this.host;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Server.prototype, "target", {
        get: function () {
            return this.host;
        },
        enumerable: true,
        configurable: true
    });
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map