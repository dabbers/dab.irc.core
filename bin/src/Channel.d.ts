import { Target } from './ITarget';
import { Topic } from './Topic';
export declare class Channel implements Target.ITarget {
    display: string;
    topic: Topic;
    constructor(display: string, tolower?: boolean);
    toString(): string;
    clone(): Target.ITarget;
    readonly target: string;
}
