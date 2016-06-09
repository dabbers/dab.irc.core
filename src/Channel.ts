import {ICloneable} from './ICloneable';
import {Target} from './ITarget';
import {Topic} from './Topic';

export class Channel implements Target.ITarget {
    display: string;
    topic: Topic;

    constructor(display:string) {
        this.display = display;
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