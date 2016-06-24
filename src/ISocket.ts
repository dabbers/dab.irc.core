

export interface ISocket {
    setEncoding(enc: string) : void;

    on(event: string, cb : Function) : void;

    write(data:  string) : void;
    
    disconnect() : void;
}