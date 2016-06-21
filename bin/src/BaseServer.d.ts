import { Target } from './ITarget';
export declare class BaseServer implements Target.ITarget {
    host: string;
    constructor(host: string);
    toString(): string;
    clone(): Target.ITarget;
    display: string;
    target: string;
}
