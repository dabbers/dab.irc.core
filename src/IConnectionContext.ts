import {Connection} from './Connection';
import {User} from './User';
import {Message} from './Message';
import net = require('net');
import tls = require('tls');
import {ISocket} from './ISocket';

export interface IConnectionContext {
    //connection: Connection;
    me: User;
    
    host: string;
    port: number;
    ssl: boolean;
    rejectUnauthedCerts: boolean;

    dataCallback: (d: Message) => any;

    createConnection(cb:() => any): ISocket;

    connectionEstablishedCallback: (c: Connection) => any;
    
    logSentMessages: boolean;
    logReceivedMessages: boolean;
    channelPrefixes:string[];
}