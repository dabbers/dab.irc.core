"use strict";
class BaseServer {
    constructor(host) {
        this.host = host;
    }
    toString() {
        return "[" + this.display + " BaseServer]";
    }
    clone() {
        return this;
    }
    get display() {
        return this.host;
    }
    get target() {
        return this.host;
    }
}
exports.BaseServer = BaseServer;
//# sourceMappingURL=BaseServer.js.map