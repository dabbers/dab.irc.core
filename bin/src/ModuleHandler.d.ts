export declare class ModuleHandler<Ctx> {
    constructor(context: Ctx);
    load(name: string): ModuleHandler<Ctx>;
    unload(name: string, persist?: boolean): ModuleHandler<Ctx>;
    private modules;
    private moduleStates;
    protected context: Ctx;
}
