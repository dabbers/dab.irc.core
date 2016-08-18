export interface IModuleHandler<Ctx> {
    load(name: string): IModuleHandler<Ctx>;
    unload(name: string, persist: boolean): IModuleHandler<Ctx>;
}
