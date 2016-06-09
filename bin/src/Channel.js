"use strict";
var Channel = (function () {
    function Channel(display) {
        this.display = display;
    }
    Channel.prototype.toString = function () {
        return "[" + this.display + " Channel]";
    };
    Channel.prototype.clone = function () {
        return this;
    };
    Object.defineProperty(Channel.prototype, "target", {
        get: function () {
            return this.display;
        },
        enumerable: true,
        configurable: true
    });
    return Channel;
}());
exports.Channel = Channel;
//# sourceMappingURL=Channel.js.map