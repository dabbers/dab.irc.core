"use strict";
(function (ModeType) {
    ModeType[ModeType["User"] = 0] = "User";
    ModeType[ModeType["Channel"] = 1] = "Channel";
    ModeType[ModeType["UMode"] = 2] = "UMode";
})(exports.ModeType || (exports.ModeType = {}));
var ModeType = exports.ModeType;
(function (ModeChangeType) {
    ModeChangeType[ModeChangeType["Adding"] = 0] = "Adding";
    ModeChangeType[ModeChangeType["Removing"] = 1] = "Removing";
})(exports.ModeChangeType || (exports.ModeChangeType = {}));
var ModeChangeType = exports.ModeChangeType;
var Mode = (function () {
    function Mode() {
    }
    Object.defineProperty(Mode.prototype, "display", {
        get: function () {
            return (this.change == ModeChangeType.Adding ? "+" : "-") +
                this.character + (this.argument ? " " + this.argument : "");
        },
        enumerable: true,
        configurable: true
    });
    return Mode;
}());
exports.Mode = Mode;
//# sourceMappingURL=Mode.js.map