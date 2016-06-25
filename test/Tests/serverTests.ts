import tsUnit = require('tsunit.external/tsUnit');
import * as Core from '../../src/';

class testSocket implements Core.ISocket {
    constructor() {
    }
    setEncoding(enc: string) : void {

    }

    on(event: string, cb : Function) : void {
        if (event == "data")
            this.callback = cb;
    }

    write(data:  string) : void {
        console.log(this.callback, data);
        this.callback(":user WROTE " + data + "\r\n");
    }
    
    disconnect() : void {

    }

    callback : Function;
}


class SampleIRCContext implements Core.IConnectionContext {
    connection: Core.Connection;
    me: Core.User = new Core.User("dabirc", "testident", null);
    
    host: string = "irc.dab.biz";
    port: number = 6697;
    ssl: boolean = true;
    rejectUnauthedCerts: boolean = false;

    socket : testSocket;

    onConnect : () => any;

    constructor() {
        this.me.name = "Real Name";
    }

    commandsFound : {[cmd: string ] :  number} = {};

    dataCallback: (d: Core.Message) => any = (d:Core.Message) => {
        this.commandsFound[d.command] = (this.commandsFound[d.command] || 0) + 1; 
    };

    createConnection(cb:() => any): Core.ISocket {
        this.socket = new testSocket();
        this.onConnect = cb;
        return this.socket;
    }

    connectionEstablishedCallback: (c:Core.Connection) => any = (c:Core.Connection) => {  
        c.write("NICK " + this.me.nick);
        c.write("USER " + this.me.ident + " 8 * :" + this.me.name);
    }

    logSentMessages: boolean;
    logReceivedMessages: boolean;
}

export class ServerTests extends tsUnit.TestClass {
    privmsgTestSimple() {
        var data = ":servr 001 badderz :Welcome to the Orbital Link IRC Network badderz!baditp@216.244.78.186\r\n" +
            ":servr 002 badderz :Your host is servr, running version Unreal3.2.10.5\r\n" +
            ":servr 003 badderz :This server was created Sat Sep 12 2015 at 04:46:47 EDT\r\n" + 
            ":servr 004 badderz navi.orbital.link Unreal3.2.10.5 iowghraAsORTVSxNCWqBzvdHtGpI lvhopsmntikrRcaqOALQbSeIKVfMCuzNTGjZ\r\n" + 
            ":servr 005 badderz CMDS=MAXCHANNELS=60 CHANLIMIT=#:60 MAXLIST=b:60,e:60,I:60 :are supported by this server\r\n" + 
            ":servr 005 badderz CHANTYPES=# PREFIX=(qaohv)~&@%+ NETWORK=Orbital-Link CASEMAPPING=ascii EXTBAN=~,qjncrRa :are supported by this server\r\n" + 
            ";";

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