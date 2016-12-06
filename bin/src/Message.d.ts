import { ICloneable } from './ICloneable';
import { Target } from './ITarget';
export declare class Message implements ICloneable {
    readonly tokenized: string[];
    readonly from: Target.ITarget;
    readonly command: string;
    readonly firstWord: string;
    readonly message: string;
    readonly timestamp: Date;
    readonly raw: string;
    readonly messageTags: {
        [key: string]: string;
    };
    constructor(line: string | Message, channelPrefixes?: string[]);
    clone(): ICloneable;
    toString(): string;
    updateFromReference(from: Target.ITarget): void;
    updateCommandString(cmd: string): void;
    protected _tokenized: string[];
    protected _from: Target.ITarget;
    protected _command: string;
    protected _firstWord: string;
    protected _message: string;
    protected _timestamp: Date;
    protected _raw: string;
    protected _messageTags: {
        [key: string]: string;
    };
}
