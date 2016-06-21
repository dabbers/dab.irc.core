import { ICloneable } from './ICloneable';
import { Target } from './ITarget';
export interface MessageTagDictionary {
    [key: string]: string;
}
export declare class Message implements ICloneable {
    tokenized: string[];
    from: Target.ITarget;
    command: string;
    firstWord: string;
    message: string;
    timestamp: Date;
    raw: string;
    messageTags: MessageTagDictionary;
    constructor(line: string | Message, channelPrefixes?: string[]);
    clone(): ICloneable;
    toString(): string;
    protected _tokenized: string[];
    protected _from: Target.ITarget;
    protected _command: string;
    protected _firstWord: string;
    protected _message: string;
    protected _timestamp: Date;
    protected _raw: string;
    protected _messageTags: MessageTagDictionary;
}
