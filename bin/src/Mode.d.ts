export declare enum ModeType {
    User = 0,
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
    display: string;
}