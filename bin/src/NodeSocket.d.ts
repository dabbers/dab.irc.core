import net = require('net');
import tls = require('tls');
import { ISocket } from './ISocket';
export declare class NodeSocket implements ISocket {
    constructor(socket: net.Socket | tls.ClearTextStream);
    setEncoding(enc: string): void;
    on(event: string, cb: Function): void;
    write(data: string): void;
    disconnect(): void;
    private socket;
}
