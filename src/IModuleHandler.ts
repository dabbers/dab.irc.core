import {IModule} from './IModule';

//export namespace ModuleHandler {
    export interface ModuleDictionary<Ctx> {
        [name: string] : IModule<Ctx>;
    }

    interface StateDictionary {
        [name: string] : any;
    }

    export interface IModuleHandler<Ctx> {
        load(name: string, noResume?:boolean) : IModuleHandler<Ctx>;
        unload(name: string, persist: boolean) : IModuleHandler<Ctx>;
    }

    /*export class ModuleHandler<Ctx> implements IModuleHandler<Ctx> {

        constructor(context: Ctx) {
            this.context = context;
        }

        load(name: string) : ModuleHandler<Ctx> {
            if (this.modules[name]) this.unload(name);

            //if (require.cache[name + ".js"]) delete require.cache[name + ".js"];

            var module1 = <IModule<Ctx>>require(name);

            module1.init(this.context);

            return this;
        }

        unload(name: string, persist: boolean = false) : ModuleHandler<Ctx> {
            if (this.modules[name]) {
                var res = this.modules[name].uninit();

                if (res) {
                    this.moduleStates[name] = res;
                }

                delete this.modules[name];
            }
            return this;
        }

        private modules : ModuleDictionary<Ctx> = {};
        private moduleStates : StateDictionary = {};
        protected context : Ctx;
    }*/
//}