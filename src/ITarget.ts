import {Channel} from './Channel';
import {User} from './User';
import {BaseServer} from './BaseServer';
import {ICloneable} from './ICloneable';

export namespace Target {
    export interface ITarget extends ICloneable {
        display: string;
        target: string;
        clone() : ITarget;
    }

    // Given a string, determine the type this is targeting (Server, Channel, or User)
    export function ResolveTarget(target:string, channelPrefixes:string[] = ["#"]):ITarget {
        if (target[0] == ":") target = target.substr(1);

        // Is channel?
        if (channelPrefixes.indexOf(target[0]) != -1) {
            return new Channel(target);
        }
        else {
            // Is user?
            let nick = target.split('!');
            if (nick[1]) {
                let ident_host = nick[1].split('@');

                return new User(nick[0], ident_host[0], ident_host[1]);
            }
            else {
                return new BaseServer(target);
            }
            
        }
    }
}


