"use strict";
var ITarget_1 = require('./ITarget');
var Message = (function () {
    function Message(line, channelPrefixes) {
        if (channelPrefixes === void 0) { channelPrefixes = ["#", "&"]; }
        this._messageTags = {};
        if (line instanceof Message) {
            this._tokenized = line.tokenized;
            this._from = line.from;
            this._command = line.command;
            this._firstWord = line.firstWord;
            this._timestamp = line.timestamp;
            this._raw = line.raw;
            this._message = line.message;
            this._messageTags = line.messageTags;
        }
        else {
            this._tokenized = line.split(' ');
            this._raw = line;
            this._timestamp = new Date();
            var userStart = 0;
            if (this.tokenized[userStart][0] == '@') {
                userStart = 1;
                var mt = this.tokenized[0].substr(1);
                var tags = mt.split(';');
                for (var t in tags) {
                    var ind = tags[t].indexOf("=");
                    if (ind != -1) {
                        var key = tags[t].substr(0, ind);
                        var val = tags[t].substr(ind + 1);
                        this.messageTags[key] = val.replace("\\:", ";").replace("\\s", " ").replace("\\r", "\r").replace("\\n", "\n");
                    }
                    else {
                        this.messageTags[tags[t]] = "";
                    }
                }
            }
            this._command = (this.tokenized[userStart] == "PING" || this.tokenized[userStart] == "ERROR"
                ? this.tokenized[userStart]
                : this.tokenized[userStart + 1]);
            var temp = "";
            for (var i = userStart + 1; i < this.tokenized.length; i++) {
                if (this.firstWord) {
                    temp += " " + this.tokenized[i];
                }
                if (this.tokenized[i][0] == ':') {
                    this._firstWord = this.tokenized[i].substr(1);
                    temp = this.firstWord;
                }
            }
            if (!this.firstWord) {
                this._firstWord = this.tokenized[userStart];
                this._message = line.substr(1);
            }
            else {
                this._message = temp;
            }
            this._from = ITarget_1.Target.ResolveTarget(this.tokenized[userStart], channelPrefixes);
        }
    }
    Object.defineProperty(Message.prototype, "tokenized", {
        get: function () {
            return this._tokenized;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "from", {
        get: function () {
            return this._from;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "command", {
        get: function () {
            return this._command;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "firstWord", {
        get: function () {
            return this._firstWord;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "timestamp", {
        get: function () {
            return this._timestamp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "raw", {
        get: function () {
            return this._raw;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "messageTags", {
        get: function () {
            return this._messageTags;
        },
        enumerable: true,
        configurable: true
    });
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