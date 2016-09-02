
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
}