import net = require('net');
import tls = require('tls');

import {Connection} from './src/Connection';
import {IConnectionContext} from './src/IConnectionContext';
import {Message} from './src/Message';
import {User} from './src/User';
import {ISocket} from './src/ISocket';
import {NodeSocket} from './src/NodeSocket';

class SampleIRCContext implements IConnectionContext {
    connection: Connection;
    me: User = new User("dabirc", "dabitp", null);
    
    host: string = "irc.dab.biz";
    port: number = 6697;
    ssl: boolean = true;
    rejectUnauthedCerts: boolean = false;

    constructor() {
        this.me.name = "David";
    }

    dataCallback: (d: Message) => any = (d:Message) => {
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

    createConnection(cb:() => any): ISocket {
        if (this.ssl) {
            return new NodeSocket(tls.connect(this.port, this.host, {rejectUnauthorized: this.rejectUnauthedCerts}, cb));
        }
        else {
            return new NodeSocket(net.createConnection(this.port, this.host, cb));            
        }
    }

    connectionEstablishedCallback: (c:Connection) => any = (c:Connection) => {  
        c.write("NICK " + this.me.nick);
        c.write("USER " + this.me.ident + " 8 * :" + this.me.name);
    }

    logSentMessages: boolean;
    logReceivedMessages: boolean;
}


var con = new Connection().init(new SampleIRCContext());
