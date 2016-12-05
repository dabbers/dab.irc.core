"use strict";
class NodeSocket {
    constructor(socket) {
        this.socket = null;
        this.socket = socket;
    }
    setEncoding(enc) {
        this.socket.setEncoding(enc);
    }
    on(event, cb) {
        this.socket.on(event, cb);
    }
    write(data) {
        this.socket.write(data);
    }
    disconnect() {
        this.socket.end();
    }
}
exports.NodeSocket = NodeSocket;
//# sourceMappingURL=NodeSocket.js.map