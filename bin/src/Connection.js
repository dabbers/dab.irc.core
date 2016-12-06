"use strict";
const Message_1 = require('./Message');
let PriorityQueue = require('js-priority-queue');
class OutMessage {
    constructor(msg, ts = (new Date().getTime())) {
        this.message = msg;
        this.timestamp = ts;
    }
}
class Connection {
    constructor() {
        this.connectionEstablished = false;
        this.queue = new PriorityQueue({
            comparator: function (a, b) {
                return a.timestamp - b.timestamp;
            } });
        this.interval = 200;
        this.backlog = "";
    }
    get host() {
        return this.context.host;
    }
    get port() {
        return this.context.port;
    }
    get ssl() {
        return this.context.ssl;
    }
    get display() {
        return this.toString();
    }
    get connected() {
        return this.connectionEstablished;
    }
    get context() {
        return this._context;
    }
    init(context, noResume) {
        this._context = context;
        let connectionEstablished = () => {
            this.connectionEstablished = true;
            this.context.connectionEstablishedCallback(this);
        };
        this.socket = context.createConnection(connectionEstablished);
        this.socket.setEncoding('utf8');
        this.socket.on('data', (d) => this.onData.apply(this, [d]));
        this.socket.on('end', () => { this.connectionEstablished = false; });
        this.socket.on('error', () => { this.connectionEstablished = false; });
    }
    resume(context, state) {
        this.socket = state.socket;
        this._context = state.context;
        this.queue = state.queue;
        this.connectionEstablished = state.connectionEstablished;
    }
    uninit() {
        return {
            socket: this.socket,
            context: this.context,
            queue: this.queue,
            connectionEstablished: this.connectionEstablished
        };
    }
    disconnect() {
        if (this.connectionEstablished) {
            this.socket.disconnect();
        }
    }
    tick() {
        if (this.queue.length > 0) {
            let msg = this.queue.dequeue().message;
            this.raw(msg);
        }
    }
    clear() {
        while (this.queue.length > 0)
            this.queue.dequeue();
    }
    onData(data) {
        this.backlog += data;
        let n = this.backlog.indexOf('\n');
        while (~n) {
            let res = this.backlog.substring(0, n);
            if (this.backlog[n - 1] == '\r') {
                res = this.backlog.substring(0, n - 1);
            }
            if (this.context.logReceivedMessages)
                console.log("<= ", res);
            this.backlog = this.backlog.substring(n + 1);
            this.context.dataCallback(new Message_1.Message(res, this.context.channelPrefixes));
            n = this.backlog.indexOf('\n');
        }
    }
    write(msg) {
        if (typeof msg == "string") {
            if (this.queue.length == 0) {
                this.raw(msg);
            }
            else {
                this.queue.queue(new OutMessage(msg));
            }
        }
        else if (msg.constructor == Array) {
            if (msg.length == 1 && this.queue.length == 0) {
                this.raw(msg[0]);
            }
            else {
                let date = new Date().getTime();
                for (let i = 0; i < msg.length; i++) {
                    this.queue.queue(new OutMessage(msg[i], date + (this.interval * i)));
                }
            }
        }
        else {
            this.queue.queue({ "timestamp": msg.timestamp, "message": msg.message });
        }
    }
    clone() {
        return this;
    }
    toString() {
        return "[" + this.context.host + ":" + (this.context.ssl ? "+" : "") + this.context.port.toString() + " Connection]";
    }
    raw(msg) {
        if (this.context.logSentMessages)
            console.log("=> ", msg);
        this.socket.write(msg + "\r\n");
    }
}
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map