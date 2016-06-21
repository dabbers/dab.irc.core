import {Connection} from './Connection';
import {User} from './User';
import {Message} from './Message';
import net = require('net');
import tls = require('tls');

export interface IConnectionContext {
    connection: Connection;
    me: User;
    
    host: string;
    port: number;
    ssl: boolean;
    rejectUnauthedCerts: boolean;

    dataCallback: (d: Message) => any;

    createConnection(cb:() => any): net.Socket | tls.ClearTextStream;

    connectionEstablishedCallback: (c: Connection) => any;
    
    logSentMessages: boolean;
    logReceivedMessages: boolean;
}