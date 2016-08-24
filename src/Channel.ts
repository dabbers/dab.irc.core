import {ICloneable} from './ICloneable';
import {Target} from './ITarget';
import {Topic} from './Topic';

export class Channel implements Target.ITarget {
    display: string;
    topic: Topic;

    constructor(display:string, tolower:boolean = true) {
        // ':' will NEVER be allowed as a channel name (reserved character). remove it if it's in here
        if (display[0] == ':') display = display.substr(1);

        this.display = display;
        if (tolower) this.display = this.display.toLocaleLowerCase();
    }

    toString() :string {
        return "[" + this.display + " Channel]";
    }
    
    clone() : Target.ITarget {
        return this;
    }

    get target() : string {
        return this.display;
    }
}