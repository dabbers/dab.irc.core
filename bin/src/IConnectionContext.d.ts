import { Connection } from './Connection';
import { User } from './User';
import { Message } from './Message';
import { ISocket } from './ISocket';
export interface IConnectionContext {
    me: User;
    host: string;
    port: number;
    ssl: boolean;
    rejectUnauthedCerts: boolean;
    dataCallback: (d: Message) => any;
    createConnection(cb: () => any): ISocket;
    connectionEstablishedCallback: (c: Connection) => any;
    logSentMessages: boolean;
    logReceivedMessages: boolean;
    channelPrefixes: string[];
}
