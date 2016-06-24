import net = require('net');
import tls = require('tls');

import {ISocket} from './ISocket';


export class NodeSocket implements ISocket {

    constructor(socket : net.Socket | tls.ClearTextStream) {
        this.socket = socket;
    }

    setEncoding(enc: string) : void {
        this.socket.setEncoding(enc);
    }

    on(event: string, cb : Function) : void {
        this.socket.on(event, cb);
    }

    write(data:  string) : void {
        this.socket.write(data);
    }

    disconnect() : void {
        this.socket.end();
    }
    
    private socket : net.Socket | tls.ClearTextStream = null;
} 