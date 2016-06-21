"use strict";
var net = require('net');
var tls = require('tls');
var Connection_1 = require('./src/Connection');
var User_1 = require('./src/User');
var SampleIRCContext = (function () {
    function SampleIRCContext() {
        var _this = this;
        this.me = new User_1.User("dabirc", "dabitp", null);
        this.host = "irc.dab.biz";
        this.port = 6697;
        this.ssl = true;
        this.rejectUnauthedCerts = false;
        this.dataCallback = function (d) {
            if (d.command == "PING") {
                _this.connection.write("PONG " + d.tokenized[1]);
            }
            else if (d.command == "PRIVMSG" && d.firstWord == "!test") {
                _this.connection.write("PRIVMSG " + d.from.target + " :Testing 123");
            }
            else {
                console.log(d);
            }
        };
        this.connectionEstablishedCallback = function (c) {
            c.write("NICK " + _this.me.nick);
            c.write("USER " + _this.me.ident + " 8 * :" + _this.me.name);
        };
        this.me.name = "David";
    }
    SampleIRCContext.prototype.createConnection = function (cb) {
        if (this.ssl) {
            return tls.connect(this.port, this.host, { rejectUnauthorized: this.rejectUnauthedCerts }, cb);
        }
        else {
            return net.createConnection(this.port, this.host, cb);
        }
    };
    return SampleIRCContext;
}());
var con = new Connection_1.Connection().init(new SampleIRCContext());
//# sourceMappingURL=sample.js.map