"use strict";
var NodeSocket = (function () {
    function NodeSocket(socket) {
        this.socket = null;
        this.socket = socket;
    }
    NodeSocket.prototype.setEncoding = function (enc) {
        this.socket.setEncoding(enc);
    };
    NodeSocket.prototype.on = function (event, cb) {
        this.socket.on(event, cb);
    };
    NodeSocket.prototype.write = function (data) {
        this.socket.write(data);
    };
    NodeSocket.prototype.disconnect = function () {
        this.socket.end();
    };
    return NodeSocket;
}());
exports.NodeSocket = NodeSocket;
//# sourceMappingURL=NodeSocket.js.map