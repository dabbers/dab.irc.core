"use strict";
const tsUnit = require('tsunit.external/tsUnit');
const Core = require('../../src/');
class testSocket {
    constructor() {
    }
    setEncoding(enc) {
    }
    on(event, cb) {
        if (event == "data")
            this.callback = cb;
    }
    write(data) {
        this.callback(":user WROTE " + data + "\r\n");
    }
    disconnect() {
    }
}
class SampleIRCContext {
    constructor() {
        this.me = new Core.User("dabirc", "testident", null);
        this.host = "irc.dab.biz";
        this.port = 6697;
        this.ssl = true;
        this.rejectUnauthedCerts = false;
        this.commandsFound = {};
        this.dataCallback = (d) => {
            this.commandsFound[d.command] = (this.commandsFound[d.command] || 0) + 1;
        };
        this.connectionEstablishedCallback = (c) => {
            c.write("NICK " + this.me.nick);
            c.write("USER " + this.me.ident + " 8 * :" + this.me.name);
        };
        this.logSentMessages = false;
        this.logReceivedMessages = false;
        this.me.name = "Real Name";
    }
    createConnection(cb) {
        this.socket = new testSocket();
        this.onConnect = cb;
        return this.socket;
    }
}
class ServerTests extends tsUnit.TestClass {
    privmsgTestSimple() {
        var data = ":servr 001 dabirc :Welcome to the Orbital Link IRC Network dabirc!baditp@127.0.0.0\r\n" +
            ":servr 002 dabirc :Your host is servr, running version Unreal3.2.10.5\r\n" +
            ":servr 003 dabirc :This server was created Sat Sep 12 2015 at 04:46:47 EDT\r\n" +
            ":servr 004 dabirc navi.orbital.link Unreal3.2.10.5 iowghraAsORTVSxNCWqBzvdHtGpI lvhopsmntikrRcaqOALQbSeIKVfMCuzNTGjZ\r\n" +
            ":servr 005 dabirc CMDS=MAXCHANNELS=60 CHANLIMIT=#:60 MAXLIST=b:60,e:60,I:60 :are supported by this server\r\n" +
            ":servr 005 dabirc CHANTYPES=# PREFIX=(qaohv)~&@%+ NETWORK=Orbital-Link CASEMAPPING=ascii EXTBAN=~,qjncrRa :are supported by this server\r\n";
        var ctx = new SampleIRCContext();
        var connection = new Core.Connection().init(ctx);
        ctx.onConnect();
        ctx.socket.callback(data);
        this.isTruthy(ctx.commandsFound["001"], "Didn't find 001");
        this.areIdentical(1, ctx.commandsFound["001"]);
        this.isTruthy(ctx.commandsFound["002"], "Didn't find 002");
        this.areIdentical(1, ctx.commandsFound["002"]);
        this.isTruthy(ctx.commandsFound["003"], "Didn't find 003");
        this.areIdentical(1, ctx.commandsFound["003"]);
        this.isTruthy(ctx.commandsFound["004"], "Didn't find 004");
        this.areIdentical(1, ctx.commandsFound["004"]);
        this.isTruthy(ctx.commandsFound["005"], "Didn't find 005");
        this.areIdentical(2, ctx.commandsFound["005"]);
        this.isTruthy(ctx.commandsFound["WROTE"], "Didn't find WROTE");
        this.areIdentical(2, ctx.commandsFound["WROTE"]);
    }
}
exports.ServerTests = ServerTests;
//# sourceMappingURL=serverTests.js.map