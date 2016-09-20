
import net = require('net');
import tls = require('tls');
import {IConnectionContext} from './IConnectionContext';
import {IModule} from './IModule';
import {ICloneable} from './ICloneable';
import {Message} from './Message';
import {ISocket} from './ISocket';

let PriorityQueue = require('js-priority-queue');

class OutMessage {
    message : string;
    timestamp : number;

    constructor(msg:string, ts:number = (new Date().getTime())) {
        this.message = msg;
        this.timestamp = ts;
    }
}

export class Connection implements ICloneable, IModule<IConnectionContext> {
    get host() :string { 
        return this.context.host;
    }
    get port() :number { 
        return this.context.port;
    }
    get ssl() :boolean { 
        return this.context.ssl;
    }
    get display() :string {
        return this.toString();
    }
    get connected() :boolean {
        return this.connectionEstablished;
    }
    get context() : IConnectionContext {
        return this._context;
    }

    // Like a default constructor 
    init(context : IConnectionContext) : void {
        this._context = context;
        context.connection = this;

        let connectionEstablished = () => {
             this.connectionEstablished = true;
             this.context.connectionEstablishedCallback(this);
        };

        this.socket = context.createConnection(connectionEstablished);

        this.socket.setEncoding('utf8');
        this.socket.on('data', (d:string) => this.onData.apply(this, [d]));
        this.socket.on('end', () => { this.connectionEstablished = false; });
        this.socket.on('error', () => { this.connectionEstablished = false; } );
    }

    // Like a copy constructor
    resume(state : any) : void {
        this.socket = state.socket;
        this.context = state.context;
        this.queue = state.queue;
        this.connectionEstablished = state.connectionEstablished;
    }

    // Like a destructor, but returns state
    uninit() : any {
        return {
            socket: this.socket,
            context: this.context,
            queue: this.queue,
            connectionEstablished: this.connectionEstablished
        };
    }

    disconnect() : void {
        
        if (this.connectionEstablished) {

            this.socket.disconnect();
        }
    }


    // http://stackoverflow.com/a/10012306/486058
    private onData(data : string) {
        this.backlog += data;
        let n = this.backlog.indexOf('\n');

        // got a \n? emit one or more 'line' events
        while (~n) {
            
            let res = this.backlog.substring(0, n);

            if (this.backlog[n-1] == '\r') {
                res = this.backlog.substring(0, n-1);
            }

            if (this.context.logReceivedMessages) console.log("<= ", res);
            
            // Clear the backlog of the current message first. We may get another 
            // callback in the middle of our current msg, when using non-async endpoint (ie tests)
            this.backlog = this.backlog.substring(n + 1);

            this.context.dataCallback( new Message(res, this.context.channelPrefixes) );
            n = this.backlog.indexOf('\n');
        }

    }


    // Can accept a string or an array of strings to send.
    // Please use an array of strings to take use of the prioity queue.
    // You can also send in a {"timestamp":int, "message":string} object where 
    // timestamp is an epoch timestamp in milliseconds (normal epoch * 1000 or new Date().getTime())
    write(msg: string | string[] | any) {
        if (typeof msg == "string") {
            if (this.queue.length == 0) {
                this.raw(<string>msg);
            }
            else {
                this.queue.queue(new OutMessage(<string>msg));
            }
        }
        else if (msg.constructor == Array) {
            if (msg.length == 1 && this.queue.length == 0) {
                this.raw(msg[0]);
            }
            else {
                let date = new Date().getTime();

                for(let i = 0; i < msg.length; i++) {
                    this.queue.queue(new OutMessage(msg[i], date+ (this.interval * i)));
                }
            }
        }
        else {
            this.queue.queue({"timestamp":msg.timestamp, "message":msg.message});        
        }

    }

    clone() : ICloneable {
        return this;
    }

    toString() :string {
        return "[" + this.context.host + ":" + (this.context.ssl ? "+" : "") + this.context.port.toString() +" Connection]";
    }

    private raw(msg:string) {
        if (this.context.logSentMessages) console.log("=> ", msg);

        this.socket.write(msg + "\r\n");
    }

    private _context:IConnectionContext;

    private socket : ISocket;
    private connectionEstablished : boolean = false;
    private queue = new PriorityQueue({
        comparator: function(a : OutMessage, b : OutMessage) { 
            return a.timestamp-b.timestamp;
        }});
    private interval:number = 200;
    private backlog:string = "";
}