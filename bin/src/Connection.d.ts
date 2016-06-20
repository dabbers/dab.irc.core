import { IConnectionContext } from './IConnectionContext';
import { IModule } from './IModule';
import { ICloneable } from './ICloneable';
export declare class Connection implements ICloneable, IModule<IConnectionContext> {
    private context;
    private socket;
    private connectionEstablished;
    private queue;
    private interval;
    private backlog;
    init(context: IConnectionContext): void;
    resume(state: any): void;
    uninit(): any;
    disconnect(): void;
    private onData(data);
    write(msg: string | string[] | any): void;
    private raw(msg);
    clone(): ICloneable;
    toString(): string;
    host: string;
    port: number;
    ssl: boolean;
    display: string;
    connected: boolean;
}
