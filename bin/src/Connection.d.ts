import { IConnectionContext } from './IConnectionContext';
import { IModule } from './IModule';
import { ICloneable } from './ICloneable';
export declare class Connection implements ICloneable, IModule<IConnectionContext> {
    readonly host: string;
    readonly port: number;
    readonly ssl: boolean;
    readonly display: string;
    readonly connected: boolean;
    readonly context: IConnectionContext;
    init(context: IConnectionContext, noResume?: boolean): void;
    resume(context: IConnectionContext, state: any): void;
    uninit(): any;
    disconnect(): void;
    private onData(data);
    write(msg: string | string[] | any): void;
    clone(): ICloneable;
    toString(): string;
    private raw(msg);
    private _context;
    private socket;
    private connectionEstablished;
    private queue;
    private interval;
    private backlog;
}
