import { IModule } from './IModule';
export interface ModuleDictionary<Ctx> {
    [name: string]: IModule<Ctx>;
}
export interface IModuleHandler<Ctx> {
    load(name: string, noResume?: boolean): IModuleHandler<Ctx>;
    unload(name: string, persist: boolean): IModuleHandler<Ctx>;
}
