enum ModeType {
    User,
    Channel,
    UMode
}
enum ModeChangeType {
    Adding,
    Removing
}

class Mode {
    character: string;
    type: ModeType;
    change: ModeChangeType;
    argument: string;

    get display():string {
        return (this.change == ModeChangeType.Adding ? "+" : "-") + 
            this.character + (this.argument ? " " + this.argument : "");
    }
}