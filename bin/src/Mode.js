"use strict";
(function (ModeType) {
    ModeType[ModeType["ChannelUser"] = 0] = "ChannelUser";
    ModeType[ModeType["Channel"] = 1] = "Channel";
    ModeType[ModeType["UMode"] = 2] = "UMode";
})(exports.ModeType || (exports.ModeType = {}));
var ModeType = exports.ModeType;
(function (ModeChangeType) {
    ModeChangeType[ModeChangeType["Adding"] = 0] = "Adding";
    ModeChangeType[ModeChangeType["Removing"] = 1] = "Removing";
})(exports.ModeChangeType || (exports.ModeChangeType = {}));
var ModeChangeType = exports.ModeChangeType;
class Mode {
    get display() {
        return (this.change == ModeChangeType.Adding ? "+" : "-") +
            this.character + (this.argument ? " " + this.argument : "");
    }
    isEqual(mode, matchChange = false) {
        return (mode.character == this.character) && (mode.argument == this.argument) &&
            (this.destination.display == mode.destination.display) && (!matchChange || this.change == mode.change) &&
            (this.type == mode.type);
    }
    indexIn(modes) {
        let index = -1;
        for (let i = 0; i < modes.length; i++) {
            if (modes[i].isEqual(this)) {
                index = i;
            }
        }
        return index;
    }
    removeFromList(modes) {
        let ind = this.indexIn(modes);
        if (ind != -1) {
            modes.splice(ind, 1);
        }
    }
    addToList(modes) {
        if (this.indexIn(modes) == -1) {
            modes.push(this);
        }
    }
}
exports.Mode = Mode;
//# sourceMappingURL=Mode.js.map