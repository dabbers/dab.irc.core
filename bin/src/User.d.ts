import { Target } from './ITarget';
import { Mode } from './Mode';
export declare class User implements Target.ITarget {
    nick: string;
    ident: string;
    host: string;
    modes: Mode[];
    name: string;
    attributes: string[];
    constructor(nick: string, ident: string, host: string);
    toString(): string;
    clone(): Target.ITarget;
    target: string;
    display: string;
}
