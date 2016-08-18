import {ICloneable} from './ICloneable';
import {Target} from './ITarget';

export interface MessageTagDictionary {
    [key: string] : string;
}

// A message object.
export class Message implements ICloneable {

    // The string separated by spaces
    get tokenized(): string[] {
        return this._tokenized;
    }
    // Who this message is from (Server or User)
    get from(): Target.ITarget {
        return this._from;
    }
    // The command this message is (Notice, Privmsg, etc)
    get command(): string {
        return this._command;
    }
    // The first word after the 2nd colon
    get firstWord(): string {
        return this._firstWord;
    }
    get message(): string {
        return this._message;
    }
    // Timestamp this message was received
    get timestamp(): Date {
        return this._timestamp;
    }
    // The full raw line
    get raw(): string {
        return this._raw;
    }
    get messageTags() : MessageTagDictionary {
        return this._messageTags;
    }
    
    // Take a raw IRC line and do some basic parsing with it.
    constructor(line:string | Message, channelPrefixes:string[] = ["#", "&"]) {
        if (line instanceof Message) {
            this._tokenized  = line.tokenized;
            this._from       = line.from;
            this._command    = line.command;
            this._firstWord  = line.firstWord;
            this._timestamp  = line.timestamp;
            this._raw        = line.raw;
            this._message    = line.message;
            this._messageTags= line.messageTags;
        }
        else {
            this._tokenized = line.split(' ');
            this._raw = line;
            this._timestamp = new Date();

            let userStart = 0;

            // Check for message-tags first
            if (this.tokenized[userStart][0] == '@') {
                // Remove the message tag portion of the message, and remove the leading @
                let mt = this._tokenized.splice(0,1)[0].substr(1);
                let tags = mt.split(';');

                for(let t in tags) {
                    let ind = tags[t].indexOf("=");
                    if (ind != -1) {
                        // don't include =, -1 to make sure we don't include it
                        let key = tags[t].substr(0, ind);
                        let val = tags[t].substr(ind + 1); 

                        this.messageTags[key] = val.replace("\\:", ";").replace("\\s", " ").replace("\\r", "\r").replace("\\n","\n");
                    }
                    else {
                        this.messageTags[tags[t]] = "";
                    }
                }
            }

            this._command = (
                this.tokenized[userStart] == "PING" || this.tokenized[userStart] == "ERROR" || this.tokenized[userStart] == "PONG"
                    ? this.tokenized[userStart] 
                    : this.tokenized[userStart + 1]
            );

            let temp = "";

            // find the first word after the 2nd occurence of :
            // (all messages begin with : as the from user)
            for(let i = userStart + 1; i < this.tokenized.length; i++) {
                if (this.firstWord) {
                    temp += " " + this.tokenized[i];
                }
                if (this.tokenized[i][0] == ':') {
                    this._firstWord = this.tokenized[i].substr(1);
                    
                    temp = this.firstWord;
                }
            }

            if (!this.firstWord) {
                this._firstWord = "";
                this._message = "";
            } 
            else {
                this._message = temp;
            }

            this._from = Target.ResolveTarget(this.tokenized[userStart], channelPrefixes);
        }
    }
    clone() : ICloneable {
        let cloneObj:Message = new (this.constructor());
        
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
    
    // The string separated by spaces
    protected _tokenized: string[];
    // Who this message is from (Server or User)
    protected _from: Target.ITarget;
    // The command this message is (Notice, Privmsg, etc)
    protected _command: string;
    // The first word after the 2nd colon
    protected _firstWord: string;

    protected _message: string;

    // Timestamp this message was received
    protected _timestamp: Date;

    // The full raw line
    protected _raw: string;

    protected _messageTags: MessageTagDictionary = {};

}