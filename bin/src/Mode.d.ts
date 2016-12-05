import { Target } from './ITarget';
export declare enum ModeType {
    ChannelUser = 0,
    Channel = 1,
    UMode = 2,
}
export declare enum ModeChangeType {
    Adding = 0,
    Removing = 1,
}
export declare class Mode {
    character: string;
    type: ModeType;
    change: ModeChangeType;
    argument: string;
    destination: Target.ITarget;
    readonly display: string;
    isEqual(mode: Mode, matchChange?: boolean): boolean;
    indexIn(modes: Mode[]): number;
    removeFromList(modes: Mode[]): void;
    addToList(modes: Mode[]): void;
}
