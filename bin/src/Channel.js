"use strict";
var Channel = (function () {
    function Channel(display, tolower) {
        if (tolower === void 0) { tolower = true; }
        if (display[0] == ':')
            display = display.substr(1);
        this.display = display;
        if (tolower)
            this.display = this.display.toLocaleLowerCase();
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