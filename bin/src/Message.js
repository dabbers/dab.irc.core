"use strict";
var ITarget_1 = require('./ITarget');
var Message = (function () {
    function Message(line, channelPrefixes) {
        if (channelPrefixes === void 0) { channelPrefixes = ["#"]; }
        this.tokenized = line.split(' ');
        this.raw = line;
        this.timestamp = new Date();
        this.command = (this.tokenized[0] == "PING" || this.tokenized[0] == "ERROR"
            ? this.tokenized[0]
            : this.tokenized[1]);
        for (var i = 1; i < this.tokenized.length; i++) {
            if (this.tokenized[i][0] == ':') {
                this.firstWord = this.tokenized[i].substr(1);
                break;
            }
        }
        if (!this.firstWord)
            this.firstWord = this.tokenized[0];
        this.from = ITarget_1.Target.ResolveTarget(this.tokenized[0], channelPrefixes);
    }
    Message.prototype.clone = function () {
        var cloneObj = new (this.constructor());
        cloneObj.tokenized = JSON.parse(JSON.stringify(this.tokenized));
        cloneObj.from = this.from.clone();
        cloneObj.command = this.command;
        cloneObj.firstWord = this.firstWord;
        cloneObj.timestamp = this.timestamp;
        cloneObj.raw = this.raw;
        return cloneObj;
    };
    Message.prototype.toString = function () {
        return "[" + this.command + " Message]";
    };
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=Message.js.map