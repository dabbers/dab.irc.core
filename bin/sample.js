"use strict";
var Connection_1 = require('./src/Connection');
var User_1 = require('./src/User');
var SampleIRCContext = (function () {
    function SampleIRCContext() {
        var _this = this;
        this.me = new User_1.User("dabirc", "dabitp", null);
        this.host = "irc.dab.biz";
        this.port = 6697;
        this.ssl = true;
        this.rejectUnauthedCerts = false;
        this.dataCallback = function (d) {
            if (d.command == "PING") {
                _this.connection.write("PONG " + d.tokenized[1]);
            }
            else if (d.command == "PRIVMSG" && d.firstWord == "!test") {
                _this.connection.write("PRIVMSG " + d.from.target + " :Testing 123");
            }
            else {
                console.log(d);
            }
        };
        this.me.name = "David";
    }
    return SampleIRCContext;
}());
var con = new Connection_1.Connection().init(new SampleIRCContext());
//# sourceMappingURL=sample.js.map