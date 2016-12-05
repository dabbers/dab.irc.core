"use strict";
const Channel_1 = require('./Channel');
const User_1 = require('./User');
const BaseServer_1 = require('./BaseServer');
var Target;
(function (Target) {
    function ResolveTarget(target, channelPrefixes = ["#", "&"]) {
        if (target[0] == ":")
            target = target.substr(1);
        if (channelPrefixes.indexOf(target[0]) != -1) {
            return new Channel_1.Channel(target);
        }
        else {
            let nick = target.split('!');
            if (nick[1]) {
                let ident_host = nick[1].split('@');
                return new User_1.User(nick[0], ident_host[0], ident_host[1]);
            }
            else {
                return new BaseServer_1.BaseServer(target);
            }
        }
    }
    Target.ResolveTarget = ResolveTarget;
})(Target = exports.Target || (exports.Target = {}));
//# sourceMappingURL=ITarget.js.map