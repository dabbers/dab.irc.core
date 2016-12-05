import {Target} from './ITarget';

export class BaseServer implements Target.ITarget {
    host: string;
    constructor(host:string) {
        this.host = host;
    }

    toString() :string {
        return "[" + this.display + " BaseServer]";
    }
    
    clone() : Target.ITarget {
        return this;
    }

    get display() : string {
        return this.host;
    }

    get target() : string {
        return this.host;
    }
}