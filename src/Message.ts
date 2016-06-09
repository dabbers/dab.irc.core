import {ICloneable} from './ICloneable';
import {Target} from './ITarget';

// A message object.
export class Message implements ICloneable {
    // The string separated by spaces
    tokenized: string[];
    // Who this message is from (Server or User)
    from: Target.ITarget;
    // The command this message is (Notice, Privmsg, etc)
    command: string;
    // The first word after the 2nd colon
    firstWord: string;

    // Timestamp this message was received
    timestamp: Date;

    // The full raw line
    raw: string;

    // Take a raw IRC line and do some basic parsing with it.
    constructor(line:string, channelPrefixes:string[] = ["#"]) {
        this.tokenized = line.split(' ');
        this.raw = line;
        this.timestamp = new Date();
        this.command = (
            this.tokenized[0] == "PING" || this.tokenized[0] == "ERROR" 
                ? this.tokenized[0] 
                : this.tokenized[1]
        );

        // find the first word after the 2nd occurence of :
        // (all messages begin with : as the from user)
        for(var i = 1; i < this.tokenized.length; i++) {
            if (this.tokenized[i][0] == ':') {
                this.firstWord = this.tokenized[i].substr(1);
                break;
            }
        }

        if (!this.firstWord) this.firstWord = this.tokenized[0];

        this.from = Target.ResolveTarget(this.tokenized[0], channelPrefixes);
    }
    clone() : ICloneable {
        var cloneObj:Message = new (this.constructor());
        
        cloneObj.tokenized = JSON.parse(JSON.stringify(this.tokenized));
        cloneObj.from =  this.from.clone();   
        cloneObj.command = this.command;
        cloneObj.firstWord = this.firstWord;
        cloneObj.timestamp = this.timestamp;
        cloneObj.raw = this.raw;
            
        return cloneObj;
    }

    toString() :string {
        return "[" + this.command + " Message]";
    }
}