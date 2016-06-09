import {Connection} from './src/Connection';
import {IConnectionContext} from './src/IConnectionContext';
import {Message} from './src/Message';
import {User} from './src/User';

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

    logSentMessages: boolean;
    logReceivedMessages: boolean;
}


var con = new Connection().init(new SampleIRCContext());
