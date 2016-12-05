"use strict";
class User {
    constructor(nick, ident, host) {
        this.nick = nick;
        this.ident = ident;
        this.host = host;
        this.modes = [];
    }
    toString() {
        return "[User " + this.display + "]";
    }
    clone() {
        return this;
    }
    get target() {
        return this.nick;
    }
    get display() {
        return this.nick + (this.ident ? "!" + this.ident + "@" + this.host : "");
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map