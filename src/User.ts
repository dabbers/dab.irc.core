import {ICloneable} from './ICloneable';
import {Target} from './ITarget';

export class User implements Target.ITarget {
    
    nick: string;
    ident: string;
    host: string;
    modes: Mode[];

    name: string;
    attributes: string[];

    constructor(nick:string, ident:string, host:string) {
        this.nick = nick;
        this.ident = ident;
        this.host = host;
    }

    toString() :string {
        return "[" + this.display + " User]";
    }
    
    clone() : Target.ITarget {
        return this;
    }

    get target() : string {
        return this.nick;
    }

    get display() : string {
        return this.nick + "!" + this.ident + "@" + this.host;
    }
}