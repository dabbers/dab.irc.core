"use strict";
var Channel_1 = require('./Channel');
var User_1 = require('./User');
var Server_1 = require('./Server');
var Target;
(function (Target) {
    function ResolveTarget(target, channelPrefixes) {
        if (channelPrefixes === void 0) { channelPrefixes = ["#"]; }
        if (target[0] == ":")
            target = target.substr(1);
        if (channelPrefixes.indexOf(target[0]) != -1) {
            return new Channel_1.Channel(target);
        }
        else {
            var nick = target.split('!');
            if (nick[1]) {
                var ident_host = nick[1].split('@');
                return new User_1.User(nick[0], ident_host[0], ident_host[1]);
            }
            else {
                return new Server_1.Server(target);
            }
        }
    }
    Target.ResolveTarget = ResolveTarget;
})(Target = exports.Target || (exports.Target = {}));
//# sourceMappingURL=ITarget.js.map