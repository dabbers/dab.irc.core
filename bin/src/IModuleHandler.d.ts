import { ModuleHandler } from './ModuleHandler';
export interface IModuleHandler<Ctx> {
    load(name: string): ModuleHandler<Ctx>;
    unload(name: string, persist: boolean): ModuleHandler<Ctx>;
}
