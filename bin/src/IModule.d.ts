export interface IModule<Ctx> {
    init(context: Ctx): void;
    resume(context: Ctx, state: any): void;
    uninit(): any;
}
