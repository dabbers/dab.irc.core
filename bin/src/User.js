"use strict";
var User = (function () {
    function User(nick, ident, host) {
        this.nick = nick;
        this.ident = ident;
        this.host = host;
    }
    User.prototype.toString = function () {
        return "[" + this.display + " User]";
    };
    User.prototype.clone = function () {
        return this;
    };
    Object.defineProperty(User.prototype, "target", {
        get: function () {
            return this.nick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "display", {
        get: function () {
            return this.nick + "!" + this.ident + "@" + this.host;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map