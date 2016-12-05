"use strict";
const ITarget_1 = require('./ITarget');
class Message {
    constructor(line, channelPrefixes = ["#", "&"]) {
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
            this._tokenized = line.toString().split(' ');
            this._raw = line;
            this._timestamp = new Date();
            let userStart = 0;
            if (this.tokenized[userStart][0] == '@') {
                let mt = this._tokenized.splice(0, 1)[0].substr(1);
                let tags = mt.split(';');
                for (let t in tags) {
                    let ind = tags[t].indexOf("=");
                    if (ind != -1) {
                        let key = tags[t].substr(0, ind);
                        let val = tags[t].substr(ind + 1);
                        this.messageTags[key] = val.replace("\\:", ";").replace("\\s", " ").replace("\\r", "\r").replace("\\n", "\n");
                    }
                    else {
                        this.messageTags[tags[t]] = "";
                    }
                }
            }
            this._command = (this.tokenized[userStart] == "PING" || this.tokenized[userStart] == "ERROR" || this.tokenized[userStart] == "PONG"
                ? this.tokenized[userStart]
                : this.tokenized[userStart + 1]);
            let temp = "";
            for (let i = userStart + 1; i < this.tokenized.length; i++) {
                if (this.firstWord) {
                    temp += " " + this.tokenized[i];
                }
                if (this.tokenized[i][0] == ':') {
                    this._firstWord = this.tokenized[i].substr(1);
                    temp = this.firstWord;
                }
            }
            if (!this.firstWord) {
                this._firstWord = "";
                this._message = "";
            }
            else {
                this._message = temp;
            }
            this._from = ITarget_1.Target.ResolveTarget(this.tokenized[userStart], channelPrefixes);
        }
    }
    get tokenized() {
        return this._tokenized;
    }
    get from() {
        return this._from;
    }
    get command() {
        return this._command;
    }
    get firstWord() {
        return this._firstWord;
    }
    get message() {
        return this._message;
    }
    get timestamp() {
        return this._timestamp;
    }
    get raw() {
        return this._raw;
    }
    get messageTags() {
        return this._messageTags;
    }
    clone() {
        let cloneObj = new (this.constructor());
        cloneObj._tokenized = JSON.parse(JSON.stringify(this.tokenized));
        cloneObj._from = this.from.clone();
        cloneObj._command = this.command;
        cloneObj._firstWord = this.firstWord;
        cloneObj._timestamp = this.timestamp;
        cloneObj._raw = this.raw;
        return cloneObj;
    }
    toString() {
        return "[" + this.command + " Message]";
    }
    updateFromReference(from) {
        this._from = from;
    }
    updateCommandString(cmd) {
        this._command = cmd;
    }
}
exports.Message = Message;
//# sourceMappingURL=Message.js.map