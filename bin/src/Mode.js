var ModeType;
(function (ModeType) {
    ModeType[ModeType["User"] = 0] = "User";
    ModeType[ModeType["Channel"] = 1] = "Channel";
    ModeType[ModeType["UMode"] = 2] = "UMode";
})(ModeType || (ModeType = {}));
var ModeChangeType;
(function (ModeChangeType) {
    ModeChangeType[ModeChangeType["Adding"] = 0] = "Adding";
    ModeChangeType[ModeChangeType["Removing"] = 1] = "Removing";
})(ModeChangeType || (ModeChangeType = {}));
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
//# sourceMappingURL=Mode.js.map