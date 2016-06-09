import {Connection} from './Connection';
import {User} from './User';
import {Message} from './Message';

export interface IConnectionContext {
    connection: Connection;
    me: User;
    
    host: string;
    port: number;
    ssl: boolean;
    rejectUnauthedCerts: boolean;

    dataCallback: (d: Message) => any;

    logSentMessages: boolean;
    logReceivedMessages: boolean;
}