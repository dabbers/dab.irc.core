"use strict";
var net = require('net');
var tls = require('tls');
var Message_1 = require('./Message');
var PriorityQueue = require('js-priority-queue');
var OutMessage = (function () {
    function OutMessage(msg, ts) {
        if (ts === void 0) { ts = (new Date().getTime()); }
        this.message = msg;
        this.timestamp = ts;
    }
    return OutMessage;
}());
var Connection = (function () {
    function Connection() {
        this.connectionEstablished = false;
        this.queue = new PriorityQueue({
            comparator: function (a, b) {
                return a.timestamp - b.timestamp;
            } });
        this.interval = 200;
        this.backlog = "";
    }
    Connection.prototype.init = function (context) {
        var _this = this;
        this.context = context;
        context.connection = this;
        var connectionEstablished = function () {
            _this.connectionEstablished = true;
            _this.raw("NICK " + _this.context.me.nick);
            _this.raw("USER " + _this.context.me.ident + " 8 * :" + _this.context.me.name);
        };
        if (context.ssl) {
            this.socket = tls.connect(context.port, context.host, { rejectUnauthorized: context.rejectUnauthedCerts }, connectionEstablished);
        }
        else {
            this.socket = net.createConnection(context.port, context.host, connectionEstablished);
        }
        this.socket.setEncoding('utf8');
        this.socket.on('data', function (d) { return _this.onData.apply(_this, [d]); });
        this.socket.on('end', function () { _this.connectionEstablished = false; });
        this.socket.on('error', function () { _this.connectionEstablished = false; });
    };
    Connection.prototype.resume = function (state) {
        this.socket = state.socket;
        this.context = state.context;
        this.queue = state.queue;
        this.connectionEstablished = state.connectionEstablished;
    };
    Connection.prototype.uninit = function () {
        return {
            socket: this.socket,
            context: this.context,
            queue: this.queue,
            connectionEstablished: this.connectionEstablished
        };
    };
    Connection.prototype.disconnect = function () {
        if (this.connectionEstablished) {
            this.socket.end();
        }
    };
    Connection.prototype.onData = function (data) {
        this.backlog += data;
        var n = this.backlog.indexOf('\n');
        while (~n) {
            var res = this.backlog.substring(0, n);
            if (this.backlog[n - 1] == '\r') {
                res = this.backlog.substring(0, n - 1);
            }
            if (this.context.logReceivedMessages)
                console.log("<= ", res);
            this.context.dataCallback(new Message_1.Message(res));
            this.backlog = this.backlog.substring(n + 1);
            n = this.backlog.indexOf('\n');
        }
    };
    Connection.prototype.write = function (msg) {
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
                var date = new Date().getTime();
                for (var i = 0; i < msg.length; i++) {
                    this.queue.queue(new OutMessage(msg[i], date + (this.interval * i)));
                }
            }
        }
        else {
            this.queue.queue({ "timestamp": msg.timestamp, "message": msg.message });
        }
    };
    Connection.prototype.raw = function (msg) {
        if (this.context.logSentMessages)
            console.log("=> ", msg);
        this.socket.write(msg + "\r\n");
    };
    Connection.prototype.clone = function () {
        return this;
    };
    Connection.prototype.toString = function () {
        return "[" + this.context.host + ":" + (this.context.ssl ? "+" : "") + this.context.port.toString() + " Connection]";
    };
    Object.defineProperty(Connection.prototype, "host", {
        get: function () {
            return this.context.host;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "port", {
        get: function () {
            return this.context.port;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "ssl", {
        get: function () {
            return this.context.ssl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "display", {
        get: function () {
            return this.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "connected", {
        get: function () {
            return this.connectionEstablished;
        },
        enumerable: true,
        configurable: true
    });
    return Connection;
}());
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map