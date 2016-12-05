"use strict";
const net = require('net');
const tls = require('tls');
const Connection_1 = require('./src/Connection');
const User_1 = require('./src/User');
const NodeSocket_1 = require('./src/NodeSocket');
class SampleIRCContext {
    constructor() {
        this.me = new User_1.User("dabirc", "dabitp", null);
        this.host = "irc.dab.biz";
        this.port = 6697;
        this.ssl = true;
        this.rejectUnauthedCerts = false;
        this.dataCallback = (d) => {
            if (d.command == "PING") {
                this.connection.write("PONG " + d.tokenized[1]);
            }
            else if (d.command == "PRIVMSG" && d.firstWord == "!test") {
                this.connection.write("PRIVMSG " + d.from.target + " :Testing 123");
            }
            else {
                console.log(d);
            }
        };
        this.connectionEstablishedCallback = (c) => {
            this.connection = c;
            c.write("NICK " + this.me.nick);
            c.write("USER " + this.me.ident + " 8 * :" + this.me.name);
        };
        this.me.name = "David";
    }
    createConnection(cb) {
        if (this.ssl) {
            return new NodeSocket_1.NodeSocket(tls.connect(this.port, this.host, { rejectUnauthorized: this.rejectUnauthedCerts }, cb));
        }
        else {
            return new NodeSocket_1.NodeSocket(net.createConnection(this.port, this.host, cb));
        }
    }
}
var con = new Connection_1.Connection().init(new SampleIRCContext());
//# sourceMappingURL=sample.js.map