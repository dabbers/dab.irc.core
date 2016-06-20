export interface IModule<Ctx> {
    init(context: Ctx): void;
    resume(state: any): void;
    uninit(): any;
}
