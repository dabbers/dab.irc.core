
import {Target} from './ITarget';

export enum ModeType {
    ChannelUser,
    Channel,
    UMode
}
export enum ModeChangeType {
    Adding,
    Removing
}

export class Mode {
    character: string;
    type: ModeType;
    change: ModeChangeType;
    argument: string;
    target: Target.ITarget;

    get display():string {
        return (this.change == ModeChangeType.Adding ? "+" : "-") + 
            this.character + (this.argument ? " " + this.argument : "");
    }

    isEqual(mode:Mode, matchChange: boolean = false) : boolean {
        return (mode.character == this.character) && (mode.argument == this.argument) && 
            (this.target.display == mode.target.display) && (!matchChange || this.change == mode.change) &&
            (this.type == mode.type);
    }

    indexIn(modes:Mode[]) : number {
        let index = -1;

        for(let i = 0; i < modes.length; i++) {
            if (modes[i].isEqual(this)) {
                index = i;
            }
        }

        return index;
    }

    removeFromList(modes:Mode[]) {
        let ind = this.indexIn(modes);
        if (ind != -1) {
            modes.splice(ind, 1);
        }
    }

    addToList(modes:Mode[]) {
        if (this.indexIn(modes) == -1) {
            modes.push(this);
        }
    }
}