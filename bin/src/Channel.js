"use strict";
class Channel {
    constructor(display, tolower = true) {
        if (display[0] == ':')
            display = display.substr(1);
        this.display = display;
        if (tolower)
            this.display = this.display.toLocaleLowerCase();
    }
    toString() {
        return "[" + this.display + " Channel]";
    }
    clone() {
        return this;
    }
    get target() {
        return this.display;
    }
}
exports.Channel = Channel;
//# sourceMappingURL=Channel.js.map