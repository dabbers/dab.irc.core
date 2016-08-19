"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tsUnit = require('tsunit.external/tsUnit');
var Core = require('../../src/');
var testSocket = (function () {
    function testSocket() {
    }
    testSocket.prototype.setEncoding = function (enc) {
    };
    testSocket.prototype.on = function (event, cb) {
        if (event == "data")
            this.callback = cb;
    };
    testSocket.prototype.write = function (data) {
        this.callback(":user WROTE " + data + "\r\n");
    };
    testSocket.prototype.disconnect = function () {
    };
    return testSocket;
}());
var SampleIRCContext = (function () {
    function SampleIRCContext() {
        var _this = this;
        this.me = new Core.User("dabirc", "testident", null);
        this.host = "irc.dab.biz";
        this.port = 6697;
        this.ssl = true;
        this.rejectUnauthedCerts = false;
        this.commandsFound = {};
        this.dataCallback = function (d) {
            _this.commandsFound[d.command] = (_this.commandsFound[d.command] || 0) + 1;
        };
        this.connectionEstablishedCallback = function (c) {
            c.write("NICK " + _this.me.nick);
            c.write("USER " + _this.me.ident + " 8 * :" + _this.me.name);
        };
        this.logSentMessages = false;
        this.logReceivedMessages = false;
        this.me.name = "Real Name";
    }
    SampleIRCContext.prototype.createConnection = function (cb) {
        this.socket = new testSocket();
        this.onConnect = cb;
        return this.socket;
    };
    return SampleIRCContext;
}());
var ServerTests = (function (_super) {
    __extends(ServerTests, _super);
    function ServerTests() {
        _super.apply(this, arguments);
    }
    ServerTests.prototype.privmsgTestSimple = function () {
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
    };
    return ServerTests;
}(tsUnit.TestClass));
exports.ServerTests = ServerTests;
//# sourceMappingURL=serverTests.js.map