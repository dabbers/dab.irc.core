import { ICloneable } from './ICloneable';
import { Target } from './ITarget';
export declare class Message implements ICloneable {
    tokenized: string[];
    from: Target.ITarget;
    command: string;
    firstWord: string;
    message: string;
    timestamp: Date;
    raw: string;
    constructor(line: string | Message, channelPrefixes?: string[]);
    clone(): ICloneable;
    toString(): string;
    private _tokenized;
    private _from;
    private _command;
    private _firstWord;
    private _message;
    private _timestamp;
    private _raw;
}
